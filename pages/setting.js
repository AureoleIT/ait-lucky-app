
import React, { useState } from "react";
import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import BgWhiteButton from "public/shared/BgWhiteButton";

export default function EventResult() {
    const gradientText = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
    }

    return (
        <section className="h-screen overflow-y-hidden">
            <Header />
            <div className=" relative h-full ">
                <div
                    className="flex xl:justify-center lg:justify-center justify-center items-center h-full"
                >
                    <div className="flex flex-col w-full max-w-md w-3/4  md:mb-0">
                        <div className="absolute top-1 w-full max-w-md w-3/4 mb-10 h-[30%] bg-[url('../public/img/setting_background.svg')] bg-center bg-no-repeat">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg mb-0 font-bold text-[#004599] mt-2 ">THÔNG TIN CÁ NHÂN</p>
                            </div>
                            <div className="flex items-center justify-center h-full">
                                <img src="https://media.istockphoto.com/id/1385769431/photo/young-sad-woman-leaning-on-shopping-cart-while-standing-among-produce-aisle-at-supermarket.jpg?b=1&s=170667a&w=0&k=20&c=fuB2hAboZBVCTUj969LVNt-cvdir7ru2rfVAf5R02Ug="
                                    alt="" className="w-[100px] h-[100px] rounded object-cover "></img>
                            </div>
                        </div>

                        <div className="">
                            <AuthInput content={"Tên đăng nhập"} />
                            <AuthInput content={"Email"} />
                            <BgBlueButton content={"LƯU"} islink={true} href={"/"} />
                        </div>

                        <div className="absolute bottom-20 w-full max-w-md w-3/4  text-center lg:text-left ">
                            <div className="w-full h-[50px] rounded-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] p-[2px]">
                                <button className="w-full h-full rounded-[48px] bg-white flex items-center justify-center gap-[10px]" >
                                    <p className="font-[900] text-[22px] text-white" style={gradientText}>ĐỔI MẬT KHẨU</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightblue" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
