import { useState, useEffect, useMemo } from "react";
import Line from "public/shared/Line";
import SpecialRewardInfo from "public/shared/SpecialRewardInfo";
import Title from "public/shared/Title";

import { useUserCurrEventCreatingHook } from "public/redux/hooks"

import { db } from "src/firebase"
import {ref, get, child, onValue, query, orderByChild, equalTo} from "firebase/database"
import PlayerList from "public/shared/PlayerList";

function UserCountdownCheckin () {

    // event object
    const event = useUserCurrEventCreatingHook()
    const eventName = event.title
    const eventID = "4036f104-4ab2-4d4e-ae00-040b3eb88673"
    const eventMaxTicket = event.maxTicket

    let countdown

    // state
    const [minutes, setMinutes] = useState(0)  // store minutes of countdown
    const [seconds, setSeconds] = useState(0) // store seconds of countdown
    const [rewards, setRewards] = useState([]) // store rewards of event
    const [player, setPlayer] = useState(0)
    const [playerList, setPlayerList] = useState([])

    // get reward from firebase
    const getReward = query(ref(db, "event_rewards"), orderByChild("eventId"), equalTo(eventID))

    useEffect(() =>
    {
        onValue(getReward,(snapshot) =>
        {
                const data = snapshot.val()
                if(data !== null)
                {
                    setRewards(Object.values(data))
                }
        })
    },[])

    // get participants from firebase
    const que2 = query(ref(db, "event_participants"), orderByChild("eventId"), equalTo(eventID));
    useEffect(() =>
    {
        onValue(que2, (snapshot) => {
            if (snapshot.exists()) {
                const rawData = snapshot.val();
                const data = Object.values(rawData);
                data.forEach((val, idx) => {
                    val.ID = Object.keys(rawData)[idx];
                    get(child(ref(db), "users/" + val.participantId)).then((snapshot) => {
                        if (snapshot.exists()) {
                            val['pic'] = snapshot.val().pic;
                        }
                    })
                })
                setTimeout(function()
                {
                    const online = data.filter(val => val.status === 1).length;
                    setPlayerList(Object.values(rawData));
                    setPlayer(online);
                }, 200)
            }
        });
    })

    // get countdown from firebase

    const getCountdown = query(ref(db, "event"), orderByChild("eventId"), equalTo(eventID))

    useEffect(() =>
    {
        onValue(getCountdown, (snapshot) =>
        {
            const data = snapshot.val()
            if(data !== null)
            {
                let eventData = Object.values(data)[0]
                countdown = eventData.waitingTime
                setMinutes(Math.floor(countdown / 60))
                setSeconds(countdown % 60)
            }

        })
    })

    const BG_COLOR ="bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";

    const countDownNumber = {background: "#3B88C3"}

    const renderTitle = useMemo(() =>
    {
        return (
            <div className="flex flex-col">
                <h1 className={`font-[900] uppercase text-[#004599] text-[36px] text-center`}>{eventName}</h1>
                <h1 className={`font-[900] uppercase text-[#004599] text-[18px] text-center mb-2`}>bắt đầu sau ...</h1>
            </div>
        )
    },[])

    const renderCountdownTime = useMemo(() =>
    {
        return (
            <div className="flex justify-center items-center max-w-xl w-4/5 mb-3">
                
                <div className="w-[65px] h-[80px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {minutes > 9 ? (Math.floor(minutes / 10)) : 0}
                </div>
                <div className="w-[65px] h-[80px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {minutes > 9 ? (Math.floor(minutes % 10)) : minutes}
                </div>
                <div className="mr-1 text-6xl flex justify-center items-center">
                    <span className="flex justify-center items-center text-[#3B88C3]">:</span>
                </div>
                <div className="w-[65px] h-[80px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {seconds > 9 ? Math.floor(seconds / 10) : 0}
                </div>
                <div className="w-[65px] h-[80px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {seconds > 9 ? Math.floor(seconds % 10) : seconds}
                </div>

            </div>)
    },[minutes, seconds])

    const renderTitle2 = useMemo(() =>
    {
        return (
            <div className="flex">
                <h1 className={`font-[900] uppercase text-[#004599] text-[18px] text-center mb-2`}>thông tin giải thưởng</h1>
            </div>
        )
    },[])

    const renderLine = useMemo(() =>
    {
        return (
            <div className="max-w-xl w-4/5 mb-2 z-0"> <Line /> </div>
        )
    },[])

    const renderRewards = useMemo(() =>
    {
        return (
            <div className="flex flex-col overflow-x-hidden overflow-y-auto scrollbar-hide justify-center items-center w-4/5 max-w-xl h-[300px] my-2">
                <div className="my-2 w-full h-full flex flex-col max-h-[300px]">
                    {
                        rewards.map((item, index) => {
                            return (
                                <div key={index}>
                                    <SpecialRewardInfo
                                        rewardName={item.nameReward}
                                        amount={item.quantity}
                                        image={item.imgUrl}
                                        color={"#52FF00"}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    },[rewards])

    const renderTitle3 = useMemo(() =>
    {
        return (
            <div className="flex flex-col">    
                <h1 className={`font-[900] uppercase text-[#004599] text-[18px] text-center mb-2`}>danh sách người chơi</h1>
                <h1 className={`font-[900] uppercase text-[#004599] text-[18px] text-center mb-2`}>{`số người tham gia: ${player}/${eventMaxTicket}`}</h1>
            </div>
        )
    },[player])

    const renderPlayerList = useMemo(() =>
    {
        return (
            <div className="max-w-xl w-4/5 h-[200px] overflow-x-hidden overflow-y-auto scrollbar-hide">
                <div className="w-full h-full flex flex-col items-center">
                    <PlayerList listPlayer={playerList} />
                </div>
            </div>
        )
    },[playerList])

    return (
        <section className={`h-screen w-screen flex flex-col items-center justify-center ${BG_COLOR}`}>
            {renderTitle}
            {renderCountdownTime}
            {renderTitle2}
            {renderLine}
            {renderRewards}
            {renderTitle3}
            {renderPlayerList}
        </section>
    )
}

export default UserCountdownCheckin