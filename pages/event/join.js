/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useCallback, useState, useEffect, useMemo } from "react";
import { LEFT_COLOR, RIGHT_COLOR } from "public/util/colors";
import { db } from "./../../src/firebase";
import { HideMethod, ShowMethod } from "public/util/popup";
import { isEmpty } from "public/util/functions";
import { messagesError, messagesSuccess } from "public/util/messages";
import { child, get, ref, set, update } from "firebase/database";
import router from "next/router";
import { useDispatch } from "react-redux";
import { incognitoParticipant, incognitoUser, incognitoEvent, userCurrentEventPlaying } from "public/redux/actions";
import { usePlayerEventHook } from "public/redux/hooks";
import { usePopUpMessageHook, usePopUpStatusHook, usePopUpVisibleHook, useUserPackageHook } from "public/redux/hooks";
import { Title, Logo, Input, Button, PopUp } from "public/shared";

const uuid = require("uuid");
const BG_COLOR = "bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";

export default function Info() {
  const [name, setName] = useState("");
  const globalUser = useUserPackageHook();
  const message = usePopUpMessageHook();
  const status = usePopUpStatusHook()
  const visible = usePopUpVisibleHook();

  //Get pinCode from URL
  let pinCode = new URLSearchParams(window.location.search).get('pinCode')
  console.log(pinCode)


  // Call dispatch from redux
  const dispatch = useDispatch();
  var [player, setPlayer] = useState({});

  // Get current event from previous state get in
  var currEvent = usePlayerEventHook();

  //Get current user logged in and play
  const currUser = useUserPackageHook()

  useEffect(() => {
    if (!currEvent.eventId) {
      router.push("/");
    }
  })

  useEffect(() => {
    if (isEmpty(pinCode)) {
      ShowMethod(dispatch, messagesError.E2002, false);
      return;
    }
    get(child(ref(db), "event/")).then((snapshot) => {
      const record = snapshot.val() ?? [];
      const values = Object.values(record);
      var currEvent = values.find((item) => item.pinCode === pinCode);
      if (currEvent.status !== 2) {
        router.push('/')
      }
      if (currEvent === undefined || currEvent.delFlag === true) {
        ShowMethod(dispatch, messagesError.E2004, false);
        return;
      }
      if ( currEvent.maxTicket === currEvent.userJoined ) { 
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
    });
  }, [dispatch, globalUser.userId, pinCode]);

  const onJoinClick = useCallback(() => {
    if (isEmpty(name) || name.replaceAll(" ", "") === "") {
      ShowMethod(dispatch, messagesError.E0004, false)
      return;
    }
    var id = uuid.v4();
    setName(name.trim());
    var newParticipant = {
      participantId: id,
      createBy: currUser.userId === undefined ? "" : currUser.userId,
      pic: currUser.pic === undefined ? "" : currUser.pic,
      createAt: new Date().getTime(),
      status: 1,
      nameDisplay: name,
      idReward: "",
      eventId: currEvent.eventId,
    };
    set(ref(db, `event_participants/${id}/`), newParticipant)
      .then(() => {

        currEvent.userJoined += 1;
        update(ref(db, `event/${currEvent.eventId}`),
          {
            userJoined: currEvent.userJoined,
          }).then(
            ShowMethod(dispatch, messagesSuccess.I0009, true)
          ).catch((e) => {
            ShowMethod(dispatch, messagesError.E4444, false)
          })
        setPlayer(newParticipant)
        setTimeout(() => {
          HideMethod(dispatch)
          router.push("/event/countdown-checkin/" + currEvent.eventId);
        }, 500);
      })
      .catch((e) => {
        ShowMethod(dispatch, messagesError.E4444, false)
      });
  }, [currEvent, currUser.pic, currUser.userId, dispatch, name]);

  // Set and save new player object to redux
  useEffect(() => {
    dispatch(incognitoParticipant(player));
  }, [currEvent, dispatch, player]);

  /*localStorage is here to track what has been saved*/
  useEffect(() => {
    window.localStorage.setItem('PARTICIPANT_STATE', JSON.stringify(player.participantId));
  }, [player]);

  const setNameData = useCallback(
    (e) => {
      setName(e?.target?.value);
    },
    [setName]
  );

  const renderLogo = useMemo(() => {
    return (
      <Logo />)
  }, [])

  const renderTitle = useMemo(() => {
    return (
      <Title fontSize="text-2xl" fontWeight="font-bold" title="Tên hiển thị" />
    )
  }, [])

  const renderInput = useMemo(() => {
    return (
      <Input
        placeHolder="Vui lòng nhập tên hiển thị"
        onChange={setNameData}
        type="text"
        primaryColor={LEFT_COLOR}
        secondaryColor={RIGHT_COLOR}
        noContent={true}
      />
    )
  }, [setNameData])

  const renderButton = useMemo(() => {
    return (
      <div className="w-full mb-4">
        <Button
          content="Tham gia"
          onClick={onJoinClick}
          primaryColor={LEFT_COLOR}
          secondaryColor={RIGHT_COLOR}
        />
      </div>
    )
  }, [onJoinClick])

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

  return (
    <section
      className={`h-screen h-min-full mx-auto flex justify-center items-center ${BG_COLOR}`}
    >
      <div
        className={`flex flex-col justify-center items-center max-w-xl w-4/5 h-full h-min-screen`}
      >
        {renderLogo}
        {renderTitle}
        {renderInput}
        {renderButton}
      </div>
      {renderPopUp}
    </section>
  );
}
