import React from "react";
import { TEXT } from "../util/colors";
export default function AuthFooter({ normalContent, boldContent, href }) {
  return (
    <p
      className={`text-[16px] text-[${TEXT}] w-full absolute bottom-[35px] text-center`}
    >
      <span>{normalContent + " "}</span>
      <a href={href} className="font-bold">
        {boldContent}
      </a>
    </p>
  );
}
