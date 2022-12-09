import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/router";

import SingleColorButton from "public/shared/SingleColorButton";
import { failIcon, hidden, show, successIcon } from "public/util/popup";
import PopUp from "public/shared/PopUp";
import BgBlueButton from "public/shared/BgBlueButton";
import Reward from "components/RewardRegister/Reward";
import { messagesError, messagesSuccess } from "public/util/messages"

import {v4 as uuidv4} from "uuid"

import { db } from "src/firebase"
import { storage } from "src/firebase"
import { set, ref, update } from "firebase/database"
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage"

import { useUserCurrEventHook } from "public/redux/hooks";
import { useSelector } from "react-redux";

function RewardRegister() {
    // router
    const router = useRouter();
    // eventID
    const eventID = useUserCurrEventHook()
    // state
    const [textState, setTextState] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [isHidden, setHidden] = useState(hidden)
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

    // message
    const showMethod = useCallback((message, isTrue) => {
        setTextState(message);
        setIsSuccess(isTrue);
        setHidden(show);
    }, [])

    // idea: each reward has its own id (render in the first time component called by uuid)
    // idea: output of reward data is array of object and it's update when has change with the key is id render by uuid
    // idea: so we only get the last value of reward of each id

    // get value of reward realtime
    const handleReceiveData = useCallback((data) =>
    {
        setValue(prev => [...prev, data])
    })

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
    },[key])

    const closePopup = useCallback(() => {
        setHidden(hidden);
    }, []);

    // add reward
    const handleAdd = useCallback(() =>
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
                showMethod(messagesError.E0001("Tên giải thưởng"), false)
            }
        }
        else if(rewardCount.length === 0)
        {
            setRewardCount(prev => [...prev, 1])
        }
    },[rewardCount, value, showMethod])
    
    // navigate to event detail, push data to firebase and add to redux
    const handleNavigate = useCallback(() =>
    {
        let valueLength = value.length - 1
        let lastValue = value[valueLength]

        if(lastValue[0].name !== "" && typeof lastValue[0].name !== "undefined") {
            // save value to data
            uniqueKey.map((item, index) =>
            {
                for(let tempValueLength = valueLength; tempValueLength > 0; tempValueLength --)
                {
                    const id = uuidv4()
                    let tempValue = value[tempValueLength]
                    let tempItem = tempValue[0] ?? []
                    let tempId = tempItem.id
                    let tempName = tempItem.name 
                    let tempAmount = tempItem.amount
                    let tempImg = tempItem.image

                    if(tempId === item)
                    {
                        let imgLength = tempImg.length - 1
                        for(let index = 1; index <= imgLength; index++)
                        {
                            let imageRef = refStorage(storage, `rewards_image/${eventID}/${id}/${tempImg[index] + uuidv4()}`);
                            uploadBytes(imageRef, tempImg[index]).then((snapshot) => {
                                getDownloadURL(snapshot.ref)
                                    .then((url) =>
                                    {
                                        set(ref(db,`event_rewards/${id}/imgUrl/${index}`),url)
                                            .catch((err) => showMethod(messagesError.E4444, false))
                                    })
                            })
                        }

                        const newReward = {
                            idReward: id,
                            nameReward:tempName,
                            eventId:eventID,
                            quantity: tempAmount,
                            sortNo:"",
                            quantityRemain:"",
                            imgUrl: tempImg
                        }
                        set(ref(db, `event_rewards/${id}`),newReward)
                            .then(() =>
                            {
                                showMethod(messagesSuccess.I0001, true)
                            })
                            .catch((err) =>
                            {
                                showMethod(messagesError.E4444, false)
                            })
                        break;
                    }
                }
                return <></>
            })
            setTimeout(() =>
            {
                router.push("/admin/event/event-detail")
            },2000)
        }
        else {
            showMethod(messagesError.E0001("Tên giải thưởng"), false)
        }
    },[showMethod, value, uniqueKey, setData])

    const renderReward = useMemo(() =>
    {
        return (
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
        )
    },[rewardCount])

    const renderAddRewardButton = useMemo(() =>
    {
        return (
            <div className="w-full">
                <SingleColorButton content={"Thêm phần quà"} colorHex={"#40BEE5"} onClick={handleAdd}/>
            </div>
        )
    },[handleAdd])

    const renderRewardRegisterButton = useMemo(() =>
    {
        return (
            <div className="pb-4 w-4/5 drop-shadow-lg max-w-xl">
                <BgBlueButton content={"ĐĂNG KÝ SỰ KIỆN"} onClick={() => handleNavigate(value, uniqueKey)} />
            </div>
        )
    },[handleNavigate, value, uniqueKey])

    const renderPopUp = useMemo(() =>
    {
        return (
            <div className={isHidden} style={wrap}>
                <PopUp text={textState} icon={isSuccess ? successIcon : failIcon} close={closePopup} isWarning={!isSuccess} />
            </div>
        )
    },[closePopup, isHidden, isSuccess, textState])

    return (
        <section className="flex flex-col items-center justify-between w-screen h-screen">
            <div className="w-4/5 max-w-xl my-2 flex flex-col items-center justify-center">
                {renderReward}
                {renderAddRewardButton}
            </div>
            {renderRewardRegisterButton}
            {renderPopUp}
        </section>
  );
}

export default RewardRegister;