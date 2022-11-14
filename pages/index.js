/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useState } from "react";
import ConfirmButton from "public/shared/ConfirmButton";
import WayLog from "public/shared/WayLog";
import Logotic from "public/shared/Logotic";
import { BG, LEFT_GRADIENT, RIGHT_GRADIENT, TEXT } from "public/colors";
import TextNoLabel from "public/shared/TextNoLabel";
import QrButton from "public/shared/QrButton";
import BgBlueButton from "public/shared/BgBlueButton";
import BigText from "public/shared/BigText";
import LineWithText from "public/shared/LineWithText";
export default function Index() {
  const [pin, setPin] = useState("");
  // Got pin input
  const BG_COLOR = "bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";
  return (
    <section className="h-screen px-5 py-5 ">
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
          onChange={(e) => {
            setPin(e.target.value);
          }}
        />
        <div className="w-1/2 max-w-sm mb-4">
          <BgBlueButton
            content="Tham gia"
            onClick={() => alert("check valid pin")}
          />
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
            title="để tạo tài khoản chứ chi"
            path="/auth/register"
          />
        </div>
      </div>
    </section>
  );
}
