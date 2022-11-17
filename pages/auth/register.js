/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import Auth from "layouts/Auth.js";
import ConfirmButton from "public/shared/ConfirmButton";
import {
  BG_WHITE,
  TEXT,
  LEFT_GRADIENT,
  RIGHT_GRADIENT,
  BUTTON_GRADIENT,
} from "public/util/colors";
import Title from "public/shared/Title";
import firebase from "firebase";
import AuthInput from "public/shared/AuthInput";
import GradientLine from "public/shared/GradientLine";
import AuthFooter from "public/shared/AuthFooter";
import BgWhiteButton from "public/shared/BgWhiteButton";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  orderByKey,
  orderByValue,
  query,
  orderByChild,
} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const uuid = require("uuid");

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [href, setHref] = useState("");

  const db = getDatabase();
  const auth = getAuth();

  //Check if email input is valid
  function isEmail(email) {
    var regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
  }

  function hasWhiteSpace(s) {
    return s.indexOf(" ") >= 0;
  }

  function signUpSubmit(name, email, password) {
    var id = uuid.v4();
    const dbRef = ref(db);
    if (name === "" || email === "" || password === "") {
      alert("Please fill all the cells below");
      return;
    }
    if (!isEmail(email)) {
      alert("Invalid email form");
      return;
    }
    if (hasWhiteSpace(name)) {
      alert("Your username contain space, please refill");
      return;
    }

    //Use this type of query for big data -> fast

    // const emailSet = query(ref(db, "users"), orderByKey("email"));
    // get(emailSet).then((snap) => {
    //   snap.forEach((item) => {
    //     console.log(item.val());
    //   });
    // });

    //Use this type of query for small data -> fast
    get(child(dbRef, "users/")).then((snapshot) => {
      const record = snapshot.val() ?? [];
      const values = Object.values(record);
      const isUserExisting = values.some(
        (item) => item.email === email || item.name === name
      );
      if (isUserExisting) {
        alert("Username or email existed!");
        return;
      }
      set(ref(db, `users/${id}/`), {
        id,
        name,
        email,
        password,
        pic: "",
        create_at: new Date().getTime(),
      }).then(alert("Register successfully<3"));
      //This step is to navigate to /auth/login in case success
      setHref("/auth/login");
    });
  }
  return (
    <>
      <section className="h-screen">
        <div
          className={`flex flex-col justify-center items-center w-full h-full ${BG_WHITE}`}
        >
          <Title title="ĐĂNG KÝ" />
          <div className="w-3/4 max-w-md">
            <AuthInput
              content={"Tên đăng nhập"}
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            />
            <AuthInput
              content={"Email"}
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInput
              content={"Mật khẩu"}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <Privacy /> */}
          <ConfirmButton
            text="Đăng ký"
            onClick={() => {
              console.log("press");
              signUpSubmit(name, email, password);
            }}
          />
          {/* onPress={() => {if (isEmail(mail) && checkDb(name)) {}} */}
          <div className="w-3/4 max-w-md">
            <GradientLine color1="#003B93" color2="#00F0FF" content="hoặc" />
            <BgWhiteButton content="ĐĂNG KÝ VỚI" onClick={""} />
            <GradientLine color1="#003B93" color2="#00F0FF" />
          </div>
        </div>
      </section>
      <AuthFooter
        normalContent="Đã có tài khoản?"
        boldContent="Đăng nhập luôn!"
        href="/auth/login"
      />
    </>
  );
}

Register.layout = Auth;
