import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import CloseButton from "public/shared/CloseButton";

export default function OverlayBlock({
        closeButton = true, // Hiển thị nút đóng overlay
        clickOutClose = true, // Cho phép nhấp nền phía sau để đóng overlay
        childDiv, // Khối được hiển thị trên overlay
        id, // ID khối overlay
        manual = false, // Điều chỉnh thủ công
        backgroundColor = "#00000080", // Màu nền phía sau overlay
        clickOutFunc, // Hàm được thực hiện khi nhấp nền phía sau overlay
        rerenderOnChange, // childDiv được rerender khi dữ liệu này được thay đổi
        zIndex = 50, // z index của component
        Timeout = 0 // Timeout nếu có, sẽ thực hiện clickOutFunc
    }) {
    const blockID = id?id:"overlayBlock";
    const [wrapper, setWrapper] = useState(<></>)
    
    const clickOutCloseOverlay = () => {
        if (clickOutClose) document.getElementById(blockID).classList.add("hidden");
        if (clickOutFunc !== undefined) clickOutFunc();
    }
    
    const overlayblock = (
        <div className="absolute h-screen top-0 left-0 w-full flex justify-center items-center hidden overflow-hidden" id={blockID} onClick={() => {
                clickOutCloseOverlay();
            }}
            style={{backgroundColor: backgroundColor, zIndex: zIndex}}>
            {manual?
                <div className="w-0 h-0" onClick={() => {
                        e.stopPropagation();
                    }}>
                        <div onClick={(e) => e.stopPropagation()}>
                            {childDiv?childDiv:<div className="h-80 w-80"></div>}
                        </div>
                </div>:
                <div className="relative h-fit w-3/4 px-5 pt-8 pb-5 max-w-md bg-white shadow-xl shadow-slate-500 rounded-3xl flex flex-col align-middle justify-between"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    {childDiv?childDiv:<div className="h-80 w-80"></div>}
                    {closeButton?<CloseButton onClick={clickOutFunc} parentDivID={blockID} />:<></>}
                </div>
            }
        </div>
    )

    useEffect(() => {
        if (document.getElementById(blockID) === null) {
            const fsOverlay = document.createElement('div');
            fsOverlay.id=blockID+"wrapper";
            document.getElementsByTagName('section')[0].appendChild(fsOverlay);
            setWrapper(fsOverlay);
        } else {
            setWrapper(document.getElementById(blockID))
        }
        
        render(overlayblock, document.getElementById(blockID+"wrapper"));

        let timeoutClose = setTimeout(() => {}, 0);
        if (Timeout !== 0) setTimeout(clickOutCloseOverlay, Timeout);

        return () => {
            clearTimeout(timeoutClose);
            document.getElementById(blockID+"wrapper").remove;
        }
    }, [])

    useEffect(() => {
        if (rerenderOnChange === undefined) return;
        render(overlayblock, document.getElementById(blockID+"wrapper"));
    }, rerenderOnChange?rerenderOnChange:[])
    
    return (
        <></>
    )
}