// layout for page
import Auth from "layouts/Auth.js";
import React, { useState } from "react";
import { Link } from "next/link";
import { useForm } from "react-hook-form";
// import AuthContext from "../../src/context/AuthContext";
// Components
import Logotic from "public/shared/Logotic";
import AuthInput from "public/shared/AuthInput";
import TickBox from "public/shared/TickBox";
import BgBlueButton from "public/shared/BgBlueButton";
import BgWhiteButton from "public/shared/BgWhiteButton";
import GradientLine from "public/shared/GradientLine";
import Title from "public/shared/Title";
import AuthFooter from "public/shared/AuthFooter";
import { useMemo } from "react/cjs/react.development";
import Spin from "public/shared/Spin";
import RewardList from "public/shared/RewardList";
import CurrentEventDetail from "public/shared/CurrentEventDetail";

// DB test
const listPlayer = [
    {
        playerName: "Nguyễn Văn A",
        playerAvt: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn B",
        playerAvt: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn C",
        playerAvt: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn D",
        playerAvt: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn E",
        playerAvt: "https://images.unsplash.com/photo-1628890920690-9e29d0019b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn F",
        playerAvt: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn G",
        playerAvt: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn H",
        playerAvt: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn I",
        playerAvt: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn K",
        playerAvt: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
];
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

export default function LuckySpin() {
    const [playerAmount, setPlayerAmount] = useState(21)

    return (
        <>
            <section className="h-screen px-5 py-5 mx-auto flex justify-center items-center w-3/4 max-w-md max-sm:w-full">
                <div className="flex flex-col justify-start items-center w-full h-full">
                    <div className="flex flex-col w-full pt-5">
                        <Title title="QUAY THƯỞNG MAY MẮN" fontSize="24" fontWeight="semibold"/>
                        <Title title="TIỆC CUỐI NĂM" fontSize="32" />
                        <div className="flex w-full justify-between">
                            <p className="font-[900] text-[#004599] text-[16px] text-left items-center h-6">Số người trực tuyến</p>
                            <span className="flex gap-1">
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor(playerAmount/100)}</p>
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor((playerAmount%100)/10)}</p>
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor((playerAmount%100)%10)}</p>
                            </span>
                        </div>
                    </div>
                    <Spin listPlayer={listPlayer} />
                    <div className="w-full mb-10">
                        <p className="font-bold text-[#004599] uppercase text-[16px] text-center items-center">giải thưởng hiện tại</p>
                        <div className="h-44 px-4 py-2 relative">
                            <RewardList listReward={listReward[0]} />
                        </div>
                    </div>
                    <div className="absolute right-6 bottom-24 rounded-full h-14 w-14 bg-gradient-to-r from-[#003B93] to-[#00F0FF] p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 fill-white">
                            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <CurrentEventDetail listPlayer={listPlayer} listReward={listReward} />
                </div>
            </section>
        </>
    );
}
