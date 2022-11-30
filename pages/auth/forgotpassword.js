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

    if (!isEmail(email)) {
      setTextState(messagesError.E0003("Email"));
      setIsSuccess(false);
      setIsHidden(false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(email)) {
      setTextState(messagesError.E0005("Email"));
      setIsSuccess(false);
      setIsHidden(false);
      return;
    }

    try {
      const que = query(ref(db, "users"), orderByChild("email"), equalTo(email));
      onValue(que, (snapshot) => {
        const record = snapshot.val() ?? [];
        const values = Object.values(record);

        if (values.length == 0) {
          setTextState(messagesError.E0009);
          setIsSuccess(false);
          setIsHidden(false);
          return;
        } else {
          setTextState(messagesSuccess.I0003);
          setIsSuccess(false);
          setIsHidden(true);
          authContext.resetPassword(email);
          return;
        }
      })
    } catch (error) {
      console.log(messagesError.E1002);
      setTextState(messagesError.E1002);
      setIsSuccess(false);
      setIsHidden(false);
      return;
    }
  };

  // show popup
  useEffect(() => {
    console.log(isHidden)
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
