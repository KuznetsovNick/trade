import {applyMiddleware, combineReducers, createStore} from "redux"
import {Reducer} from "./reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    reducer: Reducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))