import React, { useState, useEffect } from "react";
import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import { LEFT_COLOR, RIGHT_COLOR, FAIL_RIGHT_COLOR } from "public/util/colors";
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
import { successIcon, failIcon } from "public/util/popup";
import { isEmpty, enoughNumCountPass, hasWhiteSpaceAndValidLength } from "public/util/functions";
import { messagesError, messagesSuccess } from "public/util/messages"
import OverlayBlock from "public/shared/OverlayBlock";


export default function ChangePassword() {
  const db = getDatabase();
  const auth = useAuth();
  const [oldPass, setOld] = useState("");
  const [newPass, setNew] = useState("");
  const [repeatPass, setRepeat] = useState("");

  //validation const
  const [textState, setTextState] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);


  const changePassword = () => {
    if (isEmpty(oldPass) || isEmpty(newPass) || isEmpty(repeatPass)) {
      setTextState(messagesError.E0004);
      setIsSuccess(false);
      setIsHidden(false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(oldPass)) {
      setTextState(messagesError.E0005("mật khẩu cũ"));
      setIsSuccess(false);
      setIsHidden(false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(newPass)) {
      setTextState(messagesError.E0005("mật khẩu mới"));
      setIsSuccess(false);
      setIsHidden(false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(repeatPass)) {
      setTextState(messagesError.E0005("nhập lại mật khẩu"));
      setIsSuccess(false);
      setIsHidden(false);
      return;
    }

    if (newPass != repeatPass) {
      setTextState(messagesError.E0021("mật khẩu mới", "nhập lại mật khẩu"));
      setIsSuccess(false);
      setIsHidden(false);
      return;
    }

    // check old pass
    const que = query(ref(db, "users"), orderByChild("email"), equalTo(auth.currentUser.email));
    onValue(que, (snapshot) => {
      const record = snapshot.val() ?? [];
      const values = Object.values(record);

      if (values[0].password != oldPass) {
        setTextState(messagesError.E0011("Mật khẩu cũ"));
        setIsSuccess(false);
        setIsHidden(false);
        return;
      }

      update(ref(db, 'users/' + values[0].userId),
        {
          password: newPass
        }).then(() => {
          setTextState(messagesSuccess.I0003);
          setIsSuccess(true);
          setIsHidden(false);
          return;
        })
        .catch((error) => {
          setTextState(error);
          setIsSuccess(false);
          setIsHidden(false);
          return;
        });
    })
  }

  // show popup
  useEffect(() => {
    console.log(isHidden)
    if (isHidden == false) {
      isSuccess ? document.getElementById("imgPopup").src = successIcon : document.getElementById("imgPopup").src = failIcon;
      document.getElementById("textState").innerHTML = textState;
      document.getElementById("changeOverlay").classList.toggle('hidden');
      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 1000)
      return () => { clearTimeout(timer) }
    }
  }, [isHidden])


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
                rightColor={!hasWhiteSpaceAndValidLength(oldPass) ? RIGHT_COLOR : FAIL_RIGHT_COLOR}
                onChange={(e) => setOld(e.target.value)} />
              <AuthInput content={"Mật khẩu mới"} type={"password"}
                leftColor={LEFT_COLOR}
                rightColor={!hasWhiteSpaceAndValidLength(newPass) ? RIGHT_COLOR : FAIL_RIGHT_COLOR}
                onChange={(e) => setNew(e.target.value)} />
              <AuthInput content={"Nhập lại mật khẩu"} type={"password"}
                leftColor={LEFT_COLOR}
                rightColor={!hasWhiteSpaceAndValidLength(repeatPass) ? RIGHT_COLOR : FAIL_RIGHT_COLOR}
                onChange={(e) => setRepeat(e.target.value)} />
              <BgBlueButton content={"LƯU"} onClick={() => changePassword()} />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <BgBlueButton content={"LƯU"} onClick={() => changePassword()} />
        <OverlayBlock childDiv={popupNoti()} id={"changeOverlay"} />
      </div>
    </section>
  );
}
