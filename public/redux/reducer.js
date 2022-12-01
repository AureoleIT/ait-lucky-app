import {
    ADD_EVENT,
    ADD_USER,
    ADD_PARTICIPANT,
    // ADD_REWARD,
    addUser,
    addParticipant,
    // addReward,
    addEvent
} from "./actions";

const initState = {
    event: {},
    user: {},
    // reward: {},
    participant: {}
}

export const objectReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_EVENT: {
            return { ...state, event: action.payload }
        }
        case ADD_PARTICIPANT: {
            return { ...state, participant: action.payload }
        }
        case ADD_USER: {
            return { ...state, user: action.payload }
        }
        default:
            return state
    }
}
