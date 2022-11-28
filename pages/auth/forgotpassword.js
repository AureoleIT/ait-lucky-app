import Auth from "layouts/Auth.js";
import React, { useState, useEffect } from "react";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
import { getDatabase, ref, child, get } from "firebase/database";
import Link from "next/link";
export default function ForgotPassword() {
  const [name, setName] = useState("");
  const db = getDatabase();

  const handleForgot = (event) => {
    event.preventDefault();

    const dbRef = ref(db);

    get(child(dbRef, "users/")).then((snapshot) => {
      const record = snapshot.val() ?? [];
      const values = Object.values(record);

      console.log(values);
    });
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="relative mb-5">
            <Title title="QUÊN MẬT KHẨU" />
          </div>
          <div className="w-3/4 max-w-md mx-0">
            <AuthInput
              content={"Tên đăng nhập/Email"}
              type={"email"}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-3/4 max-w-md">
            <BgBlueButton
              content="GỬI"
              onClick={() => {
                handleForgot();
              }}
            />
            <Link href={"/auth/login"} className="my-0">
              <button className="w-full ">
                <div className="font-[600] text-[16px] text-[#004599]">
                  {"Trở lại Đăng nhập"}
                </div>
              </button>
            </Link>
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

ForgotPassword.layout = Auth;
