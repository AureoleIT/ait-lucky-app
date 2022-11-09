import React from "react";

export default function ConfirmButton({onPress, text}) {
  return (
    <button
      type="button"
      className=" py-3 px-4 bg-black text-white font-bold border-black text-base rounded-full shadow-md uppercase text items-center justify-center flex hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                    my-6 transition duration-1000 ease-in-out w-full"
      onPress={onPress}
    >
      {text}
    </button>
  );
}
