/* eslint-disable no-unused-vars */
import Auth from "layouts/Auth.js";
import React, { useEffect, useCallback, useMemo, useState } from "react";
import AuthInput from "public/shared/AuthInput";
import TickBox from "public/shared/TickBox";
import BgBlueButton from "public/shared/BgBlueButton";
import BgWhiteButton from "public/shared/BgWhiteButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
import router from "next/router";
import { auth, db } from "../../src/firebase";
import {
  hasWhiteSpaceAndValidLength,
  enoughNumCountPass,
} from "public/util/functions";
import { hidden, show, failIcon, successIcon } from "public/util/popup";
import { ref, set, child, get } from "firebase/database";
import { LEFT_COLOR, RIGHT_COLOR, FAIL_RIGHT_COLOR } from "public/util/colors";
import PopUp from "public/shared/PopUp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { messagesError, messagesSuccess } from "public/util/messages";
import { useDispatch } from "react-redux";
import { userPackage } from "public/redux/actions";

export default function Login() {
  const [textState, setTextState] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHidden, setHidden] = useState(hidden);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [check, setCheck] = useState(false);
  var [user, setUser] = useState({});

  const dbRef = ref(db);

  const showMethod = useCallback((message, isTrue) => {
    setTextState(message);
    setIsSuccess(isTrue);
    setHidden(show);
  }, [])

  const loginSubmit = useCallback((name, pass) => {
    if (name === "" || pass === "") {
      showMethod(messagesError.E0004, false)
      return;
    }
    if (hasWhiteSpaceAndValidLength(name)) {
      showMethod(messagesError.E0005("username"), false)
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
        showMethod(messagesError.E0009, false)
        return;
      }
      setUser(values.find(item => item.name === name || item.email === name));

      showMethod(messagesSuccess.I0002, true)
      //Go to admin dashboard
      router.push("/admin/dashboard-admin");
    });
  }, [dbRef, showMethod])

  const loginAuth = useCallback(() => {
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
            showMethod(messagesError.E0010, false);
            return;
          }
          setUser(values.find(item => item.email === currEmail));
          showMethod(messagesSuccess.I0002, true);
          // push to path like /admin/dashboard/{nameOfUser} props check from db
          setTimeout(() => {
            router.push("/admin/dashboard-admin");
          }, 4000);
        });
      })
      .catch((error) => {
        console.log(error.message);
        showMethod(messagesError.E4444, false)
      });
  }, [showMethod])

  // Call dispatch and set user to redux 
  const dispatch = useDispatch()
  useEffect(() => dispatch(userPackage(user)), [dispatch, user])

  useEffect(() => {
    window.localStorage.setItem('USER_LOGIN_STATE', JSON.stringify(user));
  }, [user]);

  const closePopup = useCallback(() => {
    setHidden(hidden);
  }, []);

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

  const onCheckData = useCallback(() => {
    setCheck(!check);
  }, [check]);

  const renderTitle = useMemo(() => {
    return (<Title title="ĐĂNG NHẬP" />)
  }, [])

  const renderName = useMemo(() => {
    return (
      <AuthInput
        content={"Tên đăng nhập/Email"}
        leftColor={LEFT_COLOR}
        rightColor={
          hasWhiteSpaceAndValidLength(name)
            ? FAIL_RIGHT_COLOR
            : RIGHT_COLOR
        }
        type={"text"}
        onChange={nameData}
      />
    )
  }, [name, nameData])

  const renderPassword = useMemo(() => {
    return (
      <AuthInput
        content={"Mật khẩu"}
        leftColor={LEFT_COLOR}
        rightColor={
          enoughNumCountPass(pass) ? FAIL_RIGHT_COLOR : RIGHT_COLOR
        }
        type={"password"}
        onChange={passData}
      />
    )
  }, [pass, passData])

  const renderPrivacy = useMemo(() => {
    return (
      <TickBox
        content="Ghi nhớ đăng nhập"
        htmlFor="rememberLogin"
        onChange={onCheckData}
      />
    )
  }, [onCheckData])

  const renderSubmitButton = useMemo(() => {
    return (
      <BgBlueButton
        content="ĐĂNG NHẬP"
        onClick={() => {
          loginSubmit(name, pass);
        }}
      />
    )
  }, [loginSubmit, name, pass]);

  const renderFirstLine = useMemo(() => {
    return (
      <GradientLine color1="#003B93" color2="#00F0FF" content="hoặc" />
    )
  }, [])

  const renderAuthInput = useMemo(() => {
    return (
      <BgWhiteButton
        content="ĐĂNG NHẬP BẰNG"
        onClick={() => loginAuth(name, pass)}
      />
    )
  }, [loginAuth, name, pass]);

  const renderSecondLine = useMemo(() => {
    return (
      <GradientLine color1="#003B93" color2="#00F0FF" content="" />
    )
  }, [])

  const renderFooter = useMemo(() => {
    return (
      <AuthFooter
        normalContent="Chưa có tài khoản?"
        boldContent="Đăng kí ngay!!!"
        href="/auth/register"
      />
    )
  }, [])

  const renderPopUp = useMemo(() => {
    return (
      <div className={isHidden}>
        <PopUp
          text={textState}
          icon={isSuccess ? successIcon : failIcon}
          close={closePopup}
          isWarning={!isSuccess}
        />
      </div>
    )
  }, [closePopup, isHidden, isSuccess, textState])

  return (
    <>
      <section className="h-screen mx-auto w-full flex justify-center items-center">
        <div className="flex flex-col justify-center max-w-xl w-4/5 h-full">
          {renderTitle}
          <div>
            {renderName}
            {renderPassword}
          </div>
          <div className="flex flex-row">
            {renderPrivacy}
          </div>
          <div>
            {renderSubmitButton}
            {renderFirstLine}
            {renderAuthInput}
            {renderSecondLine}
          </div>
          {renderFooter}
        </div>
        {renderPopUp}
      </section>
    </>
  );
}

Login.layout = Auth;
