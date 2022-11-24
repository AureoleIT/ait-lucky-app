import { useState, useEffect} from "react"

import AuthInput from "public/shared/AuthInput"
import Line from "public/shared/Line"
import ImageCustom from "public/shared/ImageCustom"
import { Children } from "react/cjs/react.production.min"


function Reward ({ name, onChangeRewardName, valueRewardName, onChangeGiftCountMinus, onChangeGiftCountPlus, valueGiftCount, imageList, fileID, toggleID })
{

    // state
    const [imgList, setImgList] = useState([])
    const [file, setFile] = useState()

    // custom style
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

    const iconStyle = {
        color:"white",
        fontSize:"24px"
    }

    const buttonColor = {
        background:"#40BEE5"
    }

    // logic
    useEffect(() =>
    {
        setImgList(prev => 
            {
                let newImgList = []
                if(file !== undefined)
                {
                    newImgList = [...prev, <ImageCustom image={file}/>]
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

    console.log(valueRewardName);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex w-3/4 lg:w-4/12 max-w-xl">
                <div className="flex flex-col justify-evenly mr-4">
                    <i className="fas fa-angle-up cursor-pointer"></i>
                    <i className="fas fa-angle-down cursor-pointer"></i>
                </div>
                <div className="w-full">
                    <AuthInput name={name} content={"Tên giải thưởng"} type={"text"} value={valueRewardName} onChange={onChangeRewardName}/>
                </div>
            </div>

            <div className="flex justify-evenly items-center w-full lg:w-4/12 mt-1 mb-4 lg:justify-center">
                <label className="font-bold" style={contentCSS}>Số lượng</label>
                <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                    <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={onChangeGiftCountMinus}></i>
                    <label>{valueGiftCount}</label>
                    <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={onChangeGiftCountPlus}></i>
                </div>
            </div>

            <div className="w-3/4 lg:w-4/12 max-w-xl flex mb-2">
                <Line content={"Hình ảnh giải thưởng"}/>
            </div>

            <div className="flex w-3/4 lg:w-4/12 max-w-xl mb-2 overflow-x-auto overflow-y-hidden ">
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

            <div className="w-3/4 lg:w-4/12 max-w-xl">
                <button className="flex justify-evenly items-center w-full h-[35px] rounded-[5px]" style={buttonColor} onClick={getImage}>
                    <div className="font-[900] text-[24px] text-white">Thêm hình ảnh</div>
                    <i className="fas fa-image" style={iconStyle}></i>
                </button>
                <input type={"file"} id={fileID} onChange={handleChangeFile} style={{display:"none"}}/>
            </div>

            <div className="w-3/4 lg:w-4/12 max-w-xl flex mb-2">
                <Line />
            </div>

        </div>
    )
}

export default Reward