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
    const [username, setUsername] = useState("vutan");
    const [email, setEmail] = useState("vutan@gmail.com")
    const auth = useAuth();
    const [user, setUser] = useState();
    const emailUser = auth.currentUser.email;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [textState, setTextState] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isHidden, setHidden] = useState(show);

    const handleSaveInfo = (event) => {
        event.preventDefault();

        const dbRef = ref(db);

        get(child(dbRef, "users/")).then((snapshot) => {
    function handleSaveInfo(name) {
        //validation
        if (isEmpty(name)) {
            setTextState(messagesError.E0001("Tên đăng nhập"));
            setIsSuccess(false);
            setHidden(hidden);
            return;
        }
        if (hasWhiteSpaceAndValidLength(name)) {
            setTextState(messagesError.E0004);
            setIsSuccess(false);
            setHidden(show);
            // console.log(messagesError.E0005("Tên đăng nhập"));
            return;
        }

        //update 
        // const que = query(ref(db, "users"), orderByChild("name"), equalTo(name));
        // onValue(que, (snapshot) => {
        //     const record = snapshot.val() ?? [];
        //     const values = Object.values(record);
        //     if (values.length == 0) {
        //         update(ref(db, 'users/' + user.userId),
        //             {
        //                 name: name
        //             }).then(() => {
        //                 setTextState(messagesSuccess.I0003);
        //                 setIsSuccess(true);
        //                 setHidden(show);
        //             })
        //             .catch((error) => console.log(error));
        //     }
        // }

        get(child(ref(db), "users/")).then((snapshot) => {
            const record = snapshot.val() ?? [];
            const values = Object.values(record);
            
            console.log(values);
            });


            const isExisting = values.some(
                x => x.name == name
            )

            if (!isExisting) {
                update(ref(db, 'users/' + user.userId),
                    {
                        name: name
                    }).then(() => {
                        setTextState(messagesSuccess.I0003);
                        setIsSuccess(true);
                        setHidden(show);
                    })
                    .catch((error) => console.log(error));
            }
        }
        );
    }

    function updateUser(user) {
        setUser(user);
        console.log(user);
    }
    const closePopup = () => {
        setHidden(hidden);
        console.log(isHidden)
    };

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
            {/* <div className=" relative h-full w-full">
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
                                rightColor={!hasWhiteSpaceAndValidLength(username) ? RIGHT_COLOR : FAIL_RIGHT_COLOR}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username} />
                            <AuthInput
                                content={"Email"}
                                type={"email"}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} />
                            <BgBlueButton content={"LƯU"} onClick={handleSaveInfo} />
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
                            <BgBlueButton content={"LƯU"} onClick={(e) => { handleSaveInfo(username) }} />
                        </div>

                        <div className="absolute bottom-20 w-full max-w-md w-3/4  text-center lg:text-left ">
                            <div className="w-full h-[50px] rounded-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] p-[2px]">
                                <Link href={"/auth/change-password"}>

                                    <button className="w-full h-full rounded-[48px] bg-white flex items-center justify-center gap-[10px]">
                                        <p className="font-[900] text-[22px] text-white">ĐỔI MẬT KHẨU</p>
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
            </div> */}
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