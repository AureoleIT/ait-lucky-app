import React, { useState } from "react";

import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import EventBotton from "public/shared/button/EventButton";

export default function EventList() {
  const link = "eventdetail";
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };
  return (
    <>
      <Header />
      <section className="h-screen px-5 py-5 mx-auto flex justify-center items-center">
        <div className="flex flex-col w-full h-full items-center">
          <h1 className="uppercase font-extrabold text-[#004599] text-[30px] text-center font-[Nunito Sans] leading-[46.5px]">
            danh sách sự kiện
          </h1>
          <div className="max-w-md flex flex-col w-full gap-y-[19px] mt-[19px]">
            <div className="flex flex-col mx-2">
              <AuthInput
                content={"Tên sự kiện"}
                type={"text"}
                value={value}
                onChange={onChange}
              />
            </div>
            {/* <p className="text-[#004599] text-center">Danh sách trống</p> */}
            <div className="flex flex-col gap-y-[7px] font-[Nunito Sans] font-bold overflow-auto max-h-[700px] ">
              <EventBotton
                title={"tiệc cuối năm"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"1"}
                islink={true}
                href={"countdowncheckin"}
              />
              <EventBotton
                title={"Tiệc năm mới"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"2"}
                islink={true}
                href={link}
              />
              <EventBotton
                title={"TIỆC THÀNH LẬP..."}
                id={"EV20221011"}
                user_joined={"20"}
                status={"3"}
                islink={true}
                href={link}
              />
              <EventBotton
                title={"TIỆC CUỐI NĂM"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"4"}
                islink={true}
                href={link}
              />
              <EventBotton
                title={"tiệc cuối năm"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"1"}
                islink={true}
                href={link}
              />
              <EventBotton
                title={"Tiệc năm mới"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"2"}
                islink={true}
                href={"eventdetail"}
              />
              <EventBotton
                title={"TIỆC THÀNH LẬP..."}
                id={"EV20221011"}
                user_joined={"20"}
                status={"3"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"TIỆC CUỐI NĂM"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"4"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"tiệc cuối năm"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"1"}
                islink={true}
                href={"_countdowncheckin"}
              />
              <EventBotton
                title={"Tiệc năm mới"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"2"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"TIỆC THÀNH LẬP..."}
                id={"EV20221011"}
                user_joined={"20"}
                status={"3"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"TIỆC CUỐI NĂM"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"4"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"tiệc cuối năm"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"1"}
                islink={true}
                href={"_countdowncheckin"}
              />
              <EventBotton
                title={"Tiệc năm mới"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"2"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"TIỆC THÀNH LẬP..."}
                id={"EV20221011"}
                user_joined={"20"}
                status={"3"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"TIỆC CUỐI NĂM"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"4"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"tiệc cuối năm"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"1"}
                islink={true}
                href={"_countdowncheckin"}
              />
              <EventBotton
                title={"Tiệc năm mới"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"2"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"TIỆC THÀNH LẬP..."}
                id={"EV20221011"}
                user_joined={"20"}
                status={"3"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"TIỆC CUỐI NĂM"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"4"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"tiệc cuối năm"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"1"}
                islink={true}
                href={"_countdowncheckin"}
              />
              <EventBotton
                title={"Tiệc năm mới"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"2"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"TIỆC THÀNH LẬP..."}
                id={"EV20221011"}
                user_joined={"20"}
                status={"3"}
                islink={true}
                href={"_eventdetail"}
              />
              <EventBotton
                title={"TIỆC CUỐI NĂM"}
                id={"EV20221011"}
                user_joined={"20"}
                status={"4"}
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
