import React, { useState, useEffect, useMemo } from "react";
import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import { LEFT_COLOR, RIGHT_COLOR, FAIL_RIGHT_COLOR } from "public/util/colors";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  update,
  onValue,
  child,
  get
} from "firebase/database";
import { successIcon, failIcon } from "public/util/popup";
import { isEmpty, hasWhiteSpaceAndValidLength } from "public/util/functions";
import { messagesError, messagesSuccess } from "public/util/messages"
import OverlayBlock from "public/shared/OverlayBlock";
import { db } from "src/firebase";
import { useUserPackageHook } from "public/redux/hooks";

export default function ChangePassword() {
  const [oldPass, setOld] = useState("");
  const [newPass, setNew] = useState("");
  const [repeatPass, setRepeat] = useState("");
  const user = useUserPackageHook();

  //validation const
  const [textState, setTextState] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const showMethod = useMemo(() => (message, isSuccess, isHidden) => {
    setTextState(message);
    setIsSuccess(isSuccess);
    setIsHidden(isHidden);
  }, [])


  const changePassword = () => {
    if (isEmpty(oldPass) || isEmpty(newPass) || isEmpty(repeatPass)) {
      showMethod(messagesError.E0004, false, false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(oldPass)) {
      showMethod(messagesError.E0005("mật khẩu cũ"), false, false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(newPass)) {
      showMethod(messagesError.E0005("mật khẩu mới"), false, false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(repeatPass)) {
      showMethod(messagesError.E0005("nhập lại mật khẩu"), false, false);
      return;
    }

    if (newPass != repeatPass) {
      showMethod(messagesError.E0021("mật khẩu mới", "nhập lại mật khẩu"), false, false);
      return;
    }

    // check old pass
    const que = query(ref(db, "users"), orderByChild("email"), equalTo(user.email));
    get(que).then((snapshot) => {
      const record = snapshot.val() ?? [];
      const values = Object.values(record);

      if (values[0].password != oldPass) {
        showMethod(messagesError.E0011("Mật khẩu cũ"), false, false);
        return;
      } else {
        update(ref(db, 'users/' + values[0].userId),
          {
            password: newPass
          }).then(() => {
            showMethod(messagesSuccess.I0003, true, false);
            console.log("???")
            return;
          })
          .catch((error) => {
            showMethod(error, false, false);
            return;
          });
      }
    })
  }

  // show popup
  useEffect(() => {
    if (isHidden == false) {
      console.log(textState);
      isSuccess ? document.getElementById("imgPopup").src = successIcon : document.getElementById("imgPopup").src = failIcon;
      document.getElementById("textState").innerHTML = textState;
      document.getElementById("changeOverlay").classList.toggle('hidden');
      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 1000)
      return () => { clearTimeout(timer) }
    }
  }, [isHidden])


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
        <OverlayBlock childDiv={popupNoti} id={"changeOverlay"} />
      </div>
    </section>
  );
}
