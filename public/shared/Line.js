function Line ({ content })
{
    return (
        <div class="w-full h-[2px] my-2 px-2 bg-gradient-to-r from-[#003B93] to-[#00F0FF] relative flex">
                <p class="absolute top-[-50%] mx-2 transform translate-y-[-50%] px-[10px] text-[#003B93] font-semibold bg-white">{content}</p>
        </div>
    )
}

export default Line