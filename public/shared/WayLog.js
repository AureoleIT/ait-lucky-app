import React from "react";
import { TEXT } from "public/util/colors";
import router from "next/router";
export default function WayLog({ title, action, path }) {
  return (
    <div className="flex-row w-full flex items-center justify-center ">
      <div onClick={() => {router.push(`${path}`)}} className={`text-[${TEXT}] underline font-semibold cursor-pointer`}>
        {action}
      </div>
      <p className={`text-[${TEXT}] ml-1`}>{`${title}`}</p>
    </div>
  );
}
