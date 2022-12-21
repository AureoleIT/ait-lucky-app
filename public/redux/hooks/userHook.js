import { useSelector } from "react-redux";
import {
    userCurrentEventHostingSelector,
    userCurrentEventPlayingSelector,
    userPackageSelector,
    userEventCreatingSelector,
    userRewardCreatingSelector
} from "../selectors";
// Current user object 
export const useUserPackageHook = () => {
    return useSelector(userPackageSelector);
}
// Event that this user host
export const useUserCurrEventHostingHook = () => {
    return useSelector(userCurrentEventHostingSelector);
}
// Event that this user join
export const useUserCurrEventPlayingHook = () => {
    return useSelector(userCurrentEventPlayingSelector);
}
// Event that this user is creating
export const useUserCurrEventCreatingHook = () => {
    return useSelector(userEventCreatingSelector);
}
// Rewards that this user is creating
export const useUserCurrRewardCreatingHook = () => {
    return useSelector(userRewardCreatingSelector);
}