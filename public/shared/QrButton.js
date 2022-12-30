import React from "react";
import { TEXT } from "../util/colors";
import Trans from "public/trans/hooks/Trans";

export default function QrButton({ onClick }) {
  const trans = Trans();
  return (
    <button
      type="button"
      className="max-w-sm flex-col items-center flex mb-5 "
      onClick={onClick}
    >
      {/* <input type="file" accept="image/*;capture=camera" /> */}
      <img
        src={require("../img/qrCode.png")}
        className="w-12 h-12"
        alt="..."
      ></img>
      <p className={`font-medium text-[${TEXT}]`}>{trans.index.QrButton}</p>
    </button>
  );
}
