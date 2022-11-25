/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useCallback, useState } from "react";
import PopUp from "public/shared/PopUp";
import Logotic from "public/shared/Logotic";
import TextNoLabel from "public/shared/TextNoLabel";
import BgBlueButton from "public/shared/BgBlueButton";
import BigText from "public/shared/BigText";
import { hidden, show, successIcon, failIcon } from "public/util/popup";

const BG_COLOR = "bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";
export default function Info() {
  const [name, setName] = useState("");
  const [textState, setTextState] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHidden, setHidden] = useState(hidden);

  const onJoinClick = () => {alert("click")};
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
        <input type="file" accept="image/*;capture=camera" />
        <TextNoLabel
          type="text"
          id="idRoom"
          placeholder="Tên hiển thị"
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
