import React, { useState, useEffect } from "react";

// import firebase
import { db } from "src/firebase";
import {
  ref,
  orderByChild,
  equalTo,
  query,
  onValue,
} from "firebase/database";

// components
import Header from "public/shared/Header";
import BgBlueButton from "public/shared/BgBlueButton";
import EventButton from "public/shared/button/EventButton";
import BorderText from "public/shared/BorderText";

//import gif
import nyancat from "public/img/nyancat.gif";

export default function Dashboard() {
  const uuid = "iasd-asda123-asd1-asd123";
  const [arrStatus, setArrStatus] = useState([]);
  const [arrID, setArrID] = useState([]);
  const queStatus = query(ref(db, "event"), orderByChild("status"), equalTo(2));
  const queID = query(
    ref(db, "event"),
    orderByChild("createBy"),
    equalTo(uuid)
  );

  // get(child(ref(db), `event`))
  // .then((snapshot) => {
  //   const res = snapshot.val() ?? [];
  //   const values = Object.values(res);
  //   setArr(values);
  // })
  // .catch((error) => {
  //   alert(error.message);
  //   console.error(error);
  // });

  // useEffect(() => {
  //   onValue(child(ref(db), "event/"), (snapshot) => {
  //     const record = snapshot.val() ?? [];
  //     const values = Object.values(record);
  //     values.forEach((value) => {
  //       if (value.status === 2) {
  //         setQueryStatus((prev) => [...prev, value]);
  //         console.log(value);
  //       }
  //     });
  //     console.log(queryStatus);
  //   });
  // }, []);

  useEffect(() => {
    onValue(queStatus, (snapshot) => {
      setArrStatus([]);
      const data = snapshot.val();
      if (data != null) {
        setArrStatus(Object.values(data));
      }
    });
  }, []);

  useEffect(() => {
    onValue(queID, (snapshot) => {
      setArrID([]);
      const data = snapshot.val();
      if (data != null) {
        setArrID(Object.values(data));
      }
    });
  }, [uuid]);



  return (
    <>
      {/* header */}

      <Header />
      <section className="px-5 py-5 max-w-md w-screen mx-auto flex flex-col justify-center items-center">
        {/* participate in event */}

        <BorderText
          title={""}
          content={
            <div className="flex flex-col pt-5">
              <div className="flex ">
                <div className="flex flex-col flex-1">
                  <p className="font-bold text-sm text-[#656565]">
                    {"Chào mừng đến với AIT Lucky App,"}
                  </p>
                  <p className="text-sm text-[#656565] mb-2">
                    {"hãy bắt đầu các sự kiện ngay nào!"}
                  </p>
                </div>

                <div className="w-1/5 flex self-end">
                  <img src={nyancat} alt="must be a nyancat gif"></img>
                </div>
              </div>
              <div className="w-full">
                {/* Line */}
                <div className="w-full h-[2px] justify-center mb-2 px-2 bg-gradient-to-r from-[#003B93] to-[#00F0FF] relative flex"></div>
              </div>
              <p className="font-bold text-sm text-[#000000]">
                {"Tham gia sự kiện"}
              </p>
              <p className="text-sm text-[#656565]">
                {
                  "Tham gia vào các sự kiện được tổ chức với tài khoản đăng nhập hiện tại của bạn."
                }
              </p>
              <a href="/">
                <BgBlueButton content={"CHƠI NÀO!!!"} />
              </a>
              <p className="font-bold text-sm text-[#000000] pb-2">
                {"Các sự kiện đang diễn ra"}
              </p>
              <div className="w-full flex flex-col gap-y-[7px] pb-5">
                {arrStatus.length === 0 ? (
                  <div className="w-full flex items-center text-center justify-center text-sm text-[#000000] ">
                    {" "}
                    {"Không có dữ liệu"}
                  </div>
                ) : (
                  arrStatus.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <EventButton
                        title={item.title}
                        user_joined={item.user_joined}
                      ></EventButton>
                    </div>
                  ))
                )}
                <div className="w-full flex items-center text-center justify-center">
                  ...
                </div>
              </div>
            </div>
          }
        ></BorderText>

        {/* create a event */}

        <BorderText
          title={"Tạo sự kiện"}
          content={
            <div className="">
              <p className="text-sm text-[#656565] pt-5">
                {
                  "Tạo một sự kiện quay thưởng mới, bạn có thể thiết lập các giải thưởng, mỗi giải thưởng gồm tên, khái quát, hình ảnh giải thưởng, số lượng giải."
                }
              </p>
              <a href="/event/event-register">
                <BgBlueButton content={"BẮT ĐẦU NGAY"} />
              </a>
            </div>
          }
        ></BorderText>

        {/* show events */}

        <BorderText
          title={"Danh sách sự kiện"}
          content={
            <div className="flex flex-col pt-5 gap-y-[7px]">
              {arrID.length === 0 ? (
                <div className="w-full flex items-center text-center justify-center text-sm text-[#000000] ">
                  {" "}
                  {"Không có dữ liệu"}
                </div>
              ) : (
                arrID.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <EventButton title={item.title} id={item.id}></EventButton>
                  </div>
                ))
              )}

              <a href="event-list">
                <BgBlueButton content={"TẤT CẢ SỰ KIỆN"} />
              </a>
            </div>
          }
        ></BorderText>
      </section>
    </>
  );
}
