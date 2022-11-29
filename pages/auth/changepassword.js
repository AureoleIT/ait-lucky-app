import React, { useState } from "react";
import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { auth } from "src/firebase";
export default function ChangePassword() {
  const [oldPass, setOld] = useState("");
  const [newPass, setNew] = useState("");
  const [repeatPass, setRepeat] = useState("");

  const db = getDatabase();

  const handleSaveInfo = (event) => {
    event.preventDefault();

    const dbRef = ref(db);

    console.log(dbRef);
  };

  return (
    <section className="h-screen overflow-y-hidden">
      <Header />
      <div className="relative h-full ">
        <div className="flex xl:justify-center lg:justify-center justify-center items-center h-full">
          <div className="absolute top-10 flex flex-col w-full max-w-md w-3/4 md:mb-0">
            <div className="flex flex-col justify-center items-center">
              <p className="text-lg mb-0 font-bold text-[#004599] mt-2 ">
                ĐỔI MẬT KHẨU
              </p>
            </div>

            <div className="">
              <AuthInput
                content={"Mật khẩu cũ"}
                type={"password"}
                onChange={(e) => setOld(e.target.value)}
              />
              <AuthInput
                content={"Mật khẩu mới"}
                type={"password"}
                onChange={(e) => setNew(e.target.value)}
              />
              <AuthInput
                content={"Nhập lại mật khẩu"}
                type={"password"}
                onChange={(e) => setRepeat(e.target.value)}
              />
              <BgBlueButton content={"LƯU"} onClick={handleSaveInfo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
