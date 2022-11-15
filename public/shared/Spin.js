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

export default function Spin() {
    const listPlayer = ["A", "B", "C", "D", "NGUYỄN VĂN E", "F", "G", "H", "I", "K", "L"];
    const [chosingPlayer, setChosingPlayer] = useState(4);

    const listPlayerShowcase = (
        <>
            {
                listPlayer.map((player, idx) => {
                    return (
                        <div key={idx} className="h-0" style={{
                                transform: "translateY(" + (chosingPlayer - idx)*60*(1 - Math.abs((chosingPlayer - idx)/8)) + "px) scale(" + (1 - Math.abs((chosingPlayer - idx)/20)) + ")",
                                zIndex: 10 - Math.abs(chosingPlayer - idx),
                            }}>
                            <div className="bg-[#E9E9E9] h-28 -translate-y-[50%] flex items-center rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.25)] py-4 px-6 gap-2">
                                <div className="h-20 w-20 rounded-full border-2">
                                </div>
                                <p className="text-center grow">{player}</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

    return (
        <>
            <div className="flex flex-col h-full justify-center w-full mt-2 z-0">
                {listPlayerShowcase}
            </div>
        </>
    );
}
