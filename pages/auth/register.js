import { React, useState } from "react";
import Auth from "layouts/Auth.js";
import ConfirmButton from "public/shared/ConfirmButton";
import {
  BG_WHITE,
  TEXT,
  LEFT_GRADIENT,
  RIGHT_GRADIENT,
  BUTTON_GRADIENT,
} from "public/colors";
import BigText from "public/shared/BigText";
import LineWithText from "public/shared/LineWithText";
import WayLog from "public/shared/WayLog";
import Privacy from "public/shared/Privacy";
import LineGradient from "public/shared/LineGradient";
import ButtonWithIcon from "public/shared/ButtonWithIcon";
import Title from "public/shared/Title";
import AuthInput from "public/shared/AuthInput";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  return (
    <>
      <section className="h-screen">
        <div
          className={`flex flex-col justify-center items-center w-full h-full ${BG_WHITE}`}
        >
          <Title title="ĐĂNG KÝ" />
          <div className="w-1/2 max-w-sm">
            <AuthInput content={"Tên đăng nhập/Email"} type={"email"} />
          </div>
          <Privacy />
          <ConfirmButton text="Đăng ký" />
          <LineWithText
            leftColor={LEFT_GRADIENT}
            rightColor={RIGHT_GRADIENT}
            text="hoặc"
          />
          <ButtonWithIcon src="/img/Google.svg" text="đăng ký với" />
          <LineGradient color={BUTTON_GRADIENT} />
          <WayLog
            action="Đăng nhập"
            title="nếu bạn có tài khoản."
            path="/auth/login"
          />
        </div>
      </section>
    </>
  );
}

Register.layout = Auth;
