import React from "react";

export default function TickBox({content, htmlFor}) {
    return (
        <>
            <input type="checkbox" className="border-[#004599] border" />
            <label htmlFor={htmlFor}>
                <p className="font-bold text-[#004599]">{content}</p>
            </label>
        </>
    )
}