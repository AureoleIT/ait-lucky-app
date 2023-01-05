/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useMemo } from "react";

import Line from "./Line";
import Title from "./Title";
import RewardList from "./RewardList";
import CloseButton from "./CloseButton";
import ParticipantAvt from "./ParticipantAvatar";
import Button from "./Button";
import OverlayBlock from "./OverlayBlock";
import { db } from "src/firebase";
import { ref, update, get, query, orderByChild, equalTo, onValue } from "firebase/database";
import Trans from "public/trans/hooks/Trans";

export default function PlayerDetail({player, reward, isAdmin = false, playerID = ""}) {
    const [playerStatus, setPlayerStatus] = useState(0);
    const trans = Trans().playerDetail
    useEffect(() => {
        onValue(query(ref(db, "event_participants/" + playerID + "/status")), snapshot => {
            if (snapshot.exists()) {
                setPlayerStatus(snapshot.val());
            }
        });
    }, [playerID]);

    const renderCancelRewardNotification = useMemo(() => {
        return <OverlayBlock childDiv={reward !== undefined?
            <div className="flex flex-col items-center text-center text-[#004599]">
                <p className="font-semibold">{trans.cancelReward}</p>
                <p className="font-[900] text-lg">{reward[0]?reward[0].nameReward:""}</p>
                <p className="font-semibold">{trans.givenTo}</p>
                <p className="font-[900] text-lg">{player.nameDisplay}</p>
                <div className="my-2 relative w-full before:absolute before:left-0 before:border-b-transparent before:border-l-transparent before:border-r-transparent before:border-t-slate-300 before:border-2 before:w-full"></div>
                <p className="font-bold">{trans.confirmedCancel}</p>
                <div className="w-full flex gap-4 px-2">
                    <Button fontSize={"text-[20px]"} content={trans.yes} primaryColor={"#FF6262"} isSquare={true} margin={""} onClick={() => {
                        console.log("Kick player has ID:". playerID);
                        document.getElementById("cancelRewardedOverlay").classList.toggle('hidden');
                        if (playerID === "") return;
                        update(ref(db, 'event_participants/'+ playerID), { idReward: "" });
                        update(ref(db, 'event_rewards/'+ reward[0].idReward), { quantityRemain: (reward[0].quantityRemain + 1) });
                    }} />
                    <Button fontSize={"text-[20px]"} content={trans.no} primaryColor={"#3B88C3"} isSquare={true} margin={""} onClick={() => {
                        document.getElementById("cancelRewardedOverlay").classList.toggle('hidden');
                    }} />
                </div>
            </div>
        :<></>}  id={"cancelRewardedOverlay"}
            rerenderOnChange={[player, reward]}></OverlayBlock>
    }, [player, reward]);

    const renderKickPlayerNotification = useMemo(() => {
        return <OverlayBlock childDiv={reward !== undefined?
            <div className="flex flex-col items-center text-center text-[#004599]">
                <p className="font-semibold">{trans.inviteAttendees}</p>
                <p className="font-[900] text-lg">{player.nameDisplay}</p>
                <p className="font-semibold">{trans.leavingEvent}</p>
                <div className="my-2 relative w-full before:absolute before:left-0 before:border-b-transparent before:border-l-transparent before:border-r-transparent before:border-t-slate-300 before:border-2 before:w-full"></div>
                <p className="font-bold">{trans.confirm}</p>
                <div className="w-full flex gap-4 px-2">
                    <Button fontSize={"text-[20px]"} content={"CÓ"} primaryColor={"#FF6262"} isSquare={true} margin={""} onClick={() => {
                        document.getElementById("kickPlayerOverlay").classList.toggle('hidden');
                        document.getElementById("playerDetailOverlay").classList.toggle('hidden');
                        update(ref(db, 'event_participants/'+ playerID), { idReward: "", status: 0 });
                        if (reward[0] !== undefined) update(ref(db, 'event_rewards/'+ reward[0].idReward), { quantityRemain: (reward[0].quantityRemain + 1) });
                    }} />
                    <Button fontSize={"text-[20px]"} content={trans.no} primaryColor={"#3B88C3"} isSquare={true} margin={""} onClick={() => {document.getElementById("kickPlayerOverlay").classList.toggle('hidden')}} />
                </div>
            </div>
        :<></>}  id={"kickPlayerOverlay"}
            rerenderOnChange={[player, reward]}></OverlayBlock>
    }, [player, reward]);

    const renderCancelBanPlayerNotification = useMemo(() => {
        return <OverlayBlock childDiv={reward !== undefined?
            <div className="flex flex-col items-center text-center text-[#004599]">
                <p className="font-semibold">{trans.allowAttendees}</p>
                <p className="font-[900] text-lg">{player.nameDisplay}</p>
                <p className="font-semibold">{trans.returnEvent}</p>
                <div className="my-2 relative w-full before:absolute before:left-0 before:border-b-transparent before:border-l-transparent before:border-r-transparent before:border-t-slate-300 before:border-2 before:w-full"></div>
                <p className="font-bold">{trans.confirm}</p>
                <div className="w-full flex gap-4 px-2">
                    <Button fontSize={"text-[20px]"} content={trans.yes} primaryColor={"#3B88C3"} isSquare={true} margin={""} onClick={() => {
                        document.getElementById("CancelBanPlayerOverlay").classList.toggle('hidden');
                        document.getElementById("playerDetailOverlay").classList.toggle('hidden');
                        update(ref(db, 'event_participants/'+ playerID), { idReward: "", status: 2 });
                    }} />
                    <Button fontSize={"text-[20px]"} content={trans.no} primaryColor={"#FF6262"} isSquare={true} margin={""} onClick={() => {document.getElementById("CancelBanPlayerOverlay").classList.toggle('hidden')}} />
                </div>
            </div>
        :<></>}  id={"CancelBanPlayerOverlay"}
            rerenderOnChange={[player, reward]}></OverlayBlock>
    }, [player, reward]);

    const content = useMemo(() => {
        return (<div className="absolute bottom-0 left-0 h-[70%] w-full bg-white rounded-t-2xl p-4 z-30"
            onClick={(e) => e.stopPropagation()}>
            <div className="overflow-auto">
                {player?<div className="h-fit">
                    <div className="mx-auto mb-4 h-20 w-20 object-cover rounded-full" src={player.pic}>
                        <ParticipantAvt player={player} />
                    </div>
                    <Title title={player.nameDisplay} fontSize={"text-[20px]"} margin={"mb-2"} />
                    {isAdmin?
                        <div className="h-10 w-60 mx-auto">
                            {playerStatus !== 0?
                            <Button content={trans.banned} primaryColor={"#FF6262"} isSquare={false} margin={"my-2"} fontSize={"text-sm"} height={"h-10"}
                                onClick={() => document.getElementById("kickPlayerOverlay").classList.toggle('hidden')}/>
                            :
                            <Button content={trans.allowed} primaryColor={"#3B88C3"} isSquare={false} margin={"my-2"} fontSize={"text-sm"} height={"h-10"}
                                onClick={() => document.getElementById("CancelBanPlayerOverlay").classList.toggle('hidden')}/>
                            }
                        </div>:<></>}
                </div>:<></>}
                <Line content={trans.reward} margin="my-2" />
                {reward.length > 0 ? <>
                    <RewardList listReward={reward} showQuantity={false} />
                    {isAdmin?
                    <Button content={trans.cancelReward} primaryColor={"#FF6262"} isSquare={true} margin={"my-2"} fontSize={"text-lg"}
                        onClick={() => document.getElementById("cancelRewardedOverlay").classList.toggle('hidden')}/>:
                    <></>}
                </>:
                <div className="flex items-center justify-between h-8 rounded-full px-4 mb-2 bg-[#D9D9D9]">
                    <p className="w-full items-center text-center text-[#004599] text-[18px] font-extrabold uppercase">{trans.none}</p>
                </div>}
                <CloseButton parentDivID={"playerDetailOverlay"} />
                {reward[0] !== undefined && renderCancelRewardNotification}
                {renderKickPlayerNotification}
                {renderCancelBanPlayerNotification}
            </div>
        </div>)}, [player, reward, playerStatus])

    return (
        <>
            {content}
        </>
    )
}
