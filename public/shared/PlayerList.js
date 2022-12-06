// layout for page
import Auth from "layouts/Auth.js";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
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
import PlayerDetail from "./PlayerDetail";
import OverlayBlock from "./OverlayBlock";

export default function PlayerList({listPlayer = undefined, listType = "List", changeButton = true, listReward = []}) {
    const [typeList, setTypeList] = useState(listType);
    const [playerChosing, setPlayerChosing] = useState(undefined);

    const PlayerList_List = (
        <div className="flex flex-col divide-y divide-white/50">
            {
                listPlayer!==undefined?listPlayer.map((player, idx) => {
                    return (
                        <div key={idx} className="group h-fit flex py-2 px-6 gap-4 text-[#004599] text-base hover:text-lg" onClick={() => openPlayerDetailByIndex(idx)}>
                            <img className="transition-all h-16 w-16 object-cover rounded-full border-1 group-hover:h-20 group-hover:w-20 group-hover:-ml-2" src={player.playerAvt} />
                            <div className="flex flex-col justify-center">
                                <p className="h-fit text-left grow uppercase font-bold mt-2 group-hover:mt-4">{player.nameDisplay}</p>
                                <p className="h-fit text-left grow font-semibold">{player.nameDisplay}</p>
                            </div>
                        </div>
                    )
                }):<></>
            }
        </div>
    )
    
    const openPlayerDetailByIndex = (idx) => {
        if (document.getElementById("playerDetail").classList.contains("hidden"))
            document.getElementById("playerDetail").classList.remove("hidden");
        document.getElementById("playerDetailOverlay").classList.toggle("hidden");
        setPlayerChosing(idx);
    }

    const PlayerList_Menu = (
        <div className="grid grid-flow-row grid-cols-4 mt-2">
            {
                listPlayer!==undefined?listPlayer.map((player, idx) => {
                    return (
                        <div key={idx} className="h-20 w-full py-2 flex" onClick={() => openPlayerDetailByIndex(idx)}>
                            <img className="transition-all mx-auto h-16 w-16 object-cover rounded-full border-1 hover:h-20 hover:w-20 hover:-mt-2 hover:shadow-2xl" src={player.playerAvt} alt={player.playerName} />
                        </div>
                    )
                }):<></>
            }
        </div>
    )

    useEffect(() => {
        const detail = (<PlayerDetail player={listPlayer[playerChosing]} reward={listReward.filter((val) => val.idReward === listPlayer[playerChosing].idReward)} />);
        if (playerChosing!==undefined) render(detail, document.getElementById('playerDetail'));
    }, [playerChosing])

    useEffect(() => {
        console.log(listReward);
    }, [listReward]);

    return (
        <>
            {changeButton?
            <div className="flex justify-end w-full -mt-3 gap-2">
                <span onClick={() => setTypeList("Menu")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{fill: typeList!=="List"?"white":"gray"}}>
                        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
                    </svg>
                </span>
                <span onClick={() => setTypeList("List")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{fill: typeList==="List"?"white":"gray"}}>
                        <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>:<></>}
            <div className="overflow-auto grow">
                {typeList==="List"?PlayerList_List:PlayerList_Menu}
            </div>
            {listPlayer.length?<OverlayBlock childDiv={<div className="hidden" id="playerDetail"></div>} id={"playerDetailOverlay"} manual={true} />:<></>}
        </>
    )
}