import React, { useEffect, useState } from "react";
import Header from "public/shared/Header";
import AuthInput from "public/shared/AuthInput";
import EventButton from "public/shared/button/EventButton";
import { LEFT_COLOR, RIGHT_COLOR } from "public/util/colors";
import { db } from "src/firebase";
import {
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  // child, get
} from "firebase/database";
// import { useSelector } from "react-redux";
import { useUserPackageHook } from "public/redux/hooks";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userCurrentHostingEvent } from "public/redux/actions";

export default function EventList() {
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useState("");
  const [events, setEvents] = useState([]);
  const router = useRouter();

  //get current user from last state get in
  const currentUser = useUserPackageHook();

  // filter events by user from firebase
  const que = query(
    ref(db, "event"),
    orderByChild("createBy"),
    equalTo(String(currentUser.userId))
  );

  useEffect(() => {
    onValue(que, (snapshot) => {
      setEvents([]);
      const data = snapshot.val();
      if (data != null) {
        setEvents(Object.values(data));
      }
    });
  }, [String(currentUser.userId)]);

  const filteredEvents = events.filter((item) => {
    return searchContent.toLowerCase() === ""
      ? item
      : item.title.toLowerCase().includes(searchContent);
  });

  if (!currentUser.userId) {
    return router.push("/auth/login").then;
  }

  return (
    <>
      <Header />
      <section className="h-screen max-w-md mx-auto flex flex-col justify-center items-center">
        <div className="flex flex-col px-3 py-5 w-full h-full items-center">
          <h1 className="uppercase font-extrabold text-[#004599] text-[30px] text-center font-[Nunito Sans] leading-[46.5px]">
            danh sách sự kiện
          </h1>
          <div className="max-w-md flex flex-col w-full gap-y-[19px] mt-[19px]">
            <div id="search" className="flex flex-col mx-2">
              <AuthInput
                content={"Tên sự kiện"}
                type={"text"}
                onChange={(e) => setSearchContent(e.target.value)}
                leftColor={LEFT_COLOR}
                rightColor={RIGHT_COLOR}
              />
            </div>
            <div className="flex flex-col gap-y-[7px] font-[Nunito Sans] font-bold overflow-auto max-h-[700px] mb-3">
              {filteredEvents.length !== 0 ? (
                filteredEvents.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <EventButton
                      title={item.title}
                      id={item.eventId}
                      userJoined={item.userJoined}
                      status={item.status}
                      onclick={() => dispatch(userCurrentHostingEvent(item))}
                    />
                  </div>
                ))
              ) : (
                <p className="text-[#004599] text-center">Danh sách trống</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
