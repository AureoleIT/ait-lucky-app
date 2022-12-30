import router from "next/router";
import React from "react";
import { TEXT } from "../util/colors";

export default function AuthFooter({ normalContent, boldContent, href }) {
  return (
    <p
      className={`text-[16px] text-[${TEXT}] self-center mt-8 text-center flex gap-1`}
    >
      <span>{normalContent + " "}</span>
      <div onClick={() => {router.push(href) }} className="font-bold underline cursor-pointer">
        {boldContent}
      </div>
    </p>
  );
}
