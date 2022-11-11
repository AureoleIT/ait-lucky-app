import React from "react";

export default function GradientLine({color1, color2, content}) {
    const gradientCSS = `bg-gradient-to-r from-[${color1}] to-[${color2}]`

    return (
        <div className={`w-full h-[2px] ${gradientCSS} relative flex justify-center`}>
            <p className="absolute top-[-50%] transform translate-y-[-50%] bg-white px-[10px] text-[#003B93] font-semibold">{content}</p>
        </div>
    )
}