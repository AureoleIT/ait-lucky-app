import React from "react";

import TextArea from "public/shared/TextArea";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";

export default function EventRegister() {

  return (
    <div className="flex flex-col items-center justify-evenly h-screen w-screen">
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="uppercase text-4xl py-3 font-bold text-[#004599]">đăng ký</h1>
            <h1 className="uppercase text-xl py-3 font-bold text-[#004599] mb-2">thông tin sự kiện</h1>
            
            <div className="w-[300px]">
                <TextArea content={"Tên sự kiện"} />
            </div>

            <div className="py-[2rem] w-[300px]">
                <TextArea content={"Mô tả sự kiện"} row={5} />
            </div>

            <div className="w-[300px]">
                <AuthInput content={"Giới hạn người tham gia"} type={"number"}/>
            </div>
        </div>

        <div className="py-3 w-[300px]">
            <BgBlueButton content={"Tiếp tục"} islink={true} href={"_registergift"} />
        </div>

    </div>
  );
}
