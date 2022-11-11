import React, { createContext, useState } from "react";
import Link from 'next/link'

import { MoreGift } from "components/JoinEvent/MoreGift";
import AuthInput from "public/shared/AuthInput";
import TextArea from "public/shared/TextArea";
import BgBlueButton from "public/shared/BgBlueButton";
import BgRedButton from "public/shared/BgRedButton";
import ButtonWithIcon from "public/shared/ButtonWithIcon";


function EventRewardRegister () {
    
    const [giftCount, setGiftCount] = useState(0)

    const [giftList, setGiftList] = useState([])

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
    // label absolute
    const label = {
        transform: "translateY(-50%)",
        background: "white",
        padding:"0 10px",
        margin: "0 20px",
    }
    // div border top relative
    const border = {
        "border-top":"1px solid rgb(37, 99, 235)",
    }
    // hr style
    const hrStyle =
    {
        border: "1px solid rgb(37, 99, 235)"
    }
    // logic
    const handleAddGift = () =>
    {
        setGiftList([...giftList, <MoreGift />])
    }

    const handleDeleteGift = () =>
    {

    }

    return (
            <div className="flex flex-col items-center justify-evenly h-screen w-screen">
                <div className="flex flex-col items-center justify-center h-full max-w-[300px]">
                    <h1 className="uppercase text-4xl py-2 font-bold" style={contentCSS}>đăng ký</h1>
                    <h1 className="uppercase text-xl py-2 mb-2 font-bold"  style={contentCSS}>thông tin giải thưởng</h1>
                    {/* gift name */}

                    <AuthInput content={"Tên giải thưởng"} type={"text"} />

                    <div className="flex justify-evenly w-full my-2 lg:justify-center">
                        <label style={contentCSS}>Số lượng</label>
                        <div className="flex justify-between items-center text-lg">
                            <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setGiftCount(giftCount - 1)}></i>
                            {giftCount}
                            <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setGiftCount(giftCount + 1)}></i>
                        </div>
                    </div>
                    {/* gift detail */}
                    <div className="relative my-3 w-[90%] lg:w-6/12" style={border}>
                        <label className="absolute top-0" style={label}><p style={contentCSS}>Phần quà</p></label>
                    </div>
                    <div className="overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center max-h-[250px] w-full max-w-[300px]">
                        <div className="flex py-3 justify-between items-center relative w-full">
                            <TextArea  content={"Mô tả phần quà"} row={"3"}/>
                            <i className="fas fa-trash text-red-600 cursor-pointer px-[1rem]" onClick={handleDeleteGift}></i>
                        </div>
                        <ButtonWithIcon content={"Thêm hình ảnh"} classIcon={"fas fa-image"}/>
                        {
                            giftList.map((item) =>
                            {
                                return item
                            })
                        }
                    </div>
                    {/* gift event */}
                    <hr className="my-2 w-6/12" style={hrStyle}/>
                    <div className="flex justify-center items-center my-2 w-[300px] cursor-pointer" onClick={handleAddGift}>
                        <BgBlueButton content={"Thêm phần quà"}/>
                    </div>
                    <div className="flex justify-center items-center my-2 w-[300px] text-white cursor-pointer">
                        <BgRedButton content={"Hủy giải thưởng"}/>
                    </div>
                    <hr className="my-2 w-6/12" style={hrStyle}/>
                    <div className="flex justify-center items-center my-2 w-[300px] cursor-pointer">
                        <BgBlueButton content={"Thêm giải thưởng"}/>
                    </div>
                </div>
            
                {/* create event */}
                <div className="flex items-center justify-center w-[300px] my-[2rem]">
                        <BgBlueButton content={"Đăng ký sự kiện"} islink={true} href={"_eventdetail"} />
                </div>
            </div>
    )
}
export default EventRewardRegister
