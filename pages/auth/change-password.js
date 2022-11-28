import React, { useState } from "react";
import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import { LEFT_COLOR, RIGHT_COLOR } from "public/util/colors";
import {
    getDatabase,
    ref,
    query,
    orderByChild,
    equalTo,
    update,
    onValue,
    DataSnapshot
} from "firebase/database";
import { useAuth } from "src/context/AuthContext";
import { isEmpty, enoughNumCountPass, hasWhiteSpaceAndValidLength } from "public/util/functions";
import { messagesError, messagesSuccess } from "public/util/messages"

export default function ChangePassword() {
    const db = getDatabase();
    const auth = useAuth();
    const [oldPass, setOld] = useState("");
    const [newPass, setNew] = useState("");
    const [repeatPass, setRepeat] = useState("");


    const changePassword = () => {
        if (isEmpty(oldPass) || isEmpty(newPass) || isEmpty(repeatPass)) {
            console.log(1);
            return;
        }

        if (newPass != repeatPass) {
            //message error
            console.log(2);
            return;
        }

        // check old pass
        const que = query(ref(db, "users"), orderByChild("email"), equalTo(auth.currentUser.email));
        onValue(que, (snapshot) => {
            const record = snapshot.val() ?? [];
            const values = Object.values(record);

            if (values[0].password != oldPass) {
                //message error
                return;
            }

            update(ref(db, 'users/' + values[0].userId),
                {
                    password: newPass
                }).then(() => {

                })
                .catch((error) => console.log(error));
        })
    }


    return (
        <section className="h-screen overflow-y-hidden">
            <Header />
            <div className="relative h-full ">
                <div
                    className="flex xl:justify-center lg:justify-center justify-center items-center h-full"
                >
                    <div className="absolute top-10 flex flex-col w-full max-w-md w-3/4 md:mb-0">
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-lg mb-0 font-bold text-[#004599] mt-2 ">ĐỔI MẬT KHẨU</p>
                        </div>

                        <div className="">
                            <AuthInput content={"Mật khẩu cũ"} type={"password"}
                                leftColor={LEFT_COLOR}
                                rightColor={RIGHT_COLOR}
                                onChange={(e) => setOld(e.target.value)} />
                            <AuthInput content={"Mật khẩu mới"} type={"password"}
                                leftColor={LEFT_COLOR}
                                rightColor={RIGHT_COLOR}
                                onChange={(e) => setNew(e.target.value)} />
                            <AuthInput content={"Nhập lại mật khẩu"} type={"password"}
                                leftColor={LEFT_COLOR}
                                rightColor={RIGHT_COLOR}
                                onChange={(e) => setRepeat(e.target.value)} />
                            <BgBlueButton content={"LƯU"} onClick={() => changePassword()} />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
