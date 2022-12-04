import { useEffect, useState } from "react";

import Line from "public/shared/Line";
import ImageCustom from "public/shared/ImageCustom";
import AuthInput from "public/shared/AuthInput";

function Reward ({ rewardName, onChangeRewardName, fileID, toggleID, id, receiveImg, receiveCount }) {

    const [imgList, setImgList] = useState([])
    const [file, setFile] = useState()
    const [count, setCount] = useState(1)

    const iconStyle = {
        color:"white",
        fontSize:"24px"
    }
   
    const buttonColor = {
        background:"#40BEE5"
    }
   
    const contentCSS = {
        background: "-webkit-linear-gradient(45deg, #003B93, #00F0FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    }
   
    const icon = {
        width:"32px",
        height:"32px",
        margin:"0 12px",
    }

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
        receiveCount(count)
    },[file,count])

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
            <div id={id} className="w-full flex flex-col items-center justify-center">
                <div className="flex w-full">
                        <AuthInput value={rewardName} onChange={onChangeRewardName} content={"Tên giải thưởng"} leftColor="#003B93" rightColor="#00F0FF" type={"text"} />
                </div>
                <div className="flex justify-evenly items-center w-full mt-1 mb-2 lg:justify-center">
                    <label className="font-bold" style={contentCSS}>Số lượng</label>
                    <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                        <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setCount(prev => prev - 1)}></i>
                        <label>{count}</label>
                        <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setCount(prev => prev + 1)}></i>
                    </div>
                </div>
                <div className="w-full flex mb-2">
                    <Line content={"Hình ảnh giải thưởng"}/>
                </div>
                <div className="flex w-full mb-2 overflow-x-auto overflow-y-hidden ">
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

                <div className="w-full">
                    <button className="flex justify-evenly items-center w-full h-[35px] rounded-[5px]" style={buttonColor} onClick={getImage}>
                        <div className="font-[900] text-[24px] text-white">Thêm hình ảnh</div>
                        <i className="fas fa-image" style={iconStyle}></i>
                    </button>
                    <input type={"file"} id={fileID} onChange={handleChangeFile} style={{display:"none"}}/>
                </div>

                <div className="w-full flex mb-2">
                    <Line />
                </div>
            </div>
        </>
    )
}

export default Reward