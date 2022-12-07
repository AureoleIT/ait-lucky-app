import React, { useEffect, useState } from "react";

import BgBlueButton from "public/shared/BgBlueButton";
import GradientLine from "public/shared/GradientLine";
import Award from "public/shared/EventResult/Award";
import PlayerList from "public/shared/PlayerList";
import { db } from "src/firebase";
import { onValue, get, update, child, query, ref, orderByChild, equalTo } from "firebase/database";

const eventID = "EV20221101";

export default function EventResult() {
  const [countPlayer, setCountPlayer] = useState(0);
  const [listReward, setListReward] = useState([]);
  const [listPlayer, setListPlayer] = useState([]);
  const [event, setEvent] = useState({});

  const fetchDb = () => {
    const que1 = query(ref(db, "event"), orderByChild("eventId"), equalTo(eventID));
    onValue(que1, (snapshot) => {
      const data = snapshot.val() ?? [];
      const values = Object.values(data);

      setEvent(values[0]);
    })

    const que2 = query(ref(db, "event"), orderByChild("eventId"), equalTo(eventID));
    onValue(que2, (snapshot) => {
      const data = snapshot.val() ?? [];
      const values = Object.values(data);

      setEvent(values[0]);
    })

    const que3 = query(ref(db, "event_participants"), orderByChild("eventId"), equalTo(eventID));
    onValue(que3, (snapshot) => {
      const data = snapshot.val() ?? [];
      const values = Object.values(data);

      setListPlayer(values);
    })
  }

  useEffect(() =>{
    setCountPlayer(listPlayer.length);
  }, [listPlayer])

  useEffect(() => {
    fetchDb();
  }, []);

  return (
    <section className="overflow-hidden flex flex-col justify-evenly h-screen">
      <div className="flex flex-col items-center justify-center h-full px-5 mt-5">
        <h1 className="uppercase text-4xl py-0 font-bold text-[#004599]">
          tiệc cuối năm
        </h1>
        <h1 className="uppercase text-2xl py-0 font-bold text-[#004599]">
          thông tin giải thưởng
        </h1>
        <div className="w-full max-w-md">
          <GradientLine color1="#003B93" color2="#00F0FF" />
        </div>

        <div className="flex flex-col items-center justify-center w-full max-w-md overflow-y-auto h-[40%]">
          <Award listReward={listReward} listPlayer={listPlayer}></Award>
        </div>

        <h1 className="uppercase text-2xl pt-2 font-bold text-[#004599]">
          danh sách người chơi
        </h1>
        <h1 className="uppercase text-xl pt-2 font-semibold text-[#004599]">
          số người tham gia: {countPlayer}/100
        </h1>

        <div className="w-full max-w-md h-[30%] overflow-y-auto">
          <div className="w-full max-w-md my-2">
            <GradientLine color1="#003B93" color2="#00F0FF" />
          </div>
          <PlayerList listPlayer={listPlayer} />
        </div>

        <div className="content-end py-3 w-full max-w-md px-5">
          <BgBlueButton content={"Thoát"} />
        </div>
      </div>
    </section>
  );
}
