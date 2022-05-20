import { combineReducers } from "redux";
import { bookReducer } from "./bookreducer";

export default combineReducers({
  book: bookReducer
});
