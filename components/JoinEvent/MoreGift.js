import AuthInput from "public/shared/TextArea";
import ButtonUploadImage from "public/shared/button/ButtonUploadImage";

const MoreGift = ({value, onChange, onClick}) =>
{  
    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex items-center">
                <div className="flex flex-col justify-between items-center relative w-full h-[90%] mt-3">
                    <AuthInput value={value} onChange={onChange} content={"Mô tả phần quà"} />
                    <div className="mt-1 mb-2 w-full">
                        <ButtonUploadImage content={"Thêm hình ảnh"} classIcon={"fas fa-image"} colorHex={"#40BEE5"}/>
                    </div>
                </div>
                <i className="fas fa-trash text-red-600 cursor-pointer px-[1rem]" onClick={onClick}></i>
            </div>
        </div>
    )
}

export { MoreGift }