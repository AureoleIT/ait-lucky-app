import React, { useEffect } from "react";
import { TEXT } from "public/util/colors";

export default function Award({ color, name, count, listWinner, listAward }) {
  const Awards = listAward;
  const Winners = listWinner;

  useEffect(() => {
    console.log(Winners);
  }, [])
  return (
    <div className="w-full h-full px-5">
      <div className="flow-root w-[100%] bg-[#F5F92E] rounded-[50px] m-1">
        <p className={`float-left text-[${TEXT}] text-[18px] font-bold ml-3 ...`}>{name}</p>
        <p className={`float-right text-[${TEXT}] text-[18px] font-semibold mr-3 text-right ...`}>Số lượng: {count}</p>
      </div>
      {
        Awards.map((award) =>
          <div className="flex flex-row w-[100%]  px-2">
            <span className="bg-[#F5F92E] w-[5px] mr-2"></span>
            <div>
              <img src="http://www.gravatar.com/avatar/?d=retro&s=32" alt="" className="w-[50px] h-[50px] rounded object-cover ml-2 my-1"></img>
            </div>
            <p className={`text-[${TEXT}] text-[18px] ml-3 font-semibold`}>{award.title}</p>
          </div>)
      }

      <p className={`text-[${TEXT}] text-[18px] font-bold ml-3 `}>Người chiến thắng</p>
      {
        Winners.map((winner) => 
          <div className="flex flex-row w-[100%] px-2">
            <span className="bg-[#F5F92E] w-[5px] h-[50px] mr-2"></span>
            <div>
              <img src="http://www.gravatar.com/avatar/?d=retro&s=32" alt="" className="w-[50px] h-[50px] rounded-full object-cover ml-2"></img>
            </div>
            <p className={`text-[${TEXT}] text-[18px] ml-3 font-semibold`}>{winner.title}</p>
          </div>
        )
      }
    </div>
  );
}
