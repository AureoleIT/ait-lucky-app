import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import SingleColorButton from "public/shared/SingleColorButton";
import AddRewardPopUp from "public/shared/AddRewardPopUp";
import { failIcon, hidden, show, successIcon } from "public/util/popup";
import Line from "public/shared/Line";
import ImageCustom from "public/shared/ImageCustom";
import PopUp from "public/shared/PopUp";
import CountComponent from "public/shared/CountComponent";
import {
  wrapPopUp,
  wrap,
  iconStyle,
  buttonColor,
} from "public/util/reward-register";
import BgBlueButton from "public/shared/BgBlueButton";
import RewardSingle from "public/shared/RewardSingle";
import InputWithColor from "public/shared/InputWithColor";
import AuthInput from "public/shared/AuthInput";
import Reward from "components/RewardRegister/Reward";

function NewRewardRegister() {
    // router
    const router = useRouter();
    // state
    const [textState, setTextState] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [isHidden, setIsHidden] = useState(hidden)
    const [file, setFile] = useState()
    const [rewardCount, setRewardCount] = useState([])
    // state store data
    const [imgList, setImgList] = useState([])
    const [count, setCount] = useState(1)
    const [data, setData] = useState([{}])
    const [rewardName, setRewardName] = useState({})
    const [receiveImg, setReceiveImg] = useState([])
    // ref store data

    const isRealValue = (value) =>
    {
        return value && value !== null && value !== undefined
    }

    const handleReceiveImg = (data) =>
    {
        setReceiveImg(prev => [...prev, data])
    }

    const closePopup = (e) => { setIsHidden(hidden) }

    const onChangeName = (e) =>
    {
        setRewardName(prev => ({...prev,[e.target.name]:e.target.value}))
    }

    const handleAdd = () =>
    {
        setRewardCount(prev => [...prev, 1])
        if(rewardName !== "" && count !== null && receiveImg !== null)
        {
            setData(prev => [...prev,{
                name:rewardName,
                amount:count,
                image:receiveImg
            }])
            console.log("passed!!!");
        }
    }
    
    const handleNavigate = () =>
    {
        router.push("/admin/event/event-detail")
    }

    useEffect(() =>
    {
        console.log(data);
    },[data])

    return (
        <section className="flex flex-col items-center justify-between w-screen h-screen">
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center">
                    {
                        rewardCount.map((item, index) =>
                        {
                            let nameId = `name${index}`
                            return (
                                <div key={index} className="flex w-full justify-center items-center">
                                    <Reward 
                                        id={index}
                                        name={nameId}
                                        rewardName={rewardName.nameId}
                                        onChangeRewardName={onChangeName}
                                        rewardCountValue={count}
                                        onRewardCountUp={() => setCount(count + 1)}
                                        onRewardCountDown={() => setCount(count - 1)}
                                        fileID={`file${index}`}
                                        toggleID={`toggle${index}`}
                                        receiveImg={handleReceiveImg}
                                    /> 
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-[90%] lg:w-3/4">
                    <SingleColorButton content={"Thêm phần quà"} colorHex={"#40BEE5"} onClick={handleAdd}/>
                </div>
            </div>
            <div className="pb-4 w-[90%] lg:w-4/12 drop-shadow-lg max-w-xl">
                <BgBlueButton content={"ĐĂNG KÝ SỰ KIỆN"} onClick={handleNavigate} />
            </div>
            <div className={isHidden} style={wrap}>
                <PopUp text={textState} icon={isSuccess ? successIcon : failIcon} close={closePopup} isWarning={!isSuccess} />
            </div>
        </section>
  );
}

export default NewRewardRegister;
