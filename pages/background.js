import React, { useState } from "react";

export default function EventResult() {
    const backgroundStyle = {
        backgroundImage: `radial-gradient(ellipse at 100% 0%, #B9E4A7 5%, #B3D2E9 40%, #C8EFF1 )`
    }
    return (
        <section className="overflow-hidden flex flex-col justify-evenly h-screen">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="grid grid-cols-4 grid-rows-8 h-full w-full " style={backgroundStyle}>
                    <div className="h-[140px] w-[150px] origin-center rotate-[30deg] bg-[#A5C4F4] col-start-4 col-span-1 "></div>
                    <div className="origin-center rotate-[30deg] bg-[#9FE7EB]  rounded-full col-start-1 row-start-7 row-end-8 col-span-2 row-span-2"></div>
                </div>
            </div>
        </section >
    );
}
