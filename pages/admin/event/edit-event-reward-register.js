import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";

import TextArea from "public/shared/TextArea";
import AuthInput from "public/shared/AuthInput";
import Header from "public/shared/Header";
import Reward from "components/RewardRegister/Reward";
import BgBlueButton from "public/shared/BgBlueButton";
import SingleColorButton from "public/shared/SingleColorButton";
import Title from "public/shared/Title";
import CheckBox from "public/shared/CheckBox";

import { db } from "src/firebase"
import {ref, onValue, query, orderByChild, equalTo} from "firebase/database"

import { useUserCurrEventHook } from "public/redux/hooks";

function EditEventRewardRegister() {
    // router
    const router = useRouter();
    // eventID
    const eventID = useUserCurrEventHook()
    // state
    const [event, setEvent] = useState({})
    const [rewards, setRewards] = useState([])
    const [newRewards, setNewRewards] = useState([])
    const [updateRewads, setUpdateRewards] = useState([])
    const [nameEvent, setNameEvent] = useState("")
    const [description, setDescription] = useState("")
    const [maxTicket, setMaxTicket] = useState("")

    const [rewardId, setRewardId] = useState([])
    const [nameReward, setNameReward] = useState([])
    const [quantity, setQuantity] = useState([])
    const [imageFB, setImageFB] = useState([])
    const [key, setKey] = useState([])
    const [value, setValue] = useState([]) // value store object of reward when typing

    const [rewardCount, setRewardCount] = useState([])

    let uniqueKey = [] // uniqueKey store local id of reward

    // message
    const showMethod = useCallback((message, isTrue) => {
        setTextState(message);
        setIsSuccess(isTrue);
        setHidden(show);
    }, [])
    
    // ref
    const checkBoxRef = useRef()

    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    };
    // get event from firebase
    const getEvent = query(ref(db, "event"), orderByChild("eventId"), equalTo(eventID))

    useEffect(() =>
    {
        onValue(getEvent, (snapshot) =>
        {
            const data = snapshot.val()
            if(data !== undefined)
            {
                setNameEvent(Object.values(data)[0].title)
                setDescription(Object.values(data)[0].description)
                setMaxTicket(Object.values(data)[0].maxTicket)
                Object.values(data)[0].publicFlag == 1 ? (checkBoxRef.current.checked = true) : (checkBoxRef.current.checked = false)
                setEvent(Object.values(data)[0])
            }
        })
    },[])
    // get reward from firebase
    const getReward = query(ref(db, "event_rewards"), orderByChild("eventId"), equalTo(String(eventID)))
    useEffect(() =>
    {
        onValue(getReward, (snapshot) =>
        {
            const data = snapshot.val()
            if (data !== undefined)
            {
                setRewards(Object.values(data))
            }   
        })
        
    },[])

    useEffect(() =>
    {
        rewards.map((item, index) =>
        {
            setRewardId(prev => [...prev, item.idReward])
            setNameReward(prev => [...prev, item.nameReward])
            setQuantity(prev => [...prev, item.quantity])
            setImageFB(prev => [...prev, item.imgUrl])
        })
    },[rewards])

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

    const handleNavigate = () => {
        // router.push("/admin/event/event-detail");
        console.log("name event: ", nameEvent);
        console.log("description: ", description);
        console.log("max ticket: ", maxTicket);
        console.log("value: ", value);
        console.log("public flag: ", checkBoxRef.current.checked);
        console.log("uniqueKey: ", uniqueKey);
        console.log("rewardId: ", rewardId);

        let valueLength = value.length - 1
        let lastValue = value[valueLength]

        if(lastValue[0].name !== "" && typeof lastValue[0].name !== "undefined")
        {
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
                        setNewRewards(prev => [...prev, 
                        {
                            idReward: tempId,
                            nameReward:tempName,
                            eventId:eventID,
                            quantity: tempAmount,
                            sortNo:index,
                            quantityRemain:"",
                            imgUrl: tempImg
                        }])
                        break;
                    }
                }
                return <></>
            })
        }
        else {
            showMethod(messagesError.E0001("Tên giải thưởng"), false)
        }
    };

    useEffect(() =>
    {
        console.log("new: ",newRewards);
    },[newRewards])

    // useEffect(() =>
    // {
    //     console.log("update: ",updateRewads);
    // },[updateRewads])

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

    const renderHeader = useMemo(() =>
    {
        return (
            <div className="w-full"> <Header /> </div>
        )
    },[])

    const renderTitle = useMemo(() =>
    {
        return ( <Title fontSize={"20"} title={event.title}/> )
    },[event])

    const renderEventTitle = useMemo(() =>
    {
        return (
            <div className="w-full h-[70px]">
                <TextArea content={"Tên sự kiện"} maxLength={"100"} value={nameEvent} onChange={(e) => setNameEvent(e.target.value)} />
            </div>
        )
    },[setNameEvent, nameEvent])

    const renderEventDescription = useMemo(() =>
    {
        return (
            <div className="pb-[1rem] pt-[2rem] w-full h-[200px]">
                <TextArea content={"Mô tả sự kiện"} row={5} maxLength={"1000"} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
        )
    },[description, setDescription])

    const renderMaxTicket = useMemo(() =>
    {
        return (
            <div className="w-full">
                <AuthInput leftColor={"#003B93"} rightColor={"#00F0FF"} content={"Giới hạn người tham gia"} type={"number"} min={"1"} value={maxTicket} onChange={(e) => setMaxTicket(e.target.value)} />
            </div>
        )
    },[maxTicket, setMaxTicket])

    const renderCheckbox = useMemo(() =>
    {
        return (
            <div className="w-full flex justify-center items-center">
                <div className="w-[70%]">
                    <p style={contentCSS} className="font-bold"> Cho phép người tham gia không cần đăng nhập </p>
                </div>
                <div className="w-[30%] flex items-center text-right">
                    <CheckBox ref={checkBoxRef} />
                </div>
            </div>
        )
    },[checkBoxRef])

    const renderReward = useMemo(() =>
    {
        return (
            <>
            {
                rewards.map((item, index) =>
                {
                    return (
                        <div key={index} className={"flex w-full justify-center items-center"}>
                            <Reward
                                rewardId={rewardId[index]}
                                fileID={`file${index}`}
                                toggleID={`toggle${index}`}
                                rewardName={nameReward[index]}
                                amount={quantity[index]}
                                imageList={imageFB[index]}
                                receiveData={handleReceiveData}
                            /> 
                        </div>
                    )
                })
            }
            </>
        )
    },[nameReward, quantity, imageFB])

    const renderNewReward = useMemo(() =>
    {
        return (
            <div className="w-full flex flex-col items-center justify-center">
                {
                    rewardCount.map((item, index) =>
                    {
                        return (
                            <div key={index} className="flex w-full justify-center items-center">
                                <Reward
                                    fileID={`filenew${index}`}
                                    toggleID={`togglenew${index}`}
                                    receiveData={handleReceiveData}
                                /> 
                            </div>
                        )
                    })
                }
            </div>
        )
    },[rewardCount])

    const renderAddButton = useMemo(() =>
    {
        return (
            <div className="w-full">
                <SingleColorButton content={"Thêm phần quà"} colorHex={"#40BEE5"} onClick={handleAdd}/>
            </div>
        )
    },[handleAdd])

    const renderEditButton = useMemo(() =>
    {
        return (
            <div className="py-3 w-4/5 max-w-xl">
                <BgBlueButton content={"ĐIỀU CHỈNH"} onClick={handleNavigate} />
            </div>
        )
    },[handleNavigate])

    return (
        <div className="flex flex-col overflow-y-auto overflow-x-hidden items-center h-screen w-screen">
            {renderHeader}
            <div className="w-4/5 max-w-xl flex flex-col items-center justify-center mb-5">
                {renderTitle}
                {renderEventTitle}
                {renderEventDescription}
                {renderMaxTicket}
                {renderCheckbox}
            </div>

            <div className="w-4/5 max-w-xl flex flex-col items-center justify-center mt-5">
                {renderReward}
                {renderNewReward}
                {renderAddButton}
            </div>
            {renderEditButton}
            
        </div>
    );
}

export default EditEventRewardRegister;