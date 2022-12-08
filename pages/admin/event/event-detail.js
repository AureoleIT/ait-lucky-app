/* eslint-disable no-unused-vars */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

import BgBlueButton from "public/shared/BgBlueButton";
import SpecialRewardInfo from "public/shared/SpecialRewardInfo";
import Line from "public/shared/Line";

import testDataAward from "public/util/test";
import Title from "public/shared/Title";


function EventDetail() {
  // router
  const router = useRouter();
  
  // event id (uuid test - apply database later)
  const eventID = useState(uuidv4().slice(0, 8)); 

  // state
  const [countdown, setCountdown] = useState(5);

  const optionStyles = {
    background: "#40BEE5",
  };

  // logic

  const onSetCoundownTime = () => {
    let select = document.getElementById("timer").value;
    setCountdown(select);
  };

  const handlePrepare = () => {
    router.push({
      pathname:"/admin/event/countdown-checkin",
      query:
      {
        countdown
      }
    })
  };

  const handleEditPageNavigation = () => {
    router.push("/admin/event/edit-event-reward-register");
    
  };

    return (
        <div className="flex flex-col justify-evenly items-center h-screen w-screen">
            {/* test event name */}
            <Title title={"tiệc cuối năm"}/> 

            <div className="flex justify-between w-4/5 max-w-xl text-lg">
                <h1 className="uppercase py-2 mb-1 font-bold text-[#004599]">mã sự kiện</h1>
                <h1 className="uppercase py-2 font-bold text-[#004599] tracking-[5px]">{eventID}</h1>
            </div>
            {/* rewards information */}
            <h1 className="uppercase text-[#004599] font-bold mb-1 text-[20px]">thông tin giải thưởng</h1>

            <div className="w-4/5 max-w-xl"> <Line /> </div>

            <div className="flex flex-col overflow-x-hidden overflow-y-auto justify-center items-center w-4/5 max-w-xl h-[350px] my-2">
                <div className="my-2 w-full h-full flex flex-col max-h-[350px]">
                    {
                        testDataAward.map((item, index) => {
                            return (
                                <div key={index}>
                                    <SpecialRewardInfo
                                        rewardName={item.nameAward}
                                        amount={item.amount}
                                        image={item.image}
                                        color={item.color}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className="w-4/5 max-w-xl"> <Line /> </div>

            <div className="flex items-center w-4/5 max-w-xl justify-center mb-2">
                <div className="flex items-center justify-center h-[40px]">
                    <h1 className="uppercase text-[#004599] font-bold mb-1">thời gian check in</h1>
                </div>
                <div className="text-white font-bold ml-3 w-[110px] h-[40px] flex justify-center items-center rounded-[10px] " style={optionStyles}>
                    <select
                        className="w-[90px] h-[30px] bg-transparent outline-none"
                        style={optionStyles}
                        id={"timer"}
                        onChange={onSetCoundownTime}
                    >
                        <option value={"5"}>5 phút</option>
                        <option value={"10"}>10 phút</option>
                        <option value={"15"}>15 phút</option>
                        <option value={"20"}>20 phút</option>
                    </select>
                </div>
            </div>

            <div className="w-4/5 max-w-xl flex justify-center items-center">
                <div className="w-full mr-1 drop-shadow-lg">
                    <BgBlueButton content={"CHUẨN BỊ"} onClick={handlePrepare} />
                </div>

                <div className="w-[50px] h-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] rounded-[50px] ml-1 cursor-pointer drop-shadow-lg" onClick={handleEditPageNavigation}>
                    <i className="fas fa-pen text-white flex justify-center items-center w-full h-full"></i>
                </div>
            </div>
        </div>
    );
    }

    export default EventDetail;
