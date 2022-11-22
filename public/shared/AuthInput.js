import React from "react";

export default function AuthInput({ content, type, onChange, value, min, name }) {
  const contentCSS = {
    background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div className="bg-gradient-to-r from-[#003B93] to-[#00F0FF] p-[2px] rounded-[10px] w-full h-[60px] py-[2px] my-4 outline-none relative">
      <div className="h-full">
        <input
          name={name}
          type={type}
          className="h-full w-full rounded-lg text-lg px-4 outline-none border-none"
          onChange={onChange}
          value={value}
          required
          min={min}
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