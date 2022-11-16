import React from "react";
import Link from "next/link";

export default function EventButton(event) {
  return (
    <>
      {event.islink ? (
        <Link href={event.href}>
          <button
            className="rounded-[5px] bg-[#40BEE5]"
            onClick={event.onClick}
          >
            <div className="flex flex-row justify-between items-center mx-6  text-white h-10 font-[Nunito Sans]">
              <div className="justify-center items-center font-bold text-sm uppercase">
                {event.name}
              </div>
              <div className="text-xs flex flex-col">
                <div>{event.id}</div>
                <div>{event.numberOfPeople} tham gia</div>
              </div>
            </div>
          </button>
        </Link>
      ) : (
        <button className="rounded-[5px] bg-[#40BEE5]" onClick={event.onClick}>
          <div className="flex flex-row justify-between items-center mx-6  text-white h-10 font-[Nunito Sans]">
            <div className="justify-center items-center font-bold text-sm uppercase">
              {event.name}
            </div>
            <div className="text-xs flex flex-col">
              <div>{event.id}</div>
              <div>{event.numberOfPeople} tham gia</div>
            </div>
          </div>
        </button>
      )}
    </>
  );
}
