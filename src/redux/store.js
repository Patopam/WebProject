import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import UserIdSlice from './UserSlice/UserSlice';
import aiStatusReducer from './aiStatusSlice';
import DataSpendsSlice from './DataSlice/DataSpends';
import NameSlice from './UserSlice/NameSlice';
import cloudinaryReducer from './cloudinarySlice/cloudinarySlice';
export const store = configureStore({
	reducer: {
		auth: authReducer,
		userId: UserIdSlice,
		aiStatus: aiStatusReducer,
		DataSpends: DataSpendsSlice,
		cloudinary: cloudinaryReducer,
		userName: NameSlice,
	},
});
