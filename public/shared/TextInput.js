/*eslint-disable*/
import { React, useState } from "react";

export default function TextInput({
  container,
  type,
  id,
  fadeText,
  onChange,
  label,
}) {
  return (
    <>
      <div className={container}>
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          {label}
        </label>
        <input
          type={type}
          className="placeholder-blueGray-300 text-sm w-full form-control px-4 py-2 items-center flex-1 font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300  transition  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none rounded-full"
          id={id}
          placeholder={fadeText}
          onChange={onChange}
        />
      </div>
    </>
  );
}
