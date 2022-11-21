import React from "react";
import { TEXT } from "public/util/colors";

export default function Player({ listPlayer }) {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            {
                listPlayer.map((Player) =>
                    <div className="w-full h-full px-5">
                        <div className="flex flex-row w-[100%] px-2">
                            {
                                Player.win ? (

                                    <span className="bg-[#F5F92E] w-[5px] h-[50px] "></span>
                                ) : <span className="w-[5px] h-[50px] "></span>
                            }

                            <div>
                                <img src="http://www.gravatar.com/avatar/?d=retro&s=32" alt="" className="w-[50px] h-[50] rounded-full object-cover ml-2 my-1"></img>
                            </div>
                            <p className={`text-[${TEXT}] text-[18px] ml-3 font-semibold`}>{Player.title}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
