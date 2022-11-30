// layout for page
import React, { useEffect, useState } from "react";
import { Link } from "next/link";
import { useForm } from "react-hook-form";
// import AuthContext from "../../src/context/AuthContext";
// Components
import BgBlueButton from "public/shared/BgBlueButton";
import Title from "public/shared/Title";
import { useMemo } from "react/cjs/react.development";
import Spin from "public/shared/Spin";
import CurrentEventDetail from "public/shared/CurrentEventDetail";
import OverlayBlock from "public/shared/OverlayBlock";
import LuckySpinSetting from "public/shared/LuckySpinSetting";
import RewardList from "public/shared/RewardList";
// firebase
import { auth, db } from "../../src/firebase";
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";

// DB test
const listPlayer = [
    {
        playerName: "Nguyễn Văn A",
        playerAvt: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
    , {
        playerName: "Nguyễn Văn B",
        playerAvt: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn C",
        playerAvt: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
    , {
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
        playerAvt: "https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, {
        playerName: "Nguyễn Văn I",
        playerAvt: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
];

const EventID = "EV20221011";

export default function LuckySpin() {
    // Danh sách giải thưởng
    const [rewardList, setRewardList] = useState([]);
    // Index giải thưởng đang được chọn
    const [rewardChosing, setRewardChosing] = useState(0);
    // ID của giải thưởng được chọn
    const [idRewardChosing, setIDRewardChosing] = useState("");
    // Danh sách phần quà còn lại
    const [remainRewardList, setRemainRewardList] = useState(rewardList);
    // Danh sách người chơi
    const [playerList, setPlayerList] = useState(listPlayer);
    // Danh sách người chơi quay thưởng
    const [remainPlayerList, setRemainPlayerList] = useState(playerList);
    // Danh sách người chơi được điều chỉnh
    const [editedPlayerList, setEditedPlayerList] = useState(remainPlayerList);
    // Danh sách người chơi dùng để hiển thị trên vòng quay
    const [playerShowList, setPlayerShowList] = useState(playerList.slice(0, 9));
    // Đang quay thưởng
    const [spinClicked, setSpinClicked] = useState(false);
    
    // Firebase
    const dbRef = ref(db)

    function compare(a, b) {
        if (a.sortNo > b.sortNo) return 1;
        if (b.sortNo > a.sortNo) return -1;
        return 0;
    }

    // Lấy dữ liệu lần đầu của event rewards
    useEffect(() => {
        get(child(dbRef, "event_rewards")).then((snapshot) => {
            const record = snapshot.val() ?? [];
            const values = Object.values(record);
            setRewardList(values);
        })
    }, [])

    useEffect(() => {
        // Cập nhật dữ liệu realtime của event reward
        return onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const eventRewards = Object.values(data['event_rewards']);
            const eventsDetail = Object.values(data["event"]);
            const isSpining = eventsDetail[0].isSpinning;
            const rewardChosingIndex = eventsDetail[0].rewardChosingIndex;
            const lastAwardedPIndex = eventsDetail[0].lastAwardedPIndex;
            setSpinClicked(isSpining);

            if (snapshot.exists()) {
                setRewardList(eventRewards);
                setRewardChosing(rewardChosingIndex);
                
                if (isSpining && !spinClicked) {
                    console.log("1");
                    spining()
                };
                return;
            }
        });
    }, [rewardList])
    
    // Điều chỉnh danh sách người chơi được điều chỉnh
    useEffect(() => {
        // Làm đầy danh sách
        if (editedPlayerList.length === 0) {
            setPlayerShowList(editedPlayerList.slice(0, 9))
            return;
        };
        if (editedPlayerList.length < 9 && remainPlayerList.length < 9)
            setEditedPlayerList((list) => [...list, ...remainPlayerList]);
        else setPlayerShowList(editedPlayerList.slice(0, 9));
    }, [editedPlayerList])

    // Điều chỉnh danh sách người chơi quay thưởng
    useEffect(() => {
        setEditedPlayerList([...remainPlayerList]);
    }, [remainPlayerList])

    // Điều chỉnh danh sách giải thưởng còn lại
    useEffect(() => {
        if ([...remainRewardList].filter((reward) => reward.quantityRemain <= 0).length > 0)
            {
                setRemainRewardList((list) => list.filter((reward) => reward.quantityRemain > 0));
            }
        setIDRewardChosing(remainRewardList.length > 0?remainRewardList[rewardChosing].idReward:"NONE");
    }, [remainRewardList])

    // Cập nhật danh sách phần trưởng còn lại
    useEffect(() => {
        rewardList.sort(compare);
        setRemainRewardList([...rewardList]);
    }, [rewardList])

    const spining = () => {
        // Random đối tượng
        const randomNum = Math.floor(Math.random() * (remainPlayerList.length));
        
        Array.from({length: 9}, (_, index) => index).forEach(idx => {
            document.getElementById("spin-idx-" + idx).classList.add("animate-move-down-"+idx)
        })
        
        const phase1 = setInterval(() => {
            setPlayerShowList((list) => [list.pop(), ...list]);
        }, 50);
        
        const timeoutPhase1 = setTimeout(() => {
            clearInterval(phase1);
            setPlayerShowList([...editedPlayerList, ...editedPlayerList, ...editedPlayerList].slice(randomNum, randomNum + 18))
            Array.from({length: 9}, (_, index) => index).forEach(idx => {
                document.getElementById("spin-idx-" + idx).classList.remove("animate-move-down-"+idx)
                document.getElementById("spin-idx-" + idx).classList.add("animate-slow-move-down-"+idx)
            })
                        
            const phase2 = setInterval(() => {
                setPlayerShowList((list) => [list.pop(), ...list]);
            }, 500);

            const timeoutPhase2 = setTimeout(() => {
                clearInterval(phase2);
                Array.from({length: 9}, (_, index) => index).forEach(idx => {
                    document.getElementById("spin-idx-" + idx).classList.remove("animate-slow-move-down-"+idx)
                })
                const timeoutPhase3 = setTimeout(() => {
                    document.getElementById("awardedOverlay").classList.toggle('hidden');
                    document.getElementById("awaredPlayerName").innerHTML = remainPlayerList[randomNum].playerName;
                    document.getElementById("awaredRewardName").innerHTML = remainRewardList[rewardChosing].description;
                    setRemainPlayerList((list) => list.filter((player, idx) => idx !== randomNum));
                    rewardList[rewardList.findIndex((reward) => reward.idReward === idRewardChosing)].quantityRemain -= 1;
                    setRewardList((list) => [...list]);
                    setSpinClicked(false);
                }, 1000)
            }, 2000)

        }, 1000)
    }

    const awardNotification = (
        <div className="flex flex-col items-center text-center text-[#004599]">
            <p className="font-semibold">Chúc mừng</p>
            <p className="font-[900] text-lg" id="awaredPlayerName"></p>
            <p className="font-semibold">đã nhận được giải:</p>
            <p className="font-[900] text-lg" id="awaredRewardName"></p>
        </div>
    )

    return (
        <>
            <section className="relative h-screen px-5 py-5 mx-auto flex justify-center items-center w-3/4 max-w-md max-sm:w-full">
                <div className="flex flex-col justify-start items-center w-full h-full">
                    <div className="flex flex-col w-full pt-5">
                        <Title title="QUAY THƯỞNG MAY MẮN" fontSize="24" fontWeight="semibold"/>
                        <Title title="TIỆC CUỐI NĂM" fontSize="32" />
                        <div className="flex w-full justify-between -mt-3 mb-1">
                            <p className="font-[900] text-[#004599] text-[16px] text-left items-center h-6">Số người trực tuyến</p>
                            <span className="flex gap-1">
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor(playerList.length/100)}</p>
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor((playerList.length%100)/10)}</p>
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor((playerList.length%100)%10)}</p>
                            </span>
                        </div>
                        <div className="flex w-full justify-between">
                            <p className="font-[900] text-[#004599] text-[16px] text-left items-center h-6">Số người quay thưởng</p>
                            <span className="flex gap-1">
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor(remainPlayerList.length/100)}</p>
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor((remainPlayerList.length%100)/10)}</p>
                                <p className="items-center text-center bg-[#3B88C3] text-white font-[900] rounded-md w-6 h-6">{Math.floor((remainPlayerList.length%100)%10)}</p>
                            </span>
                        </div>
                    </div>
                    <Spin listPlayer={playerShowList} />
                    <div className="w-full mb-12">
                      <p className="font-[900] text-[#004599] uppercase text-[16px] text-center items-center">giải thưởng hiện tại</p>
                      <div className="h-44 px-4 py-2 relative">
                        <RewardList
                          listReward={remainRewardList.slice(rewardChosing, rewardChosing+1)}
                          showRemain={true}
                          showAwardedPaticipant={true}
                        />
                      </div>
                    </div>
                    <div className="absolute right-2 top-2 rounded-full h-10 w-10 bg-gradient-to-r from-[#003B93] to-[#00F0FF] p-1"
                        onClick={() => {document.getElementById("settingOverlay").classList.toggle('hidden')}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 fill-white  hover:animate-[spin_1s_linear]">
                            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <CurrentEventDetail listPlayer={playerList} listReward={rewardList} showAwardedPaticipant={true} />
                    <OverlayBlock childDiv={<LuckySpinSetting />}  id={"settingOverlay"} />
                    <OverlayBlock childDiv={awardNotification}  id={"awardedOverlay"} />
                </div>
            </section>
        </>
    );
}