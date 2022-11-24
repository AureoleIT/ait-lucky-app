import React, { useState } from "react";

import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import EventButton from "public/shared/button/EventButton";

// DB test
const event = [
  {
    id: "EV20221011",
    title: "tiệc cuối năm",
    user_joined: 10,
    status: 1,
  },
  {
    id: "EV20221012",
    title: "tiệc năm mới",
    user_joined: 20,
    status: 2,
  },
  {
    id: "EV20221013",
    title: "tiệc thành lập công ty trách nhiệm hữu hạn",
    user_joined: 30,
    status: 3,
  },
  {
    id: "EV20221014",
    title: "cuối năm",
    user_joined: 40,
    status: 4,
  },
];

export default function EventList() {
  const [searchContent, setSearchContent] = useState("");

  return (
    <>
      <Header />
      <section className="h-screen max-w-md mx-auto flex flex-col justify-center items-center">
        <div className="flex flex-col px-5 py-5 w-full h-full items-center">
          <h1 className="uppercase font-extrabold text-[#004599] text-[30px] text-center font-[Nunito Sans] leading-[46.5px]">
            danh sách sự kiện
          </h1>
          <div className="max-w-md flex flex-col w-full gap-y-[19px] mt-[19px]">
            <div id="search" className="flex flex-col mx-2">
              <AuthInput
                content={"Tên sự kiện"}
                type={"text"}
                onChange={(e) => setSearchContent(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-[7px] font-[Nunito Sans] font-bold overflow-auto max-h-[700px]">
              {event.filter((item) => {
                return searchContent.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(searchContent);
              }).length !== 0 ? (
                event
                  .filter((item) => {
                    return searchContent.toLowerCase() === ""
                      ? item
                      : item.title.toLowerCase().includes(searchContent);
                  })
                  .map((item, index) => (
                    <div key={item.id} className="flex flex-col">
                      <EventButton
                        title={item.title}
                        id={item.id}
                        user_joined={item.user_joined}
                        status={item.status}
                        href={`${setLink(item.status)}`}
                      />
                    </div>
                  ))
              ) : (
                <p className="text-[#004599] text-center">Danh sách trống</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function setLink(status) {
  switch (status) {
    case 1:
      return "eventdetail";

    case 2:
      return "countdowncheckin";

    case 3:
      return "lucky_spin";

    case 4:
      return "countdowncheckin";

    default:
      return "countdowncheckin";
  }
}
