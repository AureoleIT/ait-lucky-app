// layout for page
import Auth from "layouts/Auth.js";
import React, { useState } from "react";
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

export default function RewardList({listReward, showRemain = false}) {
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
                        <div key={idx} className="mb-4 last:mb-0">
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

    return (
        <>
            <div className="overflow-auto h-full">
                {listRewardShowcase}
            </div>
        </>
    );
}
