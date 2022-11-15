import React from "react";

export default function Title({title, fontSize = "36", fontWeight = "[900]"}) {
// font size (px) (default: 36px)

    return (
        <h1 className={`font-${fontWeight} uppercase text-[#004599] text-[${fontSize}px] text-center mb-5`}>{title}</h1>
    )
}