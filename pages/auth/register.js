import { React, useState } from "react";
import Auth from "layouts/Auth.js";
import TextInput from "public/shared/TextInput";
import ConfirmButton from "public/shared/ConfirmButton";
import SocialButton from "public/shared/SocialButton";
export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-slate-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <SocialButton text="Google" src="/img/google.svg" />
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-slate-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3 flex flex-col">
                    <TextInput
                      container="mb-2"
                      type="text"
                      id="idName"
                      fadeText="Họ tên"
                      label="Họ tên"
                      // onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <TextInput
                      container="mb-2"
                      type="text"
                      id="idMail"
                      fadeText="Mail"
                      label="Mail"
                      // onChange={(e) => setMail(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <TextInput
                      container="mb-2"
                      type="password"
                      id="idPass"
                      fadeText="Password"
                      label="Password"
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-slate-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-sky-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <ConfirmButton text="Tạo tài khoản"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
