import React from "react";


import TextArea from "public/shared/TextArea";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";

export default function EventRegister() {

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden items-center justify-evenly h-screen w-screen">
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="uppercase text-4xl py-3 font-bold text-[#004599]">đăng ký</h1>
            <h1 className="uppercase text-xl py-3 font-bold text-[#004599] mb-4">thông tin sự kiện</h1>
            
            <div className="w-3/4 lg:w-4/12">
                <TextArea content={"Tên sự kiện"} />
            </div>

            <div className="pb-[1rem]  pt-[2rem] w-3/4 lg:w-4/12">
                <TextArea content={"Mô tả sự kiện"} row={5} />
            </div>

            <div className="w-3/4 lg:w-4/12">
                <AuthInput content={"Giới hạn người tham gia"} type={"number"}/>
            </div>
        </div>

        <div className="py-3 w-3/4 lg:w-4/12">
            <BgBlueButton content={"TIẾP TỤC"} islink={true} href={"_registergift"} />
        </div>

    </div>
  );
}
