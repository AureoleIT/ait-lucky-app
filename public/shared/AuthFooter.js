import React from "react";

export default function AuthFooter({normalContent, boldContent, href}) {
    return (
        <p className="text-[16px] w-full absolute bottom-[35px] text-center">
            <span>{normalContent + " "}</span>
            <a href={href} className="font-bold">{boldContent}</a>
        </p>
    )
}