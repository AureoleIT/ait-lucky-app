/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import { React, useState } from "react";
import Link from "next/link";

import TextInput from "public/shared/TextInput";
import ConfirmButton from "public/shared/ConfirmButton";

export default function Index() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  // Got ID vs password from text input to handle logic
  // ( check whether id exists in database ) -> ( check whether the password is true )
  return (
    <>
      <section className="h-screen">
        <div className=" h-full text-gray-800 flex justify-center pt-10">
          <div className="flex flex-col justify-center align-middle lg:justify-between items-center flex-wrap h-full g-6">
            <div className="flex flex-col align-middle items-center justify-center mb-12">
              <img
                src="https://cdn.123job.vn/123job/uploads/2019/09/18/2019_09_18______f334ace51b475d2c562648c2ee9058d3.png"
                className="w-1/1"
              />
              <span className="mt-6 font-bold text-sm">AIT LUCKY GIFTS</span>
            </div>
            <div className="flex items-center justify-center">
              <form className="flex-row items-center justify-center">
                <TextInput
                  container="mb-6"
                  type="text"
                  id="idRoom"
                  label="ID"
                  fadeText="Id sự kiện"
                  onChange={(e) => setId(e.target.value)}
                />
                <TextInput
                  container="mb-6"
                  type="password"
                  label="Password"
                  id="passRoom"
                  fadeText="Mật khẩu sự kiện"
                  onChange={(e) => setPass(e.target.value)}
                />

                <div className="text-center lg:text-left flex flex-col">
                  <ConfirmButton text="Xác nhận" />
                  <p className="text-sm font-semibold mt-20 pt-1 mb-0 flex justify-between">
                    Bạn là Admin?
                    <a
                      href="/auth/login"
                      className="text-red-600 hover:text-red-700 font-bold focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Đăng nhập
                    </a>
                  </p>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0 flex justify-between">
                    Bạn chưa có tài khoản?
                    <a
                      href="/auth/register"
                      className="text-red-600 hover:text-red-700 font-bold focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Đăng ký ngay
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
