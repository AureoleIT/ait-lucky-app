/* eslint-disable no-unused-vars */
// layout for page
import Auth from "layouts/Auth.js";
import React, { useState } from "react";
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
import { useMemo } from "react/cjs/react.development";
import { useAuth, GoogleAuthProvider } from "../../src/context/AuthContext";
import router from "next/router";
import { hasWhiteSpace } from "public/util/functions";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  orderByKey,
  query,
  orderByChild,
} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [check, setCheck] = useState(false);
  const db = getDatabase();
  const auth = getAuth();

  function loginSubmit(name, pass) {
    const dbRef = ref(db);

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
