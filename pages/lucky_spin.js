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

export default function LuckySpin() {
    const [playerAmount, setPlayerAmount] = useState(21)

    return (
        <>
            <section className="h-screen px-5 py-5 mx-auto flex justify-center items-center">
                <div className="flex flex-col justify-start items-center w-full h-full">
                    <div className="flex flex-col w-full mt-[25px] pt-5">
                        <Title title="QUAY THƯỞNG MAY MẮN" fontSize="24" fontWeight="semibold"/>
                        <Title title="TIỆC CUỐI NĂM" fontSize="32" fontWeight="900" />
                        <div className="flex w-full justify-between">
                            <p className="font-[900] text-[#004599] text-[16] text-left items-center h-6">Số người trực tuyến</p>
                            <span className="flex gap-1">
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor(playerAmount/100)}</p>
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor((playerAmount%100)/10)}</p>
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor((playerAmount%100)%10)}</p>
                            </span>
                        </div>
                    </div>
                    <div className="w-full">
                    </div>
                </div>
            </section>
        </>
    );
}
