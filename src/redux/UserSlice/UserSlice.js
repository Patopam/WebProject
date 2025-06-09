import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: null,
};

export const UserIdSlice = createSlice({
	name: 'userId',
	initialState,
	reducers: {
		setUserId: (state, action) => {
			state.id = action.payload;
		},
		clearUser: (state) => {
			state.id = null;
		},
	},
});

export const { setUserId, clearUser } = UserIdSlice.actions;
export default UserIdSlice.reducer;
