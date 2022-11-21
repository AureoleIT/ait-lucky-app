import React from "react";
import { BUTTON_GRADIENT } from "../util/colors";
export default function ConfirmButton({ onClick, text }) {
  return (
    <button
      type="submit"
      className={` py-2 text-white font-[900] text-[24px] rounded-full uppercase items-center justify-center flex hover:shadow-lg 
                    my-2 transition duration-1000 w-3/4 max-w-md ${BUTTON_GRADIENT}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
