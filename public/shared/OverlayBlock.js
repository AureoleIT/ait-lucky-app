import React, { useEffect, useState, useCallback, useMemo } from "react";
import { render } from "react-dom";
import CloseButton from "./CloseButton";

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
    overlayIndex // Độ ưu tiên đóng khi nhấn "ESC"
}) {
    const blockID = id ? id : "overlayBlock";

    const clickOutCloseOverlay = () => {
        if (clickOutClose) document.getElementById(blockID).classList.add("hidden");
        if (clickOutFunc !== undefined) clickOutFunc();
    }

    const handler = useCallback((event) => {
        switch (event.key) {
            case "Escape":
                pressESCClose()

            default:
                break;
        }
    }, [])

    const pressESCClose = () => {
        const myNodeList = document.getElementById("overlayBlockArea").childNodes;
        const myList = []
        for (let x of myNodeList.values()) {
            myList.push({
                "id": x.id,
                "index": x.dataset.overlayIndex
            })
        }
        myList.sort((a, b) => b.index - a.index);
        var closed = false;
        myList.forEach((x, idx) => {
            const blockID = x.id.substr(0, x.id.length - 7);
            const focusBlock = document.getElementById(blockID);
            if (!focusBlock.classList.contains("hidden") && !closed) {
                focusBlock.classList.add("hidden");
                closed = true;
            }
        })
    }

    const overlayblock = useMemo(() => {
        return (<div className="absolute h-screen top-0 left-0 w-full flex justify-center items-center hidden overflow-hidden" id={blockID} onClick={() => {
            clickOutCloseOverlay();
        }}
        style={{ backgroundColor: backgroundColor, zIndex: zIndex }}>
            {manual ?
                <div className="w-0 h-0" onClick={() => {
                    e.stopPropagation();
                }}>
                    <div onClick={(e) => e.stopPropagation()}>
                        {childDiv ? childDiv : <div className="h-80 w-80"></div>}
                    </div>
                </div> :
                <div className="relative h-fit w-3/4 px-5 pt-8 pb-5 max-w-md bg-white shadow-xl shadow-slate-500 rounded-3xl flex flex-col align-middle justify-between"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    {childDiv ? childDiv : <div className="h-80 w-80"></div>}
                    {closeButton ? <CloseButton onClick={clickOutFunc} parentDivID={blockID} /> : <></>}
                </div>
            }
        </div>)
    }, rerenderOnChange ? rerenderOnChange : [])

    useEffect(() => {
        if (document.getElementById("overlayBlockArea") === null) {
            const fsOverlay = document.createElement('div');
            fsOverlay.id = "overlayBlockArea";
            document.getElementsByTagName('section')[0].appendChild(fsOverlay);
            document.addEventListener('keydown', handler);
        }

        return () => {
            if (document.getElementById("overlayBlockArea") && document.getElementById("overlayBlockArea").children.length === 0) {
                document.removeEventListener('keydown', handler);
                //document.getElementById("overlayBlockArea").remove();
            }
        }
    }, [])

    useEffect(() => {
        if (document.getElementById(blockID + "wrapper") === null) {
            const fsOverlay = document.createElement('div');
            fsOverlay.id = blockID + "wrapper";
            const att = document.createAttribute("data-overlay-index");
            if (overlayIndex) att.value = overlayIndex;
            else att.value = document.getElementById("overlayBlockArea").childNodes.length;
            fsOverlay.setAttributeNode(att);
            document.getElementById("overlayBlockArea").appendChild(fsOverlay);
        }

        if (document.getElementById(blockID + "wrapper"))
            render(overlayblock, document.getElementById(blockID + "wrapper"));

        // return () => {
        //     if (document.getElementById(blockID + "wrapper")) document.getElementById(blockID + "wrapper").remove();
        // }
    }, [])

    useEffect(() => {
        if (rerenderOnChange === undefined) return;
        if (document.getElementById(blockID + "wrapper")) {
            render(overlayblock, document.getElementById(blockID + "wrapper"));
        }
    }, rerenderOnChange ? rerenderOnChange : [])

    return (
        <></>
    )
}
