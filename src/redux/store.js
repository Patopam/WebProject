import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import UserIdSlice from "./UserSlice/UserSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userId: UserIdSlice,
  },
});
