import Auth from "layouts/Auth.js";
import React, { useState, useEffect } from "react";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
import Link from "next/link";
import { LEFT_COLOR, RIGHT_COLOR } from "public/util/colors";
import { useAuth } from "src/context/AuthContext";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  update,
  onValue,
  DataSnapshot
} from "firebase/database";
import { hasWhiteSpaceAndValidLength, isEmpty, isEmail } from "public/util/functions";
import { messagesError, messagesSuccess } from "public/util/messages";
export default function ForgotPassword() {
  const authContext = useAuth();
  const db = getDatabase();
  const [email, setEmail] = useState("");


  const handleForgot = (email) => {
    // validation
    if (isEmpty(email)) {
      console.log(messagesError.E0001("Email"));
    }

    if (isEmail(email)) {
      console.log(messagesError.E0003("Email"));
    }

    if (hasWhiteSpaceAndValidLength(email)) {
      console.log(messagesError.E0005("Email"));
    }

    try {
      const que = query(ref(db, "users"), orderByChild("email"), equalTo(authContext.currentUser.eamil));
      onValue(que, (snapshot) => {
        const record = snapshot.val() ?? [];
        const values = Object.values(record);

        if (values.length == 0) {
          console.log(messagesError.E0009);
        } else {
          console.log(messagesSuccess.I0003);
          authContext.resetPassword(email);
        }
      })
    } catch (error) {
      console.log(messagesError.E1002);
    }
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
              content={"Email"}
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
              leftColor={LEFT_COLOR}
              rightColor={RIGHT_COLOR}
            />
          </div>
          <div className="w-3/4 max-w-md">
            <BgBlueButton
              content="GỬI"
              onClick={() => {
                handleForgot(email);
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
