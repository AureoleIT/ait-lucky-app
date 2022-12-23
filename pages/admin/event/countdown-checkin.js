import { useCallback, useEffect, useMemo, useState } from "react"
import { QRCodeCanvas } from "qrcode.react/lib"
import { useRouter } from "next/router"

import Line from "public/shared/Line"
import PinCode from "public/shared/PinCode"
import PopUpQR from "public/shared/PopUpQR"
import { ShowMethod, hidden, show, HideMethod } from "public/util/popup"
import PopUp from "public/shared/PopUp"
import Title from "public/shared/Title"
import { TEXT } from "public/util/colors"
import PlayerList from "public/shared/PlayerList"
import { messagesSuccess } from "public/util/messages"

import { useUserCurrEventCreatingHook, usePopUpMessageHook, usePopUpStatusHook, usePopUpVisibleHook, useUserCurrEventHostingHook } from "public/redux/hooks";
import { useDispatch } from "react-redux"

import { db } from "src/firebase"
import {ref, update, onValue, query, orderByChild, equalTo} from "firebase/database"
import { Button, PageLoading } from "public/shared"


function CountDownCheckIn () 
{
    // router
    const router = useRouter()
    // user
    const { query: { countdown, statusEvent } } = router

    const props = {countdown, statusEvent}
    let initCountdown = countdown
    // dispatch
    const dispatch = useDispatch()
    // eventID
    let event
    const creatingEvent = useUserCurrEventCreatingHook()
    const hostingEvent = useUserCurrEventHostingHook()
    if(statusEvent === "1")
    {
        event = creatingEvent
    }
    else 
    {
        event = hostingEvent
        if(hostingEvent.waitingTime !== undefined)
        {
            initCountdown = hostingEvent.waitingTime
        }
    }
    const eventID = event.eventId
    const pinCode = eventID.slice(0,6)
    const startingTime = event.startAt

    // state
    const [loadedData, setLoadedData] = useState(false)
    const [minutes, setMinutes] = useState(Math.floor(initCountdown / 60))  // store minutes of countdown
    const [seconds, setSeconds] = useState(0) // store seconds of countdown
    const [qrCodeValue, setQrCodeValue] = useState("")  // store qr code value
    const [isHidden, setIsHidden] = useState(hidden) // qr code hidden state
    const isActive = true  // countdown
    const [isStop, setIsStop] = useState(false)  // countdown
    const [player, setPlayer] = useState(0)  // number of player join
    const [playerList, setPlayerList] = useState([])  // list of player join
    const [eventName, setEventName] = useState(event.title)

    const countDownNumber = { background: "#3B88C3" }
    const zIndex = { zIndex: "10" }
    const zIndexNaviagte = { zIndex: "20" }
    // message
    const message = usePopUpMessageHook()
    const visible = usePopUpVisibleHook()
    const status = usePopUpStatusHook()

    setTimeout(() => setLoadedData(true), 2500)  // load page

    // get participants from firebase
    const que2 = query(ref(db, "event_participants"), orderByChild("eventId"), equalTo(eventID));
    useEffect(() =>
    {
        onValue(que2, (snapshot) => {
            if (snapshot.exists()) {
                const rawData = snapshot.val();
                const data = Object.values(rawData)
                setPlayerList(Object.values(rawData));
                setPlayer(data.length)
            }
        });
    },[])

    // get event name from firebase
    const queryGetName = query(ref(db, "event"), orderByChild("eventId"), equalTo(eventID))
    useEffect(() =>
    {
        onValue(queryGetName, (snapshot) =>
        {
            if(snapshot.exists())
            {
                const rawData = snapshot.val()
                const data = Object.values(rawData)
                setEventName(data[0].title)
            }
        })
    },[])

    //countdown
    useEffect(() =>
    {
        setTimeout(() =>
        {
            let date = new Date()
            let deadline
            if(startingTime !== undefined)
            {
                deadline = startingTime + (minutes * 60 * 1000)
            }
            else 
            {
                deadline = date.getTime() + (minutes * 60 * 1000)
            }
    
            let countdown = null
    
            if(isActive && isStop === false)
            {
                countdown = setInterval(() => {
                    let nowDate = new Date()
                    let left = deadline - nowDate
    
                    let nowSeconds = Math.floor((left / 1000) % 60);
                    let nowMinutes = Math.floor((left / 1000 / 60) % 60);
    
                    if(nowMinutes === 0 && nowSeconds === 0)
                    {
                        clearInterval(countdown)
    
                        update(ref(db,`event/${eventID}`),
                        {
                            status:3,
                        })
    
                        ShowMethod(dispatch, messagesSuccess.I0010, true)
    
                        setTimeout(() =>
                        {
                            router.push(`/admin/luckyspin/${pinCode}`)
                        },2000)
                    }
                    else {
                        setMinutes(nowMinutes)
                        setSeconds(nowSeconds)
                    }   
                }, 1000)
            }
            else {
                clearInterval(countdown)
            }
            return () => clearInterval(countdown)
        },2500)
    },[isActive, isStop, dispatch])
    
    // close pop up
    const closePopup = (e) => {
        setIsHidden(hidden);
    };

    // generate qr code
    const generateQRcode = useCallback(() =>
    {
        setQrCodeValue(`http://localhost:3000/event/coutdown-checkin/${eventID}`)
        let toggle = document.getElementById("qr_code")
        toggle.style.display = "flex"
        setIsHidden(show)
    },[pinCode])

    // download qr code 
    const handleDownloadQR = () =>
    {
        const qrCodeURL = document.getElementById("qrCode")
        const pngUrl = qrCodeURL
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")

        let downloadElement = document.createElement("a")
        downloadElement.href = pngUrl
        downloadElement.download = `${pinCode}.png`
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
    }

    // start event
    const handleStartEvent = useCallback(() =>
    {   
        setIsStop(true)
        ShowMethod(dispatch, messagesSuccess.I0010, true)
        setTimeout(() =>
        {
            HideMethod(dispatch)
            router.push(`/admin/luckyspin/${pinCode}`)
        }, 2000)
    },[dispatch, pinCode])

    const renderTitleandH1 = useMemo(() =>
    {
        return (
            <>
                <Title title={eventName}/>
                <h1 className="font-[900] uppercase text-[#004599] text-[22px] text-center mb-1">mã pin sự kiện</h1> 
            </>
        )
    },[eventName])

    const renderPinCode = useMemo(() =>
    {
        return (
            <div className="w-4/5 max-w-xl h-[80px] flex justify-center items-center">
                <PinCode length={6} value={pinCode} />
            </div> 
        )
    },[pinCode])

    const renderButtonQRcode = useMemo(() =>
    {
        return (
            <div className="max-w-xl w-4/5 flex mb-3 drop-shadow-lg">
                <Button content={"TẠO MÃ QR"} iconClass={"fas fa-qrcode"} primaryColor={"#40BEE5"} onClick={generateQRcode}/>
            </div>
        )
    },[generateQRcode])

    const renderQRPopup = useMemo(() =>
    {
        return (
            <div className={isHidden} style={zIndex}>
                <PopUpQR close={closePopup}>
                        <div className="hidden mb-3 justify-center" id="qr_code">
                            <div className="flex justify-center items-center">
                                <div>
                                    <QRCodeCanvas id="qrCode" size={120} value={qrCodeValue} />
                                </div>
                                <div className="relative">
                                        <i className="fas fa-download text-[20px] ml-3 absolute bottom-0" onClick={handleDownloadQR}></i>
                                </div>
                            </div>
                        </div>
                </PopUpQR>
            </div>
        )
    },[isHidden, handleDownloadQR, pinCode, closePopup, qrCodeValue])

    const renderCountdownTime = useMemo(() =>
    {
        return (
            <div className="flex justify-center max-w-xl w-4/5 mb-3">
                
                <div className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {minutes > 9 ? (Math.floor(minutes / 10)) : 0}
                </div>
                <div className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {minutes > 9 ? (Math.floor(minutes % 10)) : minutes}
                </div>
                <div className="mr-1 text-6xl flex justify-center items-center">
                    <span className="flex justify-center items-center text-[#3B88C3]">:</span>
                </div>
                <div className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {seconds > 9 ? Math.floor(seconds / 10) : 0}
                </div>
                <div className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {seconds > 9 ? Math.floor(seconds % 10) : seconds}
                </div>

            </div>
        )
    },[minutes, seconds])

    const renderParticipants = useMemo(() =>
    {
        return (
            <div className="max-w-xl w-4/5 flex justify-between mb-2">
                <p className={`text-[16px] text-[${TEXT}] font-bold text-center`}>Số người tham gia</p>
                <div className="flex">
                    <div className="w-[24px] h-[24px] rounded-[5px] text-white font-bold mr-1 flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                        {Math.floor(player / 10)}
                    </div>
                    <div className="w-[24px] h-[24px] rounded-[5px] text-white font-bold flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                        {Math.floor(player % 10)}
                    </div>
                </div>
            </div>
        )
    },[player])

    const renderH1andLine = useMemo(() =>
    {
        return (
            <>
                <h1 className="uppercase text-xl font-bold text-[#004599]">người chơi</h1> 
                <div className="max-w-xl w-4/5 z-0"> <Line /> </div>
            </>
        )
    },[])

    const renderPlayer = useMemo(() =>
    {
        return (
            <div className="max-w-xl w-4/5 h-[200px] overflow-x-hidden overflow-y-auto scrollbar-hide py-3">
                <div className="w-full h-full flex flex-col items-center mb-3">
                    <PlayerList listPlayer={playerList} />
                </div>
            </div>
        )
    },[playerList])

    const renderLine3 = useMemo(() =>
    {
        return ( <div className="max-w-xl w-4/5 mb-1 z-0"> <Line /> </div> )
    },[])

    const renderStartButton = useMemo(() =>
    {
        return (
            <div className="max-w-xl w-4/5 flex justify-center items-center" onClick={handleStartEvent}>
                <div className="w-full mr-1 drop-shadow-lg">
                    <Button content={"BẮT ĐẦU"} primaryColor={"#003B93"} secondaryColor={"#00F0FF"}/>
                </div>
            </div>
        )
    },[handleStartEvent])

    const renderPopup = useMemo(() =>
    {
        return (
            <div className={visible} style={zIndexNaviagte}> <PopUp text={message} status={status} isWarning={!status} /> </div>
        )
    },[status, message, visible])

    return (
        <>
        {
            loadedData ? 
            (
                <section className="flex flex-col justify-center items-center h-screen w-screen">
                            {renderTitleandH1}
                            {/* id room */}
                            {renderPinCode}
                            {/* qr code */}
                            {renderButtonQRcode}
                            {renderQRPopup}
                            {renderCountdownTime}
                            {renderParticipants}
                            {renderH1andLine}
                            {renderPlayer}
                            {renderLine3}
                            {renderStartButton}
                            {renderPopup}
                </section>
            )
            :
            (
                <PageLoading />
            )
        }
        </>
    )
}

export default CountDownCheckIn;