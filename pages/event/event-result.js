import React, { useState } from "react";

import BgBlueButton from "public/shared/BgBlueButton";
import GradientLine from "public/shared/GradientLine";
import Award from "public/shared/EventResult/Award";
import PlayerList from "public/shared/PlayerList";

const listPlayer = [
  {
    playerName: "Nguyễn Văn A",
    playerAvt: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    reward_taken: "1"
  }
  , {
    playerName: "Nguyễn Văn B",
    playerAvt: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    reward_taken: ""
  }, {
    playerName: "Nguyễn Văn C",
    playerAvt: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    reward_taken: ""
  }
  , {
    playerName: "Nguyễn Văn D",
    playerAvt: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    reward_taken: ""
  }, {
    playerName: "Nguyễn Văn E",
    playerAvt: "https://images.unsplash.com/photo-1628890920690-9e29d0019b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    reward_taken: "3"
  }, {
    playerName: "Nguyễn Văn F",
    playerAvt: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    reward_taken: ""
  }, {
    playerName: "Nguyễn Văn G",
    playerAvt: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    reward_taken: "2"
  }, {
    playerName: "Nguyễn Văn H",
    playerAvt: "https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    reward_taken: ""
  }, {
    playerName: "Nguyễn Văn I",
    playerAvt: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    reward_taken: "2"
  }
];
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


  // Danh sách người chơi
  const [playerList, setPlayerList] = useState(listPlayer);
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

        <div className="w-full max-w-md h-[30%] overflow-y-auto">
          <div className="w-full max-w-md my-2">
            <GradientLine color1="#003B93" color2="#00F0FF" />
          </div>
          <PlayerList listPlayer={listPlayer} />
        </div>

        <div className="content-end py-3 w-full max-w-md px-5">
          <BgBlueButton content={"Thoát"} />
        </div>
      </div>
    </section>
  );
}
