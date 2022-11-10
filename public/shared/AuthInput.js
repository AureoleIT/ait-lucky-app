import React from "react";
import Logotic from "./Logotic";

export default function AuthInput({content}) {
    return (
        <>
            <p className="text-[#2a9d8f]">{content}</p>
            <input type="text" className="outline-none border-2 h-16 w-full" />
        </>
    )
    }
