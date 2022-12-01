import { applyMiddleware, createStore, combineReducers } from 'redux'
import { objectReducer } from './reducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	objectReducer: objectReducer,
});


export const store = createStore(reducers, applyMiddleware(thunk))