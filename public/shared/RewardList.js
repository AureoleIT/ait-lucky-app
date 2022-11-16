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

export default function RewardList({listReward}) {
    listReward = [].concat(listReward);

    const getGiftsFromReward = (reward) => {
        return (
            <div className="relative h-full flex flex-col gap-2">
                <div className="w-1 left-4 absolute h-full" style={{backgroundColor: reward.color}} />
                {
                    reward.gifts.map((gift, idx) => {
                        return (
                            <div key={idx} className="ml-8 gap-4 flex">
                                <img className="object-cover h-16 w-16 rounded-lg" src={gift.img} alt={gift.desc}/>
                                <p className="grow font-semibold text-[#004599]">{gift.desc}</p>
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
                        <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex items-center justify-between h-8 rounded-full px-4 mb-2" style={{backgroundColor: reward.color}}>
                                <p className="items-center text-left text-[#004599] text-[18px] font-extrabold">{reward.name}</p>
                                <p className="items-center text-left text-[#004599] text-[16px] font-normal">Số lượng: {reward.amount}</p>
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
