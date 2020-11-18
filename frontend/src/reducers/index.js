import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  accountReducer,
  messageReducer,
});
