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
import { storage } from "src/firebase";
import {
    ref as refStorage,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { LEFT_COLOR, RIGHT_COLOR, FAIL_RIGHT_COLOR } from "public/util/colors";
import { successIcon, failIcon } from "public/util/popup";
import OverlayBlock from "public/shared/OverlayBlock";
import { isEmpty, hasWhiteSpaceAndValidLength } from "public/util/functions";
import { setEmitFlags } from "typescript";

export default function Setting() {
    //firebase auth
    const db = getDatabase();
    const auth = getAuth();
    const [username, setUsername] = useState("vutan");
    const [email, setEmail] = useState("vutan@gmail.com")
    const auth = useAuth();
    const [user, setUser] = useState();
    const emailUser = auth.currentUser.email;

    // normal state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState("http://www.gravatar.com/avatar/?d=retro&s=32");
    const [file, setFile] = useState(null);

    // style css
    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    };

    //validation
    const [textState, setTextState] = useState("");
    const [isHidden, setIsHidden] = useState(true);
    const [isSuccess, setIsSuccess] = useState(true);

    // popup
    const popupNoti = () => {
        return (
            <div className="flex flex-col items-center">
                <div className="text-center text-[#004599]">
                    <p className="font-[900] text-lg" id="textState"></p>
                </div>
                <img
                    id="imgPopup"
                    alt="success"
                    src={failIcon}
                    className="self-center w-12"
                ></img>
            </div>
        )
    }

    //get auth profile
    function fetchDb() {
        
        // get orderbychild - have conditions
        const que = query(ref(db, "users"), orderByChild("email"), equalTo(user.email));
        onValue(que, (snapshot) => {
            const record = snapshot.val() ?? [];
            const values = Object.values(record);
            setUsername(values.find(item => item.email == user.email).name);
            setEmail(user.email)
            if (values[0].pic != "")
                setImg(values[0].pic);
        }
        );
        // get all data
        // get(child(dbRef, "users/")).then((snapshot) => {
        //     const record = snapshot.val() ?? [];
        //     const values = Object.values(record);
        //     setUsername(values.find(item => item.email == userValue.currentUser.email).name);
        //     setEmail(userValue.currentUser.email);
        // });
    }

    //choose img
    const handleChangeFile = (e) => {
        const upload = e.target.files[0]
        setFile(upload);
        setImg(URL.createObjectURL(upload));

        //uploadFile();
    }

    const getImage = (e) => {
        document.getElementById("fileID").click()
    }

    //upload image
    const uploadFile = () => {
        const imageRef = refStorage(storage, `avatars/${file.name + v4()}`);
        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                update(ref(db, 'users/' + user.userId),
                    {
                        pic: url
                    }).then(() => {
                        setTextState(messagesSuccess.I0003);
                        setIsSuccess(true);
                        setIsHidden(false);
                    })
                    .catch((error) => console.log(error));
            });
        });
    };

    // save new profile
    function handleSaveInfo(name) {
        //validation
        if (isEmpty(name)) {
            setTextState(messagesError.E0001("Tên đăng nhập"));
            setIsSuccess(false);
            setIsHidden(false);
            return;
        }
        if (hasWhiteSpaceAndValidLength(name)) {
            setTextState(messagesError.E0005("tên đăng nhập"));
            setIsSuccess(false);
            setIsHidden(false);
            return;
        }

        // update 
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

        // update password
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
                        setIsHidden(false);
                    })
                    .catch((error) => console.log(error));
            }

            if (file != null) {
                uploadFile();
            }
        }
        );
    }

    useEffect(() => {
        fetchDb();
    }, [])
    
    useEffect(() => {
        window.localStorage.setItem('USER_LOGIN_STATE', JSON.stringify(user));
      }, [user]);

    // show popup
    useEffect(() => {
        if (isHidden == false) {
            isSuccess ? document.getElementById("imgPopup").src = successIcon : document.getElementById("imgPopup").src = failIcon;
            document.getElementById("textState").innerHTML = textState;
            document.getElementById("profileOverlay").classList.toggle('hidden');
            const timer = setTimeout(() => {
                setIsHidden(true);
            }, 1)
            return () => { clearTimeout(timer) }
        }
    }, [isHidden])

    useEffect(() => {

    }, [file, img])

    useEffect(() => {

    }, [file, img])


    return (
        <section className="h-screen w-screen overflow-y-hidden">
            <Header />
            <div className=" relative h-full w-full">
                <div
                    className="flex xl:justify-center lg:justify-center justify-center items-center h-full"
                >
                    <div className="flex flex-col w-full max-w-md w-3/4  md:mb-0">
                        <div className="absolute top-1 w-full max-w-md w-3/4 mb-10 h-[30%] bg-[url('../public/img/setting_background.svg')] bg-center bg-no-repeat">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg mb-0 font-bold text-[#004599] mt-2 ">THÔNG TIN CÁ NHÂN</p>
                            </div>
                            <div className="flex flex-col items-center justify-center h-full">
                                <img src={img}

                                    onClick={(e) => getImage(e)}
                                    alt="" className="w-[100px] h-[100px] rounded object-cover " />
                                <input type={"file"} id={"fileID"} onChange={handleChangeFile} style={{ display: "none" }} accept="image/*" />
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
                            <BgBlueButton content={"LƯU"} onClick={() => { handleSaveInfo(username) }} />
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
                    <OverlayBlock childDiv={popupNoti()} id={"profileOverlay"} />
                </div>
            </div>
        </section>

    );
}

Setting.layout = Auth;