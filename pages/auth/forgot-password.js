import Auth from "layouts/Auth.js";
import React, { useState, useEffect, useMemo } from "react";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
import Link from "next/link";
import { useAuth } from "src/context/AuthContext";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  update,
  onValue,
} from "firebase/database";
import { LEFT_COLOR, RIGHT_COLOR, FAIL_RIGHT_COLOR } from "public/util/colors";
import { successIcon, failIcon } from "public/util/popup";
import OverlayBlock from "public/shared/OverlayBlock";
import { isEmpty, hasWhiteSpaceAndValidLength, isEmail } from "public/util/functions";
import { messagesError, messagesSuccess } from "public/util/messages";
import { db } from "src/firebase";
export default function ForgotPassword() {
  const authContext = useAuth();
  const [email, setEmail] = useState("");

  //validation const
  const [textState, setTextState] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const showMethod = useMemo(() => (message, isSuccess, isHidden) => {
    setTextState(message);
    setIsSuccess(isSuccess);
    setIsHidden(isHidden);
  }, [])

  const handleForgot = (email) => {
    // validation
    if (isEmpty(email)) {
      showMethod(messagesError.E0001("Email"), false, false);
      return;
    }

    if (!isEmail(email)) {
      showMethod(messagesError.E0003("Email"), false, false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(email)) {
      showMethod(messagesError.E0005("Email"), false, false);
      return;
    }

    try {
      const que = query(ref(db, "users"), orderByChild("email"), equalTo(email));
      onValue(que, (snapshot) => {
        const record = snapshot.val() ?? [];
        const values = Object.values(record);

        if (values.length == 0) {
          showMethod(messagesError.E0009, false, false);
          return;
        } else {
          showMethod(messagesSuccess.I0003, true, false)
          //authContext.resetPassword(email);
          return;
        }
      })
    } catch (error) {
      showMethod(messagesError.E1002, false, false);
      return;
    }
  };

  // show popup
  useEffect(() => {
    if (isHidden == false) {
      isSuccess ? document.getElementById("imgPopup").src = successIcon : document.getElementById("imgPopup").src = failIcon;
      document.getElementById("textState").innerHTML = textState;
      document.getElementById("forgotOverlay").classList.toggle('hidden');
      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 1)
      return () => { clearTimeout(timer) }
    }
  }, [isHidden])


  const popupNoti = () => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-center text-[#004599]">
          <p className="font-[900] text-lg" id="textState"></p>
        </div>
        <img
          id="imgPopup"
          alt="success"
          src={failIcon}
          className="self-center w-12"
        ></img>
      </div>
    )
  }

  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="f-full flex flex-col justify-center items-center w-full h-full">
          <div className="relative mb-5">
            <Title title="QUÊN MẬT KHẨU" />
          </div>
          <div className="w-3/4 max-w-md mx-0">
            <AuthInput
              content={"Email"}
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
              leftColor={LEFT_COLOR}
              rightColor={isEmail(email) ? RIGHT_COLOR : FAIL_RIGHT_COLOR}
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
          <div className="absolute bottom-20">
            <AuthFooter
              normalContent="Chưa có tài khoản?"
              boldContent="Đăng kí ngay!!!"
              href="/auth/register"
            />
          </div>
          <OverlayBlock childDiv={popupNoti()} id={"forgotOverlay"} />
        </div>
      </section>
    </>
  );
}

ForgotPassword.layout = Auth;
