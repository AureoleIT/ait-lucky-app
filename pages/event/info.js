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
import { hidden, show, successIcon, failIcon } from "public/util/popup";
import { isEmpty, logo } from "public/util/functions";
import { messagesError, messagesSuccess } from "public/util/messages";
import { ref, set } from "firebase/database";
import router from "next/router";
import { useDispatch } from "react-redux";
import { incognitoParticipant } from "public/redux/actions";
import { usePlayerEventHook } from "public/redux/hooks";

const uuid = require("uuid");
const BG_COLOR = "bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";

export default function Info() {
  const [name, setName] = useState("");

  const [textState, setTextState] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHidden, setHidden] = useState(hidden);

  var [player, setPlayer] = useState({});

  // Get current event from previous state get in
  const currEvent = usePlayerEventHook();

  const showMethod = useCallback((message, isTrue) => {
    setTextState(message);
    setIsSuccess(isTrue);
    setHidden(show);
  }, [])

  const onJoinClick = useCallback(() => {
    if (isEmpty(name) || name.replaceAll(" ", "") === "") {
      showMethod(messagesError.E0004, false);
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
        showMethod(messagesSuccess.I0009, true)
        setPlayer(newParticipant)
        setTimeout(() => {
          router.push("/event/countdown-checkin");
        }, 2000);
      })
      .catch((e) => {
        showMethod(messagesError.E4444, false)
      });
  }, [currEvent.eventId, name, showMethod]);

  // Call dispatch from redux
  const dispatch = useDispatch();

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

  const closePopup = useCallback(
    () => {
      setHidden(hidden);
    }, []
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
      <div className={isHidden}>
        <PopUp
          text={textState}
          icon={isSuccess ? successIcon : failIcon}
          close={closePopup}
          isWarning={!isSuccess}
        />
      </div>
    )
  }, [closePopup, isHidden, isSuccess, textState])

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
