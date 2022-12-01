import { useEffect } from "react"

function CountComponent (props)
{

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
        console.log(props.valueCount);
    },[props.valueCount])

    return(
        <>
            <label className="font-bold" style={contentCSS}>Số lượng</label>
            <div className="flex justify-between items-center text-lg font-bold" style={contentCSS}>
                <i className="fas fa-minus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={props.onClickDown}></i>
                <label>{props.valueCount}</label>
                <i className="fas fa-plus px-2 flex justify-center items-center cursor-pointer" style={icon} onClick={props.onClickUp}></i>
            </div>
        </>
    )
}

export default CountComponent