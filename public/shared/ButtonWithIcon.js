import React from "react";
import { BUTTON_GRADIENT } from "public/colors";
export default function ButtonWithIcon({src,text}) {
  return (
    <button
      type="button"
      className={` py-2 bg-white font-bold rounded-full uppercase items-center justify-center flex hover:shadow-lg 
                    mb-6 transition duration-1000 w-1/2 max-w-sm flex-row border-2 border-black`}
      // onPress={}
    >
      <h1
        className={`text-2xl text-transparent bg-clip-text ${BUTTON_GRADIENT} `}
      >
        {text}
      </h1>
      <img src={src} className="w-5.5 ml-2" alt="Google"></img>
    </button>
  );
}
