import { useState, useContext } from 'react'

import TextArea from "public/shared/TextArea";
import ButtonWithIcon from "public/shared/ButtonWithIcon";

const MoreGift = () =>
{  
    const handleDeleteGift = () =>
    {

    }

    return (
        <div className="flex flex-col justify-center items-center max-h-[250px] w-full max-w-[300px]">

            <div className="flex py-3 justify-between items-center relative w-full">
                <TextArea  content={"Mô tả phần quà"} row={"3"}/>
                <i className="fas fa-trash text-red-600 cursor-pointer px-[1rem]" onClick={handleDeleteGift}></i>
            </div>
            <ButtonWithIcon content={"Thêm hình ảnh"} classIcon={"fas fa-image"}/>

        </div>
    )
}

export { MoreGift }