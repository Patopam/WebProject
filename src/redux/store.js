import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import UserIdSlice from "./UserSlice/UserSlice";
import aiStatusReducer from "./aiStatusSlice";
import DataSpendsSlice from "./DataSlice/DataSpends";
import NombreSlice from "./UserSlice/NombreSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userId: UserIdSlice,
    aiStatus: aiStatusReducer,
    DataSpends: DataSpendsSlice,
    NombreU: NombreSlice,
  },
});
