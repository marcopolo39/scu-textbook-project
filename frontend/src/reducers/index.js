import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import messageReducer from "./messageReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  accountReducer,
  messageReducer,
  cartReducer,
});
