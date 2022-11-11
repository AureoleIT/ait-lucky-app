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
import Navbar from "components/Navbars/AdminNavbar";
import AuthNavbar from "components/Navbars/AuthNavbar";
import IndexNavbar from "components/Navbars/IndexNavbar";

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
          <BigText text="Đăng ký" font="text-4xl" />
          <div className="relative w-1/2 max-w-sm h-auto">
            <span className="ml-3 bg-white px-2 absolute -bottom-3 font-semibold text-sm">
              Tên đăng nhập
            </span>
            <input className="transition duration-500 border-2 h-14 rounded-lg w-full text-lg px-4 mb-4" />
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
