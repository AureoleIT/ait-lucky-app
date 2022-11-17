import Auth from "layouts/Auth.js";
import React, { useState } from "react";
import GradientLine from "public/shared/GradientLine";

function UserItemFull(props) {
  console.log(props);
  return (
    <div className="user-info flex-col mb-[10px]">
      <div
        className="user-image mx-auto "
        style={{ height: "100px", width: "100px" }}
      >
        <img className=" rounded-full " src={props.img} alt=""></img>
      </div>
      <div className="user-title  ">
        <p className="text-[#004599] font-black text-xl mt-[10px] ">
          {" "}
          {props.title}
        </p>
      </div>
    </div>
  );
}

export default function userPlayableList() {
  return (
    <section className="h-screen max-w-[360px] px-5 py-5 mx-auto flex flex-col justify-center ">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="list-user">
          <UserItemFull
            img="https://yt3.ggpht.com/a/AATXAJwZJhv3LxUhRprtaqJJggYGzdET9Rt2kxFg_Q=s900-c-k-c0xffffffff-no-rj-mo"
            title="NGUYEN VAN B"
          ></UserItemFull>
        </div>
      </div>
      <GradientLine
        color1="#003B93"
        color2="#00F0FF"
        content="Giải thưởng"
      ></GradientLine>
    </section>
  );
}
userPlayableList.layout = Auth;
