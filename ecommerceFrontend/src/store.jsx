import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userLoginReducer, userSignupReducer } from "./reducer/userReducer";


const rootReducer = {
  user: userLoginReducer,
  sign: userSignupReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
