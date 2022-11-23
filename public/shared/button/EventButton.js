import React from "react";
import Link from "next/link";

export default function EventButton(props) {
  const colorStatus = {
    background: `${setColor(props.status)}`,
  };

  return (
    <>
      {props.islink ? (
        <Link href={props.href}>
          <button
            className="rounded-[5px] mx-2"
            style={colorStatus}
            onClick={props.onClick}
          >
            <div className="flex flex-row justify-between items-center mx-4 text-white h-10 font-[Nunito Sans]">
              <div className="justify-center items-center text-left font-bold text-sm uppercase truncate w-[250px]">
                {props.title}
              </div>
              <div className="text-xs flex flex-col text-right w-[150px]">
                <div>{props.id}</div>
                <div>{props.user_joined} người tham gia</div>
              </div>
            </div>
          </button>
        </Link>
      ) : (
        <button
          className="rounded-[5px] mx-2"
          style={colorStatus}
          onClick={props.onClick}
        >
          <div className="flex flex-row justify-between items-center mx-4 text-white h-10 font-[Nunito Sans]">
            <div className="justify-center items-center text-left font-bold text-sm uppercase truncate w-[250px]">
              {props.title}
            </div>
            <div className="text-xs flex flex-col text-right w-[150px]">
              <div>{props.id}</div>
              <div>{props.user_joined} người tham gia</div>
            </div>
          </div>
        </button>
      )}
    </>
  );
}

function setColor(status) {
  switch (status) {
    case 1:
      return "#58BC66";
    case 2:
      return "#D2D440";
    case 3:
      return "#DDAF0C";
    case 4:
      return "#FF6262";
    default:
      return "#40BEE5";
  }
}
