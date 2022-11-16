import React, { useState } from "react";
import AuthInput from "public/shared/AuthInput";
import EventListButton from "public/shared/EventListButton";

export default function EventList() {
  const [eventID, setEventID] = useState("EV20221011");
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
              <EventListButton
                name={"tiệc cuối năm"}
                time={"EV20221011"}
                numberOfPeople={"20"}
              />
              <EventListButton
                name={"Tiệc năm mới"}
                time={"EV20221011"}
                numberOfPeople={"20"}
              />
              <EventListButton
                name={"TIỆC THÀNH LẬP..."}
                time={"EV20221011"}
                numberOfPeople={"20"}
              />
              <EventListButton
                name={"TIỆC CUỐI NĂM"}
                time={"EV20221011"}
                numberOfPeople={"20"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
