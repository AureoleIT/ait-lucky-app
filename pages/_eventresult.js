import React, { useState } from "react";

import Player from "components/EventResult/Player";
import BgBlueButton from "public/shared/BgBlueButton";
import GradientLine from "public/shared/GradientLine";
import Award from "components/EventResult/Award";

export default function EventResult() {
  const [countPlayer, setCountPlayer] = useState(55);
  const listReward = [
    {
      id: "1",
      event_id: "1",
      description: "Giải Đặc Biệt",
      quantity: 1,
      quantity_remain: 1,
      sort_no: 0,
      img_url: [
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
      ],
    },
    {
      id: "2",
      event_id: "1",
      description: "Giải Nhất",
      quantity: 1,
      quantity_remain: 1,
      sort_no: 0,
      img_url: [
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
      ],
    },
    {
      id: "3",
      event_id: "1",
      description: "Giải Nhì",
      quantity: 1,
      quantity_remain: 1,
      sort_no: 0,
      img_url: [
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
      ],
    },
    {
      id: "4",
      event_id: "1",
      description: "Giải Ba",
      quantity: 1,
      quantity_remain: 1,
      sort_no: 0,
      img_url: [
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
        "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
      ],
    },
  ];
  const listPlayer = [
    {
      user_id: "1abc",
      event_id: 1,
      reward_taken: "2",
      create_at: "",
      status: true,
    },
    {
      user_id: "2abc",
      event_id: 1,
      reward_taken: "4",
      create_at: "",
      status: true,
    },
  ];

  return (
    <section className="overflow-hidden flex flex-col justify-evenly h-screen">
      <div className="flex flex-col items-center justify-center h-full px-5 mt-5">
        <h1 className="uppercase text-4xl py-0 font-bold text-[#004599]">
          tiệc cuối năm
        </h1>
        <h1 className="uppercase text-2xl py-0 font-bold text-[#004599]">
          thông tin giải thưởng
        </h1>
        <div className="w-full max-w-md">
          <GradientLine color1="#003B93" color2="#00F0FF" />
        </div>

        <div className="flex flex-col items-center justify-center w-full max-w-md overflow-y-auto h-[40%]">
          <Award listReward={listReward} listPlayer={listPlayer}></Award>
        </div>

        <h1 className="uppercase text-2xl pt-2 font-bold text-[#004599]">
          danh sách người chơi
        </h1>
        <h1 className="uppercase text-xl pt-2 font-semibold text-[#004599]">
          số người tham gia: {countPlayer}/100
        </h1>
        <div className="w-full max-w-md">
          <GradientLine color1="#003B93" color2="#00F0FF" />
        </div>

        <div className="w-full max-w-md  overflow-y-auto h-[30%]">
          <Player listPlayer={listPlayer} />
        </div>

        <div className="content-end py-3 w-full max-w-md px-5">
          <BgBlueButton content={"Thoát"} />
        </div>
      </div>
    </section>
  );
}
