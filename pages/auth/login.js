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
import Header from "public/shared/Header";

export default function Login() {
  const { register, handleSubmit } = useForm()
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  // const { logIn, signInWithGoogle } = AuthContext()

  return (
    <div className="w-full">
      <section className="h-screen mx-auto flex flex-col justify-center items-center">
        <Header />
        <div className="max-w-[380px] flex flex-col justify-center items-center w-full h-full">
          <Title title="ĐĂNG NHẬP" fontSize="56px" />
          <div className="flex flex-col gap-y-[20px] w-full mt-[30px] mb-[70px]">
            <div className="flex flex-col gap-y-[32px] w-full">
              <AuthInput content={"Tên đăng nhập/Email"} type={"email"} />
              <AuthInput content={"Mật khẩu"} type={"password"} />
            </div>
            <div className="flex items-center justify-between px-4 w-full">
              <TickBox content="Ghi nhớ đăng nhập" htmlFor="remberLogin" />
              <TickBox content="Admin" htmlFor="isAdmin" />
            </div>
            <BgBlueButton content="ĐĂNG NHẬP" onClick={""} />
            <GradientLine color1="#003B93" color2="#00F0FF" content="hoặc" />
            <BgWhiteButton content="ĐĂNG NHẬP BẰNG" onClick={""} />
          </div>
          <GradientLine color1="#003B93" color2="#00F0FF" content="" />
        </div>
      </section>
      <AuthFooter normalContent="Chưa có tài khoản?" boldContent="Đăng kí ngay!!!" href="#" />
    </div>
  );
}

Login.layout = Auth;
