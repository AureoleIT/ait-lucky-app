import React, { useState } from "react";
import { useRouter } from "next/router";

import TextArea from "public/shared/TextArea";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import Header from "public/shared/Header";
import { failIcon, hidden, show, successIcon } from "public/util/popup";
import PopUp from "public/shared/PopUp";

export default function EventRegister() {
  // router
  const router = useRouter();

  const [nameEvent, setNameEvent] = useState("");
  const [eventDetail, setEventDetail] = useState("");
  const [limitUser, setLimitUser] = useState("");
  const [textState, setTextState] = useState("")
  const [isHidden, setHidden] = useState(hidden)
  const [isSuccess, setIsSuccess] = useState(false)

  // handle submit button
  const handleSubmit = () => {
    if (nameEvent !== "" && eventDetail !== "" && limitUser !== "") {
      alert("Thanh cong !!!");
      router.push("/event/reward-register");
    } else {
      alert("Vui lòng nhập đủ thông tin !!!");
    }
  };

    const closePopup = (e) =>
    {   
        setHidden(hidden)
    }

    // handle submit button
    const handleSubmit = () =>
    {
        if(nameEvent === "" || eventDetail === "" || limitUser === "")
        {
            setTextState("Vui lòng nhập đủ thông tin !")
            setIsSuccess(false)
            setHidden(show)
            return
        }
        
        if(nameEvent !== "" && eventDetail !== "" && limitUser !== "")
        {
            setTextState("Thêm thông tin thành công !")
            setIsSuccess(true)
            setHidden(show)
            setTimeout(() =>
            {
                router.push("/event/reward-register")
            },3000)
        }

    }

    return (
        <>
            <section className="flex flex-col overflow-y-auto overflow-x-hidden items-center justify-between h-screen w-screen">
                <div className="w-full">
                    <Header />
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="uppercase text-4xl py-3 font-bold text-[#004599]">đăng ký</h1>
                    <h1 className="uppercase text-xl py-3 font-bold text-[#004599] mb-4">thông tin sự kiện</h1>
                    
                    <div className="w-3/4 lg:w-4/12">
                        <TextArea content={"Tên sự kiện"} value={nameEvent} onChange={(e) => setNameEvent(e.target.value)}/>
                    </div>

                    <div className="pb-[1rem]  pt-[2rem] w-3/4 lg:w-4/12">
                        <TextArea content={"Mô tả sự kiện"} row={5} value={eventDetail} onChange={(e) => setEventDetail(e.target.value)} />
                    </div>

                    <div className="w-3/4 lg:w-4/12">
                        <AuthInput leftColor={"#003B93"} rightColor={"#00F0FF"} content={"Giới hạn người tham gia"} type={"number"} min={"1"} value={limitUser} onChange={(e) => setLimitUser(e.target.value)}/>
                    </div>

          <div className="w-3/4 lg:w-4/12">
            <AuthInput
              content={"Giới hạn người tham gia"}
              type={"number"}
              min={"1"}
              value={limitUser}
              onChange={(e) => setLimitUser(e.target.value)}
            />
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
