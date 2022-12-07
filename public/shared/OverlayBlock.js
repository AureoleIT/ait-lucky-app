// layout for page
import Auth from "layouts/Auth.js";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Link } from "next/link";
import { useForm } from "react-hook-form";
// import AuthContext from "../../src/context/AuthContext";
// Components
import Logotic from "public/shared/Logo";
import AuthInput from "public/shared/AuthInput";
import TickBox from "public/shared/TickBox";
import BgBlueButton from "public/shared/BgBlueButton";
import BgWhiteButton from "public/shared/BgWhiteButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
import { useMemo } from "react/cjs/react.development";
import Spin from "public/shared/Spin";
import RewardList from "public/shared/RewardList";
import CurrentEventDetail from "public/shared/CurrentEventDetail";
import ConfirmButton from "public/shared/ConfirmButton";
import CloseButton from "public/shared/CloseButton";

export default function OverlayBlock({closeButton = true, clickOutClose = true, childDiv, id, manual = false, background = true}) {
    const blockID = id?id:"overlayBlock";
    
    const clickOutCloseOverlay = (e) => {
        if (clickOutClose) document.getElementById(blockID).classList.add("hidden");
    }
    
    const overlayblock = (
        <div className="absolute h-screen top-0 left-0 w-full flex justify-center items-center z-50 hidden" id={blockID} onClick={clickOutCloseOverlay}
            style={{backgroundColor: background?"#00000080":""}}>
            {manual?
                <div className="w-0 h-0" onClick={clickOutCloseOverlay}>
                    {childDiv?childDiv:<div className="h-80 w-80"></div>}
                </div>:
                <div className="relative h-fit w-3/4 px-5 pt-8 pb-5 max-w-md bg-white shadow-xl shadow-slate-500 rounded-3xl flex flex-col align-middle justify-between"
                    onClick={(e) => {e.stopPropagation();}}>
                    {childDiv?childDiv:<div className="h-80 w-80"></div>}
                    {closeButton?<CloseButton parentDivID={blockID} />:<></>}
                </div>
            }
        </div>
    )

    useEffect(() => {
        const fsOverlay = document.createElement('div');
        fsOverlay.id=blockID+"wrapper";
        // fsOverlay.classList = "absolute h-screen top-0 left-0 w-screen";
        document.getElementsByTagName('section')[0].appendChild(fsOverlay);
        render(overlayblock, document.getElementById(blockID+"wrapper"));

        return () => {
            fsOverlay.remove();
        }
    }, [])
    
    return (
        <></>
    )
}