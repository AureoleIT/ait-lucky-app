import Auth from "layouts/Auth.js";
import React, { useState,  useEffect } from "react";
import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import Link from "next/link";
import { AuthContext } from "src/context/AuthContext";
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    orderByKey,
    query,
    orderByChild,
} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Setting() {
    const db = getDatabase();
    const auth = getAuth();

    const gradientText = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
    }

    const [username, setUsername] = useState("vutan");
    const [email, setEmail] = useState("vutan@gmail.com")

    const handleSaveInfo = (event) => {
        event.preventDefault();

        const dbRef = ref(db);

        get(child(dbRef, "users/")).then((snapshot) => {
            const record = snapshot.val() ?? [];
            const values = Object.values(record);
            
            console.log(values);
            });

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
                            <AuthInput
                                content={"Tên đăng nhập"}
                                type={"text"}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username} />
                            <AuthInput
                                content={"Email"}
                                type={"email"}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} />
                            <BgBlueButton content={"LƯU"} islink={true} href={"/"} onClick={handleSaveInfo} />
                        </div>

                        <div className="absolute bottom-20 w-full max-w-md w-3/4  text-center lg:text-left ">
                            <div className="w-full h-[50px] rounded-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] p-[2px]">
                                <Link href={"/changepassword"}>

                                    <button className="w-full h-full rounded-[48px] bg-white flex items-center justify-center gap-[10px]">
                                        <p className="font-[900] text-[22px] text-white" style={gradientText}>ĐỔI MẬT KHẨU</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="lightblue" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>

                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

Setting.layout = Auth;