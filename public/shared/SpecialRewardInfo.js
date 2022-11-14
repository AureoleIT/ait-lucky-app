function SpecialRewardInfo ({ rewardName, amount, image, giftName, typeReward }) {

    const divBorder = {
        "border-left": "2px solid #F5F92E"
    }

    const testImg = {
        "background":"#D9D9D9"
    }
    
    return (
        <div className="my-1 w-[100%]">
            <div className="w-[100%] h-[30px] flex justify-between items-center px-3 text-[16px] bg-[#F5F92E] rounded-[50px] mb-2">
                <h1 className="uppercase font-bold">{rewardName}</h1>
                <h1>Số lượng : {amount}</h1>
            </div>

            <div className="w-[100%] h-[50px] flex" style={divBorder}>
                <div className="w-[50px] h-[50px] rounded-[5px] mx-[10px]" style={testImg}>
                    {/* image */}
                </div>

                <h1 className="text-[#004599]">{giftName}</h1>

            </div>
        </div>
    )
}

export default SpecialRewardInfo