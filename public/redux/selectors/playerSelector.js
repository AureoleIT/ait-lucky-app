export const selectPlayerReducer = (state) => {
    return state.playerReducer
}
export const playerEventSelector = (state) => {
    return selectPlayerReducer(state).event
}
export const playerUserSelector = (state) => {
    return selectPlayerReducer(state).user
}
export const playerParticipantSelector = (state) => {
    return selectPlayerReducer(state).participant
}
export const playerRewardSelector = (state) => {
    return selectPlayerReducer(state).reward
}