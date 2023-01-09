
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
//firebase
import { db } from "src/firebase";
import { onValue, query, ref, orderByChild, equalTo, get, child } from "firebase/database";
//components
import { RewardList, PlayerList, Button, Line, PageLoading } from "public/shared"
//colors
import { LEFT_COLOR, RIGHT_COLOR, BG } from "public/util/colors";
//redux
import { useUserPackageHook } from "public/redux/hooks";
//languge
import Trans from "public/trans/hooks/Trans";


export default function EventResult() {
  // Dynamic link
  const router = useRouter();
  const EventId = router.query.eventId;
  const userLogin = useUserPackageHook();

  // language
  const trans = Trans().eventResult

  // list db
  const [countPlayer, setCountPlayer] = useState(0);
  const [listReward, setListReward] = useState([]);
  const [listPlayer, setListPlayer] = useState([]);
  const [event, setEvent] = useState({});
  const [loadedData, setLoadedData] = useState(false);

  //checkIsAdmin
  const checkIsAdmin = (userLogin, event) => {
    if (userLogin === null || userLogin === undefined) {
      return false;
    }

    if (userLogin.userId !== event.createBy)
    {
      return false;
    }
    return true;
  }

  // get db 
  const fetchDb = () => {
    const que1 = query(ref(db, "event"), orderByChild("eventId"), equalTo(EventId));
    onValue(que1, (snapshot) => {
      console.log(snapshot.exists());
      // check id event
      if (!snapshot.exists()) {
        setTimeout(() => {
          router.push("/");
        }, 3000);
        return;
      } else {
        setTimeout(() => {
          setLoadedData(true);
        }, 1200);
      }
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
      const rawData = snapshot.val() ?? [];

      const data = Object.values(rawData);
      data.forEach((val, idx) => {
        val.ID = Object.keys(rawData)[idx];
        get(child(ref(db), "users/" + val.participantId)).then((snapshot) => {
          if (snapshot.exists()) {
            val.pic = snapshot.val().pic;
          }
        })
      })

      setTimeout(() => {

        setListPlayer(Object.values(rawData))
      }, 200);
    })

  }

  const isAdmin = checkIsAdmin(userLogin, event);

  const handleExit = () => {
    if (isAdmin)
      router.push("/admin/dashboard-admin");
    else
      router.push("/");
  }

  useEffect(() => {
    setCountPlayer(listPlayer.length);
  }, [listPlayer])

  useEffect(() => {
    fetchDb();
  }, []);

  //prevent re-render
  const renderRewardList = useMemo(() => {
    return (
      <RewardList
        listReward={listReward}
        showRemain={false}
        eventPaticipant={listPlayer}
      >{console.log(listReward, listPlayer)}</RewardList>
    )
  }, [listPlayer, listReward])

  const renderPlayerList = useMemo(() => {
    return (
      <PlayerList listPlayer={listPlayer} listReward={listReward} />
    )
  }, [listPlayer, listReward])


  const renderLine = useMemo(() => {
    return (
      <Line margin="my-2"/>
    )
  }, [])

  const renderButton = useMemo(() => {
    return (
      <Button content={trans.exit} primaryColor={LEFT_COLOR} secondaryColor={RIGHT_COLOR} onClick={handleExit} />
    )
  }, [handleExit])

  return (
    <>
      {
        loadedData ?
          <section className={`overflow-hidden flex flex-col justify-evenly h-screen ${isAdmin ? "bg-white" : BG}`}>
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="uppercase text-4xl py-0 font-bold text-[#004599] mt-6">
                {event.title}
              </h1>
              <h1 className="uppercase text-2xl py-0 font-bold text-[#004599]">
                {trans.prizeInfo}
              </h1>
              <div className="max-w-md w-[90%]">
                {renderLine}
              </div>

              <div className="flex flex-col items-center justify-center  w-[90%] max-w-md overflow-y-auto h-[40%] ">
                {renderRewardList}
              </div>

              <h1 className="uppercase text-2xl pt-2 font-bold text-[#004599]">
                {trans.participantList}
              </h1>
              <h1 className="uppercase text-xl pt-2 font-semibold text-[#004599]">
                {trans.participant} {countPlayer}
              </h1>

              <div className="flex flex-col grow w-[90%] max-w-md h-[30%] overflow-y-auto">
                <div className="w-full max-w-md mb-3">
                  {renderLine}
                </div>
                {renderPlayerList}
              </div>

              <div className="content-end py-3  w-[90%] max-w-md px-5">
                {renderButton}
              </div>
            </div>
          </section>
          : <PageLoading />
      }
    </>
  );
}
