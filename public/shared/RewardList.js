// layout for page
import Auth from "layouts/Auth.js";
import React, { useEffect, useState } from "react";
import { Link } from "next/link";
import { useForm } from "react-hook-form";
// import AuthContext from "../../src/context/AuthContext";
// Components
import Logotic from "public/shared/Logotic";
import AuthInput from "public/shared/AuthInput";
import TickBox from "public/shared/TickBox";
import BgBlueButton from "public/shared/BgBlueButton";
import BgWhiteButton from "public/shared/BgWhiteButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
import { useMemo } from "react/cjs/react.development";
import PlayerList from "./PlayerList";

export default function RewardList({listReward, showRemain = false, eventPaticipant}) {
    const rewardList = listReward;

    function compare(a, b) {
        if (a.sortNo > b.sortNo) return 1;
        if (b.sortNo > a.sortNo) return -1;
        return 0;
    }

    useEffect(() => {
        rewardList.sort(compare);
    }, [])

    const getIMGsFromReward = (reward) => {
        return (
            <div className="h-full grid grid-flow-row grid-cols-3 gap-2">
                {
                    reward.imgUrl.slice(0, 3).map((url, idx) => {
                        return (
                            <div key={idx} className="relative h-24 w-full flex">
                                <img className="object-cover h-full w-full rounded-lg drop-shadow-lg hover:brightness-75" src={url} alt={reward.description + idx}/>
                                {
                                    (reward.imgUrl.length > 3 && idx===2)?
                                    <div className="h-24 w-full flex absolute right-0 z-10 bg-[#00000080] hover:bg-[#00000099] items-center rounded-lg">
                                        <p className="w-full text-center font-bold text-white text-4xl">+{reward.imgUrl.length -3}</p>
                                    </div>:
                                    <></>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const listRewardShowcase = (
        <>
            {
                rewardList.map((reward, idx) => {
                    return (
                        <div key={idx} className="relative mb-3 last:mb-0">
                            <div className="absolute left-3 top-2 origin-center z-10 rotate-90 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 fill-[#004599]">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex items-center justify-between h-8 rounded-full pr-4 pl-8 mb-2 drop-shadow-lg" style={{backgroundColor: "#F5F92E"}}
                                onClick={(e) => {e.target.parentNode.firstChild.classList.toggle("rotate-90"); e.target.parentNode.lastChild.classList.toggle("hidden")}}>
                                <p className="items-center text-left text-[#004599] text-[18px] font-extrabold pointer-events-none">{reward.description}</p>
                                <p className="items-center text-left text-[#004599] text-[16px] font-normal pointer-events-none">Số lượng: {showRemain?reward.quantityRemain: reward.quantity}</p>
                            </div>
                            {getIMGsFromReward(reward)}
                        </div>
                    )
                })
            }
        </>
    )

    const awradedPaticipantShowcase = (rewardID) => {
        const showcaseList = eventPaticipant.filter(paticipant => {
            paticipant.reward_taken === rewardID;
        })

        return (
            <>
                {showcaseList.length > 0?
                    <>
                        <p className="ml-4 items-center text-left text-[#004599] text-4 font-extrabold">Người trúng thưởng</p>
                        <PlayerList listType="List" changeButton={false} listPlayer={showcaseList} />
                    </>:
                <></>}
            </>
        )
    }

    return (
        <>
            <div className="overflow-auto h-full">
                {listRewardShowcase}
                {eventPaticipant !== undefined?awradedPaticipantShowcase():<></>}
            </div>
        </>
    );
}
