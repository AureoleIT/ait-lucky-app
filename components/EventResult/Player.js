import React from "react";
import { TEXT } from "public/colors";

export default function Player({ Player }) {
    return (
        <div className="w-screen px-5">
            <div className="flex flex-row w-[100%] pt-2 px-2">
                {
                    Player.win ? (

                        <span className="bg-[#F5F92E] w-[5px] h-[50px] "></span>
                    ) : <span className="w-[5px] h-[50px] "></span>
                }

                <div>
                    <img src="http://www.gravatar.com/avatar/?d=retro&s=32" alt="" className="w-[50px] h-[50] rounded-full object-cover ml-2"></img>
                </div>
                <p className={`text-[${TEXT}] text-[18px] ml-3 font-semibold`}>{Player.title}</p>
            </div>
        </div>
    );
}
