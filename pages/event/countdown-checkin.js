import { useEffect, useState } from "react"
import { QRCodeCanvas } from "qrcode.react/lib"
import { useRouter } from "next/router"

import BgBlueButton from "public/shared/BgBlueButton"
import ButtonAndIcon from "public/shared/ButtonAndIcon"
import Line from "public/shared/Line"
import PinCode from "public/shared/PinCode"
import testCoundown from "public/util/testCountdown"
import PopUpQR from "public/shared/PopUpQR"
import { failIcon, hidden, show, successIcon } from "public/util/popup"
import PopUp from "public/shared/PopUp"


function CountDownCheckIn () 
{
    // router
    const router = useRouter()

    const {
        query: {countdown}
    } = router

    const props = {countdown}

    // state
    const [minutes, setMinutes] = useState(countdown)
    const [seconds, setSeconds] = useState(0)
    const [qrCodeValue, setQrCodeValue] = useState("")
    const [isHidden, setIsHidden] = useState(hidden) // qr code hidden state
    const [isNavigateHidden, setIsNavigateHidden] = useState(hidden) // pop up navigate hidden state
    const [isActive, setIsActitve] = useState(true)
    const [isStop, setIsStop] = useState(false)
    const [textState, setTextState] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const countDownNumber = {
        background: "#3B88C3"
    }

    const zIndex = {
        "z-index": "10",
    }

    const zIndexNaviagte = {
        "z-index": "20",
    }

    const pinCode = 263451

    useEffect(() =>
    {
        let date = new Date()
        let deadline = date.getTime() + (minutes * 60 * 1000)

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

                    setTextState("Bắt đầu sự kiện !")
                    setIsSuccess(true)
                    setIsNavigateHidden(show)

                    setTimeout(() =>
                    {
                        router.push("/event/lucky_spin")
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
    },[isActive, isStop])
    
    const closePopup = (e) => {
        setIsHidden(hidden);
    };

    // generate qr code
    const generateQRcode = () =>
    {
        setQrCodeValue(`http://localhost:3000/event/lucky_spin/${pinCode}`)
        let toggle = document.getElementById("qr_code")
        toggle.style.display = "flex"
        setIsHidden(show)
    }

    const handleDownloadQR = () =>
    {
        const qrCodeURL = document.getElementById("qrCode")
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")

        let downloadElement = document.createElement("a")
        downloadElement.href = qrCodeURL
        downloadElement.download = "QR_Code.png"
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
    }

    const handleStartEvent = () =>
    {   
        setIsStop(true)

        setTextState("Bắt đầu sự kiện !")
        setIsSuccess(true)
        setIsNavigateHidden(show)

        setTimeout(() =>
        {
            router.push("/event/lucky_spin")
        }, 2000)
    }

    return (
        <section className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="uppercase text-4xl py-2 font-bold text-[#004599]">tiệc cuối năm</h1>
            <h1 className="uppercase text-base py-2 font-bold text-[#004599]">mã pin sự kiện</h1> 

             {/* id room */}

            <div className="w-[90%] lg:w-4/12 max-w-xl h-[80px] flex justify-center items-center rounded-[10px] mb-4">
                <PinCode length={6} value={pinCode} />
            </div>  

            {/* qr code */}

            <div className="w-[90%] lg:w-4/12 max-w-xl flex mb-4 drop-shadow-lg">
                <ButtonAndIcon content={"TẠO MÃ QR"} classIcon={"fas fa-qrcode"} colorHex={"#40BEE5"} onClick={generateQRcode}/>
            </div>

            <div className={isHidden} style={zIndex}>
                <PopUpQR close={closePopup}>
                    <div className="hidden mb-3 justify-center" id="qr_code">
                        <div>
                            <QRCodeCanvas id="qrCode" size={100} value={qrCodeValue} />
                        </div>
                        <div className="relative">
                            <i className="fas fa-download text-[20px] ml-3 absolute bottom-0" onClick={handleDownloadQR}></i>
                        </div>
                    </div>
                </PopUpQR>
            </div>

            <div className="flex justify-center w-full mb-4">
                
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

            <div className="w-3/4 md:w-4/12 flex justify-between mb-2">
                <div className="">
                    <p className="text-[#004599] font-bold">Số người tham gia</p>
                </div>
                <div className="flex">
                    <div className="w-[24px] h-[24px] rounded-[5px] text-white font-bold mr-1 flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                        {Math.floor(testCoundown.participants / 10)}
                    </div>
                    <div className="w-[24px] h-[24px] rounded-[5px] text-white font-bold flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                        {Math.floor(testCoundown.participants % 10)}
                    </div>
                </div>
            </div>

            <h1 className="uppercase text-xl py-2 font-bold text-[#004599]">người chơi</h1> 

            <div className="w-[90%] lg:w-4/12 max-w-xl z-0">
                <Line />
            </div>

            <div className="w-full max-h-[200px] overflow-x-hidden overflow-y-auto">
                <div className="w-full h-full flex flex-col items-center">
                    {
                        testCoundown.player.map((player, index) =>
                        {
                            return(
                                <h1 className="text-xl py-2 font-bold text-[#004599]" key={index}>{player}</h1>
                            )
                        })
                    }
                </div>
            </div>

            <div className="w-[90%] lg:w-4/12 max-w-xl mb-4 z-0">
                <Line />
            </div>

            <div className="w-11/12 md:w-9/12 lg:w-4/12 flex justify-center items-center" onClick={handleStartEvent}>
                <div className="w-full mr-1 drop-shadow-lg">
                    <BgBlueButton content={"BẮT ĐẦU"}/>
                </div>
            </div>

            <div className={isNavigateHidden} style={zIndexNaviagte}>
                <PopUp 
                    text={textState}
                    icon={isSuccess ? successIcon : failIcon}
                    close={closePopup}
                    isWarning={!isSuccess}
                />
            </div>

        </section>
    )
}

export default CountDownCheckIn;
