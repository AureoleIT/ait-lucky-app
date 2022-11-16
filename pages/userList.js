import Auth from "layouts/Auth.js";
import React, { useState } from "react";
import { Link } from "next/link";
import { useForm } from "react-hook-form";

import Logotic from "public/shared/Logotic";
import AuthInput from "public/shared/AuthInput";
import TickBox from "public/shared/TickBox";
import BgBlueButton from "public/shared/BgBlueButton";
import BgWhiteButton from "public/shared/BgWhiteButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
export default function userList() {
  return (
    /*<section className="h-screen max-w-[360px] px-5 py-5 mx-auto flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Title title="DANH SÁCH NGƯỜI CHƠI"></Title>
      </div>
    </section>
    */
    <section className="h-screen max-w-[360px] px-5 py-5 mx-auto flex flex-col justify-center ">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-[#004599] font-black text-xl">
          DANH SÁCH NGƯỜI CHƠI
        </h1>
        <GradientLine
          color1="#003B93"
          color2="#00F0FF"
          content=""
        ></GradientLine>
      </div>
      <div className="mt-[17px]">
        <p className="text-[#004599] font-extrabold">Trực tuyến</p>
      </div>
    </section>
  );
}
userList.layout = Auth;
