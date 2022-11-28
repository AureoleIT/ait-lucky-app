import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react/lib";
import { useRouter } from "next/router";

import BgBlueButton from "public/shared/BgBlueButton";
import ButtonAndIcon from "public/shared/ButtonAndIcon";
import Line from "public/shared/Line";
import PinCode from "public/shared/PinCode";
import testCoundown from "public/util/testCountdown";

function CountDownCheckIn() {
  // router
  const router = useRouter();

  // state
  // const [pinCode, setPinCode] = useState(0)
  const [minutes, setMinutes] = useState(testCoundown.wait_time);
  const [seconds, setSeconds] = useState(0);
  const [qrCodeValue, setQrCodeValue] = useState("");

  const countDownNumber = {
    background: "#3B88C3",
  };

  const pinCode = 123456;

  useEffect(() => {
    let date = new Date();
    let deadline = date.getTime() + minutes * 60 * 1000;

    let countdown = setInterval(() => {
      let nowDate = new Date();
      let left = deadline - nowDate;
      let nowSeconds = Math.floor((left / 1000) % 60);
      let nowMinutes = Math.floor((left / 1000 / 60) % 60);

      if (nowMinutes == 0 && nowSeconds == 0) {
        clearInterval(countdown);
        router.push("/event/lucky_spin");
      } else {
        setMinutes(nowMinutes);
        setSeconds(nowSeconds);
      }
    }, 1000);
  }, []);

  // generate qr code
  const generateQRcode = () => {
    setQrCodeValue(`http://localhost:3000/event/lucky_spin/${pinCode}`);
    let toggle = document.getElementById("qr_code");
    toggle.style.display = "flex";
  };

  const handleDownloadQR = () => {
    const qrCodeURL = document
      .getElementById("qrCode")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadElement = document.createElement("a");
    downloadElement.href = qrCodeURL;
    downloadElement.download = "QR_Code.png";
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="uppercase text-4xl py-2 font-bold text-[#004599]">
        tiệc cuối năm
      </h1>
      <h1 className="uppercase text-base py-2 font-bold text-[#004599]">
        mã pin sự kiện
      </h1>

      {/* id room */}

      <div className="w-[90%] lg:w-4/12 max-w-xl h-[80px] flex justify-center items-center rounded-[10px] mb-2">
        <PinCode length={6} value={pinCode} />
      </div>

      {/* qr code */}

      <div className="w-[90%] lg:w-4/12 max-w-xl flex mb-2 drop-shadow-lg">
        <ButtonAndIcon
          content={"TẠO MÃ QR"}
          classIcon={"fas fa-qrcode"}
          colorHex={"#40BEE5"}
          onClick={generateQRcode}
        />
      </div>

      <div className="hidden mb-3 justify-center" id="qr_code">
        <div>
          <QRCodeCanvas id="qrCode" size={100} value={qrCodeValue} />
        </div>
        <div className="relative">
          <i
            className="fas fa-download text-[20px] ml-3 absolute bottom-0"
            onClick={handleDownloadQR}
          ></i>
        </div>
      </div>

      <div className="flex justify-center w-full mb-2">
        <div
          className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center"
          style={countDownNumber}
        >
          {minutes > 9 ? Math.floor(minutes / 10) : 0}
        </div>
        <div
          className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center"
          style={countDownNumber}
        >
          {minutes > 9 ? Math.floor(minutes % 10) : minutes}
        </div>
        <div className="mr-1 text-6xl flex justify-center items-center">
          <span className="flex justify-center items-center">:</span>
        </div>
        <div
          className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center"
          style={countDownNumber}
        >
          {seconds > 9 ? Math.floor(seconds / 10) : 0}
        </div>
        <div
          className="w-[65px] h-[100px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center"
          style={countDownNumber}
        >
          {seconds > 9 ? Math.floor(seconds % 10) : seconds}
        </div>
      </div>

      <div className="w-3/4 md:w-4/12 flex justify-between mb-2">
        <div className="">
          <p className="text-[#004599] font-bold">Số người tham gia</p>
        </div>
        <div className="flex">
          <div
            className="w-[24px] h-[24px] rounded-[5px] text-white font-bold mr-1 flex justify-center items-center"
            style={countDownNumber}
          >
            {Math.floor(testCoundown.participants / 10)}
          </div>
          <div
            className="w-[24px] h-[24px] rounded-[5px] text-white font-bold flex justify-center items-center"
            style={countDownNumber}
          >
            {Math.floor(testCoundown.participants % 10)}
          </div>
        </div>
      </div>

      <h1 className="uppercase text-xl py-2 font-bold text-[#004599]">
        người chơi
      </h1>

      <div className="w-[90%] lg:w-4/12 max-w-xl">
        <Line />
      </div>

      <div className="w-full max-h-[150px] overflow-x-hidden overflow-y-auto">
        <div className="w-full h-full flex flex-col items-center">
          {testCoundown.player.map((player, index) => {
            return (
              <h1 className="text-xl py-2 font-bold text-[#004599]" key={index}>
                {player}
              </h1>
            );
          })}
        </div>
      </div>

      <div className="w-[90%] lg:w-4/12 max-w-xl mb-4">
        <Line />
      </div>

      <div className="w-11/12 md:w-9/12 lg:w-4/12 flex justify-center items-center">
        <div className="w-full mr-1 drop-shadow-lg">
          <BgBlueButton
            content={"BẮT ĐẦU"}
            islink={true}
            href={"_countdowncheckin"}
          />
        </div>
      </div>
    </div>
  );
}

export default CountDownCheckIn;
