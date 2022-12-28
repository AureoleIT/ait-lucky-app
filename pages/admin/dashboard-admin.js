import React, { useState, useEffect, useMemo } from "react";
import router from "next/router";
// firebase
import { db } from "src/firebase";
import {
  ref,
  orderByChild,
  query,
  onValue,
  orderByValue,
  orderByKey,
} from "firebase/database";
// redux
import { useDispatch } from "react-redux";
import { useUserPackageHook } from "public/redux/hooks";
import { userCurrentEventHosting } from "public/redux/actions";
// components
import { Header, Input, Line, Button } from "public/shared";
import EventButton from "public/shared/button/EventButton";
import { LEFT_COLOR, RIGHT_COLOR } from "public/util/colors";
//gif
import nyancat from "public/img/nyancat.gif";

export default function Dashboard() {
  const [arrStatus, setArrStatus] = useState([]);
  const [reverse, setReverse] = useState([]);
  const [arrID, setArrID] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useUserPackageHook();
  // create query
  const queDb = query(ref(db, "event"), orderByValue("createBy"));
  // authentication, only users can access this page
  const checkAuth = () => {
    router.push("/auth/login");
  };
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
    onValue(queDb, (snapshot) => {
      setArrStatus([]);
      const data = snapshot.val();
      if (data != null) {
        const values = Object.values(data);
        values.sort((a, b) =>
          a.createAt > b.createAt
            ? -1
            : a.createAt === b.createAt
            ? a.title > b.title
              ? -1
              : 1
            : 1
        );
        values.forEach((value) => {
          if (
            value.delFlag === false &&
            (value.status === 1 || value.status === 2 || value.status === 3) &&
            value.createBy === currentUser.userId
          )
            setArrStatus((prev) => [...prev, value]);
        });
      }
    });
  }, []);

  // console.log(arrStatus);
  useEffect(() => {
    const reverse = arrStatus.reverse();
    console.log(reverse);
  }, []);
  // console.log("==============");
  // console.log(reverse);

  useEffect(() => {
    onValue(queDb, (snapshot) => {
      setArrID([]);
      const data = snapshot.val();
      if (data != null) {
        const values = Object.values(data);
        values.sort((a, b) =>
          a.createAt > b.createAt
            ? -1
            : a.createAt === b.createAt
            ? a.title > b.title
              ? -1
              : 1
            : 1
        );
        values.forEach((value) => {
          if (value.delFlag === false && value.createBy === currentUser.userId)
            setArrID((prev) => [...prev, value]);
        });
      }
    });
  }, [String(currentUser.userId)]);

  //render view
  const renderHeader = useMemo(() => {
    return <Header />;
  }, []);
  const renderWelcome = useMemo(() => {
    return (
      <div className="flex flex-col pb-4 pt-2">
        <div className="flex flex-col">
          <div className="flex justify-between items-end w-full">
            <div className="flex flex-col flex-1">
              <p className="font-bold text-sm text-[#656565] mt-2">
                {"Chào mừng đến với AIT Lucky App,"}
              </p>
              <p className="text-sm text-[#656565] mb-2">
                {"hãy bắt đầu chơi các sự kiện ngay nào!"}
              </p>
            </div>
            <img
              src={nyancat}
              className="w-1/5 min-h-min "
              alt="must be a nyancat gif"
            ></img>
          </div>
        </div>
        <div className="w-full mb-2">
          <Line marginY={false} />
        </div>
      </div>
    );
  }, []);
  const renderJoinEvent = useMemo(() => {
    return (
      <Input content={"Tham gia sự kiện"}>
        <div className="flex flex-col pb-4 pt-2">
          <p className=" f text-sm text-[#656565] my-2">
            {"Tham gia vào các sự kiện được tổ chức bằng mã pin."}
          </p>
          <a href="/">
            <Button
              margin={"my-0"}
              content={"CHƠI VỚI MÃ PIN!"}
              primaryColor={LEFT_COLOR}
              secondaryColor={RIGHT_COLOR}
            />
          </a>
        </div>
      </Input>
    );
  }, []);
  const renderShowCurrentEvent = useMemo(() => {
    return (
      <Input content={"Các sự kiện đang diễn ra"} isTextGradient={true}>
        <div className="flex flex-col py-4">
          <p className=" text-sm text-[#656565] mb-2">
            {"Hiển thị các sự kiện đang diễn ra của tôi"}
          </p>
          <div className="w-full flex flex-col gap-y-[7px] overflow-auto max-h-[188px] scrollbar-hide">
            {arrStatus.length === 0 ? (
              <div className="w-full flex items-center text-center justify-center text-sm text-[#000000]">
                {" "}
                {"Không có dữ liệu"}
              </div>
            ) : (
              arrStatus.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <EventButton
                    title={item.title}
                    id={item.eventId}
                    userJoined={item.userJoined}
                    status={item.status}
                    db={1}
                    onclick={() => dispatch(userCurrentEventHosting(item))}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </Input>
    );
  }, [arrStatus]);
  const renderCreateEvent = useMemo(() => {
    return (
      <Input content={"Tạo sự kiện"} isTextGradient={true}>
        <div className="">
          <p className="text-sm text-[#656565] pt-4">
            {
              "Tạo một sự kiện quay thưởng mới, bạn có thể thiết lập các giải thưởng, mỗi giải thưởng gồm tên, khái quát, hình ảnh giải thưởng, số lượng giải."
            }
          </p>
          <a href="/admin/event/event-register">
            <Button
              content={"TẠO SỰ KIỆN NGAY"}
              primaryColor={LEFT_COLOR}
              secondaryColor={RIGHT_COLOR}
            />
          </a>
        </div>
      </Input>
    );
  }, []);

  const renderShowCreateEvent = useMemo(() => {
    return (
      <Input content={"Danh sách sự kiện"} isTextGradient={true}>
        <p className=" text-sm text-[#656565] mt-4 mb-2">
          {"Hiển thị các sự kiện gần đây của tôi đã tạo"}
        </p>
        <div className="flex flex-col gap-y-[7px]">
          {arrID.length === 0 ? (
            <div className="w-full flex items-center text-center justify-center text-sm text-[#000000] ">
              {" "}
              {"Không có dữ liệu"}
            </div>
          ) : (
            arrID.slice(0, 4).map((item, index) => (
              <div key={index} className="flex flex-col">
                <EventButton
                  title={item.title}
                  id={item.eventId}
                  status={item.status}
                  userJoined={item.userJoined}
                  db={2}
                  onclick={() => dispatch(userCurrentEventHosting(item))}
                />
              </div>
            ))
          )}
          <a href="event-list">
            <Button
              content={"Tất cả sự kiện"}
              primaryColor={LEFT_COLOR}
              secondaryColor={RIGHT_COLOR}
            />
          </a>
        </div>
      </Input>
    );
  }, [arrID]);

  return (
    <>
      {currentUser.userId == null ? (
        checkAuth()
      ) : (
        <div>
          {renderHeader}
          <section className="h-full max-w-xl w-4/5 mx-auto flex flex-col justify-center items-center pt-2">
            {/* {welcome to AIT App} */}
            {renderWelcome}
            {/* participate in event */}
            {renderJoinEvent}
            {/* show my curent event */}
            {renderShowCurrentEvent}
            {/* create new event  */}
            {renderCreateEvent}
            {/* show all my event */}
            {renderShowCreateEvent}
          </section>
        </div>
      )}
    </>
  );
}
