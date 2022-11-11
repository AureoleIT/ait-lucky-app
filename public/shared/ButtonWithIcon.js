import React from "react";

export default function BgBlueButton({content, onClick, classIcon}) {

    const iconStyle = {
        color:"white",
        "font-size":"24px"
    }

    return (
        <>
            <button className="flex justify-evenly items-center w-full h-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] rounded-[50px]"
            onClick={onClick}>
                <div className="font-[900] text-[24px] text-white">
                    {content}
                </div>
                <i className={classIcon} style={iconStyle}></i>
            </button>
        </>
    )
}