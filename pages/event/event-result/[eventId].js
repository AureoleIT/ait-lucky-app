import React, { useEffect, useState } from "react";

import BgBlueButton from "public/shared/BgBlueButton";
import GradientLine from "public/shared/GradientLine";
import RewardList from "public/shared/RewardList";
import PlayerList from "public/shared/PlayerList";
import { db } from "src/firebase";
import { onValue, query, ref, orderByChild, equalTo } from "firebase/database";
import { useRouter } from "next/router";

export default function EventResult() {
  // Dynamic link
  const router = useRouter();
  const EventId = router.query.eventId;

  // list db
  const [countPlayer, setCountPlayer] = useState(0);
  const [listReward, setListReward] = useState([]);
  const [listPlayer, setListPlayer] = useState([]);
  const [event, setEvent] = useState({});

  // get db 
  const fetchDb = () => {
    const que1 = query(ref(db, "event"), orderByChild("eventId"), equalTo(EventId));
    onValue(que1, (snapshot) => {
      // check id event
      if (!snapshot.exists())
        router.push("/");
      const data = snapshot.val() ?? [];
      const values = Object.values(data);

      setEvent(values[0]);
    })

    const que2 = query(ref(db, "event_rewards"), orderByChild("eventId"), equalTo(EventId));
    onValue(que2, (snapshot) => {
      const data = snapshot.val() ?? [];
      const values = Object.values(data);

      setListReward(values);
    })

    const que3 = query(ref(db, "event_participants"), orderByChild("eventId"), equalTo(EventId));
    onValue(que3, (snapshot) => {
      const data = snapshot.val() ?? [];
      const values = Object.values(data);

      setListPlayer(values);
    })
  }

  useEffect(() => {
    setCountPlayer(listPlayer.length);
  }, [listPlayer])

  useEffect(() => {
    fetchDb();
  }, []);

  return (
    <section className="overflow-hidden flex flex-col justify-evenly h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="uppercase text-4xl py-0 font-bold text-[#004599]">
          tiệc cuối năm
        </h1>
        <h1 className="uppercase text-2xl py-0 font-bold text-[#004599]">
          thông tin giải thưởng
        </h1>
        <div className="w-full max-w-md">
          <GradientLine color1="#003B93" color2="#00F0FF" />
        </div>

        <div className="flex flex-col items-center justify-center w-full overflow-y-auto h-[40%]">
          <RewardList
            listReward={listReward}
            showRemain={false}
            showAwardedPaticipant={true}
            eventPaticipant={listPlayer}
          />
        </div>

        <h1 className="uppercase text-2xl pt-2 font-bold text-[#004599]">
          danh sách người chơi
        </h1>
        <h1 className="uppercase text-xl pt-2 font-semibold text-[#004599]">
          số người tham gia: {countPlayer}/100
        </h1>

        <div className="flex flex-col grow w-full max-w-md h-[30%] overflow-y-auto">
          <div className="w-full max-w-md my-2">
            <GradientLine color1="#003B93" color2="#00F0FF" />
          </div>
          <PlayerList listPlayer={listPlayer} listReward={listReward} />
        </div>

        <div className="content-end py-3 w-full max-w-md px-5">
          <BgBlueButton content={"Thoát"} />
        </div>
      </div>
    </section>
  );
}
