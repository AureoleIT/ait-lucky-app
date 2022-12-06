export const selectPlayerReducer = (state) => {
    return state.playerReducer
}
export const joinEventSelector = (state) => {
    return selectPlayerReducer(state).event
}