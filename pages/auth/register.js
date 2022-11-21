/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import ConfirmButton from "public/shared/ConfirmButton";
import { BG_WHITE } from "public/util/colors";
import Title from "public/shared/Title";
import AuthInput from "public/shared/AuthInput";
import GradientLine from "public/shared/GradientLine";
import AuthFooter from "public/shared/AuthFooter";
import BgWhiteButton from "public/shared/BgWhiteButton";
import Privacy from "public/shared/Privacy";
import Auth from "layouts/Auth.js";
import router from "next/router";
import { isEmail, hasWhiteSpace } from "public/util/functions";
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
const uuid = require("uuid");

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);
  const db = getDatabase();
  const auth = getAuth();

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
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (!check) {
      alert("You did not agree with privacy!!!");
      return;
    }

    //Use this type of query for big data -> fast

    // const emailSet = query(ref(db, "users"), orderByKey("email"));
    // get(emailSet).then((snap) => {
    //   snap.forEach((item) => {
    //     var mailItem = item.val().email;
    //     var nameItem = item.val().name;
    //     console.log(mailItem);
    //     console.log(nameItem);
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
      }).then(alert("Register successfully <3 \nPlease login ~"));
      router.push("/auth/login");
    });
  }
  function signUpAuth(name, email, password) {
    var id = uuid.v4();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(db, "users/" + user.uid), {
          id,
          name,
          email,
          password,
          pic: "",
          create_at: new Date().getTime(),
        })
          .then(() => {
            alert("User created successfully");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
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
          <Privacy onChange={(e) => setCheck(!check)} />
          <ConfirmButton
            text="Đăng ký"
            onClick={() => {
              signUpSubmit(name, email, password);
            }}
          />
          <div className="w-3/4 max-w-md">
            <GradientLine color1="#003B93" color2="#00F0FF" content="hoặc" />
            <BgWhiteButton
              content="ĐĂNG KÝ VỚI"
              onClick={() => {
                signUpAuth(name, email, password);
              }}
            />
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
