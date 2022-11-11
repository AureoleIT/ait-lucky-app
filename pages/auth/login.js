// layout for page
import Auth from "layouts/Auth.js";
import React, { useState } from "react";
import { Link } from "next/link";
import { useForm } from "react-hook-form";
// import AuthContext from "../../src/context/AuthContext";
// Components
import Logotic from "public/shared/Logotic";
import AuthInput from "public/shared/AuthInput";
import TickBox from "public/shared/TickBox";
import BgBlueButton from "public/shared/BgBlueButton";
import BgWhiteButton from "public/shared/BgWhiteButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  // const { logIn, signInWithGoogle } = AuthContext()

  return (
    <>
      <section className="h-screen px-5 py-5 mx-auto flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Title title="ĐĂNG NHẬP" />
          <div className="w-1/2 max-w-sm">
            <AuthInput content={"Tên đăng nhập/Email"} type={"email"} />
            <AuthInput content={"Mật khẩu"} type={"password"} />
          </div>
          <div className="flex items-center justify-between w-1/2 max-w-sm">
            <TickBox content="Ghi nhớ đăng nhập" htmlFor="remberLogin" />
            <TickBox content="Admin" htmlFor="isAdmin" />
          </div>
          <div className="w-1/2 max-w-sm">
            <BgBlueButton content="ĐĂNG NHẬP" onClick={""} />
            <GradientLine color1="#003B93" color2="#00F0FF" content="hoặc" />
            <BgWhiteButton content="ĐĂNG NHẬP BẰNG" onClick={""} />
            <GradientLine color1="#003B93" color2="#00F0FF" content="" />
          </div>
        </div>
      </section>
      <AuthFooter
        normalContent="Chưa có tài khoản?"
        boldContent="Đăng kí ngay!!!"
        href="/auth/register"
      />
    </>
  );
}

Login.layout = Auth;
