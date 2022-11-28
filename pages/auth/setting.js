import Auth from "layouts/Auth.js";
import React, { useState, useEffect, useContext } from "react";
import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import Link from "next/link";
import { useAuth } from "src/context/AuthContext";
import { auth } from "../../src/firebase";
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    orderByKey,
    query,
    orderByChild,
    equalTo
} from "firebase/database";
import { LEFT_COLOR, RIGHT_COLOR } from "public/util/colors";
import { isEmail } from "public/util/functions";
import { isEmpty } from "@firebase/util";

export default function Setting() {
    const db = getDatabase();

    const userValue = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [check, setCheck] = useState(false);
    const [textState, setTextState] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isHidden, setHidden] = useState(hidden);

    const fetchDb = () => {
        const dbRef = ref(db);
        //get orderbychild - have conditions
        const que = query(ref(db, "users"), orderByChild("email"), equalTo(userValue.currentUser.email))
        get(que).then((snapshot) => {
            const record = snapshot.val() ?? [];
            const values = Object.values(record);
            console.log(values);
            setUsername(values.find(item => item.email == userValue.currentUser.email).name);
            setEmail(userValue.currentUser.email);
        }
        );
        //get all data
        // get(child(dbRef, "users/")).then((snapshot) => {
        //     const record = snapshot.val() ?? [];
        //     const values = Object.values(record);

        //     setUsername(values.find(item => item.email == userValue.currentUser.email).name);
        //     setEmail(userValue.currentUser.email);
        // });
    }

    const handleSaveInfo = (event, username) => {
        event.preventDefault();

        //validation
        if (isEmpty(username))
        {
            setTextState()
        }
        const dbRef = ref(db);
        get(child(dbRef, `users/`)).then((snapshot) => {
            const record = snapshot.val() ?? [];
            const values = Object.values(record);
        });

    }

    useEffect(() => {
        fetchDb();
    }, [])

    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    };

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
                                leftColor={LEFT_COLOR}
                                rightColor={RIGHT_COLOR}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username} />
                            <div
                                className={`bg-gradient-to-r from-[${LEFT_COLOR}] to-[${RIGHT_COLOR}] p-[2px] rounded-[10px] w-full h-[60px] py-[2px] my-4 outline-none relative`}
                            >
                                <div className="h-full">
                                    <input
                                        type={"email"}
                                        className="h-full w-full rounded-lg text-lg px-4 outline-none border-none"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                    <div className="bg-white absolute w-full top-0">
                                        <label
                                            htmlFor=""
                                            className="absolute px-[10px] mx-[15px] bg-white transform translate-y-[-50%] left-0"
                                        >
                                            <p style={contentCSS} className="font-bold text-base">
                                                {"Email"}
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <BgBlueButton content={"LƯU"} onClick={handleSaveInfo} />
                        </div>

                        <div className="absolute bottom-20 w-full max-w-md w-3/4  text-center lg:text-left ">
                            <div className="w-full h-[50px] rounded-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] p-[2px]">
                                <Link href={"/auth/change-password"}>

                                    <button className="w-full h-full rounded-[48px] bg-white flex items-center justify-center gap-[10px]">
                                        <p className="font-[600] text-[20px] text-[#004599]">ĐỔI MẬT KHẨU</p>
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
            <div className={isHidden}>
          <PopUp
            text={textState}
            icon={isSuccess ? successIcon : failIcon}
            close={closePopup}
            isWarning={!isSuccess}
          />
        </div>
        </section>

    );
}

Setting.layout = Auth;