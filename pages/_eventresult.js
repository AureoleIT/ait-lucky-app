import React, { useState } from "react";
import Link from 'next/link'

import Player from "components/EventResult/Player";
import BgBlueButton from "public/shared/BgBlueButton";
import GradientLine from "public/shared/GradientLine";
import Award from "components/EventResult/Award";
import BackGround from "public/shared/BackGround";

export default function EventResult() {

    const [countPlayer, setCountPlayer] = useState(55);
    const [listWinner, setListWinner] = useState([{
        id: 1,
        title: 'Nguyen Van B',
    }]);
    const listReward = [
        {
            name: "Giải Đặc Biệt",
            color: "#F5F92E",
            amount: 1,
            gifts: [
                {
                    desc: "Xe hơi Mẹc",
                    img: "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI="
                }, {
                    desc: "Xe hơi Mẹc 2",
                    img: "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI="
                }, {
                    desc: "Xe hơi Mẹc 3",
                    img: ""
                }
            ]
        }, {
            name: "Giải Nhất",
            color: "#FFCE1F",
            amount: 1,
            gifts: [
                {
                    desc: "Xe hơi Mẹc",
                    img: "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI="
                }, {
                    desc: "Xe hơi Mẹc 2",
                    img: "https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI="
                }, {
                    desc: "Xe hơi Mẹc 3",
                    img: ""
                }
            ]
        }
    ];
    const [listPlayer, setListPlayer] = useState([{
        id: 1,
        title: 'Nguyen Van B',
        win: false,
    },
    {
        id: 2,
        title: 'Nguyen Vawn C',
        win: true,
    },
    {
        id: 3,
        title: 'Tran Thi be',
        win: false,
    },
    {
        id: 3,
        title: 'Tran Thi be',
        win: false,
    },
    {
        id: 3,
        title: 'Tran Thi be',
        win: false,
    },
    {
        id: 3,
        title: 'Tran Thi be',
        win: false,
    },
    {
        id: 3,
        title: 'Tran Thi be',
        win: false,
    }]);

    return (
        <section className="overflow-hidden flex flex-col justify-evenly h-screen">
            <div className="flex flex-col items-center justify-center h-full px-5 mt-5">
                <h1 className="uppercase text-4xl py-0 font-bold text-[#004599]" >tiệc cuối năm</h1>
                <h1 className="uppercase text-2xl py-0 font-bold text-[#004599]" >thông tin giải thưởng</h1>
                <div className="w-full max-w-md">
                    <GradientLine color1="#003B93" color2="#00F0FF" />
                </div>

                <div className="flex flex-col items-center justify-center w-full max-w-md overflow-y-auto min-h-max">
                    <Award name="Giải đặc biệt" count={1} listReward={listReward} listWinner={listWinner}></Award>
                </div>

                <h1 className="uppercase text-2xl pt-2 font-bold text-[#004599]" >danh sách người chơi</h1>
                <h1 className="uppercase text-xl pt-2 font-semibold text-[#004599]">số người tham gia: {countPlayer}/100</h1>
                <div className="w-full max-w-md">
                    <GradientLine color1="#003B93" color2="#00F0FF" />
                </div>

                <div className="w-full max-w-md  overflow-y-auto">
                    <Player listPlayer={listPlayer} />
                </div>

                <div className="content-end py-3 w-full max-w-md px-5">
                    <BgBlueButton content={"Thoát"} islink={true} href={"/"} />
                </div>
            </div>

        </section>

    );
}
