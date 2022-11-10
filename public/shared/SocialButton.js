import React from "react";
export default function SocialButton({onPress, text, src}) {
  return (
    <button
      className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded-full outline-none focus:outline-none mr-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
      type="button"
      onPress={onPress}
    >
      <img alt="..." className="w-5 mr-1" src={src} />
      {text}
    </button>
  );
}
