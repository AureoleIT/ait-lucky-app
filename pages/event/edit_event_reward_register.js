import { useState } from "react"
import { useRouter } from "next/router"

import TextArea from "public/shared/TextArea";
import AuthInput from "public/shared/AuthInput";
import Header from "public/shared/Header";
import Reward from "components/RewardRegister/Reward";
import BgBlueButton from "public/shared/BgBlueButton";
import SingleColorButton from "public/shared/SingleColorButton";

function EditEventRewardRegister () 
{
    // router
    const router  = useRouter()

    // state
    const [nameEvent, setNameEvent] = useState("")
    const [eventDetail, setEventDetail] = useState("")
    const [limitUser, setLimitUser] = useState("")
    const [rewardList, setRewardList] = useState([])

    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    }

    const hanldeAddReward = () =>
    {
        setRewardList(prev =>
            {
                let newList = [...prev, <Reward />]
                return newList
            })
    }

    const handleNavigate = () =>
    {
        router.push("/event/event-detail")
    }


    return (
        <div className="flex flex-col overflow-y-auto overflow-x-hidden items-center h-screen w-screen">
            <Header />
            <h1 className="uppercase text-xl py-3 font-bold text-[#004599] mb-4">thông tin sự kiện</h1>
            <div className="w-full overflow-x-hidden overflow-y-auto">
                <div className="flex flex-col items-center justify-center w-full mt-3">
                    <div className="w-3/4 lg:w-4/12 h-[70px]">
                        <TextArea content={"Tên sự kiện"} value={nameEvent} onChange={(e) => setNameEvent(e.target.value)}/>
                    </div>
                    <div className="pb-[1rem] pt-[2rem] w-3/4 lg:w-4/12 h-[194px]">
                        <TextArea content={"Mô tả sự kiện"} row={5} value={eventDetail} onChange={(e) => setEventDetail(e.target.value)} />
                    </div>
                    <div className="w-3/4 lg:w-4/12">
                        <AuthInput content={"Giới hạn người tham gia"} type={"number"} min={"1"} value={limitUser} onChange={(e) => setLimitUser(e.target.value)}/>
                    </div>
                    <div className="w-3/4 lg:w-4/12 flex">
                        <div className="w-[70%]">
                            <p style={contentCSS} className="font-bold">Cho phép người tham gia không cần đăng nhập</p>
                        </div>
                        <div className="w-[30%] flex justify-end items-center">
                            <input
                                type="checkbox"
                                id="accept"
                                className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-[#ccc] rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
                            />
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <Reward />
                    </div>

                    <div className="flex justify-center items-center mb-2 mt-1 w-3/4 lg:w-4/12 max-w-xl cursor-pointer drop-shadow-lg">
                        <SingleColorButton content={"Thêm giải thưởng"} colorHex={"#40BEE5"} onClick={hanldeAddReward}/>
                    </div> 
                </div>
            </div>

            <div className="py-3 w-3/4 lg:w-4/12">
                <BgBlueButton content={"ĐIỀU CHỈNH"} onClick={handleNavigate}/>
            </div>
        </div>
    )
}

export default EditEventRewardRegister