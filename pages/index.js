/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useCallback, useState } from "react";
import PopUp from "public/shared/PopUp";
import WayLog from "public/shared/WayLog";
import Logotic from "public/shared/Logotic";
import { BG, LEFT_GRADIENT, RIGHT_GRADIENT, TEXT } from "public/util/colors";
import TextNoLabel from "public/shared/TextNoLabel";
import QrButton from "public/shared/QrButton";
import BgBlueButton from "public/shared/BgBlueButton";
import BigText from "public/shared/BigText";
import router from "next/router";
import LineWithText from "public/shared/LineWithText";
import { auth, db } from "src/firebase";
import { ref, set, child, get } from "firebase/database";
import { isEmpty } from "public/util/functions";
import { hidden, show, successIcon, failIcon } from "public/util/popup";

export default function Index() {
  const BG_COLOR =
    "bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";

  const [pin, setPin] = useState("");
  const [textState, setTextState] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHidden, setHidden] = useState(hidden);

  const onJoinClick = () => {
    if (isEmpty(pin)) {
      setTextState("PIN Code is empty!!!");
      setIsSuccess(false);
      setHidden(show);
      return;
    }
    get(child(ref(db), "events/")).then((snapshot) => {
      const record = snapshot.val() ?? [];
      const values = Object.values(record);
      const isUserExisting = values.filter((item) => item.pinCode === pin);
      var currEvent = isUserExisting[0];
      if (isUserExisting.length === 0) {
        setTextState("Event doesn't exist!");
        setIsSuccess(false);
        setHidden(show);
        return;
      }
      setTextState("Welcome to " + currEvent.title);
      setIsSuccess(true);
      setHidden(show);
      setTimeout(() => {
        router.push("/event/countdowncheckin");
      }, 3000);
    });
  };
  const pinData = useCallback(
    (e) => {
      setPin(e.target.value);
    },
    [setPin]
  );
  const closePopup = () => {
    setHidden(hidden);
  };
  return (
    <section className="h-screen mx-auto flex justify-center items-center">
      <div
        className={`flex flex-col justify-center items-center w-full h-full ${BG_COLOR}`}
      >
        <Logotic
          title="AIT LUCKY GIFTS"
          src="https://cdn.123job.vn/123job/uploads/2019/09/18/2019_09_18______f334ace51b475d2c562648c2ee9058d3.png"
        />
        <BigText font=" text-2xl" text="Mã pin sự kiện" />
        <TextNoLabel
          type="text"
          id="idRoom"
          placeholder="Mã pin"
          onChange={pinData}
        />
        <div className="w-3/4 max-w-md mb-4">
          <BgBlueButton content="Tham gia" onClick={onJoinClick} />
        </div>
        <LineWithText
          text="hoặc"
          leftColor={LEFT_GRADIENT}
          rightColor={RIGHT_GRADIENT}
        />
        <QrButton onClick={() => alert("direct to device's camera")} />
        {/* Handle logic todo: go direct to open device's camera */}
        <div className="mt-10">
          <WayLog
            action="Đăng nhập"
            title="để quản lý sự kiện?"
            path="/auth/login"
          />
          <WayLog
            action="Đăng ký"
            title="để tạo tài khoản."
            path="/auth/register"
          />
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
