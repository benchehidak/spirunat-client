import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer/rootReducer";

const store = createStore(
    rootReducer,
    // composeWithDevTools(applyMiddleware(thunk))
    applyMiddleware(thunk)
);

export default store;