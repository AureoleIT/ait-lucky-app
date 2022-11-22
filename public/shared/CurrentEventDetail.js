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
import RewardList from "public/shared/RewardList";
import LineGradient from "./LineGradient";
import PlayerDetail from "./PlayerDetail";
import PlayerList from "./PlayerList";

export default function CurrentEventDetail({listPlayer, listReward}) {
    const [expand, setExpand] = useState(false);
    const [player, setPlayer] = useState(listPlayer[0]);

    const EventDetailMinimize = (
        <div className="flex flex-col w-full absolute bg-[#40BEE5] h-fit rounded-t-2xl bottom-0 items-center z-999">
            <div className="flex w-14 absolute bg-[#40BEE5] h-7 rounded-t-2xl -top-7 right-6 items-center justify-center">
                <span onClick={() => setExpand(!expand)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white -rotate-90">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className="flex w-full h-14 items-center">
                <p className="w-full text-center items-center uppercase text-white font-[900] text-[20px]">THÔNG TIN SỰ KIỆN</p>
            </div>
        </div>
    )

    const PlayerList_List = (
        <div className="flex flex-col">
            {
                listPlayer.map((player, idx) => {
                    return (
                        <div key={idx} className="h-20 flex py-2 px-6 gap-4" onClick={() => openPlayerDetailByIndex(idx)}>
                            <img className="h-16 w-16 object-cover rounded-full border-1" src={player.playerAvt} />
                            <p className="text-left grow uppercase font-bold my-2 text-[#004599]">{player.playerName}</p>
                        </div>
                    )
                })
            }
        </div>
    )
    
        const openPlayerDetailByIndex = (idx) => {
            document.getElementById("playerDetail").classList.toggle("hidden");
            setPlayer(listPlayer[idx]);
        }

    const PlayerList_Menu = (
        <div className="grid grid-flow-row grid-cols-4">
            {
                listPlayer.map((player, idx) => {
                    return (
                        <div key={idx} className="h-20 w-full py-2 flex" onClick={() => openPlayerDetailByIndex(idx)}>
                            <img className="mx-auto h-16 w-16 object-cover rounded-full border-1" src={player.playerAvt} alt={player.playerName} />
                        </div>
                    )
                })
            }
        </div>
    )

    const EventDetailExpand = (
        <div className="flex flex-col w-full h-[80%] absolute bg-[#40BEE5] h-fit rounded-t-2xl bottom-0 items-center z-999">
            <div className="flex w-14 absolute bg-[#40BEE5] h-7 rounded-t-2xl -top-7 right-6 items-center justify-center">
                <span onClick={() => setExpand(!expand)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white rotate-90">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className="flex flex-col w-full h-fit items-center mt-4">
                <p className="w-full text-center items-center uppercase text-white font-[900] text-[20px]">THÔNG TIN SỰ KIỆN</p>
            </div>
            <div className="flex flex-col w-full h-full max-h-64 px-5 overflow-hidden">
                <Title title="THÔNG TIN GIẢI THƯỞNG" fontSize="20" />
                <div className="h-1 bg-white w-full -mt-4 mb-4"></div>
                <RewardList listReward={listReward} />
            </div>
            <div className="flex flex-col w-full grow px-5 mt-4 overflow-hidden">
                <Title title="THÔNG TIN NGƯỜI CHƠI" fontSize="20" />
                <div className="h-1 bg-white w-full -mt-4 mb-4 shrink-0"></div>
                <PlayerList listPlayer={listPlayer} />
            </div>
        </div>
    )

    return (
        <>
            {!expand?EventDetailMinimize:EventDetailExpand}
        </>
    );
}
