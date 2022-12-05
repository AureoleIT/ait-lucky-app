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
import { set, ref } from "firebase/database";
const uuid = require("uuid");
// const dbRef = ref(db);

export default function EventRegister() {
  // router
  const router = useRouter();
  const [nameEvent, setNameEvent] = useState("");
  const [eventDetail, setEventDetail] = useState("");
  const [limitUser, setLimitUser] = useState("");
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
    if (nameEvent === "" || eventDetail === "" || limitUser === "") {
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
      }, 2000);
    }
  };

  return (
    <>
      <section className="flex flex-col overflow-y-auto overflow-x-hidden items-center justify-between h-screen w-screen">
        <div className="w-full">
          <Header />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-4/5 max-w-xl">
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
                maxLength={"1000"}
                ref={eventDetailRef}
              />
            </div>
            <div className="w-[30%] flex justify-end items-center">
              <input
                type="checkbox"
                id="accept"
                className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-[#ccc] rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
              />
            </div>
          </div>
        </div>
        <div className="py-3 w-4/5 max-w-xl" onClick={handleSubmit}>
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