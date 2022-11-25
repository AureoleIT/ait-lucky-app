/*eslint-disable*/
import React from "react";

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
          className="block uppercase text-slate-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          {label}
        </label>
        <input
          type={type}
          className="placeholder-slate-500 text-lg w-full px-4 py-2 font-normal text-black bg-white border-2 bg-transparent rounded-lg"
          id={id}
          placeholder={fadeText}
          onChange={onChange}
        />
      </div>
    </>
  );
}
