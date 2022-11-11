import React from "react";
import AuthInput from "public/shared/AuthInput";
import Title from "public/shared/Title";
import EventListButton from "public/shared/EventListButton";

export default function EventList() {
  return (
    <>
      <section className="h-screen max-w-[360px] px-5 py-5 mx-auto flex flex-col">
        <div className="flex flex-col w-full h-full">
          <h1 className="font-extrabold text-[#004599] text-[30px] text-center font-[Nunito Sans] leading-[46.5px]">
            DANH SÁCH SỰ KIỆN
          </h1>

          <div className="flex flex-col w-full gap-y-[19px] mt-[19px]">
            <div className="flex flex-col w-full">
              <AuthInput content={"Tên sự kiện"} type={"text"} />
            </div>
            <div className="flex flex-col gap-y-[7px] w-full">
              <EventListButton
                name={"TIỆC CUỐI NĂM"}
                time={"10/11/2022"}
                numberOfPeople={"20"}
              />
              <EventListButton
                name={"Tiệc năm mới"}
                time={"10/11/2022"}
                numberOfPeople={"20"}
              />
              <EventListButton
                name={"TIỆC THÀNH LẬP..."}
                time={"10/11/2022"}
                numberOfPeople={"20"}
              />
              <EventListButton
                name={"TIỆC CUỐI NĂM"}
                time={"10/11/2022"}
                numberOfPeople={"20"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
