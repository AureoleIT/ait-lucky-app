import React from "react";
import { LEFT_GRADIENT, RIGHT_GRADIENT } from "public/util/colors";

export default function Line({
  content, // nội dung được hiển thị trên Line
  isLineWhite = false, // nếu line màu trắng thì true
  lineWeight = true, // mặc đinh line dày 2px, nếu false thì dày 1px
  marginY = true, // mặc định my-4, nếu false thì mất margin y
}) {
  return (
    <div className="w-full justify-center items-center flex mb-5 flex-row">
      <div
        className={`flex-grow ${lineWeight ? "h-[2px]" : "h-[1px]"} z-10 ${
          marginY ? "my-4" : ""
        }  ${
          isLineWhite ? "bg-white" : LEFT_GRADIENT
        } relative flex justify-center`}
      ></div>
      <span
        className={`mx-2 relative bottom-[3px] text-transparent text-xl bg-clip-text font-semibold ${
          isLineWhite ? "bg-white" : LEFT_GRADIENT
        } ${content ? "" : "hidden"}`}
      >
        {content}
      </span>
      <div
        className={`flex-grow ${lineWeight ? "h-[2px]" : "h-[1px]"} z-10 ${
          marginY ? "my-4" : ""
        }  ${
          isLineWhite ? "bg-white" : RIGHT_GRADIENT
        } relative flex justify-center`}
      ></div>
    </div>
  );
}
