import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";

import SingleColorButton from "public/shared/SingleColorButton";
import { failIcon, hidden, successIcon } from "public/util/popup";
import PopUp from "public/shared/PopUp";
import BgBlueButton from "public/shared/BgBlueButton";
import Reward from "components/RewardRegister/Reward";

function RewardRegister() {
    // router
    const router = useRouter();
    // state
    const [textState, setTextState] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [isHidden, setIsHidden] = useState(hidden)

    const [rewardCount, setRewardCount] = useState([])
    // state store data
    const [count, setCount] = useState([])
    const [data, setData] = useState([{}])
    const [value, setValue] = useState([])
    const [rewardName, setRewardName] = useState({})
    const [receiveImg, setReceiveImg] = useState([])
    const [receiveName, setReceiveName] = useState([])
    // ref store data
    const refs = useRef()

    const wrap = {
        height:"100%",
        zIndex: "20",
    }

    const handleReceiveData = (data) =>
    {
        console.log(data);
        setValue(prev => [...prev, data])
    }

    const closePopup = (e) => { setIsHidden(hidden) }

    const onChangeName = useCallback((e) =>
    {
        setRewardName(prev => ({...prev,[e.target.name]:e.target.value}))
    })

    const handleAdd = () =>
    {
        setRewardCount(prev => [...prev, 1])
    }
    
    const handleNavigate = () =>
    {
        setData(prev => [...prev, value])
        // router.push("/admin/event/event-detail")
    }
    useEffect(() =>
    {
        const size = data.length-1;
        const temp = data[size];
        const length = temp.length;
        const last =  temp[length-1];
        const arr = last ?? [];
        console.log({length});
        console.log({last});
        console.log(arr[0]);
        console.log({data})
    })

    return (
        <section className="flex flex-col items-center justify-between w-screen h-screen">
            <div className="w-4/5 max-w-xl my-2 flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center">
                    {
                        rewardCount.map((item, index) =>
                        {
                            let nameId = `name${index}`
                            return (
                                <div key={index} className="flex w-full justify-center items-center">
                                    <Reward
                                        ref={refs}
                                        id={index}
                                        inputId={index}
                                        name={nameId}
                                        rewardName={rewardName.nameId}
                                        onChangeRewardName={onChangeName}
                                        // rewardCountValue={count}
                                        // onRewardCountUp={() => setCount(count + 1)}
                                        // onRewardCountDown={() => setCount(count - 1)}
                                        fileID={`file${index}`}
                                        toggleID={`toggle${index}`}
                                        receiveData={handleReceiveData}
                                    /> 
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-full">
                    <SingleColorButton content={"Thêm phần quà"} colorHex={"#40BEE5"} onClick={handleAdd}/>
                </div>
            </div>
            <div className="pb-4 w-4/5 drop-shadow-lg max-w-xl">
                <BgBlueButton content={"ĐĂNG KÝ SỰ KIỆN"} onClick={handleNavigate} />
            </div>
            <div className={isHidden} style={wrap}>
                <PopUp text={textState} icon={isSuccess ? successIcon : failIcon} close={closePopup} isWarning={!isSuccess} />
            </div>
        </section>
  );
}

export default RewardRegister;
