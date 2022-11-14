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
import ButtonWithIcon from "public/shared/ButtonWithIcon";
import Title from "public/shared/Title";
import AuthInput from "public/shared/AuthInput";
import GradientLine from "public/shared/GradientLine";
import AuthFooter from "public/shared/AuthFooter";
import BgWhiteButton from "public/shared/BgWhiteButton";

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
          <div className="w-3/4 max-w-md">
            <AuthInput
              content={"Tên đăng nhập"}
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            />
            <AuthInput
              content={"Email"}
              type={"email"}
              onChange={(e) => setMail(e.target.value)}
            />
            <AuthInput
              content={"Mật khẩu"}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Privacy />
          <ConfirmButton text="Đăng ký" />
          <div className="w-3/4 max-w-md">
            <GradientLine color1="#003B93" color2="#00F0FF" content="hoặc" />
            <BgWhiteButton content="ĐĂNG KÝ VỚI" onClick={""} />
            <GradientLine color1="#003B93" color2="#00F0FF" />
          </div>
        </div>
      </section>
      <AuthFooter
        normalContent="Đã có tài khoản?"
        boldContent="Đăng nhập luôn!"
        href="/auth/login"
      />
    </>
  );
}

Register.layout = Auth;
