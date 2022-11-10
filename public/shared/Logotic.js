/* eslint-disable jsx-a11y/alt-text */
import React from "react";

export default function Logotic({ src, title }) {
  return (
    <div className="flex flex-col justify-center h-1/3 w-auto">
      <img className=" w-full h-auto mb-2" src={src}></img>
      <span className="mb-5 ml-3 font-bold text-sm uppercase">{title}</span>
    </div>
  );
}
