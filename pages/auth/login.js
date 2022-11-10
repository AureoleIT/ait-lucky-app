// layout for page
import Auth from "layouts/Auth.js";
import React, { useState } from "react";
import { Link } from "next/link";
import { useForm } from "react-hook-form";
// import AuthContext from "../../src/context/AuthContext";
// Components
import TextInput from "public/shared/TextInput";
import ConfirmButton from "public/shared/ConfirmButton";
import WayLog from "public/shared/WayLog";
import Logotic from "public/shared/Logotic";
import AuthInput from "public/shared/AuthInput";

export default function Login() {
  const { register, handleSubmit } = useForm()
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  // const { logIn, signInWithGoogle } = AuthContext()

  return (
    <>
      <section className="h-screen px-5 py-5 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <AuthInput />
        </div>
      </section>
    </>
  );
}

Login.layout = Auth;
