/*eslint-disable*/
import { React, useState } from "react";

export default function TextNoLabel({
  container,
  type,
  id,
  fadeText,
  onChange,
}) {
  return (
    <>
      <div className={container}>
        <input
          type={type}
          className="placeholder-[#656565] text-center text-xl w-full px-4 py-4 font-normal text-black bg-white border-2 bg-transparent rounded-lg"
          id={id}
          placeholder={fadeText}
          onChange={onChange}
        />
      </div>
    </>
  );
}
