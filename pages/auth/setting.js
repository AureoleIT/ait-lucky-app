import React, { useState, useEffect, useMemo, useCallback } from "react";
import router from "next/router";
import Trans from "public/trans/hooks/Trans";

//firebase
import {
    ref,
    child,
    get,
    update,
} from "firebase/database";
import { storage, db } from "src/firebase";
import {
    ref as refStorage,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

//component
import { Header, Button, Input, OverlayBlock, PageLoading } from "public/shared";

// util
import { messagesError, messagesSuccess } from "public/util/messages"
import { LEFT_COLOR, RIGHT_COLOR, FAIL_RIGHT_COLOR } from "public/util/colors";
import { successIcon, failIcon } from "public/util/popup";
import { isEmpty, hasWhiteSpaceAndValidLength } from "public/util/functions";

//redux
import { useDispatch } from "react-redux";
import { userPackage } from "public/redux/actions";
import { useUserPackageHook } from "public/redux/hooks";

export default function Setting() {
    //redux
    const [user, setUser] = useState(useUserPackageHook());
    const dispatch = useDispatch();

    // normal state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState("http://www.gravatar.com/avatar/?d=retro&s=32");
    const [file, setFile] = useState(null);
    const [loadedData, setLoadedData] = useState(false);

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
    const showMethod = useMemo(() => (message, isSuccess, isHidden) => {
        setTextState(message);
        setIsSuccess(isSuccess);
        setIsHidden(isHidden);
    }, [])
    const transSetting = Trans().setting;

    // popup
    const popupNoti = useMemo(() => {
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
    }, [])

    //get auth profile
    function fetchDb() {
        setUsername(user.name);
        setEmail(user.email);
        if (user.pic !== "")
            setImg(user.pic);
    }

    useEffect(() => {
        if (user === undefined || user.name === undefined) {
            setTimeout(() => {
                router.push("/");
            }, 3000);
            return;
        }

        setTimeout(() => {
            setLoadedData(true);
            fetchDb();
        }, 1200);

    }, [])

    //choose img
    const handleChangeFile = (e) => {
        if (e.target.files.length == 0) {
            return;
        }
        const upload = e.target.files[0]
        console.log(upload);
        setFile(upload);
        setImg(URL.createObjectURL(upload));
    }

    const getImage = (e) => {
        document.getElementById("fileID").click()
    }

    //upload image
    const uploadFile = useCallback(() => {
        const imageRef = refStorage(storage, `avatars/${file.name + v4()}`);
        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                update(ref(db, 'users/' + user.userId),
                    {
                        pic: url
                    }).then(() => {
                        setUser(prev => ({
                            ...prev,
                            pic: url
                        }));
                        showMethod(messagesSuccess.I0003, true, false);
                    })
                    .catch((error) => console.log(error));
            });
        });
    }, [file]);

    // save new profile
    function handleSaveInfo(name) {
        //validation
        if (isEmpty(name)) {
            showMethod(messagesError.E0001("Tên đăng nhập"), false, false);
            return;
        }
        if (hasWhiteSpaceAndValidLength(name)) {
            showMethod(messagesError.E0005("tên đăng nhập"), false, false);
            return;
        }

        // update password
        get(child(ref(db), "users/")).then((snapshot) => {
            const record = snapshot.val() ?? [];
            const values = Object.values(record);

            const isExisting = values.some(
                x => x.name == name
            )

            if (!isExisting) {
                update(ref(db, 'users/' + user.userId),
                    {
                        name: name
                    }).then(() => {
                        setUser(prev => ({
                            ...prev,
                            name: name
                        }));
                        showMethod(messagesSuccess.I0003, true, false);
                    })
                    .catch((error) => console.log(error));
            }

            if (file != null) {
                uploadFile();
            }
        }
        );
    }

    //prevent re-render
    const usernameData = useCallback(
        (e) => {
            setUsername(e?.target?.value.replace(/^\s+|\s+$/gm, ''));
        },
        [setUsername]
    );

    const renderUsername = useMemo(() => {
        return (
            <Input
                content={transSetting.title}
                placeHolder={transSetting.title}
                type={"text"}
                isTextGradient={true}
                primaryColor={LEFT_COLOR}
                secondaryColor={!hasWhiteSpaceAndValidLength(username) ? RIGHT_COLOR : FAIL_RIGHT_COLOR}
                value={username}
                onChange={usernameData}
            />
        )
    }, [username, usernameData])

    const emailData = useCallback(
        (e) => {
            setEmail(e?.target?.value)
        },
        [setEmail]
    )

    const renderEmail = useMemo(() => {
        return (
            <div className={`bg-gradient-to-r from-[${LEFT_COLOR}] to-[${RIGHT_COLOR}] p-[2px] rounded-[10px] w-full h-[60px] py-[2px] mt-4 outline-none relative`}>
                <div className="h-full">
                    <input
                        type={"email"}
                        className="h-full w-full rounded-lg text-lg px-4 outline-none border-none disabled:bg-white"
                        onChange={emailData}
                        value={email}
                        disabled={true}
                        required
                    />
                    <div className="bg-white absolute w-full top-0">
                        <label
                            htmlFor=""
                            className="absolute px-[10px] mx-[15px] bg-white transform translate-y-[-50%] left-0">
                            <p style={contentCSS} className="font-bold text-base">
                                {"Email"}
                            </p>
                        </label>
                    </div>
                </div>
            </div>)
    }, [email, emailData])

    const renderButtonSave = useMemo(() => {
        return (
            <Button content={transSetting.buttonSave}
                primaryColor={LEFT_COLOR}
                secondaryColor={RIGHT_COLOR}
                onClick={() => { handleSaveInfo(username) }}
            />
        )
    }, [handleSaveInfo, username])

    const renderButtonNavi = useMemo(() => {
        return (
            <Button content={transSetting.buttonChangePW}
                primaryColor={"bg-white"}
                secondaryColor={RIGHT_COLOR}
                isTextGradient={true}
                onClick={() => { router.push("/auth/change-password") }}

            />
        )
    }, [handleSaveInfo, username])

    const renderOverlayBlock = useMemo(() => {
        return (
            <OverlayBlock childDiv={popupNoti} id={"profileOverlay"} />
        )
    }, [])

    const renderPageLoading = useMemo(() => {
        return (
            <PageLoading />
        )
    }, [])

    const renderHeader = useMemo(() => {
        return (
            <Header />
        )
    }, [])
    // show popup
    useEffect(() => {
        if (isHidden == false) {
            if (document.getElementById("imgPopup")) {
                isSuccess ? document.getElementById("imgPopup").src = successIcon : document.getElementById("imgPopup").src = failIcon;
                document.getElementById("textState").innerHTML = textState;
                document.getElementById("profileOverlay").classList.toggle('hidden');
                const timer = setTimeout(() => {
                    setIsHidden(true);
                }, 1000)
                return () => { clearTimeout(timer) }
            }
        }
    }, [isHidden])

    useEffect(() => dispatch(userPackage(user)), [user])

    return (
        <>
            {
                <section className="h-screen w-screen overflow-y-hidden">
                    {renderHeader}
                    <div className="h-screen w-full flex flex-col items-center max-w-md mx-auto mt-2">
                        <p className="text-lg mb-2 font-bold text-[#004599]">{transSetting.heading}</p>
                        <div className="w-full max-w-md h-[200px] bg-[url('../public/img/setting_background.svg')] bg-center bg-no-repeat my-0">
                            <div className="relative flex flex-col justify-center items-center">
                                <img src={img}
                                    onClick={(e) => getImage(e)}
                                    alt="" className="w-[100px] h-[100px] rounded object-cover mt-12" />
                                <div className="absolute bottom-0 ml-[72px]" onClick={(e) => getImage(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="w-6 h-6">
                                        <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                                        <path d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type={"file"} id={"fileID"} onChange={handleChangeFile} style={{ display: "none" }} accept="image/*" />
                            </div>
                        </div>

                        <div className="w-[90%] mx-auto my-10">
                            {renderUsername}
                            {renderEmail}
                            {renderButtonSave}
                        </div>

                        <footer className="flex items-end h-full w-full">
                            <div className="pb-24 w-full max-w-md text-center lg:text-left">
                                <div className="w-[90%] h-[50px] mx-auto rounded-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF]">
                                    {renderButtonNavi}
                                </div>
                            </div>
                        </footer>
                    </div>
                    {renderOverlayBlock}
                </section>
            }
        </>

    );
}