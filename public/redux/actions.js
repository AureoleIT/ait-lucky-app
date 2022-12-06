import {
    INCOGNITO_PARTICIPANT,
    INCOGNITO_EVENT,
    INCOGNITO_USER,
    INCOGNITO_REWARD,
    USER_PARTICIPANT,
    USER_EVENT,
    USER_PACKAGE,
    USER_REWARD,
    REMOVE_STATE
} from "./constants"

export const incognitoEvent = (event) => ({
    type: INCOGNITO_EVENT,
    payload: event,
})
export const incognitoUser = (user) => ({
    type: INCOGNITO_USER,
    payload: user,
})
export const incognitoParticipant = (participant) => ({
    type: INCOGNITO_PARTICIPANT,
    payload: participant,
})
export const incognitoReward = (reward) => ({
    type: INCOGNITO_REWARD,
    payload: reward,
})
export const removeState = () => ({
    type: REMOVE_STATE,
})
export const userEvent = (event) => ({
    type: USER_EVENT,
    payload: event,
})
export const userPackage = (user) => ({
    type: USER_PACKAGE,
    payload: user,
})
export const userParticipant = (participant) => ({
    type: USER_PARTICIPANT,
    payload: participant,
})
export const userReward = (reward) => ({
    type: USER_REWARD,
    payload: reward,
})
export const userCurrentHostingEvent = (event) => ({
    type: USER_CURR_HOSTING_EVENT,
    payload: event,
})