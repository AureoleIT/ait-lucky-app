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
import { messagesError, messagesSuccess } from "public/util/messages"

import { db } from "src/firebase"
import {ref, set, onValue, query, orderByChild, equalTo, update} from "firebase/database"
import { storage } from "src/firebase"
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage"

import { useUserCurrEventHook } from "public/redux/hooks";
import { failIcon, hidden, show, successIcon } from "public/util/popup";

import {v4 as uuidv4} from "uuid"
import PopUp from "public/shared/PopUp";

function EditEventRewardRegister() {
    // router
    const router = useRouter();
    // eventID
    const eventID = useUserCurrEventHook()
    // state
    const [event, setEvent] = useState({})
    const [rewards, setRewards] = useState([])
    const [nameEvent, setNameEvent] = useState("")
    const [description, setDescription] = useState("")
    const [maxTicket, setMaxTicket] = useState("")

    const [textState, setTextState] = useState("");
    const [isHidden, setHidden] = useState(hidden);
    const [isSuccess, setIsSuccess] = useState(false);
  

    const [rewardId, setRewardId] = useState([])
    const [nameReward, setNameReward] = useState([])
    const [quantity, setQuantity] = useState([])
    const [imageFB, setImageFB] = useState([])
    const [key, setKey] = useState([])
    const [value, setValue] = useState([]) // value store object of reward when typing

    const [rewardCount, setRewardCount] = useState([])

    let uniqueKey = [] // uniqueKey store local id of reward
    let diffKey = useRef([])

    // message
    const showMethod = useCallback((message, isTrue) => {
        setTextState(message);
        setIsSuccess(isTrue);
        setHidden(show);
    }, [])

    const closePopup = useCallback(() => {
        setHidden(hidden);
      }, []);
    
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
                Object.values(data)[0].publicFlag === 1 ? (checkBoxRef.current.checked = true) : (checkBoxRef.current.checked = false)
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

    useEffect(() =>
    {
        diffKey.current = uniqueKey.filter(x => rewardId.indexOf(x) === -1)
    },[uniqueKey])

    const handleNavigate = useCallback(() => {
        if(nameEvent !== "" && description !== "" && maxTicket !== "")
        {
            update(ref(db, `event/${eventID}`),
            {
                eventId: eventID,
                publicFlag: checkBoxRef.current.checked ? 1 : 0,
                title: nameEvent,
                description: description,
                maxTicket: maxTicket,
            })
            .then(() =>
            {
                showMethod(messagesSuccess.I0007("sự kiện"), true)
            })
            .catch((e) =>
            {
                showMethod(messagesError.E4444, false)
            })
        }

        let valueLength = value.length - 1
        let lastValue = value[valueLength]

        if(lastValue[0].name !== "" && typeof lastValue[0].name !== "undefined")
        {
            let beforeSortNoLength = rewardId.length
            rewardId.map((item, index) =>
            {
                for(let tempValueLength = valueLength; tempValueLength > 0; tempValueLength --)
                {
                    let tempValue = value[tempValueLength]
                    let tempItem = tempValue[0] ?? []
                    let tempId = tempItem.id
                    let tempName = tempItem.name
                    let tempAmount = tempItem.amount
                    let tempImg = tempItem.image
                    let updateImg = []

                    if(tempId === item)
                    {
                        let imgLength = tempImg.length - 1
                        for(let index = 1; index <= imgLength; index++)
                        {
                            if(typeof tempImg[index] === "object" && tempImg[index].length !== 0)
                            {
                                updateImg.push(tempImg[index])
                                let imageRef = refStorage(storage, `rewards_image/${eventID}/${tempId}/${tempImg[index] + uuidv4()}`);
                                uploadBytes(imageRef, tempImg[index]).then((snapshot) => {
                                    getDownloadURL(snapshot.ref)
                                        .then((url) =>
                                        {
                                            set(ref(db,`event_rewards/${tempId}/imgUrl/${index}`),url)
                                                .catch((err) => showMethod(messagesError.E4444, false))
                                        })
                                })
                            }
                            else if (typeof tempImg[index] !== "undefined" && typeof tempImg[index] !== "object")
                            {
                                updateImg.push(tempImg[index])
                                let imageRef = refStorage(storage, `rewards_image/${eventID}/${tempId}/${tempImg[index] + uuidv4()}`);
                                uploadBytes(imageRef, tempImg[index]).then((snapshot) => {
                                    getDownloadURL(snapshot.ref)
                                        .then((url) =>
                                        {
                                            set(ref(db,`event_rewards/${tempId}/imgUrl/${index}`),url)
                                                .catch((err) => showMethod(messagesError.E4444, false))
                                        })
                                })
                            }
                        }
                        update(ref(db, `event_rewards/${tempId}`),
                        {
                            idReward: tempId,
                            nameReward:tempName,
                            eventId:eventID,
                            quantity: tempAmount,
                            sortNo:index,
                            quantityRemain:tempAmount,
                            imgUrl: updateImg
                        })
                        break;
                    }
                }
                return <></>
            })

            diffKey.current.map((item, index) =>
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
                        let imgLength = tempImg.length - 1
                        for(let index = 1; index <= imgLength; index++)
                        {
                            let imageRef = refStorage(storage, `rewards_image/${eventID}/${tempId}/${tempImg[index] + uuidv4()}`);
                            uploadBytes(imageRef, tempImg[index]).then((snapshot) => {
                                getDownloadURL(snapshot.ref)
                                    .then((url) =>
                                    {
                                        set(ref(db,`event_rewards/${tempId}/imgUrl/${index}`),url)
                                            .catch((err) => showMethod(messagesError.E4444, false))
                                    })
                            })
                        }

                        const newReward = {
                            idReward: tempId,
                            nameReward:tempName,
                            eventId:eventID,
                            quantity: tempAmount,
                            sortNo:index + beforeSortNoLength,
                            quantityRemain:"",
                            imgUrl: tempImg
                        }
                        set(ref(db, `event_rewards/${tempId}`),newReward)
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
                router.push("/admin/event/event-detail");
            },[2000])
        }
        else{
            showMethod(messagesError.E0001("Tên giải thưởng"), false)
        }
    });

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

    const renderPopUp = useMemo(() => {
        return (
          <div className={isHidden}>
            <PopUp
              text={textState}
              icon={isSuccess ? successIcon : failIcon}
              close={closePopup}
              isWarning={!isSuccess}
            />
          </div>
        )
      }, [closePopup, isHidden, isSuccess, textState])

    return (
        <section className="flex flex-col overflow-y-auto overflow-x-hidden items-center h-screen w-screen">
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
            {renderPopUp}
        </section>
    );
}

export default EditEventRewardRegister;