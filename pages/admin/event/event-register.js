import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import TextArea from "public/shared/TextArea";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import Header from "public/shared/Header";
import { failIcon, hidden, show, successIcon } from "public/util/popup";
import PopUp from "public/shared/PopUp";
import CheckBox from "public/shared/CheckBox";
import { db } from "src/firebase";
import { set, get, ref, child } from "firebase/database";
const uuid = require("uuid");
const dbRef = ref(db);

export default function EventRegister() {
  // router
  const router = useRouter();

  // state
  const [textState, setTextState] = useState("");
  const [isHidden, setHidden] = useState(hidden);
  const [isSuccess, setIsSuccess] = useState(false);

  // ref
  const nameEventRef = useRef(); // name event value
  const eventDetailRef = useRef(); // event detail value
  const limitUserRef = useRef(); // limit user number
  const checkBoxRef = useRef(); // checkbox value (checked or not)

  const contentCSS = {
    background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const closePopup = (e) => {
    setHidden(hidden);
  };

  // handle submit button
  const handleSubmit = () => {
    if (
      nameEventRef.current.value === "" ||
      eventDetailRef.current.value === "" ||
      limitUserRef.current.value === ""
    ) {
      setTextState("Vui lòng nhập đủ thông tin !");
      setIsSuccess(false);
      setHidden(show);
      return;
    }

    if (
      nameEventRef.current.value !== "" &&
      eventDetailRef.current.value !== "" &&
      limitUserRef.current.value !== ""
    ) {
      const id = uuid.v4();
      const newEvent = {
        eventId: id,
        publicFlag: checkBoxRef.current.checked ? 1 : 0,
        title: nameEventRef.current.value,
        description: eventDetailRef.current.value,
        maxTicket: limitUserRef.current.value,
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
          setTextState("Thêm thông tin thành công !");
          setIsSuccess(true);
          setHidden(show);
        })
        .catch((e) => {
          setTextState("Da co loi he thong ko save dc ");
          setIsSuccess(false);
          setHidden(show);
        });

      setTimeout(() => {
        router.push("/admin/event/reward-register");
      }, 3000);
    }
  };

  return (
    <>
      <section className="flex flex-col overflow-y-auto overflow-x-hidden items-center justify-between h-screen w-screen">
        <div className="w-full">
          <Header />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-3/4 lg:w-4/12">
            <h1 className="uppercase text-4xl py-3 font-bold text-[#004599]">
              đăng ký
            </h1>
            <h1 className="uppercase text-xl py-3 font-bold text-[#004599] mb-4">
              thông tin sự kiện
            </h1>
            <div className="w-full h-[70px]">
              <TextArea
                content={"Tên sự kiện"}
                maxLength={"100"}
                ref={nameEventRef}
              />
            </div>
            <div className="pb-[1rem] pt-[2rem] w-full h-[200px]">
              <TextArea
                content={"Mô tả sự kiện"}
                row={5}
                maxLength={"100"}
                ref={eventDetailRef}
              />
            </div>
            <div className="w-full">
              <AuthInput
                leftColor={"#003B93"}
                rightColor={"#00F0FF"}
                content={"Giới hạn người tham gia"}
                type={"number"}
                min={"1"}
                ref={limitUserRef}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="w-[70%]">
                <p style={contentCSS} className="font-bold">
                  Cho phép người tham gia không cần đăng nhập
                </p>
              </div>
              <div className="w-[30%] flex items-center text-right">
                <CheckBox ref={checkBoxRef} />
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 w-3/4 lg:w-4/12" onClick={handleSubmit}>
          <BgBlueButton content={"TIẾP TỤC"} />
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
