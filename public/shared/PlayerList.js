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
import PlayerDetail from "./PlayerDetail";

export default function PlayerList({listPlayer, listType = "List", changeButton = true}) {
    const [typeList, setTypeList] = useState(listType);
    const [playerChosing, setPlayerChosing] = useState(0);

    const PlayerList_List = (
        <div className="flex flex-col">
            {
                listPlayer!==undefined?listPlayer.map((player, idx) => {
                    return (
                        <div key={idx} className="h-20 flex py-2 px-6 gap-4" onClick={() => openPlayerDetailByIndex(idx)}>
                            <img className="h-16 w-16 object-cover rounded-full border-1" src={player.playerAvt} />
                            <p className="text-left grow uppercase font-bold my-2 text-[#004599]">{player.playerName}</p>
                        </div>
                    )
                }):<></>
            }
        </div>
    )
    
    const openPlayerDetailByIndex = (idx) => {
        document.getElementById("playerDetail").classList.toggle("hidden");
        document.getElementById("popUpBG").classList.toggle("hidden");
        setPlayer(listPlayer[idx]);
    }

    const PlayerList_Menu = (
        <div className="grid grid-flow-row grid-cols-4">
            {
                listPlayer!==undefined?listPlayer.map((player, idx) => {
                    return (
                        <div key={idx} className="h-20 w-full py-2 flex" onClick={() => openPlayerDetailByIndex(idx)}>
                            <img className="mx-auto h-16 w-16 object-cover rounded-full border-1" src={player.playerAvt} alt={player.playerName} />
                        </div>
                    )
                }):<></>
            }
        </div>
    )

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
            {listPlayer!==undefined?<PlayerDetail player={listPlayer[playerChosing]} />:<></>}
        </>
    )
}