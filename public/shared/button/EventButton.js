import React, {useEffect} from "react";

export default function EventButton({title, id, userJoined, status, onclick}) { 
  return (
    <a href={`${setLink(status)}`} className="flex flex-col w-full">
      <button className={`rounded-[5px] mx-2 ${setColor(status)}`} onClick={onclick}>
        <div className="flex justify-between items-center mx-4 text-white h-10 font-[Nunito Sans]">
          <div className="justify-center items-center text-left font-bold text-sm uppercase truncate flex-1">
            {title}
          </div>
          <div className="text-xs flex flex-col text-right w-1/2">
            {id ? (
              <div className="truncate">{id}</div>
            ) : (
              <></>
            )}
            {userJoined >= 0 ? (
              <div>{userJoined} người tham gia</div>
            ) : (
              <></>
            )}           
          </div>
        </div>
      </button>
    </a>
  );
}

function setColor(status) {
  switch (status) {
    case 1:
      return "bg-[#58BC66]";
    case 2:
      return "bg-[#D2D440]";
    case 3:
      return "bg-[#DDAF0C]";
    case 4:
      return "bg-[#FF6262]";
    default:
      return "bg-[#40BEE5]";
  }
}

function setLink(status) {
  switch (status) {
    case 1:
      return "/event/event-detail";
    case 2:
      return "/event/countdown-checkin";

    case 3:
      return "/event/lucky_spin";

    case 4:
      return "/_eventresult";

    default:
      return "/event/event-detail";
  }
}
