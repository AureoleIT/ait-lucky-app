import React, { useState } from "react";

export default function AuthInput({content, row, onChange, value}) {


    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
    }

    return (
        <div className="bg-gradient-to-r from-[#003B93] to-[#00F0FF] p-[2px] h-full w-full rounded-[10px] py-[2px] outline-none relative">
            <div className="h-full w-full">
                <textarea className="h-full w-full rounded-lg px-2 py-2 outline-none border-none" rows={row} value={value} onChange={onChange} required/>
                <div className="bg-white absolute w-full top-0">
                    <label htmlFor="" className="absolute px-[10px] mx-[15px] bg-white transform translate-y-[-50%] left-0">
                        <p style={contentCSS} className="font-bold text-[16px]">{content}</p>
                    </label>
                </div>
            </div>
        </div>
    )
    }
