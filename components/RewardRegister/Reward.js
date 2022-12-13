import { useEffect, useState, forwardRef, useRef } from "react";

import Line from "public/shared/Line";
import ImageCustom from "public/shared/ImageCustom";
import AuthInput from "public/shared/AuthInput";
const uuid = require("uuid");

function Reward (props, ref) {

    let id = useRef()
    useEffect(() =>
    {
        id.current = uuid.v4()
    },[])

    const [imgList, setImgList] = useState([])
    const [img, setImg] = useState([])
    const [file, setFile] = useState()
    const [count, setCount] = useState(1)
    const [name, setName] = useState("")
    const [value, setValue] = useState({})

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
                    setImg(prev => [...prev, file])
                }
                return newImgList
        })
    },[file])

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
        props.receiveData(value)
    },[value])

    const handleChangeFile = (e) =>
    {
        const upload = e.target.files[0]
        setFile(URL.createObjectURL(upload))

        let toggle = document.getElementById(props.toggleID)
        toggle.style.display = "flex"
    }
    
    const getImage = (e) =>
    {
        document.getElementById(props.fileID).click()
    }

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center">
                <form className="w-full" ref={ref}>
                    <div className="flex w-full">
                            <AuthInput value={name} onChange={(e) => setName(e.target.value)} content={"Tên giải thưởng"} leftColor="#003B93" rightColor="#00F0FF" type={"text"} />
                    </div>
                    <div className="flex justify-evenly items-center w-full mt-1 mb-2 lg:justify-center">
                        <label className="font-bold" style={contentCSS}>Số lượng</label>
                        <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                            <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setCount(prev => Math.max(prev -1, 1))}></i>
                            <label>{count}</label>
                            <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setCount(prev => prev + 1)}></i>
                        </div>
                    </div>
                    <div className="w-full flex mb-2">
                        <Line content={"Hình ảnh giải thưởng"}/>
                    </div>
                    <div className="flex w-full mb-2 overflow-x-auto overflow-y-hidden ">
                        <div className="w-full mb-2 hidden" id={props.toggleID}>
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
                </form>

                <div className="w-full">
                    <button className="flex justify-evenly items-center w-full h-[35px] rounded-[5px]" style={buttonColor} onClick={getImage}>
                        <div className="font-[900] text-[24px] text-white">Thêm hình ảnh</div>
                        <i className="fas fa-image" style={iconStyle}></i>
                    </button>
                    <input type={"file"} id={props.fileID} onChange={handleChangeFile} style={{display:"none"}}/>
                </div>

                <div className="w-full flex mb-2">
                    <Line />
                </div>
            </div>
        </>
    )
}

export default forwardRef(Reward)