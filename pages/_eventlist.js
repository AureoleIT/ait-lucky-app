import React, { useState } from "react";
import AuthInput from "public/shared/AuthInput";
import EventBotton from "public/shared/EventButton";

export default function EventList() {
  return (
    <>
      <section className="h-screen px-5 py-5 mx-auto flex justify-center items-center">
        <div className="flex flex-col w-full h-full items-center">
          <h1 className="uppercase font-extrabold text-[#004599] text-[30px] text-center font-[Nunito Sans] leading-[46.5px]">
            danh sách sự kiện
          </h1>
          <div className="max-w-md flex flex-col w-full gap-y-[19px] mt-[19px]">
            <div className="flex flex-col w-full">
              <AuthInput content={"Tên sự kiện"} type={"text"} />
            </div>
            <div className="flex flex-col gap-y-[7px] w-full font-[Nunito Sans] font-bold">
              <EventBotton
                name={"tiệc cuối năm"}
                id={"EV20221011"}
                numberOfPeople={"20"}
                islink={true}
                href={"_countdowncheckin"}
              />
              <EventBotton
                name={"Tiệc năm mới"}
                id={"EV20221011"}
                numberOfPeople={"20"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                name={"TIỆC THÀNH LẬP..."}
                id={"EV20221011"}
                numberOfPeople={"20"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                name={"TIỆC CUỐI NĂM"}
                id={"EV20221011"}
                numberOfPeople={"20"}
                islink={true}
                href={"_eventdetail"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
