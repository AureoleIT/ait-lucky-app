import BgBlueButton from "public/shared/BgBlueButton"
import ButtonWithIcon from "public/shared/ButtonWithIcon"
import SpecialRewardInfo from "public/shared/SpecialRewardInfo"

function EventDetail () {

    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
    }

    const wrapperBorder = {
        border:"2px solid #40bee5",
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="uppercase text-4xl py-2 font-bold" style={contentCSS}>tiệc cuối năm</h1>
            <h1 className="uppercase text-xl py-2 mb-2 font-bold"  style={contentCSS}>mã pin sự kiện</h1> 

            {/* id room */}

            <div className="w-[90%] h-[70px] flex justify-center items-center rounded-[10px] my-2" style={wrapperBorder}>
                <div className="flex justify-between px-5 w-full text-3xl text-[#40BEE5]">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                </div>
            </div>  

            {/* qr code */}

            <div className="w-[90%] flex mb-5">
                <ButtonWithIcon content={"TẠO MÃ QR"} classIcon={"fas fa-qrcode"}/>
            </div>

            {/* rewards information */}

            <h1 className="uppercase text-[#004599] font-bold mb-2">thông tin giải thưởng</h1>
            <hr className="w-[100%] h-[3px] bg-gradient-to-r from-[#003B93] to-[#00F0FF]"/>
            <div className="flex flex-col overflow-x-hidden overflow-y-auto justify-center items-center w-[90%] my-2">
                <div className="my-2 w-full h-[300px] flex flex-col max-h-[300px]">
                    <SpecialRewardInfo  rewardName={"giải đặc biệt"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                </div>
            </div>
            <hr className="w-[100%] h-[3px] bg-gradient-to-r from-[#003B93] to-[#00F0FF]"/>

            <h1 className="uppercase text-[#004599] font-bold">số người tham gia: 100</h1>
            <div className="w-[90%]">
                <BgBlueButton content={"BẮT ĐẦU SỰ KIỆN"}/>
            </div>
        </div>
    )
}

export default EventDetail