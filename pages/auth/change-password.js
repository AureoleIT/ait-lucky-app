import React, { useState, useEffect, useMemo, useCallback } from "react";
import router from "next/router";
import Trans from "public/trans/hooks/Trans";

//firebase
import {
  ref,
  query,
  orderByChild,
  equalTo,
  update,
  get
} from "firebase/database";
import { db } from "src/firebase";

//redux
import { useUserPackageHook } from "public/redux/hooks";

//component
import { Button, Header, Input, OverlayBlock, PageLoading, Title } from "public/shared";

//util
import { LEFT_COLOR, RIGHT_COLOR, FAIL_RIGHT_COLOR } from "public/util/colors";
import { successIcon, failIcon } from "public/util/popup";
import { isEmpty, hasWhiteSpaceAndValidLength } from "public/util/functions";
import TransMess from "public/trans/hooks/TransMess";

export default function ChangePassword() {
  const [oldPass, setOld] = useState("");
  const [newPass, setNew] = useState("");
  const [repeatPass, setRepeat] = useState("");
  const user = useUserPackageHook();
  const [loadedData, setLoadedData] = useState(false);

  const changePassTrans = Trans().changePassword

  // language
  const transMess = TransMess();

  //validation const
  const [textState, setTextState] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const showMethod = useMemo(() => (message, isSuccess, isHidden) => {
    setTextState(message);
    setIsSuccess(isSuccess);
    setIsHidden(isHidden);
  }, [])

  //handle change password
  const changePassword = () => {
    if (isEmpty(oldPass) || isEmpty(newPass) || isEmpty(repeatPass)) {
      showMethod(transMess.messagesError.E0004, false, false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(oldPass)) {
      showMethod(transMess.messagesError.E0005(changePassTrans.currPass2), false, false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(newPass)) {
      showMethod(transMess.messagesError.E0005(changePassTrans.newPassword2), false, false);
      return;
    }

    if (hasWhiteSpaceAndValidLength(repeatPass)) {
      showMethod(transMess.messagesError.E0005(changePassTrans.rePassword), false, false);
      return;
    }

    if (newPass != repeatPass) {
      showMethod(transMess.messagesError.E0021(changePassTrans.newPassword2, changePassTrans.rePassword), false, false);
      return;
    }

    // check old pass
    const que = query(ref(db, "users"), orderByChild("email"), equalTo(user.email));
    get(que).then((snapshot) => {
      const record = snapshot.val() ?? [];
      const values = Object.values(record);

      if (values[0].password != oldPass) {
        showMethod(transMess.messagesError.E0011(changePassTrans.currPass), false, false);
        return;
      } else {
        update(ref(db, 'users/' + values[0].userId),
          {
            password: newPass
          }).then(() => {
            showMethod(transMess.messagesSuccess.I0003, true, false);
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
    if (!isHidden == false) {
      isSuccess ? document.getElementById("imgPopup").src = successIcon : document.getElementById("imgPopup").src = failIcon;
      document.getElementById("textState").innerHTML = textState;
      document.getElementById("changeOverlay").classList.toggle('hidden');
      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 1000)
      return () => { clearTimeout(timer) }
    }
  }, [isHidden])

  //check user login
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setTimeout(() => {
        setLoadedData(true);
      }, 1200);
    } else {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [])

  //prevent re-render
  const oldPassData = useCallback(
    (e) => {
      setOld(e?.target?.value.replace(/^\s+|\s+$/gm, ''))
    },
    [setOld]
  )

  const newPassData = useCallback(
    (e) => {
      setNew(e?.target?.value.replace(/^\s+|\s+$/gm, ''))
    },
    [setNew]
  )

  const repeatPassData = useCallback(
    (e) => {
      setRepeat(e?.target?.value.replace(/^\s+|\s+$/gm, ''))
    },
    [setRepeat]
  )

  const renderOldPass = useMemo(() => {
    return (
      <Input
        content={changePassTrans.currPass}
        type={"password"}
        isTextGradient={true}
        primaryColor={LEFT_COLOR}
        secondaryColor={!hasWhiteSpaceAndValidLength(oldPass) ? RIGHT_COLOR : FAIL_RIGHT_COLOR}
        onChange={oldPassData} />
    )
  }, [oldPass, oldPassData])

  const renderNewPass = useMemo(() => {
    return (
      <Input
        content={changePassTrans.newPassword}
        type={"password"}
        isTextGradient={true}
        primaryColor={LEFT_COLOR}
        secondaryColor={!hasWhiteSpaceAndValidLength(newPass) ? RIGHT_COLOR : FAIL_RIGHT_COLOR}
        onChange={newPassData} />
    )
  }, [newPass, newPassData])

  const renderRepeatPass = useMemo(() => {
    return (
      <Input
        content={changePassTrans.confirmPassword}
        type={"password"}
        isTextGradient={true}
        primaryColor={LEFT_COLOR}
        secondaryColor={!hasWhiteSpaceAndValidLength(repeatPass) ? RIGHT_COLOR : FAIL_RIGHT_COLOR}
        onChange={repeatPassData} />
    )
  }, [repeatPass, repeatPassData]
  )

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

  const renderButton = useMemo(() => {
    return (
      <Button
        content={changePassTrans.save}
        onClick={() => changePassword()}
        primaryColor={LEFT_COLOR}
        secondaryColor={RIGHT_COLOR} />
    )
  }, [changePassword])

  const renderTitle = useMemo(() => {
    return (
      <Title title={changePassTrans.heading} />
    )
  }, [])

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

  return (
    <>
      {
        <section className="h-screen overflow-y-hidden">
          {renderHeader}
          <div className="h-full w-[90%] mx-auto">
            <div
              className="flex xl:justify-center lg:justify-center justify-center h-full mt-4"
            >
              <div className="flex flex-col w-full max-w-md md:mb-0">
                <div className="flex flex-col justify-center items-center">
                  {renderTitle}
                </div>

                {renderOldPass}
                {renderNewPass}
                {renderRepeatPass}
                {renderButton}
              </div>
            </div>
          </div>

          <div className="">
            {renderOverlayBlock}
          </div>
        </section>
      }
    </>

  );
}
