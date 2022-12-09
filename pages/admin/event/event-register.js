import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import TextArea from "public/shared/TextArea";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import Header from "public/shared/Header";
import { failIcon, hidden, show, successIcon } from "public/util/popup";
import PopUp from "public/shared/PopUp";
import CheckBox from "public/shared/CheckBox";
import { db } from "src/firebase";
import { set, ref } from "firebase/database";
import { messagesError, messagesSuccess } from "public/util/messages"
import { LEFT_COLOR, RIGHT_COLOR } from "public/util/colors";
import { useDispatch } from "react-redux"
import { userCurrentHostingEvent } from "public/redux/actions"
const uuid = require("uuid");

export default function EventRegister() {
  // router
  const router = useRouter();

  // state
  const [textState, setTextState] = useState("");
  const [isHidden, setHidden] = useState(hidden);
  const [isSuccess, setIsSuccess] = useState(false);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [maxTicket, setMaxTicket] = useState("")
  const [publicFlag, setPublicFlag] = useState(true)

  const contentCSS = {
    background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  // message
  const showMethod = useCallback((message, isTrue) => {
    setTextState(message);
    setIsSuccess(isTrue);
    setHidden(show);
  }, [])

  // set event id to redux
  let id = useRef()

  useEffect(() =>
  { 
    id = uuid.v4()
  },[])

  const dispatch = useDispatch()
  useEffect(() =>
  {
    dispatch(userCurrentHostingEvent(id))
  },[dispatch, id])
  
  // handle submit button
  const handleSubmit = useCallback((title, description, maxTicket, publicFlag) =>
  {
    if (title === "" || description === "" || maxTicket === "") {
      showMethod(messagesError.E0004, false)  
      return;
    }
      
      if (title !== "" && description !== "" && maxTicket !== "") {
          const newEvent = {
              eventId: id,
              publicFlag: publicFlag ? 1 : 0,
              title: title,
              description: description,
              maxTicket: maxTicket,
              createAt: new Date().getTime(),
              createBy: "iasd-asda123-asd1-asd123",
              waitingTime: 300,
              userJoined: 20,
              pinCode: id.slice(0,6),
              status: 1,
              delFlag: false,
      };
      set(ref(db, `event/${id}`), newEvent)
        .then(() => {
            showMethod(messagesSuccess.I0007("sự kiện"), true)
          })
          .catch((e) => {
              showMethod(messagesError.E4444, false)
            });
          
          setTimeout(() => {
            router.push("/admin/event/reward-register");
          }, 2000);
        }
      },[showMethod])

  const closePopup = useCallback(() => {
    setHidden(hidden);
  }, []);

  const onChangeTitle = useCallback(
    (e) => {
      setTitle(e?.target?.value);
    },
    [setTitle]
  );

  const onChangeDescription = useCallback(
    (e) => {
      setDescription(e?.target?.value);
    },
    [setDescription]
  );

  const onChangePublicFlag = useCallback(
    (e) => {
      setPublicFlag(e?.target?.checked);
    },
    [setPublicFlag]
  );

  const onChangeMaxTicket = useCallback(
    (e) => {
      setMaxTicket(e?.target?.value);
    },
    [setMaxTicket]
  );

  // render component
  const renderHeader = useMemo(() =>
  {
    return(
      <>
        <div className="w-full">
          <Header />
        </div>
      </>
    )
  },[])

  const renderTitleHeader = useMemo(() =>
  {
    return (
      <>
        <h1 className="uppercase text-4xl py-3 font-bold text-[#004599]">
          đăng ký
        </h1>
        <h1 className="uppercase text-xl py-3 font-bold text-[#004599] mb-4">
          thông tin sự kiện
        </h1>
      </>
    )
  },[])

  const renderTitle = useMemo(() =>
  {
    return (
      <>
        <div className="w-full h-[70px]">
          <AuthInput
            leftColor={LEFT_COLOR}
            rightColor={RIGHT_COLOR}
            content={"Tên sự kiện"}
            maxLength={"100"}
            value={title}
            onChange={onChangeTitle}
          />
        </div>
      </>
    )
  },[title, onChangeTitle])

  const renderDescription = useMemo(() =>
  {
    return (
      <>
        <div className="pb-[1rem] pt-[2rem] w-full h-[200px]">
          <TextArea
            content={"Mô tả sự kiện"}
            row={5}
            maxLength={"1000"}
            value={description}
            onChange={onChangeDescription}
          />
        </div>
      </>
    )
  },[description, onChangeDescription])

  const renderMaxTicket = useMemo(() =>
  {
    return (
      <>
        <div className="w-full">
          <AuthInput
            leftColor={"#003B93"}
            rightColor={"#00F0FF"}
            content={"Giới hạn người tham gia"}
            type={"number"}
            min={"1"}
            value={maxTicket}
            onChange={onChangeMaxTicket}
          />
        </div>
      </>
    )
  },[maxTicket, onChangeMaxTicket])

  const renderCheckbox = useMemo(() =>
  {
    return (
      <>
        <div className="w-full flex justify-center items-center">
          <div className="w-[70%]">
            <p style={contentCSS} className="font-bold">
              Cho phép người tham gia không cần đăng nhập
            </p>
          </div>
          <div className="w-[30%] flex items-center text-right">
            <CheckBox value={publicFlag} onChange={onChangePublicFlag} />
          </div>
        </div>
      </>
    )
  },[publicFlag, onChangePublicFlag])

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



  const renderButton = useMemo(() =>
  { 
    return (
        <div className="py-3 w-4/5 max-w-xl">
          <BgBlueButton content={"TIẾP TỤC"} onClick={() => handleSubmit(title, description, maxTicket, publicFlag)}/>
        </div>
    )
  },[handleSubmit, title, description, maxTicket, publicFlag])



  return (
    <>
      <section className="flex flex-col overflow-y-auto overflow-x-hidden items-center justify-between h-screen w-screen">
        {renderHeader}
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-4/5 max-w-xl">
            {renderTitleHeader}
            {renderTitle}
            {renderDescription}
            {renderMaxTicket}
            {renderCheckbox}
          </div>
        </div>
        {renderButton}
        {renderPopUp}
      </section>
    </>
  );
}
