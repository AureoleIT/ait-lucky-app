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

export default function Spin({listPlayer}) {
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
                                <img className="h-20 w-20 object-cover rounded-full border-1" src={player.playerAvt} alt={player.playerName} />
                                <p className="text-center grow font-bold text-[20px]">{player.playerName}</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

    return (
        <>
            <div className="flex flex-col h-full justify-center w-full mt-2 z-0 relative">
                {listPlayerShowcase}
                <div className="flex flex-col w-full h-full absolute top-0 z-30">
                    <div className="grow bg-gradient-to-b from-white"></div>
                    <div className="w-[104%] border-4 rounded-sm z-20 h-32 -ml-[2%] border-[#FFCE1F]"></div>
                    <span className="absolute top-[50%] -mt-5 -ml-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 fill-[#FFCE1F]">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <div className="grow bg-gradient-to-t from-white"></div>
                    <span className="absolute top-[50%] right-0 -mt-5 -mr-5 rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 fill-[#FFCE1F]">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
        </>
    );
}
