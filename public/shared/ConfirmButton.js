import React from "react";
import { BUTTON_GRADIENT} from "../colors";
export default function ConfirmButton({ onPress, text }) {
  return (
    <button
      type="button"
      className={` py-2 text-white font-[900] text-[24px] rounded-full uppercase items-center justify-center flex hover:shadow-lg 
                    mb-4 transition duration-1000 w-1/2 max-w-sm ${BUTTON_GRADIENT}`}
      onPress={onPress}
    >
      {text}
    </button>
  );
}
