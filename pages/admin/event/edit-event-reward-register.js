import { useRef } from "react";
import { useRouter } from "next/router";

import TextArea from "public/shared/TextArea";
import AuthInput from "public/shared/AuthInput";
import Header from "public/shared/Header";
import Reward from "components/RewardRegister/Reward";
import BgBlueButton from "public/shared/BgBlueButton";
import SingleColorButton from "public/shared/SingleColorButton";
import Title from "public/shared/Title";
import CheckBox from "public/shared/CheckBox";

function EditEventRewardRegister() {
    // router
    const router = useRouter();

    // ref
    const nameEventRef = useRef()
    const eventDetailRef = useRef()
    const limitUserRef = useRef()
    const checkBoxRef = useRef()

    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    };

    const handleNavigate = () => {
        router.push("/admin/event/event-detail");
    };

    const handleAdd = () =>
    {

    }

    return (
        <div className="flex flex-col overflow-y-auto overflow-x-hidden items-center h-screen w-screen">
            <div className="w-full"> <Header /> </div>

            <div className="w-4/5 max-w-xl flex flex-col items-center justify-center mb-5">

                <Title fontSize={"20"} title={"thông tin sự kiện"}/>
                <div className="w-full h-[70px]">
                    <TextArea content={"Tên sự kiện"} maxLength={"100"} ref={nameEventRef} />
                </div>
                <div className="pb-[1rem] pt-[2rem] w-full h-[200px]">
                    <TextArea content={"Mô tả sự kiện"} row={5} maxLength={"1000"} ref={eventDetailRef} />
                </div>
                <div className="w-full">
                    <AuthInput leftColor={"#003B93"} rightColor={"#00F0FF"} content={"Giới hạn người tham gia"} type={"number"} min={"1"} ref={limitUserRef} />
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="w-[70%]">
                        <p style={contentCSS} className="font-bold"> Cho phép người tham gia không cần đăng nhập </p>
                    </div>
                    <div className="w-[30%] flex items-center text-right">
                        <CheckBox ref={checkBoxRef} />
                    </div>
                </div>
            </div>

            <div className="w-4/5 max-w-xl flex flex-col items-center justify-center mt-5">
                <Reward 
                    rewardCountValue={"1"}
                />
                <div className="w-full">
                    <SingleColorButton content={"Thêm phần quà"} colorHex={"#40BEE5"} onClick={handleAdd}/>
                </div>
            </div>

            <div className="py-3 w-4/5 max-w-xl">
                <BgBlueButton content={"ĐIỀU CHỈNH"} onClick={handleNavigate} />
            </div>
        </div>
    );
}

export default EditEventRewardRegister;
