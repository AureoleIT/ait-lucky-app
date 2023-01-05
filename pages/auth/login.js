/* eslint-disable no-unused-vars */
import Auth from "layouts/Auth.js";
import React, { useEffect, useCallback, useMemo, useState } from "react";
import router from "next/router";
import { auth, db } from "../../src/firebase";
import { TickBox, Title, AuthFooter, Button, Input, Line } from "public/shared"
import {
  hasWhiteSpaceAndValidLength,
  enoughNumCountPass,
} from "public/util/functions";
import { ShowMethod } from "public/util/popup";
import { ref, child, get } from "firebase/database";
import { LEFT_COLOR, RIGHT_COLOR, FAIL_RIGHT_COLOR } from "public/util/colors";
import PopUp from "public/shared/PopUp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userPackage } from "public/redux/actions";
import { usePopUpMessageHook, usePopUpStatusHook, usePopUpVisibleHook, useUserPackageHook } from "public/redux/hooks";
import Trans from "public/trans/hooks/Trans";
import TransMess from "public/trans/hooks/TransMess";

export default function Login() {
  const message = usePopUpMessageHook();
  const status = usePopUpStatusHook()
  const visible = usePopUpVisibleHook();

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [check, setCheck] = useState(false);
  var [user, setUser] = useState({});

  const loginTrans = Trans().login;
  // Call dispatch and set user to redux 
  const dispatch = useDispatch()
  const dbRef = ref(db);

  const globalUser = useUserPackageHook();

  if (globalUser.userId !== undefined) {
    router.push("/admin/dashboard-admin");
  }

  const loginSubmit = useCallback((name, pass) => {
    if (name === "" || pass === "") {
      ShowMethod(dispatch, TransMess().messagesError.E0004, false)
      return;
    }
    if (hasWhiteSpaceAndValidLength(name)) {
      ShowMethod(dispatch, TransMess().messagesError.E0005("username"), false)
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
        ShowMethod(dispatch, TransMess().messagesError.E0009, false)
        return;
      }
      const currUser = values.find(item => item.name === name || item.email === name);
      setUser(currUser);
      dispatch(userPackage(currUser))
      ShowMethod(dispatch, TransMess().messagesSuccess.I0002, true)
      //Go to admin dashboard
      router.push("/admin/dashboard-admin");
    });
  }, [dbRef, dispatch])

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
            ShowMethod(dispatch, TransMess().messagesError.E0010, false);
            return;
          }
          const currUser = values.find(item => item.email === currEmail);
          setUser(currUser);
          dispatch(userPackage(currUser))
          ShowMethod(dispatch, TransMess().messagesSuccess.I0002, true);
          // push to path like /admin/dashboard/{nameOfUser} props check from db
          setTimeout(() => {
            router.push("/admin/dashboard-admin");
          }, 500);
        });
      })
      .catch((error) => {
        console.log(error.message);
        ShowMethod(dispatch, TransMess().messagesError.E4444, false)
      });
  }, [dispatch])


  useEffect(() => {
    window.localStorage.setItem('USER_LOGIN_STATE', JSON.stringify(user.userId));
  }, [user]);

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
    return (<Title title={loginTrans.heading}/>)
  }, [])

  const renderName = useMemo(() => {
    return (
      <Input
        type="text"
        isTextGradient={true}
        primaryColor={LEFT_COLOR}
        secondaryColor={
          hasWhiteSpaceAndValidLength(name)
            ? FAIL_RIGHT_COLOR
            : RIGHT_COLOR
        }
        content={loginTrans.username}
        onChange={nameData}
      />
    )
  }, [name, nameData])

  const renderPassword = useMemo(() => {
    return (
      <Input
        type="password"
        isTextGradient={true}
        primaryColor={LEFT_COLOR}
        secondaryColor={
          enoughNumCountPass(pass)
            ? FAIL_RIGHT_COLOR
            : RIGHT_COLOR
        }
        content={loginTrans.password}
        onChange={passData}
      />
    )
  }, [pass, passData])

  const renderRemember = useMemo(() => {
    return (
      <TickBox
        content={loginTrans.rememberLogin}
        htmlFor="rememberLogin"
        onChange={onCheckData}
      />
    )
  }, [onCheckData])

  const renderForget = useMemo(() => {
    return (
      <div onClick={() => {router.push("/auth/forgot-password")}} className = "cursor-pointer">
        <Title
          title={loginTrans.forgotPassword}
          isUnderLine={true}
          isUpperCase={false}
          fontSize="font-bold"
          fontWeight=""
          margin=""
        />
      </div>
    )
  }, [])

  const renderSubmitButton = useMemo(() => {
    return (
      <Button
        content={loginTrans.heading}
        onClick={() => {
          loginSubmit(name, pass);
        }}
        primaryColor={LEFT_COLOR}
        secondaryColor={RIGHT_COLOR}
      />
    )
  }, [loginSubmit, name, pass]);

  const renderFirstLine = useMemo(() => {
    return (
      <Line content={loginTrans.or} />
    )
  }, [])

  const renderAuthInput = useMemo(() => {
    return (
      <Button
        content={loginTrans.google}
        onClick={() => loginAuth(name, pass)}
        isTextGradient={true}
        logoGg={true}
        primaryColor={LEFT_COLOR}
        secondaryColor={RIGHT_COLOR}
      />
    )
  }, [loginAuth, name, pass]);

  const renderSecondLine = useMemo(() => {
    return (
      <Line />
    )
  }, [])

  const renderFooter = useMemo(() => {
    return (
      <AuthFooter
        normalContent={loginTrans.noAccount}
        boldContent={loginTrans.register}
        href="/auth/register"
      />
    )
  }, [])

  const renderPopUp = useMemo(() => {
    return (
      <div className={visible}>
        <PopUp
          text={message}
          status={status}
          isWarning={!status}
        />
      </div>
    )
  }, [visible, status, message])

  return (
    <div className="min-h-screen flex justify-center items-center">
      <section className="py-16 h-full mx-auto w-full flex justify-center">
        <div className="flex flex-col justify-center max-w-xl w-4/5 h-full">
          {renderTitle}
          {renderName}
          {renderPassword}
          <div className="flex max-[299px]:flex-col gap-1 min-[300px]:flex-row justify-between">
            {renderRemember}
            {renderForget}
          </div>
          <div>
            {renderSubmitButton}
            {renderFirstLine}
            {renderAuthInput}
            {renderSecondLine}
          </div>
          {renderFooter}
        </div>
      </section>
      {renderPopUp}
    </div>
  );
}

Login.layout = Auth;
