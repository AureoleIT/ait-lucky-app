import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";

import SingleColorButton from "public/shared/SingleColorButton";
import { failIcon, hidden, show, successIcon } from "public/util/popup";
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
    const [key, setKey] = useState([])
    const [rewardCount, setRewardCount] = useState([])
    // state store data
    const [data, setData] = useState([{}]) // data store array of object of reward
    const [value, setValue] = useState([]) // value store object of reward when typing
    // ref store data
    const refs = useRef()

    let uniqueKey = [] // uniqueKey store local id of reward

    const wrap = {
        height:"100%",
        zIndex: "20",
    }

    // idea: each reward has its own id (render in the first time component called by uuid)
    // idea: output of reward data is array of object and it's update when has change with the key is id render by uuid
    // idea: so we only get the last value of reward of each id

    // get value of reward realtime
    const handleReceiveData = (data) =>
    {
            setValue(prev => [...prev, data])
    }

    // get array of reward id (has duplicate)
    useEffect(() =>
    {
        value.map((item, index) =>
        {   
            let key = item[0] ?? [];
            setKey(prev => [...prev, key.id])
            return <></>
        })
    },[value])

    // store array of reward id (not duplicate)
    useMemo(() =>
    {
        key.forEach((item) =>
        {
            if(!uniqueKey.includes(item) && typeof item !== "undefined")
            {
                uniqueKey.push(item)
            }
        })
    },[key, uniqueKey])

    const closePopup = (e) => { setIsHidden(hidden) }

    // add reward
    const handleAdd = () =>
    {
        if(rewardCount.length > 0)
        {
            let valueLength = value.length - 1
            let lastValue = value[valueLength]

            if(lastValue[0].name !== "" && typeof lastValue[0].name !== "undefined")
            {
                setRewardCount(prev => [...prev, 1])
            }
            else 
            {
                setTextState("Vui long nhap ten giai thuong !")
                setIsSuccess(false)
                setIsHidden(show)
            }
        }
        else if(rewardCount.length === 0)
        {
            setRewardCount(prev => [...prev, 1])
        }
    }
    
    // navigate to event detail, push data to firebase and add to redux
    const handleNavigate = () =>
    {
        let valueLength = value.length - 1
        let lastValue = value[valueLength]
        console.log(valueLength);

        if(lastValue[0].name !== "" && typeof lastValue[0].name !== "undefined") {
            // save value to data
            uniqueKey.map((item, index) =>
            {
                for(let tempValueLength = valueLength; tempValueLength > 0; tempValueLength --)
                {
                    let tempValue = value[tempValueLength]
                    let tempItem = tempValue[0] ?? []
                    let tempId = tempItem.id
                    let tempName = tempItem.name 
                    let tempAmount = tempItem.amount
                    let tempImg = tempItem.image

                    if(tempId === item)
                    {
                        setData(prev => [...prev, 
                        {
                            name: tempName,
                            amount: tempAmount,
                            image: tempImg
                        }])
                        break;
                    }
                }
                return <></>
            })
            // setTextState("Da dang ky su kien !")
            // setIsSuccess(true)
            // setIsHidden(show)

            // setTimeout(() =>
            // {
            //     router.push("/admin/event/event-detail")
            // },2000)
        }
        else {
            setTextState("Vui long nhap ten giai thuong !")
            setIsSuccess(false)
            setIsHidden(show)
        }
    }

    useEffect(() =>
    {
        console.log(data);
    },[data])

    return (
        <section className="flex flex-col items-center justify-between w-screen h-screen">
            <div className="w-4/5 max-w-xl my-2 flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center">
                    {
                        rewardCount.map((item, index) =>
                        {
                            return (
                                <div key={index} className="flex w-full justify-center items-center">
                                    <Reward
                                        ref={refs}
                                        id={index}
                                        inputId={index}
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