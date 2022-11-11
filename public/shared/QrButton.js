import React from "react";
import { TEXT } from "../colors";
export default function QrButton() {
  return (
    <button
      type="button"
      className="w-1/2 max-w-sm flex-col items-center flex mb-5"
      // onClick
    >
      <img
        src={require("../img/qrCode.png")}
        className="w-12 h-12"
        alt="..."
      ></img>
      <span className={`font-medium text-[${TEXT}]`}>Quét mã QR</span>
    </button>
  );
}
