import React, { useRef, useState } from "react";
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

    // state
    const [textState, setTextState] = useState("");
    const [isHidden, setHidden] = useState(hidden);
    const [isSuccess, setIsSuccess] = useState(false);

    // ref
    const nameEventRef = useRef()
    const eventDetailRef = useRef()
    const limitUserRef = useRef()

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
        if (nameEventRef.current.value === "" || eventDetailRef.current.value === "" || limitUserRef.current.value === "") {
            setTextState("Vui lòng nhập đủ thông tin !");
            setIsSuccess(false);
            setHidden(show);
            return;
        }

        if (nameEventRef.current.value !== "" && eventDetailRef.current.value !== "" && limitUserRef.current.value !== "") {
            setTextState("Thêm thông tin thành công !");
            setIsSuccess(true);
            setHidden(show);
            setTimeout(() => {
                router.push("/event/reward-register");
            }, 3000);
        }
    };

    return (
        <>
            <section className="flex flex-col overflow-y-auto overflow-x-hidden items-center justify-between h-screen w-screen">
                <div className="w-full">
                    <Header />
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="uppercase text-4xl py-3 font-bold text-[#004599]">
                        đăng ký
                    </h1>
                    <h1 className="uppercase text-xl py-3 font-bold text-[#004599] mb-4">
                        thông tin sự kiện
                    </h1>

                    <div className="w-3/4 lg:w-4/12">
                        <TextArea
                            content={"Tên sự kiện"}
                            ref={nameEventRef}
                        />
                    </div>
                    <div className="pb-[1rem]  pt-[2rem] w-3/4 lg:w-4/12">
                        <TextArea
                            content={"Mô tả sự kiện"}
                            row={5}
                            ref={eventDetailRef}
                        />
                    </div>

                    <div className="w-3/4 lg:w-4/12">
                        <AuthInput
                            leftColor={"#003B93"}
                            rightColor={"#00F0FF"}
                            content={"Giới hạn người tham gia"}
                            type={"number"}
                            min={"1"}
                            ref={limitUserRef}
                        />
                    </div>

                    <div className="w-3/4 lg:w-4/12 flex ">
                        <div className="w-[70%]">
                            <p style={contentCSS} className="font-bold">
                                Cho phép người tham gia không cần đăng nhập
                            </p>
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
