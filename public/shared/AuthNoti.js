import React from "react";
import CheckedIcon from "public/icons/checked";

export const AuthNotiContext = createContext();

export default function AuthNoti({action}) {
    // Action: Login/Signup
    return (
        <div className="absolute w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
            <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col gap-y-[10px] items-center justify-center">
                <p className="text-[20px] text-[#004599] max-w-[260px] text-center">
                    {action === "login" && "Chúc mừng bạn đã đăng nhập thành công!"}
                    {action === "signup" && "Chúc mừng bạn đã tạo tài khoản thành công!"}
                </p>
                <CheckedIcon />
            </div>
        </div>
    )
}