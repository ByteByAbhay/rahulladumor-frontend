import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";

const appRootReducer = combineReducers({
  profileInfo: profileSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    // Clear the entire state
    state = undefined;
  }
  return appRootReducer(state, action);
};

export default rootReducer;