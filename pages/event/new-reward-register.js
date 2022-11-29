import { useEffect, useRef, useState } from "react"

import SingleColorButton from "public/shared/SingleColorButton"
// import Reward from "components/RewardRegister/Reward"
import AddRewardPopUp from "public/shared/AddRewardPopUp"
import { hidden, show } from "public/util/popup"
import AuthInput from "public/shared/AuthInput"
import Line from "public/shared/Line"
import ImageCustom from "public/shared/ImageCustom"

function NewRewardRegister () {

    // state
    const [imageStore, setImageStore] = useState({})
    const [rewardNameStore, setRewardNameStore] = useState([])
    const [rewardAmount, setRewardAmount] = useState([])
    const [isHidden, setIsHidden] = useState(hidden)
    const [imgList, setImgList] = useState([])
    const [file, setFile] = useState()
    const [count, setCount] = useState(1)
    const [nameReward, setNameReward] = useState("")


    const wrapPopUp = {
        width:"100%",
        alignItems: "center",
        justifyContent: "center"
    }

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

        let toggle = document.getElementById("toggleID")
        toggle.style.display = "flex"
    }
    
    const getImage = (e) =>
    {
        document.getElementById("fileID").click()
    }

    const hanldeAddReward = () =>
    {
        setIsHidden(show)
    }

    const closePopup = (e) => {
        setIsHidden(hidden);
    };

    const handleAdd = () =>
    {
        // name reward
        setRewardNameStore(prev =>[...prev, nameReward])
        setNameReward("")
        // amount
        setRewardAmount(prev => [...prev, count])
        setCount(1)
        // image
        setImageStore(prev => ({...prev, imgList}))
        setImgList([])

        setIsHidden(hidden)
        
    }

    console.log("name reward:", rewardNameStore);
    console.log("reward amount:", rewardAmount);
    console.log("image:", imageStore);

    return (
        <section className="flex flex-col items-center justify-between w-screen h-screen">
            <div className="w-full flex flex-col items-center justify-center">

                <div className="w-full">
                    <div className={isHidden} style={wrapPopUp}>
                        <AddRewardPopUp close={closePopup}>
                            <div className="w-3/4 max-w-xl flex flex-col items-center justify-center">

                                <div className="flex w-full max-w-xl">
                                    <div className="w-full">
                                        <AuthInput content={"Tên giải thưởng"} value={nameReward} onChange={(e) => setNameReward(e.target.value)} leftColor="#003B93" rightColor="#00F0FF" type={"text"} />
                                    </div>
                                </div>

                                <div className="flex justify-evenly items-center w-full mt-1 mb-4 lg:justify-center">
                                    <label className="font-bold" style={contentCSS}>Số lượng</label>
                                    <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                                        <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setCount(prev => prev - 1)}></i>
                                        <label>{count}</label>
                                        <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={() => setCount(prev => prev + 1)}></i>
                                    </div>
                                </div>

                                <div className="w-full max-w-xl flex mb-2">
                                    <Line content={"Hình ảnh giải thưởng"}/>
                                </div>

                                <div className="flex w-full max-w-xl mb-2 overflow-x-auto overflow-y-hidden ">
                                    <div className="w-full mb-2 hidden" id={"toggleID"}>
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
                                    <input type={"file"} id={"fileID"} onChange={handleChangeFile} style={{display:"none"}}/>
                                </div>

                                <div className="w-full max-w-xl flex mb-2">
                                    <Line />
                                </div>

                            </div>
                            <div className="w-3/4">
                                <SingleColorButton content={"Thêm phần quà"} colorHex={"#40BEE5"} onClick={handleAdd}/>
                            </div>
                        </AddRewardPopUp>
                    </div>
                </div>
        
                <div className="flex justify-center items-center mb-2 mt-1 w-3/4 lg:w-4/12 max-w-xl cursor-pointer drop-shadow-lg">
                    <SingleColorButton
                        content={"Thêm giải thưởng"}
                        colorHex={"#40BEE5"}
                        onClick={hanldeAddReward}
                    />
                </div>
            </div>
        </section>
    )
}

export default NewRewardRegister