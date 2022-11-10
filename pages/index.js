/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useState } from "react";
import Link from "next/link";

import TextInput from "public/shared/TextInput";
import ConfirmButton from "public/shared/ConfirmButton";
import WayLog from "public/shared/WayLog";
import Logotic from "public/shared/Logotic";

export default function Index() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  // Got ID vs password from text input to handle logic
  // ( check whether id exists in database ) -> ( check whether the password is true )
  return (
    <>
      <section className="h-screen px-5 py-5">
        <div className="flex flex-col justify-center items-center w-full h-full bg-green-300">
          <Logotic
            title="AIT LUCKY GIFTS"
            src="https://cdn.123job.vn/123job/uploads/2019/09/18/2019_09_18______f334ace51b475d2c562648c2ee9058d3.png"
          />
          <TextInput
            container="mb-6 w-1/2 max-w-sm"
            type="text"
            id="idRoom"
            label="ID"
            fadeText="Id sự kiện"
            // onChange={(e) => setId(e.target.value)}
          />
          <TextInput
            container="mb-2 w-1/2 max-w-sm"
            type="password"
            label="Password"
            id="passRoom"
            fadeText="Mật khẩu sự kiện"
            // onChange={(e) => setPass(e.target.value)}
          />
          <ConfirmButton text="Xác nhận" />
          <WayLog title="Bạn là Admin?" action="Đăng nhập" path="/auth/login" />
          <WayLog
            title="Bạn chưa có tài khoản?"
            action="Đăng ký luôn"
            path="/auth/register"
          />
        </div>
      </section>
    </>
  );
}
