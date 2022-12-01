export const ADD_USER = "ADD_USER";
export const ADD_EVENT = "ADD_EVENT";
export const ADD_PARTICIPANT = "ADD_PARTICIPANT";
export const ADD_REWARD = "ADD_REWARD";

export const addEvent = (event) => ({
    type: ADD_EVENT,
    payload: event,
})
export const addUser = (user) => ({
    type: ADD_USER,
    payload: user,
})
export const addParticipant = (participant) => ({
    type: ADD_PARTICIPANT,
    payload: participant,
})
export const addReward = (reward) => ({
    type: ADD_REWARD,
    payload: reward,
})