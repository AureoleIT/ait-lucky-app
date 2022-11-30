import {
    INCREASE_CANCEL,
    INCREASE_COMPLETE,
    INCREASE_ON,
    INCREASE_PENDING,
} from '../constants';

const initialState = {
    complete: 0,
    cancel: 0,
    pending: 0,
    on: 0,
};
const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREASE_COMPLETE:
            return {
                ...state,
                complete: state.complete + 1,
            };
        case INCREASE_CANCEL:
            return {
                ...state,
                cancel: state.cancel + 1,
            };
        case INCREASE_PENDING:
            return {
                ...state,
                pending: state.pending + 1,
            };
        case INCREASE_ON:
            return {
                ...state,
                on: state.on + 1,
            };
        default:
            return state;
    }
};
export default testReducer;