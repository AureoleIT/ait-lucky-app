/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

import Line from "./Line";
import Title from "./Title";
import RewardList from "./RewardList";
import CloseButton from "./CloseButton";
import ParticipantAvt from "./ParticipantAvatar";
import Button from "./Button";
import OverlayBlock from "./OverlayBlock";
import { useMemo } from "react";
import { db } from "src/firebase";
import { ref, update, get, query, orderByChild, equalTo } from "firebase/database";

export default function PlayerDetail({player, reward, isAdmin = false}) {

    const renderCancelRewardNotification = useMemo(() => {
        return <OverlayBlock childDiv={reward !== undefined?
            <div className="flex flex-col items-center text-center text-[#004599]">
                <p className="font-semibold">Xác nhận hủy giải</p>
                <p className="font-[900] text-lg">{reward[0]?reward[0].nameReward:""}</p>
                <p className="font-semibold">đã được trao cho</p>
                <p className="font-[900] text-lg">{player.nameDisplay}<span className="font-semibold text-base">?</span></p>
                <div className="mt-2 relative w-full before:absolute before:left-0 before:border-b-transparent before:border-l-transparent before:border-r-transparent before:border-t-slate-300 before:border-2 before:w-full"></div>
                <div className="mt-2 w-full flex gap-4 px-2">
                    <Button fontSize={"20px"} content={"CÓ"} primaryColor={"#FF6262"} isSquare={true} marginY={0} onClick={() => {
                        document.getElementById("cancelRewardedOverlay").classList.toggle('hidden');
                        get(query(ref(db, "event_participants"), orderByChild("participantId"), equalTo(player.participantId))).then((snapshot) => {
                            if (snapshot.exists()) {
                                update(ref(db, 'event_participants/'+ Object.keys(snapshot.val())[0]), { idReward: "" });
                            } else {
                                update(ref(db, 'event_participants/'+ player.participantId), { idReward: "" });
                            }})
                    }} />
                    <Button fontSize={"20px"} content={"KHÔNG"} primaryColor={"#3B88C3"} isSquare={true} marginY={0} onClick={() => {document.getElementById("cancelRewardedOverlay").classList.toggle('hidden')}} />
                </div>
            </div>
        :<></>}  id={"cancelRewardedOverlay"}
            rerenderOnChange={[player, reward]}></OverlayBlock>
    }, [player, reward]);

    const content = (
        <div className="absolute bottom-0 left-0 h-[70%] w-full bg-white rounded-t-2xl p-4 z-30"
            onClick={(e) => e.stopPropagation()}>
            {player?<div>
                <div className="mx-auto mb-4 h-20 w-20 object-cover rounded-full" src={player.pic}>
                    <ParticipantAvt player={player} />
                </div>
                <Title title={player.nameDisplay} fontSize={"text-[20px]"} />
                {isAdmin?
                    <div className="h-14 w-60 mx-auto">
                        <Button content={"ĐUỔI KHỎI SỰ KIỆN"} primaryColor={"#FF6262"} isSquare={false} margin={"my-2"} fontSize={"text-sm"} />
                    </div>:<></>}
            </div>:<></>}
            <Line content="Giải thưởng" margin="my-2" />
            {reward.length > 0 ? <>
                <RewardList listReward={reward} />
                {isAdmin?
                <Button content={"HỦY GIẢI THƯỞNG"} primaryColor={"#FF6262"} isSquare={true} margin={"my-2"} fontSize={"text-lg"}
                    onClick={() => document.getElementById("cancelRewardedOverlay").classList.toggle('hidden')}/>:
                <></>}
            </>:
            <div className="flex items-center justify-between h-8 rounded-full px-4 mb-2 bg-[#D9D9D9]">
                <p className="w-full items-center text-center text-[#004599] text-[18px] font-extrabold">KHÔNG CÓ</p>
            </div>}
            <CloseButton parentDivID={"playerDetailOverlay"} />
            {reward[0] !== undefined && renderCancelRewardNotification}
        </div>
    )

    return (
        <>
            {content}
        </>
    )
}
