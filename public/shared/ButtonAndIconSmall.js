function ButtonAndIconSmall ({ content, onClick, classIcon, colorHex }) 
{
    const iconStyle = {
        color:"white",
        "font-size":"24px"
    }

    const buttonColor = {
        background:`${colorHex}`
    }

    return (
        <>
            <button className="flex justify-evenly items-center w-full h-[40px] rounded-[5px]" style={buttonColor}
            onClick={onClick}>
                <div className="font-[900] text-[24px] text-white">
                    {content}
                </div>
                <i className={classIcon} style={iconStyle}></i>
            </button>
        </>
    )
}

export default ButtonAndIconSmall