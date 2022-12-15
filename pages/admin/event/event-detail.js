/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import BgBlueButton from "public/shared/BgBlueButton";
import SpecialRewardInfo from "public/shared/SpecialRewardInfo";
import Line from "public/shared/Line";

import Title from "public/shared/Title";

import { useUserCurrEventCreatingHook } from "public/redux/hooks";

import { db } from "src/firebase"
import {ref, onValue, query, orderByChild, equalTo} from "firebase/database"

function EventDetail() {
    // router
    const router = useRouter();
    
    // eventID get from redux
    const event = useUserCurrEventCreatingHook()
    const beforeID = event.eventId
    const eventID = beforeID.slice(0,8)

    // state
    const [countdown, setCountdown] = useState(5); // countdown time
    const [title, setTitle] = useState("") // name event
    const [rewards, setRewards] = useState([]) // store rewards get from firebase

    const optionStyles = {
        background: "#40BEE5",
    };

    // logic

    // get name event from firebase
    const getName = query(ref(db, "event"), orderByChild("eventId"), equalTo(beforeID))

    useEffect(() =>
    {
        onValue(getName, (snapshot) =>
        {
            const value = snapshot.val()
            if(value != null)
            {
                let eventObject = Object.values(value)
                setTitle(eventObject[0].title)
            }
        })
    },[])

    // get reward from firebase
    const reward = query(ref(db, "event_rewards"), orderByChild("eventId"), equalTo(beforeID))

    useEffect(() =>
    {
        onValue(reward,(snapshot) =>
        {
                const data = snapshot.val()
                if(data !== null)
                {
                    setRewards(Object.values(data))
                }
        })
    },[])

    // get countdown value from option
    const onSetCoundownTime = () => {
        let select = document.getElementById("timer").value;
        setCountdown(select);
    };

    // navigate to countdown-checkin
    const handlePrepare = useCallback(() => {
        router.push({
        pathname:"/admin/event/countdown-checkin",
        query:
        {
            countdown
        }
        })
    },[countdown, router]);

    // navigate to edit-page
    const handleEditPageNavigation = useCallback(() => {
        router.push("/admin/event/edit-event-reward-register");
        
    },[router]);

    // render component
    const renderTitle = useMemo(() =>
    {
        return (
            <Title title={title}/>
        )
    },[title])

    const renderEventID = useMemo(() =>
    {
        return (
            <div className="flex justify-between w-4/5 max-w-xl text-lg">
                <h1 className="uppercase py-2 mb-1 font-bold text-[#004599]">mã sự kiện</h1>
                <h1 className="uppercase py-2 font-bold text-[#004599] tracking-[5px]">{eventID}</h1>
            </div>
        )
    },[eventID])

    const renderH1andLine = useMemo(() =>
    {
        return (
            <>
                <h1 className="uppercase text-[#004599] font-bold mb-1 text-[20px]">thông tin giải thưởng</h1>
                <div className="w-4/5 max-w-xl"> <Line /> </div>
            </>
        )
    },[])

    const renderAward = useMemo(() =>
    {
        return (
            <div className="flex flex-col overflow-x-hidden overflow-y-auto justify-center items-center w-4/5 max-w-xl h-[350px] my-2">
                <div className="my-2 w-full h-full flex flex-col max-h-[350px]">
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

    const renderLine2 = useMemo(() =>
    {
        return (
            <div className="w-4/5 max-w-xl mb-2"> <Line /> </div>
        )
    },[])

    const renderCheckinTime = useMemo(() =>
    {
        return (
            <div className="flex items-center w-4/5 max-w-xl justify-center mb-2">
                <div className="flex items-center justify-center h-[40px]">
                    <h1 className="uppercase text-[#004599] font-bold mb-1">thời gian check in</h1>
                </div>
                <div className="text-white font-bold ml-3 w-[110px] h-[40px] flex justify-center items-center rounded-[10px] " style={optionStyles}>
                    <select
                        className="w-[90px] h-[30px] bg-transparent outline-none"
                        style={optionStyles}
                        id={"timer"}
                        onChange={onSetCoundownTime}
                    >
                        <option value={"5"}>5 phút</option>
                        <option value={"10"}>10 phút</option>
                        <option value={"15"}>15 phút</option>
                        <option value={"20"}>20 phút</option>
                    </select>
                </div>
            </div>
        )
    },[])

    const renderPrepareButton = useMemo(() =>
    {
        return (
            <div className="w-full mr-1 drop-shadow-lg">
                <BgBlueButton content={"CHUẨN BỊ"} onClick={handlePrepare} />
            </div>
        )
    },[handlePrepare])

    const renderEditPageButton = useMemo(() =>
    {
        return (
            <div className="w-[50px] h-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] rounded-[50px] ml-1 cursor-pointer drop-shadow-lg" onClick={handleEditPageNavigation}>
                <i className="fas fa-pen text-white flex justify-center items-center w-full h-full"></i>
            </div>
        )
    },[handleEditPageNavigation])

    return (
        <div className="flex flex-col justify-evenly items-center h-screen w-screen">
            {/* test event name */}
            {renderTitle}
            {renderEventID}
            {/* rewards information */}
            {renderH1andLine}
            {renderAward}
            {renderLine2}
            {renderCheckinTime}
            <div className="w-4/5 max-w-xl flex justify-center items-center">
                {renderPrepareButton}
                {renderEditPageButton}  
            </div>
        </div>
    );
    }

    export default EventDetail;