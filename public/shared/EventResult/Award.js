// layout for page
import React, { useState, useEffect } from "react";
import { TEXT } from "public/util/colors";

export default function Award({ listReward, listPlayer, showRemain = false }) {
  listReward = [].concat(listReward);
  listPlayer = [].concat(listPlayer);

  const getGiftsFromReward = (reward, listPlayer) => {
    return (
      <div className="h-full w-full">
        <div className="h-full grid grid-flow-row grid-cols-3 gap-2">
          {
            reward.img_url.slice(0, 3).map((url, idx) => {
              return (
                <div key={idx} className="relative w-full flex">
                  <img className="object-cover h-full w-full rounded-lg drop-shadow-lg" src={url} alt={reward.description + idx} />
                  {
                    (reward.img_url.length > 3 && idx === 2) ?
                      <div className="h-24 w-full flex absolute right-0 z-10 bg-[#00000080] items-center rounded-lg">
                        <p className="w-full text-center font-bold text-white text-4xl">+{reward.img_url.length - 3}</p>
                      </div> :
                      <></>
                  }
                </div>
              )
            })

          }
        </div>
        <div className="h-full">
          {
            listPlayer.map((player, idx) => {
              return (
                (player.reward_taken === reward.id) ?
                  <div className="flex w-full h-[60px] mt-2" key={idx}>
                    <img src="http://www.gravatar.com/avatar/?d=retro&s=32" alt="" className="w-16 h-16 rounded-full object-cover ml-2"></img>
                    <p className={`text-[${TEXT}] text-[18px] ml-3 font-semibold`}>{player.user_id}</p>
                  </div > :
                  <div key={idx}></div>)
            }
            )
          }
        </div>
      </div>
    )
  }

  const listRewardShowcase = (
    <>
      {
        listReward.map((reward, idx) => {
          return (
            <div key={idx} className="w-full py-2">
              <div className="mb-4 last:mb-0">
                <div className="flex items-center justify-between h-8 rounded-full px-4 mb-2 drop-shadow-lg" style={{ backgroundColor: "#F5F92E" }}>
                  <p className="items-center text-left text-[#004599] text-[18px] font-extrabold">{reward.description}</p>
                  <p className="items-center text-left text-[#004599] text-[16px] font-normal">Số lượng: {showRemain ? reward.quantity_remain : reward.quantity}</p>
                </div>
                {getGiftsFromReward(reward, listPlayer)}
              </div>
            </div>
          )
        })
      }
    </>
  )

  return (
    <>
      <div className="overflow-auto h-full">
        {listRewardShowcase}
      </div>
    </>
  );
}
