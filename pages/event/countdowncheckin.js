import BgBlueButton from "public/shared/BgBlueButton"
import ButtonAndIcon from "public/shared/ButtonAndIcon"
import Line from "public/shared/Line"

function CountDownCheckIn () 
{

    const wrapperBorder = {
        border:"2px solid #40bee5",
    }

    const countDownNumber = {
        background: "#3B88C3"
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="uppercase text-4xl py-2 font-bold text-[#004599]">tiệc cuối năm</h1>
            <h1 className="uppercase text-xl py-2 mb-1 font-bold text-[#004599]">mã pin sự kiện</h1> 

             {/* id room */}

             <div className="w-[90%] lg:w-4/12 max-w-xl h-[70px] flex justify-center items-center rounded-[10px] mb-5" style={wrapperBorder}>
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

            <div className="w-[90%] lg:w-4/12 max-w-xl flex mb-5 drop-shadow-lg">
                <ButtonAndIcon content={"TẠO MÃ QR"} classIcon={"fas fa-qrcode"} colorHex={"#40BEE5"}/>
            </div>

            <div className="flex justify-center w-full mb-2">
                
                <div className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center" style={countDownNumber}>
                    0
                </div>
                <div className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center" style={countDownNumber}>
                    5
                </div>
                <div className="mr-1 text-6xl flex justify-center items-center">
                    <span className="flex justify-center items-center">:</span>
                </div>
                <div className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center" style={countDownNumber}>
                    0
                </div>
                <div className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center" style={countDownNumber}>
                    0
                </div>

            </div>

            <div className="w-3/4 lg:w-3/12 flex justify-between mb-2">
                <div className="">
                    <p className="text-[#004599] font-bold">Số người tham gia</p>
                </div>
                <div className="flex">
                    <div className="w-[24px] h-[24px] rounded-[5px] text-white font-bold mr-1 flex justify-center items-center" style={countDownNumber}>
                        5
                    </div>
                    <div className="w-[24px] h-[24px] rounded-[5px] text-white font-bold flex justify-center items-center" style={countDownNumber}>
                        1
                    </div>
                </div>
            </div>

            <h1 className="uppercase text-xl py-2 font-bold text-[#004599]">người chơi</h1> 

            <div className="w-[90%] lg:w-4/12 max-w-xl">
                <Line />
            </div>

            <div className="w-full flex flex-col justify-center items-center max-h">
                <h1 className="text-xl py-2 font-bold text-[#004599]">Nguyen Van A</h1> 
                <h1 className="text-xl py-2 font-bold text-[#004599]">Nguyen Van B</h1> 
                <h1 className="text-xl py-2 font-bold text-[#004599]">Nguyen Van C</h1> 
                <h1 className="text-xl py-2 font-bold text-[#004599]">Nguyen Van D</h1> 
            </div>

            <div className="w-[90%] lg:w-4/12 max-w-xl mb-4">
                <Line />
            </div>

            <div className="w-11/12 md:w-9/12 lg:w-4/12 flex justify-center">
                <div className="w-[90%] mr-1 drop-shadow-lg">
                    <BgBlueButton content={"BẮT ĐẦU"} islink={true} href={"_countdowncheckin"}/>
                </div>
                <div className="w-[50px] h-[50px] bg-gradient-to-r from-[#003B93] to-[#00F0FF] rounded-[50px] ml-1 cursor-pointer drop-shadow-lg">
                    <i className="fas fa-pen text-white flex justify-center items-center w-full h-full"></i>
                </div>
            </div>

        </div>
    )
}

export default CountDownCheckIn