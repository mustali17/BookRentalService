import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};
const store = createStore(rootReducer, persistedState, composeWithDevTools());
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
export default store;
