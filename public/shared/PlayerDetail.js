/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import RewardList from "./RewardList";
import CloseButton from "./CloseButton";

export default function PlayerDetail({player, reward}) {

    const content = (
        <div className="absolute bottom-0 left-0 h-[70%] w-full bg-white rounded-t-2xl p-4 z-50"
            onClick={(e) => e.stopPropagation()}>
            {player?<div>
                <img className="mx-auto mb-4 h-20 w-20 object-cover rounded-full" src={player.pic} />
                <Title title={player.nameDisplay} fontSize="20" />
                <GradientLine color1="#003B93" color2="#00F0FF" content="Giải thưởng" />
            </div>:<></>}
            {reward.length > 0 ? <RewardList listReward={reward} />:
            <div className="flex items-center justify-between h-8 rounded-full px-4 mb-2 bg-[#D9D9D9]">
                <p className="w-full items-center text-center text-[#004599] text-[18px] font-extrabold">KHÔNG CÓ</p>
            </div>}
            <CloseButton parentDivID={"playerDetailOverlay"} />
        </div>
    )

    return (
        <>
            {content}
        </>
    )
}
