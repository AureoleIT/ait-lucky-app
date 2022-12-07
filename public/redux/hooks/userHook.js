import { useSelector } from "react-redux";
import { userEventSelector, userPackageSelector, userParticipantSelector, userRewardSelector } from "../selectors";

export const useUserEventHook = () => {
    return useSelector(userEventSelector);
}
export const useUserPackageHook = () => {
    return useSelector(userPackageSelector);
}
export const useUserParticipantHook = () => {
    return useSelector(userParticipantSelector);
}
export const useUserRewardHook = () => {
    return useSelector(userRewardSelector);
}
