import BgBlueButton from "public/shared/BgBlueButton"
import SpecialRewardInfo from "public/shared/SpecialRewardInfo"
import SingleColorButton from "public/shared/SingleColorButton"
import Line from "public/shared/Line"

function EventDetail () {

    const wrapperBorder = {
        border:"2px solid #40bee5",
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="uppercase text-4xl py-2 font-bold text-[#004599]">tiệc cuối năm</h1>
            <h1 className="uppercase text-xl py-2 mb-1 font-bold text-[#004599]">mã pin sự kiện</h1> 

            {/* id room */}

            <div className="w-[340px] h-[70px] flex justify-center items-center rounded-[10px] my-1" style={wrapperBorder}>
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

            <div className="w-[340px] flex mb-5">
                <SingleColorButton content={"TẠO MÃ QR"} classIcon={"fas fa-qrcode"} colorHex={"#40BEE5"}/>
            </div>

            {/* rewards information */}

            <h1 className="uppercase text-[#004599] font-bold mb-1 text-[20px]">thông tin giải thưởng</h1>
            <div class="w-[90%] max-w-sm">
                <Line />
            </div>
            <div className="flex flex-col overflow-x-hidden overflow-y-auto justify-center items-center w-[340px] my-2">
                <div className="my-2 w-full h-[300px] flex flex-col max-h-[300px]">
                    <SpecialRewardInfo  rewardName={"giải đặc biệt"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                    <SpecialRewardInfo  rewardName={"giải nhất"} amount="1" giftName="Phần quà số 1"/>
                </div>
            </div>

            <div class="w-[90%] max-w-sm">
               <Line />
            </div>

            <h1 className="uppercase text-[#004599] font-bold mb-1">số người tham gia: 100</h1>
            <div className="w-[90%] flex justify-center">
                <div className="w-[340px] mr-1">
                    <BgBlueButton content={"BẮT ĐẦU SỰ KIỆN"}/>
                </div>
                <div className="w-[50px] h-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] rounded-[50px] ml-1 cursor-pointer">
                    <i className="fas fa-pen text-white flex justify-center items-center w-full h-full"></i>
                </div>
            </div>
        </div>
    )
}

export default EventDetail