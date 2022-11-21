/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"

import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import ImageCustom from "public/shared/ImageCustom";
import Line from "public/shared/Line";
import SingleColorButton from "public/shared/SingleColorButton";


function EventRewardRegister () {
 
    // router
    const router = useRouter()

    const [giftCount, setGiftCount] = useState(1)
    const [giftName, setGiftName] = useState("")
    const [imgList, setImgList] = useState([])
    const [file, setFile] = useState()

    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    }
    // icon plus/minus
    const icon = {
        width:"32px",
        height:"32px",
        margin:"0 12px",
    }

    const iconStyle = {
        color:"white",
        fontSize:"24px"
    }

    const buttonColor = {
        background:"#40BEE5"
    }

    useEffect(() =>
    {
        setImgList(prev => 
            {
                let newImgList = []
                if(file !== undefined)
                {
                    newImgList = [...prev, <ImageCustom image={file}/>]
                }
                return newImgList
        })
    },[file])

    const handleChangeFile = (e) =>
    {
        const upload = e.target.files[0]
        setFile(URL.createObjectURL(upload))

        let toggle = document.getElementById("toggleIMG")
        toggle.style.display = "flex"
    }
    
    const getImage = (e) =>
    {
        document.getElementById("getFile").click()
    }

    const handleNavigate = () =>
    {
        if(giftName !== "")
        {
            router.push("/event/eventdetail")
        }
    }

    return (
            <div className="flex flex-col items-center justify-between w-screen h-screen py-2">
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="uppercase text-xl py-2 mb-2 font-bold text-[#004599]">thông tin giải thưởng</h1>
                    <div className="flex w-[90%] lg:w-4/12 max-w-xl">
                        <div className="flex flex-col justify-evenly mr-4">
                            <i className="fas fa-angle-up cursor-pointer"></i>
                            <i className="fas fa-angle-down cursor-pointer"></i>
                        </div>
                        <div className="w-full">
                            <AuthInput content={"Tên giải thưởng"} type={"text"} onChange={(e) => setGiftName(e.target.value)}/>
                        </div>
                    </div>

                    <div className="flex justify-evenly items-center w-full lg:w-4/12 mt-1 mb-4 lg:justify-center">
                        <label className="font-bold" style={contentCSS}>Số lượng</label>
                        <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                            <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setGiftCount(Math.max(giftCount - 1, 1))}></i>
                            <label>{giftCount}</label>
                            <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setGiftCount(giftCount + 1)}></i>
                        </div>
                    </div>

                    <div className="w-[90%] lg:w-4/12 max-w-xl flex mb-2">
                        <Line content={"Hình ảnh giải thưởng"}/>
                    </div>

                    <div className="flex w-[90%] lg:w-4/12 max-w-xl mb-2 overflow-x-auto overflow-y-hidden ">
                        <div className="w-full mb-2 hidden" id="toggleIMG">
                            {
                                imgList.map((item,index) =>
                                {
                                    return (
                                        <div key={index} className="mx-2 ">
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="w-[90%] lg:w-4/12 max-w-xl">
                        <button className="flex justify-evenly items-center w-full h-[35px] rounded-[5px]" style={buttonColor} onClick={getImage}>
                            <div className="font-[900] text-[24px] text-white">Thêm hình ảnh</div>
                            <i className="fas fa-image" style={iconStyle}></i>
                        </button>
                        <input type={"file"} id={"getFile"} onChange={handleChangeFile} style={{display:"none"}}/>
                    </div>

                    <div className="w-[90%] lg:w-4/12 max-w-xl flex mb-2">
                        <Line />
                    </div>

                    <div className="flex justify-center items-center mb-2 mt-1 w-[90%] lg:w-4/12 max-w-xl cursor-pointer drop-shadow-lg">
                        <SingleColorButton content={"Thêm giải thưởng"} colorHex={"#40BEE5"} />
                    </div>

                </div>

                <div className="pb-4 w-11/12 lg:w-4/12 drop-shadow-lg max-w-xl">
                    <BgBlueButton content={"ĐĂNG KÝ SỰ KIỆN"} onClick={handleNavigate}/>
                </div>
            </div>
    )
}
export default EventRewardRegister

