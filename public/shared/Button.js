import React from "react";

export default function Button({
  content, // nội dung được hiển thị trên button
  primaryColor, // nếu có cả primary và secondary thì button sẽ có background gradient
  secondaryColor, // nếu không truyền secondaryColor thì button chỉ có background 1 màu, truyền dưới dạng mã hex
  isTextGradient = false, // nếu là true thì chữ sẽ có màu gradient (xanh), nếu false thi chữ màu trắng
  isSquare = false, // nếu true thì button không có border-radius
  fontSize = "24px",
  marginY = 4, // Margin top và bottom
  fontWeight = 900,
  iconClass = "", // Fontawesome Icon's class
  logoGg = false, // nếu true thì button có hình logo Google
  onClick, // xử lý event khi button được nhấn
}) {
  const gradientText = {
    background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  };
  const whiteText = {
    color: "white",
  };

  return (
      <div className={`
          w-full
          h-[50px]
          p-[2px]
          flex
          justify-center
          items-center
          my-${marginY}
          gap-x-[15px]
          rounded-[${!isSquare ? "50px" : "5px"}]
          ${
            !secondaryColor
              ? `bg-[${primaryColor}]`
              : `bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}]`
          }
      `}>
      <button className={`
          w-full 
          h-full 
          rounded-[48px] 
          ${isTextGradient ? "bg-white" : ""} 
          flex 
          items-center 
          justify-center 
          gap-[10px]`}
            onClick={onClick}
          >
      
        <div
          className={`
            font-[${fontWeight}] 
            text-[${fontSize}]
            uppercase           
          `}
          style={isTextGradient ? gradientText : whiteText}
        >
          {content}
        </div>
        <i
          className={`relative top-[1px] text-2xl 
            ${
            !iconClass ? "hidden" : iconClass
          }`} 
          style={isTextGradient ? gradientText : whiteText}
        ></i>
        <img src="../img/google.svg" className={`h-7 w-7 ${!logoGg ?  "hidden" : ""}`} alt="" />
        
      </button>
      </div>
  );
}
