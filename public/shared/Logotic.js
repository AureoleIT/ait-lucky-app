/* eslint-disable jsx-a11y/alt-text */
import React from "react";

export default function Logotic({ src, title }) {
  return (
    <div className="flex flex-col justify-center mb-2 h-1/3 w-auto">
      <img className=" w-full h-auto mb-2" src={src}></img>
    </div>
  );
}
