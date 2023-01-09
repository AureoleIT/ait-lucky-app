import React, { useEffect, useCallback } from "react";
import { TEXT } from "public/util/colors";
import ClosePopUp from "./ClosePopUp";
import { HideMethod } from "public/util/popup";
import { useDispatch } from "react-redux";
import { successIcon, failIcon } from "public/util/popup";

export default function PopUp({ text, status, isWarning }) {
  const bg = isWarning ? "border-red-600" : "border-green-600";
  const dispatch = useDispatch();

  const close = useCallback(() => {
    HideMethod(dispatch)
  }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      HideMethod(dispatch)
      close()
    }, 1)
    return () => { clearTimeout(timer) }
  }, [close, dispatch])

  return (
    <div
      className={`h-max-1/4 h-min-1/3 w-3/4 max-w-md bg-white border-4 p-2 ${bg} 
      shadow-xl shadow-slate-500 rounded-3xl flex flex-col align-middle`}
    >
      <ClosePopUp closeAction={close} />
      <div className="flex flex-col align-middle justify-between">
        <span
          className={`font-medium text-xl w-3/4 self-center
               text-[${TEXT}] text-center 
            flex justify-center`}
        >
          {text}
        </span>
        <img
          alt="success"
          src={status ? successIcon : failIcon}
          className="self-center w-12"
        ></img>
      </div>
    </div>
  );
}