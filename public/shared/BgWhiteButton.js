import React from "react";

export default function BgWhiteButton({content}) {
    const gradientText = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
    }

    return (
        <>
            <div className="w-full h-[50px] rounded-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] p-[2px]">
                <button className="w-full h-full rounded-[48px] bg-white">
                    <p className="font-[900] text-[18px] text-white" style={gradientText}>{content}</p>
                </button>  
            </div>
        </>
    )
}