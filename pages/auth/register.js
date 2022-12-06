/* eslint-disable no-unused-vars */
import { React, useCallback, useMemo, useState } from "react";
import ConfirmButton from "public/shared/ConfirmButton";
import {
  BG_WHITE,
  LEFT_COLOR,
  RIGHT_COLOR,
  FAIL_RIGHT_COLOR,
} from "public/util/colors";
import Title from "public/shared/Title";
import AuthInput from "public/shared/AuthInput";
import GradientLine from "public/shared/GradientLine";
import AuthFooter from "public/shared/AuthFooter";
import BgWhiteButton from "public/shared/BgWhiteButton";
import Privacy from "public/shared/Privacy";
import Auth from "layouts/Auth.js";
import router from "next/router";
import {
  isEmail,
  hasWhiteSpaceAndValidLength,
  enoughNumCountPass,
  isEmpty,
} from "public/util/functions";
import { ref, set, child, get } from "firebase/database";
import { db, auth, app } from "src/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import PopUp from "public/shared/PopUp";
import { hidden, show, successIcon, failIcon } from "public/util/popup";
import { messagesError, messagesSuccess } from "public/util/messages";

const uuid = require("uuid");
const dbRef = ref(db);

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);
  const [textState, setTextState] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHidden, setHidden] = useState(hidden);

  const showMethod = useMemo(() => (message, isShow, isTrue) => {
    setTextState(message);
    setIsSuccess(isTrue);
    setHidden(isShow);
  }, [])

  function signUpSubmit(name, email, password) {
    var id = uuid.v4();
    if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
      showMethod(messagesError.E0004, show, false);
      return;
    }
    if (!isEmail(email)) {
      showMethod(messagesError.E0003("Email"), show, false);
      return;
    }
    if (hasWhiteSpaceAndValidLength(name)) {
      showMethod(messagesError.E0005("username"), show, false);
      return;
    }
    if (password.length < 6) {
      showMethod(messagesError.E0002("password", 6), show, false);
      return;
    }
    if (!check) {
      showMethod(messagesError.E0006, show, false);
      return;
    }
    if ( password !== rePassword ){
      showMethod(messagesError.E0021("lại mật khẩu", "mật khẩu phía trên"), show, false);
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
        showMethod(messagesError.E0007("username", "email"), show, false);
        return;
      }
      var newUser = {
        userId: id,
        name,
        email,
        password,
        pic: "",
        createAt: new Date().getTime(),
      }
      set(ref(db, `users/${id}/`), newUser).then(() => {
        showMethod(messagesSuccess.I0001, show, true);
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
              userId: id,
              name: result._tokenResponse.email.slice(
                0,
                result._tokenResponse.email.lastIndexOf("@")
              ),
              email: result._tokenResponse.email,
              password: "123456",
              pic: result._tokenResponse.photoUrl,
              createAt: new Date().getTime(),
            };
            get(child(ref(db), "users/")).then((snapshot) => {
              const record = snapshot.val() ?? [];
              const values = Object.values(record);
              const isUserExisting = values.some(
                (item) => item.email === newUser.email
              );
              if (isUserExisting) {
                showMethod(messagesError.E0008("Email"), show, false);
                return;
              }
              set(ref(db, `users/${id}/`), newUser).then(() => {
                showMethod(messagesSuccess.I0001, show, true);
              });
              setTimeout(() => {
                router.push("/auth/login");
              }, 4000);
            });
          })
          .catch((error) => {
            console.log(error.message);
            showMethod(messagesError.E4444, show, false);
          });
      })
      .catch((error) => {
        console.log(error.message);
        showMethod(messagesError.E4444, show, false);
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
  const setRePassData = useCallback(
    (e) => {
      setRePassword(e?.target?.value);
    },
    [setRePassword]
  );
  const isCheckPrivacy = () => setCheck(!check);
  return (
    <>
      <section className="h-screen mx-auto flex justify-center items-center">
        <div
          className={`flex flex-col justify-center max-w-xl w-4/5 h-full ${BG_WHITE}`}
        >
          <Title title="ĐĂNG KÝ" />
          <div className="">
            <AuthInput
              content={"Tên đăng nhập"}
              leftColor={LEFT_COLOR}
              rightColor={
                hasWhiteSpaceAndValidLength(name)
                  ? FAIL_RIGHT_COLOR
                  : RIGHT_COLOR
              }
              type={"text"}
              onChange={setNameData}
            />
            <AuthInput
              content={"Email"}
              leftColor={LEFT_COLOR}
              rightColor={!isEmail(email) ? FAIL_RIGHT_COLOR : RIGHT_COLOR}
              type={"email"}
              onChange={setEmailData}
            />
            <AuthInput
              content={"Mật khẩu"}
              type={"password"}
              leftColor={LEFT_COLOR}
              rightColor={
                enoughNumCountPass(password) ? FAIL_RIGHT_COLOR : RIGHT_COLOR
              }
              onChange={setPassData}
            />
            <AuthInput
              content={"Nhập lại mật khẩu"}
              type={"password"}
              leftColor={LEFT_COLOR}
              rightColor={
                enoughNumCountPass(rePassword) ? FAIL_RIGHT_COLOR : RIGHT_COLOR
              }
              onChange={setRePassData}
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
            isWarning={!isSuccess}
          />
        </div>
      </section>
    </>
  );
}

Register.layout = Auth;
