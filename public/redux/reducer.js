import {
    ADD_EVENT,
    ADD_USER,
    ADD_PARTICIPANT,
    ADD_REWARD,
} from "./actions";

const initState = {
    event: {},
    user: {},
    reward: {},
    participant: {}
}

export const addReducer = (state = initState, action) => {
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
        case ADD_REWARD: {
            return { ...state, reward: action.payload }
        }
        default:
            return state
    }
}
