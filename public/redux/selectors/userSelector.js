export const selectUserReducer = (state) => {
    return state.userReducer
}
export const userEventSelector = (state) => {
    return selectUserReducer(state).event
}
export const userPackageSelector = (state) => {
    return selectUserReducer(state).user
}
export const userParticipantSelector = (state) => {
    return selectUserReducer(state).participant
}
export const userRewardSelector = (state) => {
    return selectUserReducer(state).reward
}