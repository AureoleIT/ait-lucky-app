import { useEffect, useState } from "react";

import CountComponent from "public/shared/CountComponent";
import InputWithColor from "public/shared/InputWithColor";
import Line from "public/shared/Line";
import { wrapPopUp, wrap, iconStyle, buttonColor, contentCSS, icon} from "public/util/reward-register";
import ImageCustom from "public/shared/ImageCustom";

function Reward ({ rewardName, onChangeRewardName, rewardCountValue, onRewardCountUp, onRewardCountDown, fileID, toggleID, id, receiveImg }) {

    const [imgList, setImgList] = useState([])
    const [file, setFile] = useState()

    useEffect(() =>
    {
        setImgList(prev => 
            {
                let newImgList = []
                if(file !== undefined)
                {
                    newImgList = [...prev, <ImageCustom image={file}/>]
                    receiveImg(file)
                }
                return newImgList
        })
    },[file])

    const handleChangeFile = (e) =>
    {
        const upload = e.target.files[0]
        setFile(URL.createObjectURL(upload))

        let toggle = document.getElementById(toggleID)
        toggle.style.display = "flex"
    }
    
    const getImage = (e) =>
    {
        document.getElementById(fileID).click()
    }

    return (
        <>
            <div id={id} className="w-[90%] lg:w-3/4 max-w-xl flex flex-col items-center justify-center">
                <div className="flex w-full max-w-xl">
                    <div className="w-full">
                        <InputWithColor value={rewardName} onChange={onChangeRewardName} content={"Tên giải thưởng"} leftColor="#003B93" rightColor="#00F0FF" type={"text"} />
                    </div>
                </div>
                <div className="flex justify-evenly items-center w-full mt-1 mb-2 lg:justify-center">
                    <label className="font-bold" style={contentCSS}>Số lượng</label>
                    <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                        <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={onRewardCountDown}></i>
                        <label>{rewardCountValue}</label>
                        <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={onRewardCountUp}></i>
                    </div>
                </div>
                <div className="w-full max-w-xl flex mb-2">
                    <Line content={"Hình ảnh giải thưởng"}/>
                </div>
                <div className="flex w-full max-w-xl mb-2 overflow-x-auto overflow-y-hidden ">
                    <div className="w-full mb-2 hidden" id={toggleID}>
                        {
                            imgList.map((item,index) =>
                            {
                                return (
                                    <div key={index} className="mx-2 ">
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="w-full max-w-xl">
                    <button className="flex justify-evenly items-center w-full h-[35px] rounded-[5px]" style={buttonColor} onClick={getImage}>
                        <div className="font-[900] text-[24px] text-white">Thêm hình ảnh</div>
                        <i className="fas fa-image" style={iconStyle}></i>
                    </button>
                    <input type={"file"} id={fileID} onChange={handleChangeFile} style={{display:"none"}}/>
                </div>

                <div className="w-full max-w-xl flex mb-2">
                    <Line />
                </div>
            </div>
        </>
    )
}

export default Reward