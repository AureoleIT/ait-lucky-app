/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useCallback, useState } from "react";
import PopUp from "public/shared/PopUp";
import Logotic from "public/shared/Logotic";
import TextNoLabel from "public/shared/TextNoLabel";
import BgBlueButton from "public/shared/BgBlueButton";
import BigText from "public/shared/BigText";
import { db } from "./../../src/firebase";
import { hidden, show, successIcon, failIcon } from "public/util/popup";
import { hasWhiteSpaceAndValidLength, isEmpty } from "public/util/functions";
import { messagesError, messagesSuccess } from "public/util/messages";
import { onValue, ref, set } from "firebase/database";
import { event } from "../index.js";
import router from "next/router";
const uuid = require("uuid");
const BG_COLOR = "bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";
export default function Info() {
  const [name, setName] = useState("");
  const [textState, setTextState] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHidden, setHidden] = useState(hidden);

  const onJoinClick = () => {
    if (isEmpty(name) || name.replaceAll(" ", "") === "") {
      setTextState(messagesError.E0004);
      setIsSuccess(false);
      setHidden(show);
      return;
    }
    var id = uuid.v4();
    setName(name.trim());
    var newParticipant = {
      participantId: id,
      createAt: new Date().getTime(),
      status: 2,
      idReward: "",
      eventId: event.id,
    };
    set(ref(db, `event_participants/${id}/`), newParticipant)
      .then(() => {
        setTextState(messagesSuccess.I0009);
        setIsSuccess(true);
        setHidden(show);
        setTimeout(() => {
          router.push("/event/countdown-checkin");
        }, 2000);
      })
      .catch((e) => {
        setTextState(messagesError.E4444);
        setIsSuccess(false);
        setHidden(show);
      });
  };
  const setNameData = useCallback(
    (e) => {
      setName(e?.target?.value);
    },
    [setName]
  );
  const closePopup = (e) => {
    setHidden(hidden);
  };
  return (
    <section
      className={`h-screen mx-auto flex justify-center items-center ${BG_COLOR}`}
    >
      <div
        className={`flex flex-col justify-center items-center max-w-xl w-4/5 h-full `}
      >
        <Logotic
          title="AIT LUCKY GIFTS"
          src="https://cdn.123job.vn/123job/uploads/2019/09/18/2019_09_18______f334ace51b475d2c562648c2ee9058d3.png"
        />
        <BigText font=" text-2xl" text="Thông tin người chơi" />
        <TextNoLabel
          type="text"
          id="idRoom"
          placeholder="Vui lòng nhập tên hiển thị"
          onChange={setNameData}
        />
        <div className="w-full mb-4">
          <BgBlueButton content="Tham gia" onClick={onJoinClick} />
        </div>
      </div>
      <div className={isHidden}>
        <PopUp
          text={textState}
          icon={isSuccess ? successIcon : failIcon}
          close={closePopup}
          isWarning={!isSuccess}
        />
      </div>
    </section>
  );
}
