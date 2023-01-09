import { hidden } from "public/util/popup"
import {
    INCOGNITO_PARTICIPANT,
    INCOGNITO_EVENT,
    INCOGNITO_USER,
    INCOGNITO_REWARD,
    USER_PACKAGE,
    CLEAR,
    REMOVE_PLAYER_STATE,
    REMOVE_USER_STATE,
    REMOVE_USER_PLAYING,
    REMOVE_USER_CREATING,
    REMOVE_USER_HOSTING,
    USER_CURR_EVENT_HOSTING,
    USER_CURR_EVENT_PLAYING,
    USER_EVENT_CREATING,
    USER_REWARD_CREATING,
    USER_UPDATE_REWARD_CREATING,
    POPUP_MESSAGE,
    POPUP_STATUS,
    POPUP_VISIBLE
} from "./constants"

const joinState = {
    event: {},
    user: {},
    reward: {},
    participant: {}
}

const userState = {
    user: {},
    currRewardCreating: [],
    currEventHosting: {},
    currEventPlaying: {},
    currEventCreating: {},
}

const popUpState = {
    message: "",
    status: false,
    visible: hidden
}

export const playerReducer = (state = joinState, action) => {
    switch (action.type) {
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
        case REMOVE_PLAYER_STATE: {
            return {
                event: {},
                user: {},
                reward: {},
                participant: {}
            };
        }
        case CLEAR: {
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
        case USER_PACKAGE: {
            return { ...state, user: action.payload }
        }
        case USER_CURR_EVENT_HOSTING: {
            return { ...state, currEventHosting: action.payload }
        }
        case USER_CURR_EVENT_PLAYING: {
            return { ...state, currEventPlaying: action.payload }
        }
        case USER_EVENT_CREATING: {
            return { ...state, currEventCreating: action.payload }
        }
        case USER_REWARD_CREATING: {
            return { ...state, currRewardCreating: [...state.currRewardCreating, action.payload] }
        }
        case USER_UPDATE_REWARD_CREATING: {
            return {
                ...state,
                currRewardCreating:
                    () => {
                        const pos = state.currRewardCreating.findIndex((value) => value.idReward === action.payload.idReward)
                        return pos === -1
                            ? state
                            : {
                                ...state,
                                currEventCreating: [state.currRewardCreating.slice(0, pos), action.payload, state.currRewardCreating.slice(pos + 1)]
                            }
                    }
            }
        }
        case REMOVE_USER_CREATING: {
            return { ...state, currRewardCreating: [], currEventCreating: {} }
        }
        case REMOVE_USER_PLAYING: {
            return { ...state, currEventPlaying: {} }
        }
        case REMOVE_USER_HOSTING: {
            return { ...state, currEventHosting: {} }
        }
        case REMOVE_USER_STATE: {
            return {
                user: {},
                currRewardCreating: [],
                currEventHosting: {},
                currEventPlaying: {},
                currEventCreating: {},
            };
        }
        case CLEAR: {
            console.log("REMOVE STATE USER")
            return {
                user: {},
                currRewardCreating: [],
                currEventHosting: {},
                currEventPlaying: {},
                currEventCreating: {},
            };
        }
        default:
            return state
    }
}
export const popUpReducer = (state = popUpState, action) => {
    switch (action.type) {
        case POPUP_MESSAGE: {
            return { ...state, message: action.payload }
        }
        case POPUP_STATUS: {
            return { ...state, status: action.payload }
        }
        case POPUP_VISIBLE: {
            return { ...state, visible: action.payload }
        }
        case CLEAR: {
            console.log("REMOVE STATE POPUP")
            return {
                message: "",
                status: false,
                visible: hidden
            };
        }
        default:
            return state
    }
}
