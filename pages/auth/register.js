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
import AuthInput from "public/shared/AuthInput";
import GradientLine from "public/shared/GradientLine";
import AuthFooter from "public/shared/AuthFooter";
import BgWhiteButton from "public/shared/BgWhiteButton";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const uuid = require("uuid");

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const db = getDatabase();
  const auth = getAuth();

  function submit(name, email, password) {
    var id = uuid.v4();
    const dbRef = ref(db);

    get(child(dbRef, "users/")).then((snapshot) => {
      if (snapshot.val() === null) {
        set(ref(db, `users/${id}/`), {
          name: name,
          email: email,
          password: password,
          pic: null,
          create_at: new Date().valueOf(),
        }).then(alert("Register success<3"));
      } else {
        const record = snapshot.val();
        console.log(record);
        // recordArr.forEach((val) => {
        if (record.Object.email === email || record.Object.name === name) {
          alert("Email or username already exists!!!");
        } else {
          set(ref(db, `users/${id}/`), {
            name: name,
            email: email,
            password: password,
            pic: null,
            create_at: new Date().valueOf(),
          }).then(alert("Register success<3"));
        }
        // });
      }
    });
  }

  //Check if email input is valid
  function isEmail(email) {
    var regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
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
              onChange={(e) => {
                setName(e.target.value.replaceAll(" ", ""));
              }}
            />
            <AuthInput
              content={"Email"}
              type={"email"}
              onChange={(e) => setEmail(e.target.value.replaceAll(" ", ""))}
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
              submit(name, email, password);
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
