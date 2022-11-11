import React from "react";

// Components
import UserAvatar from "./UserAvatar";

// Icons
import MenuIcon from "public/Icons/menu";

// Fonts

export default function Header() {
    return (
        <div className="flex justify-between items-center w-full bg-[#40BEE5] px-[20px] py-[15px]">
            <MenuIcon />
            <h1 className="text-2xl font-extrabold text-white">AIT LUCKY APP</h1>
            <UserAvatar />
        </div>
    )
}