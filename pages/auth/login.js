/* eslint-disable no-unused-vars */
// layout for page
import Auth from "layouts/Auth.js";
import React, { useCallback, useState } from "react";
// Components
import AuthInput from "public/shared/AuthInput";
import TickBox from "public/shared/TickBox";
import BgBlueButton from "public/shared/BgBlueButton";
import BgWhiteButton from "public/shared/BgWhiteButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
import router from "next/router";
import { auth, db } from "../../src/firebase";
import { hasWhiteSpace } from "public/util/functions";
import { getDatabase, ref, set, child, get } from "firebase/database";
import PopUp from "public/shared/PopUp";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const successIcon = require("../../public/img/successIcon.png");
const failIcon = require("../../public/img/failIcon.png");

export default function Login() {
  const hidden = "h-screen hidden w-full fixed justify-center items-center";
  const show =
    "h-screen flex w-full fixed justify-center items-center bg-slate-600 bg-opacity-50";

  const [textState, setTextState] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHidden, setHidden] = useState(hidden);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [check, setCheck] = useState(false);
  const dbRef = ref(db);

  function loginSubmit(name, pass) {
    if (name === "" || pass === "") {
      setTextState("Please fill all the cells below");
      setHidden(show);
      setIsSuccess(false);
      return;
    }
    if (hasWhiteSpace(name)) {
      setTextState("Your username contain space, please refill");
      setHidden(show);
      setIsSuccess(false);
      return;
    }
    get(child(dbRef, "users/")).then((snapshot) => {
      const record = snapshot.val() ?? [];
      const values = Object.values(record);
      const isUserExisting = values.some(
        (item) =>
          (item.email === name || item.name === name) && item.password === pass
      );
      if (!isUserExisting) {
        setTextState("User not found");
        setHidden(show);
        setIsSuccess(false);
        return;
      }
      setTextState("Login successfully <3\nYou're welcome!");
      setHidden(show);
      setIsSuccess(true);
      //Go to admin dashboard
      router.push("/admin/dashboard");
    });
  }

  function loginAuth() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const currEmail = result._tokenResponse.email;
        console.log(currEmail);
        get(child(ref(db), "users/")).then((snapshot) => {
          const record = snapshot.val() ?? [];
          const values = Object.values(record);
          const isUserExisting = values.some(
            (item) => item.email === currEmail
          );
          if (!isUserExisting) {
            setTextState(
              "You did not have an account with this email! \nPlease try another account or register to join with us."
            );
            setHidden(show);
            setIsSuccess(false);
            return;
          }
          setTextState(
            "Login with google successfully ~\nYou will be moved to dashboard"
          );
          setHidden(show);
          setIsSuccess(true);
          // push to path like /admin/dashboard/{nameOfUser} props check from db
          setTimeout(() => {
            router.push("/admin/dashboard");
          }, 4000);
        });
      })
      .catch((error) => {
        console.log(error.message);
        setTextState("Some thing went wrong");
        setHidden(show);
        setIsSuccess(false);
      });
  }
  const closePopup = (e) => {
    setHidden(hidden);
  };

  const nameData = useCallback(
    (e) => {
      setName(e?.target?.value);
    },
    [setName]
  );
  const passData = useCallback(
    (e) => {
      setPass(e?.target?.value);
    },
    [setPass]
  );
  const onCheckData = (e) => {
    setCheck(!check);
  };
  return (
    <>
      <section className="h-screen px-5 py-5 mx-auto flex justify-center items-center">
        <div className="flex flex-col justify-center max-w-md w-full h-full">
          <Title title="ĐĂNG NHẬP" />
          <div className="">
            <AuthInput
              content={"Tên đăng nhập/Email"}
              type={"email"}
              onChange={(e) => setName(e.target.value)}
            />
            <AuthInput
              content={"Mật khẩu"}
              type={"password"}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="flex flex-row">
            <TickBox
              content="Ghi nhớ đăng nhập"
              htmlFor="remberLogin"
              onChange={() => setCheck(!check)}
            />
          </div>
          <div className="">
            <BgBlueButton
              content="ĐĂNG NHẬP"
              onClick={() => {
                loginSubmit(name, pass);
              }}
            />
            <GradientLine color1="#003B93" color2="#00F0FF" content="hoặc" />
            <BgWhiteButton
              content="ĐĂNG NHẬP BẰNG"
              onClick={() => loginAuth(name, pass)}
            />
            <GradientLine color1="#003B93" color2="#00F0FF" content="" />
          </div>
          <AuthFooter
            normalContent="Chưa có tài khoản?"
            boldContent="Đăng kí ngay!!!"
            href="/auth/register"
          />
        </div>
        <div className={isHidden}>
          <PopUp
            text={textState}
            icon={isSuccess ? successIcon : failIcon}
            close={closePopup}
          />
        </div>
      </section>
    </>
  );
}

Login.layout = Auth;
