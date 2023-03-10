import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadingReducer from "./loadingSlice";
import verifiedReducer from "./verifiedSlice";
import isAdminReducer from "./isAdminSlice";
import isBLocked from "./isBlockedSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    isVerified: verifiedReducer,
    isAdmin: isAdminReducer,
    isBlocked: isBLocked,
  },
});

export default store;
// export const url = "http://localhost:4000/api/v1/";
export const url = "https://ussnodejs-production.up.railway.app/api/v1/";
