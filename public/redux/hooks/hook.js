const { useSelector } = require("react-redux")
const { joinEventSelector } = require("../selectors/playerSelector")

export const useJoinEventHook = () => {
    return useSelector(joinEventSelector)
}