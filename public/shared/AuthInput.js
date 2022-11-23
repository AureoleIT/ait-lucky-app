import React, { useState } from "react";

export default function AuthInput({
  content,
  type,
  onChange,
  value,
  min,
  name,
  rightColor,
  leftColor,
}) {
  const contentCSS = {
    background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  };

  return (
    <div
      className={`bg-gradient-to-r from-[${leftColor}] to-[${rightColor}] p-[2px] rounded-[10px] w-full h-[60px] py-[2px] my-4 outline-none relative`}
    >
      <div className="h-full">
        <input
          type={type}
          className="h-full w-full rounded-lg text-lg px-4 outline-none border-none"
          onChange={onChange}
          value={value}
          required
        />
        <div className="bg-white absolute w-full top-0">
          <label
            htmlFor=""
            className="absolute px-[10px] mx-[15px] bg-white transform translate-y-[-50%] left-0"
          >
            <p style={contentCSS} className="font-bold text-base">
              {content}
            </p>
          </label>
        </div>
      </div>
    </div>
  );
}
