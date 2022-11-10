import React from "react";
import { TEXT } from "../colors";
export default function BigText({text}) {
  return (
    <p className={`text-[${TEXT}] text-3xl font-bold uppercase mb-5`}>{text}</p>
  );
}
