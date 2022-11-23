import React from "react";

import Header from "public/shared/Header";
import Line from "public/shared/Line";

export default function Dashboard() {
  const wrapperBorder = {
    border: "1px solid #40bee5",
  };

  return (
    <>
      <Header />
      <section className="px-5 py-5 max-w-md w-screen mx-auto flex justify-center items-center">
        <div
          className="w-full  h-[100px] flex  rounded-[10px] mb-5"
          style={wrapperBorder}
        >
          <div className="mx-4 my-1.5 w-full">
            <p className="font-bold text-sm text-[#656565]">
              {"Chào mừng đến với AIT Lucky App,"}
            </p>
            <p className=" text-sm text-[#656565]">
              {"hãy bắt đầu các sự kiện ngay nào!"}
            </p>
            <div class="  w-full">
              <Line />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
