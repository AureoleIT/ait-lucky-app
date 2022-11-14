import TextArea from "public/shared/TextArea";
import ButtonAndIcon from "public/shared/ButtonAndIcon";

const MoreGift = () =>
{  
    const handleDeleteGift = () =>
    {

    }

    return (
        <div className="flex flex-col justify-center items-center max-h-[250px] w-full max-w-[300px]">

            <div className="flex py-3 justify-between items-center relative w-full h-full">
                <TextArea  content={"Mô tả phần quà"} row={"3"}/>
                <i className="fas fa-trash text-red-600 cursor-pointer px-[1rem]" onClick={handleDeleteGift}></i>
            </div>
            <ButtonAndIcon content={"Thêm hình ảnh"} classIcon={"fas fa-image"} colorHex={"#40BEE5"}/>

        </div>
    )
}

export { MoreGift }