/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useState } from "react";
import ConfirmButton from "public/shared/ConfirmButton";
import WayLog from "public/shared/WayLog";
import Logotic from "public/shared/Logotic";
import { BG, LEFT_GRADIENT, RIGHT_GRADIENT, TEXT } from "public/colors";
import TextNoLabel from "public/shared/TextNoLabel";
import LineWithText from "public/shared/LineWithText";
import QrButton from "public/shared/QrButton";
import BigText from "public/shared/BigText";
export default function Index() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  // Got ID vs password from text input to handle logic
  // ( check whether id exists in database ) -> ( check whether the password is true )
  return (
    <>
      <section className="h-screen px-5 py-5 ">
        <div
          className={`flex flex-col justify-center items-center w-full h-full ${BG}`}
        >
          <Logotic
            title="AIT LUCKY GIFTS"
            src="https://cdn.123job.vn/123job/uploads/2019/09/18/2019_09_18______f334ace51b475d2c562648c2ee9058d3.png"
          />
          <BigText text="Mã pin sự kiện" font="text-2xl"/>
          <TextNoLabel
            container="mb-6 w-1/2 max-w-sm"
            type="text"
            id="idRoom"
            fadeText="Mã pin"
          />
          <ConfirmButton text="Tham gia" />
          <LineWithText
            leftColor={LEFT_GRADIENT}
            rightColor={RIGHT_GRADIENT}
            text="hoặc"
          />
          <QrButton />
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
      </section>
    </>
  );
}
