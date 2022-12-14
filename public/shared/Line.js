import React from "react";
import { LEFT_COLOR, RIGHT_COLOR} from "public/util/colors";

export default function Line({
  content, // nội dung được hiển thị trên Line
  primaryColor = LEFT_COLOR, // màu bên trái
  secondaryColor = RIGHT_COLOR, // màu bên phải
  lineWeight = true, // mặc đinh line dày 2px, nếu false thì dày 1px
  marginY = true // mặc định my-4, nếu false thì mất margin y
}) {
  const gradientCSS = `bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}]`;

  return (
    <div
      className={`w-full ${
        lineWeight ? "h-[2px]" : "h-[1px]"
      } z-10 ${marginY ? "my-4" : ""}  ${gradientCSS} relative flex justify-center`}
    >
      <p
        className={`absolute top-[-50%] transform translate-y-[-50%] font-extrabol bg-white ${
          !content && "hidden"
        }`}
      >
        <span
          className={`mx-2 text-transparent text-xl bg-clip-text font-semibold ${gradientCSS}`}
        >
          {content}
        </span>
      </p>
    </div>
  );
}
