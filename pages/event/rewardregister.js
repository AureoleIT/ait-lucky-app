/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MoreGift } from "components/JoinEvent/MoreGift";

import AuthInput from "public/shared/AuthInput";
import Line from "public/shared/Line";
import BgBlueButton from "public/shared/BgBlueButton";
import SingleColorButton from "public/shared/SingleColorButton";
import ButtonUploadImage from "public/shared/button/ButtonUploadImage"


function EventRewardRegister () {
    
    const [giftCount, setGiftCount] = useState(1)
    const [giftName, setGiftName] = useState("")
    const [giftDetail, setGiftDetail] = useState("")
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
    }

    // logic

    // handle register button
    const handleRegisterButton = () =>
    {
        if(giftName !== "" && giftDetail !== "")
        {
            alert("Thanh cong !!!")
        }
        else 
        {
            alert("Vui lòng nhập đủ thông tin !!!")
        }
    }

    // handle add gift
    const handleAddGift = () =>
    {
        // add gift
        setGiftList([...giftList, <MoreGift />])
    }

    // handle delete gift
    const handleDeleteGift = () =>
    {
        // delete gift
    }

    // handle add reward
    const handleAddReward = () =>
    {

    }

    return (
            <div className="flex flex-col items-center justify-evenly w-screen h-screen py-2">
                <div className="flex flex-col items-center h-full w-full">
                    <h1 className="uppercase text-4xl py-1 font-bold text-[#004599]">đăng ký</h1>
                    <h1 className="uppercase text-xl py-2 mb-2 font-bold text-[#004599]">thông tin giải thưởng</h1>
                    {/* gift name */}

                    <div className="w-[90%] max-w-xl lg:w-4/12">
                        <AuthInput content={"Tên giải thưởng"} type={"text"} value={giftName} onChange={(e) => setGiftName(e.target.value)} />
                    </div>

                    <div className="flex justify-evenly items-center w-full mt-1 mb-2 lg:justify-center">
                        <label className="font-bold" style={contentCSS}>Số lượng</label>
                        <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                            <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setGiftCount(giftCount - 1)}></i>
                            <label>{giftCount}</label>
                            <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setGiftCount(giftCount + 1)}></i>
                        </div>
                    </div>
                    {/* gift detail */}
                        {/* line */}
                    <div className="w-[90%] lg:w-4/12 mb-2 max-w-xl">
                        <Line content={"Phần quà"}/>
                    </div>

                    <div className="flex flex-col w-[90%] max-w-xl my-1 h-[220px] max-h-[250px]">
                        <div className="h-full w-full flex justify-evenly">
                            <div className="flex flex-col w-[10%] lg:w-[20%] h-full justify-between items-center text-[24px] leading-[3rem] text-[#003B93]">
                                <i className="fas fa-angle-up cursor-pointer"></i>
                                <i className="fas fa-angle-down cursor-pointer"></i>
                            </div>
                            <div className="ml-3 w-[90%] lg:w-[80%] h-full overflow-auto">
                                <MoreGift value={giftDetail} onChange={(e) => setGiftDetail(e.target.value)}/>
                                {giftList.map((item) =>
                                {
                                    return item
                                })}
                            </div>
                        </div>

                        {/* handleDelete using Real-time database and remove with todo have unique key uid(npm i uid) */}

                    </div>
                    {/* gift event */}
                        {/* line */}
                    <div className="w-[90%] lg:w-4/12 max-w-xl">
                       <Line />
                    </div>

                    <div className="flex justify-center items-center my-2 w-[90%] lg:w-4/12 max-w-xl cursor-pointer drop-shadow-lg">
                        <SingleColorButton content={"Thêm phần quà"} colorHex={"#40BEE5"} onClick={handleAddGift} />
                    </div>
                    <div className="flex justify-center items-center my-2 w-[90%] lg:w-4/12 max-w-xl text-white cursor-pointer drop-shadow-lg">
                        <SingleColorButton content={"Hủy giải thưởng"} colorHex={"#FF6262"} onClick={handleDeleteGift}/>
                    </div>
                        {/* line */}
                    <div className="w-[90%] lg:w-4/12 max-w-xl">
                        <Line />
                    </div>

                    <div className="flex justify-center items-center mb-2 mt-1 w-[90%] lg:w-4/12 max-w-xl cursor-pointer drop-shadow-lg">
                        <SingleColorButton content={"Thêm giải thưởng"} colorHex={"#40BEE5"} onClick={handleAddReward} />
                    </div>
                </div>

                <div className="pb-4 w-11/12 lg:w-4/12 drop-shadow-lg max-w-xl" onClick={handleRegisterButton}>
                    {/* <BgBlueButton content={"ĐĂNG KÝ SỰ KIỆN"} islink={true} href={"eventdetail"} /> */}
                    {
                        (giftName !== "" && giftDetail !== "") ? (
                            <BgBlueButton content={"ĐĂNG KÝ SỰ KIỆN"} islink={true} href={"eventdetail"} />
                        ) : (
                            <BgBlueButton content={"ĐĂNG KÝ SỰ KIỆN"} islink={false} />
                        )
                    }
                </div>
            
            </div>
    )
}
export default EventRewardRegister
