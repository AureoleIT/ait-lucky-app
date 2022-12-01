import { hidden, show } from "public/util/popup";
import React, { useState, forwardRef, useEffect } from "react";
import AddRewardPopUp from "./AddRewardPopUp";

function InputWithColor(props, ref) {
  
    // state
    const [currentColor, setCurrentColor] = useState("#e6194b")
    const [textState, setTextState] = useState("");
    const [isHidden, setHidden] = useState(hidden);
    const [isSuccess, setIsSuccess] = useState(false);
  
    const contentCSS = {
    background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    }

    const closePopup = (e) => { setHidden(hidden) }

    const handleClick = () =>
    {
        setHidden(show)
    }
    // useEffect(() =>
    // {
    //     console.log(props.value);
    // })

    const color = [
            "#e6194b",
            "#3cb44b",
            "#ffe119",
            "#4363d8",
            "#f58231",
            "#911eb4",
            "#46f0f0",
            "#f032e6",
            "#bcf60c",
            "#fabebe",
            "#008080",
            "#e6beff",
            "#9a6324",
            "#800000"
    ]

    const bg = {
        background:`${currentColor}`,
        height:"30px",
        width:"30px",
        right:"16px"
    }

return (
    <div
    className={`bg-gradient-to-r from-[${props.leftColor}] to-[${props.rightColor}] p-[2px] rounded-[10px] w-full h-[60px] py-[2px] my-4 outline-none relative`}
    >
        <div className="h-full">
            <input
            ref={ref}
            name="input"
            type={props.type}
            className="h-full w-full rounded-lg text-lg px-4 outline-none border-none"
            onChange={props.onChange}
            value={props.value}
            required
            />
            <div className="bg-white absolute w-full top-0">
            <label
                htmlFor=""
                className="absolute px-[10px] mx-[15px] bg-white transform translate-y-[-50%] left-0"
            >
                <p style={contentCSS} className="font-bold text-base">
                {props.content}
                </p>
            </label>
            </div>
        </div>
        {/* <div className="absolute transform translate-y-[-50%] top-[50%] cursor-pointer" style={bg} onClick={handleClick}></div>
        <div className="w-full h-full flex justify-center items-center">
            <div className={isHidden}>
                <AddRewardPopUp close={closePopup} >
                    <div className="flex flex-wrap justify-center items-center">
                        {
                            color.map((item, index) =>
                            {
                                const bgcolor = {
                                    background:`${item}`,
                                    height:"30px",
                                    width:"14%",
                                    right:"16px"
                                }
                                return (
                                    // index == 7 ? (
                                    //     <>
                                            <p className="mx-2 my-2 cursor-pointer" key={index} style={bgcolor} onClick={() => {setCurrentColor(item); setHidden(hidden)}}></p>
                                    //     </>
                                    // ) : (
                                    //     <p key={index} className="mx-2 my-2" style={bgcolor} onClick={() => {setCurrentColor(item); setHidden(hidden)}}></p>
                                    // )
                                )
                            })
                        }
                    </div>
                </AddRewardPopUp>
            </div>
        </div> */}
    </div>
);
}

export default forwardRef(InputWithColor)
