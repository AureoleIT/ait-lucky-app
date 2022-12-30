/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useCallback, useEffect, useMemo, useState } from "react";
import { LEFT_COLOR, RIGHT_COLOR } from "public/util/colors";
import router from "next/router";
import { db } from "src/firebase";
import { ref, child, get } from "firebase/database";
import { isEmpty } from "public/util/functions";
import { ShowMethod, checkStatus } from "public/util/popup";
import { messagesError, messagesSuccess } from "public/util/messages";
import { useDispatch } from "react-redux";
import { incognitoEvent, incognitoUser, removePlayerState, removeUserPlaying, userCurrentEventPlaying } from "public/redux/actions";
import { usePlayerEventHook, usePlayerParticipantHook, usePopUpMessageHook, usePopUpStatusHook, usePopUpVisibleHook, useUserCurrEventCreatingHook, useUserCurrEventHostingHook, useUserCurrEventPlayingHook, useUserCurrRewardCreatingHook, useUserPackageHook } from "public/redux/hooks";
import { Line, Button, PopUp, WayLog, Logo, Input, QrButton, Title } from "public/shared";
import QrReader from 'react-qr-scanner'
import Trans from "public/trans/hooks/Trans";

export default function Index() {
  const [pin, setPin] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [isShown, setIsShown] = useState(false);
  const trans = Trans();
  const message = usePopUpMessageHook();
  const status = usePopUpStatusHook()
  const visible = usePopUpVisibleHook();

  //Call dispatch from redux
  const dispatch = useDispatch();
  var BG_COLOR =
    "bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";

  const globalUser = useUserPackageHook();
  const userHostingEvent = useUserCurrEventHostingHook();
  const userEventCreating = useUserCurrEventCreatingHook();
  const userRewardCreating = useUserCurrRewardCreatingHook();
  const eventPlaying = useUserCurrEventPlayingHook();

  const participant = usePlayerParticipantHook();
  const playerEvent = usePlayerEventHook();

  useEffect(() => {
    if (participant.participantId && playerEvent.eventId && participant.eventId === playerEvent.eventId) {
      get(child(ref(db), "event/")).then((snapshot) => {
        const record = snapshot.val() ?? [];
        const values = Object.values(record);
        var currEvent = values.find((item) => item.eventId === playerEvent.eventId);
        if (currEvent === undefined || currEvent.delFlag === true) {
          ShowMethod(dispatch, messagesError.E2004, false);
          return;
        }
        switch (currEvent.status) {
          case 1:
            dispatch(removePlayerState());
            dispatch(removeUserPlaying());
            return;
          case 2:
            ShowMethod(dispatch, messagesSuccess.I0008(currEvent.title), true);
            setTimeout(() => {
              router.push("event/countdown-checkin/" + currEvent.eventId);
            }, 500);
            return
          case 3:
            ShowMethod(dispatch, messagesSuccess.I0008(currEvent.title), true);
            setTimeout(() => {
              router.push("event/luckyspin/" + currEvent.eventId);
            }, 500);
            return;
          case 4:
            dispatch(removePlayerState());
            dispatch(removeUserPlaying());
            return;
          default:
            return;
        }
      });
    }
  }, [])


  const onJoinClick = useCallback(() => {
    if (isEmpty(pin)) {
      ShowMethod(dispatch, messagesError.E2002, false);
      return;
    }
    get(child(ref(db), "event/")).then((snapshot) => {
      const record = snapshot.val() ?? [];
      const values = Object.values(record);
      var currEvent = values.find((item) => item.pinCode === pin);
      if (currEvent === undefined || currEvent.delFlag === true) {
        ShowMethod(dispatch, messagesError.E2004, false);
        return;
      }
      if (currEvent.maxTicket <= currEvent.userJoined) {
        ShowMethod(dispatch, messagesError.E2005, false);
        return;
      }
      dispatch(incognitoEvent(currEvent));
      window.localStorage.setItem('EVENT_JOINED_STATE', JSON.stringify(currEvent.eventId));
      if (globalUser.userId) {
        dispatch(userCurrentEventPlaying(currEvent));
      }
      get(child(ref(db), "users/")).then((snapshot) => {
        const record = snapshot.val() ?? [];
        const values = Object.values(record);
        var currUser = values.find((item) => item.userId === currEvent.createBy);
        dispatch(incognitoUser(currUser));
      });
      const path = "/event/join";
      checkStatus(dispatch, router, currEvent.title, currEvent.status, path);
    });
  }, [dispatch, globalUser.userId, pin]);

  const pinData = useCallback(
    (e) => {
      setPin(e?.target?.value);
    }, [setPin]
  );

  const renderLogo = useMemo(() => {
    return (
      <Logo />
    )
  }, [])

  const renderTitle = useMemo(() => {
    return (
      <Title fontSize="text-2xl" fontWeight="font-bold" title={trans.index.title}/>
      )
    }, [])

  const renderInput = useMemo(() => {
    return (
      <Input
        placeHolder={trans.index.inputHolder}
        onChange={pinData}
        type="number"
        primaryColor={LEFT_COLOR}
        secondaryColor={RIGHT_COLOR}
        noContent={true}
      />
    )
  }, [pinData])

  const renderButton = useMemo(() => {
    return (
      <div className="w-full">
        <Button
          content={trans.index.buttonContent}
          onClick={onJoinClick}
          primaryColor={LEFT_COLOR}
          secondaryColor={RIGHT_COLOR}
        />
      </div>
    )
  }, [onJoinClick])

  const renderLine = useMemo(() => {
    return (
      <Line content={trans.index.lineContent} />
    )
  }, [])

  const renderDirect = useMemo(() => {
    return globalUser.userId !== undefined
    ? (
      <div onClick={() => {router.push("/admin/dashboard-admin")}} className="cursor-pointer">
        <Title
          title={trans.index.titleReturn}
          isUnderLine={true}
          isUpperCase={false}
          fontSize="font-bold"
          fontWeight=""
          margin=""
        />
      </div>
    ) 
    : (
      <div>
        <WayLog
          action={trans.index.waylogLogin.action}
          title={trans.index.waylogLogin.title}
          path="/auth/login"
        />
        <WayLog 
          action={trans.index.waylogRegister.action}
          title={trans.index.waylogRegister.title}
          path="/auth/register"
        />
      </div>
    )
  }, [globalUser])

  const renderPopUp = useMemo(() => {
    return (
      <div className={visible}>
          <PopUp
          text={message}
          status={status}
          isWarning={!status}
        />
      </div>
    )
  }, [visible, status, message])

  //============================Scan QR==================
  const handleErrorWebCam = (error) => {
    alert("Can not connect to camera in this device");
    setIsShown(current => !current);
  }

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
      router.push(result?.text);
      return;
    }
  }
  const renderQRscan = useMemo(() => {
    return (
      <div className="flex flex-col justify-center items-center">
                <QrButton onClick={() => {
          if (window.innerWidth > 768) {
            alert(messagesError.E5555)
            return;
          }
          setIsShown(current => !current);
        }} />

{isShown && <QrReader
          delay={300}
          style={{ width: '180px' }}
          constraints={{ audio: false, video: { facingMode: 'environment' } }}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
        />}

{isShown && (
          <div>
            <h3> Scanned  Code: <a href={scanResultWebCam}>{scanResultWebCam}</a></h3>
          </div>)}
      </div>
    )
  }, [isShown, scanResultWebCam])


  return (
    <section className={`h-screen h-min-full w-screen mx-auto flex justify-center items-center ${BG_COLOR}`} >
      <div className={`flex flex-col justify-center items-center max-w-xl w-4/5 h-full h-min-screen `} >
        {renderLogo}
        {renderTitle}
        {renderInput}
        {renderButton}
        {renderLine}
        {renderQRscan}
        {renderDirect}
      </div>
      {renderPopUp}
    </section>
  );
}
