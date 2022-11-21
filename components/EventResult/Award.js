import React, { useEffect } from "react";
import { TEXT } from "public/util/colors";

export default function Award({ color, name, count, listWinner, listReward }) {
  listReward = [].concat(listReward);
  const Winners = listWinner;

  const getGiftsFromReward = (reward) => {
    return (
      <div className="relative h-full flex flex-col gap-2">
        <div className="w-1 left-4 absolute h-full" style={{ backgroundColor: reward.color }} />
        {
          reward.gifts.map((gift, idx) => {
            return (
              <div key={idx} className="ml-8 gap-4 flex">
                <img className="object-cover h-16 w-16 rounded-lg" src={gift.img} alt={gift.desc} />
                <p className="grow font-semibold text-[#004599]">{gift.desc}</p>
              </div>
            )
          })
        }
      </div>
    )
  }

  const listRewardShowcase = (
    <>
        {
            listReward.map((reward, idx) => {
                return (
                    <div key={idx} className="mb-6 last:mb-0">
                        <div className="flex items-center justify-between h-8 rounded-full px-4 mb-2" style={{backgroundColor: reward.color}}>
                            <p className="items-center text-left text-[#004599] text-[18px] font-extrabold">{reward.name}</p>
                            <p className="items-center text-left text-[#004599] text-[16px] font-normal">Số lượng: {reward.amount}</p>
                        </div>
                        {getGiftsFromReward(reward)}
                    </div>
                )
            })
        }
    </>
)

  useEffect(() => {
    console.log(Winners);
  }, [])
  return (
    <div className="w-full h-full px-5">
      <div className="flex flex-col w-full h-full max-h-64 px-5 overflow-hidden">

      {listRewardShowcase}
      </div>

      <p className={`text-[${TEXT}] text-[18px] font-bold ml-3 `}>Người chiến thắng</p>
      {
        Winners.map((winner) =>
          <div className="flex flex-row w-[100%] px-2">
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
