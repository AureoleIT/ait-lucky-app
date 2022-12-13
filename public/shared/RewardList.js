import React, { useEffect, useState } from "react";
import PlayerList from "./PlayerList";

export default function RewardList({listReward, showRemain = false, eventPaticipant, showDetail = false}) {
    const rewardList = [...listReward];

    function compare(a, b) {
        if (a.sortNo > b.sortNo) return 1;
        if (b.sortNo > a.sortNo) return -1;
        return 0;
    }

    useEffect(() => {
        rewardList.sort(compare);
        console.log()
    }, [rewardList])

    const awradedPaticipantShowcase = (rewardID) => {
        const showcaseList = eventPaticipant.filter(paticipant => paticipant.idReward == rewardID)

        return (
            <>
                {showcaseList.length > 0?
                    <>
                        <p className="ml-4 items-center text-left text-[#004599] text-lg font-extrabold mt-2 mb-1">Người trúng thưởng</p>
                        <PlayerList listType="Menu" changeButton={false} listPlayer={showcaseList} showDetail={showDetail} />
                    </>:
                <></>}
            </>
        )
    }

    const getDetailFromReward = (reward) => {
        return (
            <div className="flex flex-col">
                <div className="h-full grid grid-flow-row grid-cols-3 gap-2">
                    {
                        reward.imgUrl !== undefined?reward.imgUrl.slice(0, 3).map((url, idx) => {
                            return (
                                <div key={idx} className="relative h-24 w-full flex">
                                    <img className="object-cover h-full w-full rounded-lg drop-shadow-lg hover:brightness-75" src={url} alt={reward.nameReward + idx}/>
                                    {
                                        (reward.imgUrl.length > 3 && idx===2)?
                                        <div className="h-24 w-full flex absolute right-0 z-10 bg-[#00000080] hover:bg-[#00000099] items-center rounded-lg">
                                            <p className="w-full text-center font-bold text-white text-4xl">+{reward.imgUrl.length -3}</p>
                                        </div>:
                                        <></>
                                    }
                                </div>
                            )
                        }):<></>
                    }
                </div>
                {eventPaticipant !== undefined?awradedPaticipantShowcase(reward.idReward):<></>}
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
                                <p className="items-center text-left text-[#004599] text-[18px] font-extrabold pointer-events-none text-ellipsis">{reward.nameReward}</p>
                                <p className="items-center text-left text-[#004599] text-[16px] font-normal pointer-events-none">{showRemain? "Số lượng còn lại: " + reward.quantityRemain : "Số lượng: " + reward.quantity}</p>
                            </div>
                            {getDetailFromReward(reward)}
                        </div>
                    )
                })
            }
        </>
    )

    return (
        <>
            <div className="overflow-auto w-full grow">
                {listRewardShowcase}
            </div>
        </>
    );
}
