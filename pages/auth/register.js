/* eslint-disable no-unused-vars */
import { React, useCallback, useState } from "react";
import ConfirmButton from "public/shared/ConfirmButton";
import { BG_WHITE, LEFT_COLOR, RIGHT_COLOR } from "public/util/colors";
import Title from "public/shared/Title";
import AuthInput from "public/shared/AuthInput";
import GradientLine from "public/shared/GradientLine";
import AuthFooter from "public/shared/AuthFooter";
import BgWhiteButton from "public/shared/BgWhiteButton";
import Privacy from "public/shared/Privacy";
import Auth from "layouts/Auth.js";
import router from "next/router";
import { isEmail, hasWhiteSpace } from "public/util/functions";
import { ref, set, child, get } from "firebase/database";
import { db, auth, app } from "src/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import PopUp from "public/shared/PopUp";
const uuid = require("uuid");
const successIcon = require("../../public/img/successIcon.png");
const failIcon = require("../../public/img/failIcon.png");

export default function Register() {
  const hidden = "h-screen hidden w-full fixed justify-center items-center";
  const show =
    "h-screen flex w-full fixed justify-center items-center bg-slate-600 bg-opacity-50";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);
  const [textState, setTextState] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHidden, setHidden] = useState(hidden);

  function signUpSubmit(name, email, password) {
    var id = uuid.v4();
    const dbRef = ref(db);
    if (name === "" || email === "" || password === "") {
      setTextState("Please fill all the cells below");
      setIsSuccess(false);
      setHidden(show);
      return;
    }
    if (!isEmail(email)) {
      setTextState("Invalid email form");
      setIsSuccess(false);
      setHidden(show);
      return;
    }
    if (hasWhiteSpace(name)) {
      setTextState("Your username contain space, please refill");
      setIsSuccess(false);
      setHidden(show);
      return;
    }
    if (password.length < 6) {
      setTextState("Password must be at least 6 characters");
      setIsSuccess(false);
      setHidden(show);
      return;
    }
    if (!check) {
      setTextState("You did not agree with privacy!!!");
      setIsSuccess(false);
      setHidden(show);
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
        setTextState("Username or email existed!");
        setIsSuccess(false);
        setHidden(show);
        return;
      }
      set(ref(db, `users/${id}/`), {
        id,
        name,
        email,
        password,
        pic: "",
        create_at: new Date().getTime(),
      }).then(() => {
        setTextState("Register successfully <3 \nPlease login ~");
        setIsSuccess(true);
        setHidden(show);
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    });
  }
  async function signUpAuth() {
    signOut(auth)
      .then(async () => {
        var id = uuid.v4();
        const provider = new GoogleAuthProvider(app);
        provider.setCustomParameters({
          login_hint: "user@example.com",
        });
        await signInWithPopup(auth, provider)
          .then((result) => {
            const newUser = {
              id,
              name: result._tokenResponse.email.slice(
                0,
                result._tokenResponse.email.lastIndexOf("@")
              ),
              email: result._tokenResponse.email,
              password: "123456",
              pic: result._tokenResponse.photoUrl,
              create_at: new Date().getTime(),
            };
            get(child(ref(db), "users/")).then((snapshot) => {
              const record = snapshot.val() ?? [];
              const values = Object.values(record);
              const isUserExisting = values.some(
                (item) => item.email === newUser.email
              );
              if (isUserExisting) {
                setTextState("This email existed on database!");
                setIsSuccess(false);
                setHidden(show);
                return;
              }
              set(ref(db, `users/${id}/`), newUser).then(() => {
                setTextState(
                  "Register by google successfully <3 \nPlease login ~"
                );
                setIsSuccess(true);
                setHidden(show);
              });
              setTimeout(() => {
                router.push("/auth/login");
              }, 4000);
            });
          })
          .catch((error) => {
            console.log(error.message);
            setTextState("Something went wrong!");
            setIsSuccess(false);
            setHidden(show);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setTextState("Something's wrong that bad");
        setIsSuccess(false);
        setHidden(show);
      });
  }

  const closePopup = (e) => {
    setHidden(hidden);
  };

  const setEmailData = useCallback(
    (e) => {
      setEmail(e?.target?.value);
    },
    [setEmail]
  );
  const setNameData = useCallback(
    (e) => {
      setName(e?.target?.value);
    },
    [setName]
  );
  const setPassData = useCallback(
    (e) => {
      setPassword(e?.target?.value);
    },
    [setPassword]
  );
  const isCheckPrivacy = () => setCheck(!check);
  return (
    <>
      <section className="h-screen px-5 py-5 mx-auto flex justify-center items-center">
        <div
          className={`flex flex-col justify-center max-w-md w-full h-full ${BG_WHITE}`}
        >
          <Title title="ĐĂNG KÝ" />
          <div className="">
            <AuthInput
              content={"Tên đăng nhập"}
              type={"text"}
              onChange={setNameData}
            />
            <AuthInput
              content={"Email"}
              type={"email"}
              onChange={setEmailData}
            />
            <AuthInput
              content={"Mật khẩu"}
              type={"password"}
              onChange={setPassData}
            />
          </div>
          <Privacy onChange={isCheckPrivacy} />
          <ConfirmButton
            text="Đăng ký"
            onClick={() => {
              signUpSubmit(name, email, password);
            }}
          />
          <div className="">
            <GradientLine
              color1={LEFT_COLOR}
              color2={RIGHT_COLOR}
              content="hoặc"
            />
            <BgWhiteButton
              content="ĐĂNG KÝ VỚI"
              onClick={() => {
                signUpAuth();
              }}
            />
            <GradientLine color1={LEFT_COLOR} color2={RIGHT_COLOR} />
          </div>
          <AuthFooter
            normalContent="Đã có tài khoản?"
            boldContent="Đăng nhập luôn!"
            href="/auth/login"
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

Register.layout = Auth;
