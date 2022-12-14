import { useEffect, useState, useRef, useMemo, useCallback } from "react";

import Line from "public/shared/Line";
import ImageCustom from "public/shared/ImageCustom";
import AuthInput from "public/shared/AuthInput";
const uuid = require("uuid");

function Reward ({ rewardId, fileID, toggleID, rewardName, amount, imageList, receiveData }) {

    let id = useRef()

    if(rewardId)
    {
        id.current = rewardId
    }
    else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() =>
        {
            id.current = uuid.v4()
        },[])
    }

    let initImage

    imageList ? initImage = imageList : initImage = []

    const [imgList, setImgList] = useState([])
    const [img, setImg] = useState(initImage)
    const [file, setFile] = useState([])
    const [count, setCount] = useState(amount || 1)
    const [name, setName] = useState(rewardName || "")
    const [value, setValue] = useState({})
    const [storageImg, setStorageImg] = useState([])

    // useEffect(() =>
    // {
    //     console.log(img);
    // },[img])

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
                }
                return newImgList
        })
    },[file])

    useEffect(() =>
    {
        setImg(prev => [...prev, storageImg])
    },[storageImg])

    useEffect(() =>
    {
        setValue(() => [{
                        id:id.current,
                        name: name,
                        amount: count,
                        image: img
                    }])
    },[img, count, name])

    useEffect(() =>
    {
        receiveData(value)
    },[value])

    const handleChangeFile = useCallback((e) =>
    {
        if(e.target.files.length !== 0)
        {
            const upload = e.target.files[0]
            setStorageImg(upload)
    
            setFile(URL.createObjectURL(upload))
    
            let toggle = document.getElementById(toggleID)
            toggle.style.display = "flex"
        }
    },[file, setFile])

    useEffect(() =>
    {
        if(imageList)
        {
            let toggle = document.getElementById(toggleID)
            toggle.style.display = "flex" 
        }
    },[])

    const getImage = useCallback((e) =>
    {
        document.getElementById(fileID).click()
    },[])

    const renderInput = useMemo(() =>
    {
        return (
            <div className="flex w-full">
                    <AuthInput value={name} onChange={(e) => setName(e.target.value)} content={"Tên giải thưởng"} leftColor="#003B93" rightColor="#00F0FF" type={"text"} />
            </div>
        )
    },[name, setName])

    const renderCount = useMemo(() => 
    {
        return (
            <div className="flex justify-evenly items-center w-full mt-1 mb-2 lg:justify-center">
                <label className="font-bold" style={contentCSS}>Số lượng</label>
                <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                    <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setCount(prev => Math.max(prev -1, 1))}></i>
                    <label>{count}</label>
                    <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setCount(prev => prev + 1)}></i>
                </div>
            </div>
        )
    },[count, setCount])

    const renderImageList = useMemo(() =>
    {
        return (
            <div className="flex w-full mb-2 overflow-x-auto overflow-y-hidden ">
                <div className="w-full mb-2 hidden" id={toggleID}>
                    {
                        imageList ? (
                            <>
                            {
                                imageList.map((item, index) =>
                                {
                                    return (
                                        <div key={index} className="mx-2">
                                            <ImageCustom image={item}/>
                                        </div> )
                                })
                            }
                            {
                                imgList.map((item,index) =>
                                {
                                    if(index === 0)
                                    {
                                        return <div key={index}></div>
                                    }
                                    else {
                                        return (
                                            <div key={index} className="mx-2">
                                                {item}
                                            </div>
                                        )
                                    }
                                })
                            }
                            </>
                        ) : (
                            imgList.map((item,index) =>
                            {
                                if(index === 0)
                                    {
                                        return <div key={index}></div>
                                    }
                                    else {
                                        return (
                                            <div key={index} className="mx-2">
                                                {item}
                                            </div>
                                        )
                                }
                            })
                        )
                    }
                </div>
            </div>
        )
    },[imgList])

    const renderAddImageButton = useMemo(() => {
        return (
            <div className="w-full">
                <button className="flex justify-evenly items-center w-full h-[35px] rounded-[5px]" style={buttonColor} onClick={getImage}>
                    <div className="font-[900] text-[24px] text-white">Thêm hình ảnh</div>
                    <i className="fas fa-image" style={iconStyle}></i>
                </button>
                <input type={"file"} id={fileID} onChange={handleChangeFile} style={{display:"none"}}/>
            </div>
        )
    },[getImage, handleChangeFile])

    
    const renderLine1 = useMemo(() =>
    {
        return (
            <div className="w-full flex mb-2">
                <Line content={"Hình ảnh giải thưởng"}/>
            </div>
        )
    },[])
    
    const renderLine2 = useMemo(() => 
    {
        return (
            <div className="w-full flex mb-2">
                <Line />
            </div>
        )
    },[])

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center">
                <form className="w-full">
                    {renderInput}
                    {renderCount}
                    {renderLine1}
                    {renderImageList}
                </form>
                {renderAddImageButton}
                {renderLine2}
            </div>
        </>
    )
}

export default Reward