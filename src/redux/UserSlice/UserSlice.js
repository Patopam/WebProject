import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	id: null,
};
export const UserIdSlice = createSlice({
	name: 'userid',
	initialState,
	reducers: {
		setUserid: (state, action) => {
			state.id = action.payload;
		},
		clearUser: (state) => {
			state.id = null;
		},
	},
});
export const { setUserid, clearUser } = UserIdSlice.actions;
export default UserIdSlice.reducer;
