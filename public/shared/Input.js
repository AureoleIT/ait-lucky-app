import React from "react";

export default function Input({
  content, // Nội dung hiển thị trên Input
  isTextGradient = false,
  labelFor, // Nội dung được điền vào input sẽ được gán cho label này
  noContent = false, // Nếu là True thì Input sẽ không có label và placeHolder được hiển thị ở giữa Input
  placeHolder = "", // Mô tả/giải thích cho nội dung được nhập vào input
  type, // Loại input
  primaryColor, // Thay thế cho leftColor ở component AuthInput cũ
  secondaryColor, // Thay thế cho rightColor ở component AuthInput cũ
  value,
  onChange,
  children,
}) {
  const contentCSS = {
    background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  return (
    <div
      className={`bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] p-[2px] rounded-[10px] w-full min-h-[60px] py-[2px] my-4 outline-none relative`}
    >
      <div className="h-full">
        <input
          type={type}
          className={`min-h-full w-full rounded-lg text-lg px-4 outline-none border-none ${
            noContent ? "text-center" : ""
          } ${children ? "hidden" : ""}`}
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          required
        />
        <div className="bg-white absolute w-full top-0">
          <label
            htmlFor={labelFor}
            className="absolute px-[10px] mx-[15px] bg-white transform translate-y-[-50%] left-0"
          >
            <p
              style={isTextGradient ? contentCSS : {}}
              className={`font-bold text-base ${noContent ? "hidden" : ""}`}
            >
              {content}
            </p>
          </label>
        </div>
        <div className={children ? "bg-white rounded-lg px-5" : ""}>
          {children}
        </div>
      </div>
    </div>
  );
}
