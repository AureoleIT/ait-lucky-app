import {
    INCREASE_CANCEL,
    INCREASE_COMPLETE,
    INCREASE_ON,
    INCREASE_PENDING,
} from '../constants';
export function increaseComplete(number) {
    return {
        type: INCREASE_COMPLETE,
        payload: { value: number },
    };
}
export function increaseCancel(number) {
    return {
        type: INCREASE_CANCEL,
        payload: { value: number },
    };
}
export function increasePending(number) {
    return {
        type: INCREASE_PENDING,
        payload: { value: number },
    };
}
export function increaseOn(number) {
    return {
        type: INCREASE_ON,
        payload: { value: number },
    };
}
export function increaseNumService(number) {
    return async dispatch => {
        try {
            await dispatch(increaseComplete(number));
            await dispatch(increaseCancel(number));
            await dispatch(increasePending(number));
            await dispatch(increaseOn(number));
        } catch (error) {
            console.error(error);
        }
    };
}