import React from "react";
import { TEXT } from "../colors";
export default function LineWithText({ text, leftColor, rightColor }) {
  return (
    <div className="w-1/2 max-w-sm justify-center items-center flex mb-5 flex-row">
      <div className={`flex-grow h-px ${leftColor}`}></div>
      <span className={`mx-2 text-[${TEXT}]`}>{text}</span>
      <div className={`flex-grow h-px ${rightColor}`}></div>
    </div>
  );
}
