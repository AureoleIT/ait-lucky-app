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
import { store } from "./store";

const joinState = {
    event: {},
    user: {},
    reward: {},
    participant: {}
}

const userState = {
    event: [],
    user: {},
    reward: [],
    participant: []
}

export const playerReducer = (state = joinState, action) => {
    const { type, error } = action;
    switch (type) {
        case INCOGNITO_EVENT: {
            return { ...state, event: action.payload }
        }
        case INCOGNITO_PARTICIPANT: {
            return { ...state, participant: action.payload }
        }
        case INCOGNITO_USER: {
            return { ...state, user: action.payload }
        }
        case INCOGNITO_REWARD: {
            return { ...state, reward: action.payload }
        }
        case REMOVE_STATE: {
            console.log("REMOVE STATE PLAYER")
            return {
                event: {},
                user: {},
                reward: {},
                participant: {}
            };
        }
        default:
            return state
    }
}
export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case USER_EVENT: {
            return { ...state, event: [...action.payload] }
        }
        case USER_PARTICIPANT: {
            return { ...state, participant: [...action.payload] }
        }
        case USER_PACKAGE: {
            return { ...state, user: action.payload }
        }
        case USER_REWARD: {
            return { ...state, reward: [...action.payload] }
        }
        case REMOVE_STATE: {
            console.log("REMOVE STATE USER")
            return {
                event: [],
                user: {},
                reward: [],
                participant: []
            };
        }
        default:
            return state
    }
}
