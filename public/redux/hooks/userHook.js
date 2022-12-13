import { useSelector } from "react-redux";
import {
    userCurrentEventSelector,
    userEventSelector,
    userPackageSelector,
    userParticipantSelector,
    userRewardSelector,
    userEventCreatingSelector,
    userRewardCreatingSelector
} from "../selectors";

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
export const useUserCurrEventHook = () => {
    return useSelector(userCurrentEventSelector);
}
export const useUserCurrEventCreatingHook = () => {
    return useSelector(userEventCreatingSelector);
}
export const useUserCurrRewardCreatingHook = () => {
    return useSelector(userRewardCreatingSelector);
}