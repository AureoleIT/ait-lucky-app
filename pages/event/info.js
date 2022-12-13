/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useCallback, useState, useEffect, useMemo } from "react";
import PopUp from "public/shared/PopUp";
import Logo from "public/shared/Logo";
import TextNoLabel from "public/shared/TextNoLabel";
import BgBlueButton from "public/shared/BgBlueButton";
import BigText from "public/shared/BigText";
import { db } from "./../../src/firebase";
import { ShowMethod } from "public/util/popup";
import { isEmpty } from "public/util/functions";
import { messagesError, messagesSuccess } from "public/util/messages";
import { ref, set } from "firebase/database";
import router from "next/router";
import { useDispatch } from "react-redux";
import { incognitoParticipant } from "public/redux/actions";
import { usePlayerEventHook } from "public/redux/hooks";
import { usePopUpMessageHook, usePopUpStatusHook, usePopUpVisibleHook } from "public/redux/hooks";

const uuid = require("uuid");
const BG_COLOR = "bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";

export default function Info() {
  const [name, setName] = useState("");

  const message = usePopUpMessageHook();
  const status = usePopUpStatusHook()
  const visible = usePopUpVisibleHook();

  // Call dispatch from redux
  const dispatch = useDispatch();
  var [player, setPlayer] = useState({});

  // Get current event from previous state get in
  const currEvent = usePlayerEventHook();

  const onJoinClick = useCallback(() => {
    if (isEmpty(name) || name.replaceAll(" ", "") === "") {
      ShowMethod(dispatch, messagesError.E0004, false)
      return;
    }
    var id = uuid.v4();
    setName(name.trim());
    var newParticipant = {
      participantId: id,
      createAt: new Date().getTime(),
      status: 2,
      idReward: "",
      eventId: currEvent.eventId,
    };
    set(ref(db, `event_participants/${id}/`), newParticipant)
      .then(() => {
        ShowMethod(dispatch, messagesSuccess.I0009, true)
        setPlayer(newParticipant)
        setTimeout(() => {
          router.push("/event/countdown-checkin");
        }, 2000);
      })
      .catch((e) => {
        ShowMethod(dispatch, messagesError.E4444, false)
      });
  }, [currEvent.eventId, dispatch, name]);

  // Set and save new player object to redux
  useEffect(() => dispatch(incognitoParticipant(player)), [dispatch, player])

  /*localStorage is here to track what has been saved*/
  useEffect(() => {
    window.localStorage.setItem('PARTICIPANT_STATE', JSON.stringify(player));
  }, [player]);

  const setNameData = useCallback(
    (e) => {
      setName(e?.target?.value);
    },
    [setName]
  );

  const renderLogo = useMemo(() => {
    return (
      <Logo />)
  }, [])

  const renderTitle = useMemo(() => {
    return (
      <BigText font=" text-2xl" text="Thông tin người chơi" />
    )
  }, [])

  const renderInput = useMemo(() => {
    return (
      <TextNoLabel
        type="text"
        id="idRoom"
        placeholder="Vui lòng nhập tên hiển thị"
        onChange={setNameData}
      />
    )
  }, [setNameData])

  const renderButton = useMemo(() => {
    return (
      <div className="w-full mb-4">
        <BgBlueButton content="Tham gia" onClick={onJoinClick} />
      </div>
    )
  }, [onJoinClick])

  const renderPopUp = useMemo(() => {
    return (
      <div className={visible}>
        <PopUp
          text={message}
          status={status}
          isWarning={!status}
        />
      </div>
    )
  }, [visible, status, message])

  return (
    <section
      className={`h-screen mx-auto flex justify-center items-center ${BG_COLOR}`}
    >
      <div
        className={`flex flex-col justify-center items-center max-w-xl w-4/5 h-full `}
      >
        {renderLogo}
        {renderTitle}
        {renderInput}
        {renderButton}
      </div>
      {renderPopUp}
    </section>
  );
}
