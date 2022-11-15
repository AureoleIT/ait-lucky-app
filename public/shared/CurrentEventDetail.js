// layout for page
import Auth from "layouts/Auth.js";
import React, { useState } from "react";
import { Link } from "next/link";
import { useForm } from "react-hook-form";
// import AuthContext from "../../src/context/AuthContext";
// Components
import Logotic from "public/shared/Logotic";
import AuthInput from "public/shared/AuthInput";
import TickBox from "public/shared/TickBox";
import BgBlueButton from "public/shared/BgBlueButton";
import BgWhiteButton from "public/shared/BgWhiteButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
import { useMemo } from "react/cjs/react.development";
import RewardList from "public/shared/RewardList";

export default function CurrentEventDetail() {
    const listPlayer = ["A", "B", "C", "D", "NGUYỄN VĂN E", "F", "G", "H", "I", "K", "L"];
    const listReward = [
        {
            name: "Giải Đặc Biệt",
            color: "#F5F92E",
            amount: 1,
            gifts: [
                {
                    desc: "Xe hơi Mẹc",
                    img: "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI="
                }, {
                    desc: "Xe hơi Mẹc 2",
                    img: "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI="
                }, {
                    desc: "Xe hơi Mẹc 3",
                    img: ""
                }
            ]
        }
    ];

    const [typeList, setTypeList] = useState("List");
    const [expand, setExpand] = useState(false);

    const EventDetailMinimize = (
        <div className="flex flex-col w-full absolute bg-[#40BEE5] h-fit rounded-t-2xl bottom-0 items-center z-999">
            <div className="flex w-14 absolute bg-[#40BEE5] h-7 rounded-t-2xl -top-7 right-6 items-center justify-center">
                <span onClick={() => setExpand(!expand)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white -rotate-90">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className="flex w-full h-14 items-center">
                <p className="w-full text-center items-center uppercase text-white font-[900] text-[20px]">THÔNG TIN SỰ KIỆN</p>
            </div>
        </div>
    )

    const EventDetailExpand = (
        <div className="flex flex-col w-full h-[80%] absolute bg-[#40BEE5] h-fit rounded-t-2xl bottom-0 items-center z-999">
            <div className="flex w-14 absolute bg-[#40BEE5] h-7 rounded-t-2xl -top-7 right-6 items-center justify-center">
                <span onClick={() => setExpand(!expand)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white rotate-90">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className="flex w-full h-14 items-center">
                <p className="w-full text-center items-center uppercase text-white font-[900] text-[20px]">THÔNG TIN SỰ KIỆN</p>
            </div>
            <div className="w-full h-[50%] px-5">
                <RewardList />
            </div>
        </div>
    )

    return (
        <>
            {!expand?EventDetailMinimize:EventDetailExpand}
        </>
    );
}
