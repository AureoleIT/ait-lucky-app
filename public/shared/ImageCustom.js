function ImageCustom ({image}) 
{
    return (
        <div className="w-[100px] h-[100px]">
            <img alt="" src={image} className="w-full h-full rounded-[5px] bg-transparent"/>
        </div>
    )
}

export default ImageCustom