/* eslint-disable no-unused-vars */
// layout for page
import Auth from "layouts/Auth.js";
import React, { useState } from "react";
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
import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
export default function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [check, setCheck] = useState(false);
  const dbRef = ref(db);

  function loginSubmit(name, pass) {
    if (name === "" || pass === "") {
      alert("Please fill all the cells below");
      return;
    }
    if (hasWhiteSpace(name)) {
      alert("Your username contain space, please refill");
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
        alert("User not found");
        return;
      }
      alert("Login successfully <3\nYou're welcome!");
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
            alert(
              "You did not have an account with this email! \nPlease try another account or register to join with us."
            );
            return;
          }
          alert("Login with google successfully ~");
          // push to path like /admin/dashboard/{nameOfUser} props check from db
          router.push("/admin/dashboard");
        });
      })
      .catch((error) => {
        console.log(error.message);
        alert("Some thing went wrong");
      });
  }
  return (
    <>
      <section className="h-screen px-5 py-5 mx-auto flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Title title="ĐĂNG NHẬP" />
          <div className="w-3/4 max-w-md">
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
          <div className="flex flex-row w-3/4 max-w-md">
            <TickBox
              content="Ghi nhớ đăng nhập"
              htmlFor="remberLogin"
              onChange={() => setCheck(!check)}
            />
          </div>
          <div className="w-3/4 max-w-md">
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
