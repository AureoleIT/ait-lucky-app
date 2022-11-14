/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { MoreGift } from "components/JoinEvent/MoreGift";
import AuthInput from "public/shared/AuthInput";
import ButtonAndIcon from "public/shared/ButtonAndIcon";
import ButtonAndIconSmall from "public/shared/ButtonAndIconSmall";
import Line from "public/shared/Line";
import BgBlueButton from "public/shared/BgBlueButton";
import SingleColorButton from "public/shared/SingleColorButton";


function EventRewardRegister () {
    
    const [giftCount, setGiftCount] = useState(0)

    // const [giftList, setGiftList] = useState([])

    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
    }
    // icon plus/minus
    const icon = {
        width:"32px",
        height:"32px",
        margin:"0 12px",
        "border-image-source" : "linear-gradient(to right, #003B93, #00F0FF)"
    }

    // logic
    // const handleAddGift = () =>
    // {
    //     setGiftList([...giftList, <MoreGift />])
    // }

    const handleDeleteGift = () =>
    {

    }

    return (
            <div className="flex flex-col items-center justify-evenly w-screen h-screen">
                <div className="flex flex-col items-center h-full max-w-[300px]">
                    <h1 className="uppercase text-4xl py-3 font-bold text-[#004599]">đăng ký</h1>
                    <h1 className="uppercase text-xl py-2 mb-2 font-bold text-[#004599]">thông tin giải thưởng</h1>
                    {/* gift name */}

                    <AuthInput content={"Tên giải thưởng"} type={"text"} />

                    <div className="flex justify-evenly w-full mt-1 mb-2 lg:justify-center">
                        <label className="font-bold" style={contentCSS}>Số lượng</label>
                        <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                            <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setGiftCount(giftCount - 1)}></i>
                            <label>{giftCount}</label>
                            <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setGiftCount(giftCount + 1)}></i>
                        </div>
                    </div>
                    {/* gift detail */}
                        {/* line */}
                    <div class="w-[90%] max-w-sm mb-2">
                        <Line content={"Phần quà"}/>
                    </div>

                    <div className="flex flex-col w-full max-w-[300px] mb-1">
                        <div className="w-full flex justify-evenly">
                            <div className="flex flex-col justify-center items-center text-[24px] leading-[3rem] text-[#003B93]">
                                <i className="fas fa-angle-up cursor-pointer"></i>
                                1
                                <i className="fas fa-angle-down cursor-pointer"></i>
                            </div>
                            <div className="ml-3">
                                <div className="w-full">
                                    <div className="flex justify-between items-center relative w-full">
                                        <AuthInput  content={"Mô tả phần quà"}/>
                                        <i className="fas fa-trash text-red-600 cursor-pointer px-[1rem]" onClick={handleDeleteGift}></i>
                                    </div>
                                </div>
                                <ButtonAndIconSmall content={"Thêm hình ảnh"} classIcon={"fas fa-image"} colorHex={"#40BEE5"}/>
                            </div>
                        </div>
                        {/* {
                            giftList.map((item) =>
                            {
                                return item
                            })
                        } */}
                    </div>
                    {/* gift event */}
                        {/* line */}
                    <div class="w-[90%] max-w-sm">
                       <Line />
                    </div>

                    <div className="flex justify-center items-center my-2 w-[300px] cursor-pointer drop-shadow-lg">
                        <SingleColorButton content={"Thêm phần quà"} colorHex={"#40BEE5"}/>
                    </div>
                    <div className="flex justify-center items-center my-2 w-[300px] text-white cursor-pointer drop-shadow-lg">
                        <SingleColorButton content={"Hủy giải thưởng"} colorHex={"#FF6262"}/>
                    </div>
                        {/* line */}
                    <div class="w-[90%] max-w-sm">
                        <Line />
                    </div>

                    <div className="flex justify-center items-center mb-2 mt-1 w-[300px] cursor-pointer drop-shadow-lg">
                        <SingleColorButton content={"Thêm giải thưởng"} colorHex={"#40BEE5"}/>
                    </div>
                </div>

                <div className="pb-4 w-[300px] drop-shadow-lg">
                    <BgBlueButton content={"ĐĂNG KÝ SỰ KIỆN"} islink={true} href={"_eventdetail"} />
                </div>
            
            </div>
    )
}
export default EventRewardRegister
