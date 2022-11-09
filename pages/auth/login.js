// layout for page
import Auth from "layouts/Auth.js";
import React, { useState } from "react";
import { Link } from "next/link";
import { useForm } from "react-hook-form";
import AuthContext from "../../src/context/AuthContext";
// Components
import Input from "../../src/components/Auth/Input";

export default function Login() {
  const { register, handleSubmit } = useForm()
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const { logIn, signInWithGoogle } = AuthContext()

  const loginButton = {
    width: "290px",
    height: "50px",
    backgroundColor: "#D0CACA",
    borderRadius: "20px",
    alignSelf: "center",
    fontWeight: "bold",
    margin: "35px 0"
  },
  inputsContainer = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alginItems: "center",
    alignSelf: "center"
  },
  forgerPassword = {
    alignSelf: "flex-end",
    marginRight: "25px"
  }

  const onSubmit = async(data) => {
    setLoading(true)
    try {
      setErr("")
      await logIn(data.email, data.password)
      // navigate("/", {replace: true})
    }
    catch {
      setErr("Log in failed!")
    }
    setLoading(false)
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-white border-0">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                <div className="text-center text-black mb-8 mt-4">
                  <h1 className="font-bold text-xl leading-[24.2px]">Welcome to AIT</h1>
                  <p className="text-red-400 text-2xl">Glad to see you!</p>
                </div>
                <div style={inputsContainer}>
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Password" type="password" />
                </div>
                <Link to="#" style={forgerPassword} className="mt-4 text-md font-semibold">Forget Password?</Link>
                <button style={loginButton} type="submit">LOGIN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
