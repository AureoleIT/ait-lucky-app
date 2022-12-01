import React, { useState } from "react";
import { useRouter } from "next/router";
import { db, auth, app } from "src/firebase";
import { getDatabase, ref, child, get, set } from "firebase/database";

// components
import Header from "public/shared/Header";
import Line from "public/shared/Line";
import BgBlueButton from "public/shared/BgBlueButton";
import EventButton from "public/shared/button/EventButton";
import BorderText from "public/shared/BorderText";

export default function Dashboard() {
  // navigate page
  const [arr, setArr] = useState([]);

  const router = useRouter();
  const playNavigate = () => {
    router.push("/");
  };
  const createNavigate = () => {
    router.push("/event/event-register");
  };
  const listNavigate = () => {
    router.push("event-list");
  };

  get(child(ref(db), `event`))
    .then((snapshot) => {
      const res = snapshot.val() ?? [];
      const values = Object.values(res);
      setArr(values);
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
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
            <div className=" flex flex-col pt-5">
              <p className="font-bold text-sm text-[#656565]">
                {"Chào mừng đến với AIT Lucky App,"}
              </p>
              <p className=" text-sm text-[#656565]">
                {"hãy bắt đầu các sự kiện ngay nào!"}
              </p>
              <div class="  w-full">
                <Line />
              </div>
              <p className="font-bold text-sm text-[#000000]">
                {"Tham gia sự kiện"}
              </p>
              <p className=" text-sm text-[#656565]">
                {
                  "Tham gia vào các sự kiện được tổ chức với tài khoản đăng nhập hiện tại của bạn."
                }
              </p>
              <BgBlueButton content={"CHƠI NÀO"} onClick={playNavigate} />
              <p className="font-bold text-sm text-[#000000] pb-2">
                {"Các sự kiện đang diễn ra"}
              </p>
              <div className="w-full flex flex-col gap-y-[7px] pb-5 ">
                {arr.slice(0, 4).map((item) => {
                  return item.status === 2 ? (
                    <div className="flex flex-col">
                      <EventButton
                        key={item.id}
                        title={item.title}
                        user_joined={item.user_joined}
                        href={"_countdowncheckin"}
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
              <p className=" text-sm text-[#656565] pt-5">
                {
                  "Tạo một sự kiện quay thưởng mới, bạn có thể thiết lập các giải thưởng, mỗi giải thưởng gồm tên, khái quát, hình ảnh giải thưởng, số lượng giải."
                }
              </p>
              <BgBlueButton content={"BẮT ĐẦU NGAY"} onClick={createNavigate} />
            </div>
          }
        ></BorderText>

        {/* show events */}

        <BorderText
          title={"Danh sách sự kiện"}
          content={
            <div className=" flex flex-col pt-5 gap-y-[7px]">
              {event.map((item) => {
                return (
                  <div className="flex flex-col">
                    <EventButton
                      key={item.id}
                      title={item.title}
                      user_joined={item.user_joined}
                      islink={true}
                      href={"_countdowncheckin"}
                    ></EventButton>
                  </div>
                );
              })}
              <BgBlueButton
                content={"TẤT CẢ SỰ KIỆN"}
                onClick={listNavigate}
              />
            </div>
          }
        ></BorderText>
      </section>
    </>
  );
}
