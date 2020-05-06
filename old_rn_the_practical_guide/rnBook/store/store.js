// store.js

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import placeReducer from "./reducers/placeReducer";

const rootReducer = combineReducers({
  places: placeReducer
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;