import React from "react";
import Link from "next/link"

export default function ButtonSubmit({content, onClick, islink, href }) {
    return (
        <>
            {/* {
                islink ? (
                    <Link href={href}> */}
                        <button className="w-full h-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] rounded-[50px]"
                        onClick={onClick}>
                            <div className="font-[900] text-[24px] text-white">
                                {content}
                            </div>
                        </button>
                    {/* </Link>
                ) : (
                    <button className="w-full h-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] rounded-[50px]"
                    onClick={onClick}>
                        <div className="font-[900] text-[24px] text-white">
                            {content}
                        </div>
                    </button>
                )
            } */}
        </>
    )
}