/* eslint-disable no-unused-vars */
import { useState } from 'react'

import BgBlueButton from "public/shared/BgBlueButton"
import SpecialRewardInfo from "public/shared/SpecialRewardInfo"
import Line from "public/shared/Line"

function EventDetail () {

    const [eventID, setEventID] = useState("EV20221011")

    const wrapperBorder = {
        border:"2px solid #40bee5",
    }

    const optionStyles = {
        background:"#40BEE5"
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="uppercase text-4xl py-2 font-bold text-[#004599]">tiệc cuối năm</h1>
            <div className="flex justify-between w-[300px]">
                <h1 className="uppercase text-xl py-2 mb-1 font-bold text-[#004599]">mã sự kiện</h1> 
                <h1 className='uppercase text-xl py-2 font-bold text-[#004599]'>{eventID}</h1>
            </div>

           
            {/* rewards information */}

            <h1 className="uppercase text-[#004599] font-bold mb-1 text-[20px]">thông tin giải thưởng</h1>
            <div class="w-[90%] max-w-sm">
                <Line />
            </div>
            <div className="flex flex-col overflow-x-hidden overflow-y-auto justify-center items-center w-[340px] h-[350px] my-2">
                <div className="my-2 w-full h-full flex flex-col max-h-[350px]">
                    <SpecialRewardInfo  rewardName={"giải đặc biệt"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                </div>
            </div>

            <div class="w-[90%] max-w-sm">
               <Line />
            </div>

            <div className="flex items-center w-full justify-center mb-2">
                <div className="">
                    <h1 className="uppercase text-[#004599] font-bold mb-1">thời gian check in</h1>
                </div>
                <div className="text-white ml-3 w-[100px] h-[30px]" style={optionStyles}>
                    <select style={optionStyles} className="outline-none w-full h-full">
                        <option>5 phút</option>
                        <option>10 phút</option>
                        <option>15 phút</option>
                        <option>20 phút</option>
                    </select>
                </div>
            </div>
            <div className="w-[90%] flex justify-center">
                <div className="w-[340px] mr-1 drop-shadow-lg">
                    <BgBlueButton content={"CHUẨN BỊ"} islink={true} href={"_countdowncheckin"}/>
                </div>
            </div>
        </div>
    )
}

export default EventDetail