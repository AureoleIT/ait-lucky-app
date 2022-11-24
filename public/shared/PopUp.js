import React from "react";
import { TEXT } from "public/util/colors";
import ClosePopUp from "./ClosePopUp";
export default function PopUp({text, icon, close, isWarning}) {
  const bg = isWarning ? "border-red-600" : "border-green-600"; 
  return (
    <div
      className={`h-1/4 w-3/4 max-w-md bg-white border-4 p-5 pb-16 ${bg} 
      shadow-xl shadow-slate-500 rounded-3xl flex flex-col align-middle justify-between`}
    >
      <ClosePopUp closeAction={close}/>
      <span
        className={`font-medium text-xl w-3/4 self-center
               text-[${TEXT}] text-center 
            flex justify-center`}
      >
        {text}
      </span>
      <img
        alt="success"
        src={icon}
        className="self-center w-12"
      ></img>
    </div>
  );
}
