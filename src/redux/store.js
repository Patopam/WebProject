import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userIdReducer from './UserSlice/UserSlice';
import aiStatusReducer from './aiStatusSlice';
import DataSpendsSlice from './DataSlice/DataSpends';
import userNameReducer from './UserSlice/NameSlice';
import cloudinaryReducer from './cloudinarySlice/cloudinarySlice';
export const store = configureStore({
	reducer: {
		auth: authReducer,
		userId: userIdReducer,
		aiStatus: aiStatusReducer,
		DataSpends: DataSpendsSlice,
		cloudinary: cloudinaryReducer,
		userName: userNameReducer,
	},
});
