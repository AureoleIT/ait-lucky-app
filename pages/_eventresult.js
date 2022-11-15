import React, { useState } from "react";
import Link from 'next/link'

import Player from "components/EventResult/Player";
import AuthInput from "public/shared/AuthInput";
import BgBlueButton from "public/shared/BgBlueButton";
import GradientLine from "public/shared/GradientLine";
import Award from "components/EventResult/Award";

export default function EventResult() {

    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
    }

    const [listWinner, setListWinner] = useState([{
        id: 1,
        title: 'Nguyen Van B',
    }]);
    const [listAward, setListAward] = useState([{
        id: 1,
        title: 'Yellow Pail',
    },
    {
        id: 2,
        title: 'Green Pail',
    }]);
    const [listPlayer, setListPlayer] = useState([{
        id: 1,
        title: 'Nguyen Van B',
        win: true,
    },
    {
        id: 2,
        title: 'Nguyen Vawn C',
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
    },
    {
        id: 3,
        title: 'Tran Thi be',
        win: false,
    }]);

    return (
        <div className="flex flex-col items-center  h-full w-[100%]">
            <div className="flex flex-col items-center justify-center w-full px-5 h">
                <h1 className="uppercase text-4xl py-3 font-bold" style={contentCSS}>tiệc cuối năm</h1>
                <h1 className="uppercase text-2xl py-0 font-bold" style={contentCSS}>thông tin giải thưởng</h1>
                <GradientLine color1="#003B93" color2="#00F0FF" />
                <div>
                    <Award name="Giải đặc biệt" count={1} listAward={listAward} listWinner={listWinner}></Award>
                    
                </div>
                <h1 className="uppercase text-2xl pt-2 font-bold" style={contentCSS}>danh sách người chơi</h1>
                <h1 className="uppercase text-xl pt-2 font-semibold" style={contentCSS}>số người tham gia: 55/100</h1>
                <GradientLine color1="#003B93" color2="#00F0FF" className="px-3" />
                <div>
                    {
                        listPlayer.map((item) =>

                            <Player Player={item}></Player>
                        )
                    }
                </div>
            </div>
            <div className="py-3 w-[100%] px-5">
                <BgBlueButton content={"Thoát"} islink={true} href={"/"} />
            </div>

        </div>
    );
}
