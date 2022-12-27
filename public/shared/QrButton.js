import React from "react";
import { TEXT } from "../util/colors";
export default function QrButton({ onClick }) {
  return (
    <button
      type="button"
      className="w-1/2 max-w-sm flex-col items-center flex mb-5 md:cursor-not-allowed"
      onClick={onClick}
    >
      {/* <input type="file" accept="image/*;capture=camera" /> */}
      <img
        src={require("../img/qrCode.png")}
        className="w-12 h-12"
        alt="..."
      ></img>
      <p className={`font-medium text-[${TEXT}]`}>Quét mã QR</p>
    </button>
  );
}
