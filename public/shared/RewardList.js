// layout for page
import React from "react";
// import AuthContext from "../../src/context/AuthContext";

// Components
import PlayerList from "./PlayerList";

export default function RewardList({listReward, showRemain = false, eventPaticipant, showAwardedPaticipant = false}) {
    listReward = [].concat(listReward);

    const getGiftsFromReward = (reward) => {
        return (
            <div className="h-full grid grid-flow-row grid-cols-3 gap-2">
                {
                    reward.img_url.slice(0, 3).map((url, idx) => {
                        return (
                            <div key={idx} className="relative h-24 w-full flex">
                                <img className="object-cover h-full w-full rounded-lg drop-shadow-lg" src={url} alt={reward.description + idx}/>
                                {
                                    (reward.img_url.length > 3 && idx===2)?
                                    <div className="h-24 w-full flex absolute right-0 z-10 bg-[#00000080] items-center rounded-lg">
                                        <p className="w-full text-center font-bold text-white text-4xl">+{reward.img_url.length -3}</p>
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
                listReward.map((reward, idx) => {
                    return (
                        <div key={idx} className="mb-3 last:mb-0">
                            <div className="flex items-center justify-between h-8 rounded-full px-4 mb-2 drop-shadow-lg" style={{backgroundColor: "#F5F92E"}}>
                                <p className="items-center text-left text-[#004599] text-[18px] font-extrabold">{reward.description}</p>
                                <p className="items-center text-left text-[#004599] text-[16px] font-normal">Số lượng: {showRemain?reward.quantity_remain: reward.quantity}</p>
                            </div>
                            {getGiftsFromReward(reward)}
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
                        <PlayerList listType="List" changeButton={false} />
                    </>:
                <></>}
            </>
        )
    }

    return (
        <>
            <div className="overflow-auto h-full">
                {listRewardShowcase}
                {showAwardedPaticipant && eventPaticipant !== undefined?awradedPaticipantShowcase():<></>}
            </div>
        </>
    );
}
