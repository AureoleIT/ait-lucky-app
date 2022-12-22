export const selectUserReducer = (state) => {
    return state.userReducer
}
// This user object after logged in
export const userPackageSelector = (state) => {
    return selectUserReducer(state).user
}
// Event object that this user click to hosting
export const userCurrentEventHostingSelector = (state) => {
    return selectUserReducer(state).currEventHosting
}
// Event object that this user click to playing
export const userCurrentEventPlayingSelector = (state) => {
    return selectUserReducer(state).currEventPlaying
}
// Event object this user is creating
export const userEventCreatingSelector = (state) => {
    return selectUserReducer(state).currEventCreating
}
// Reward objects this user is creating through event
export const userRewardCreatingSelector = (state) => {
    return selectUserReducer(state).currRewardCreating
}