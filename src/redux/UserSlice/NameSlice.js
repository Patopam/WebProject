import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: null,
};

export const NameSlice = createSlice({
	name: 'userName',
	initialState,
	reducers: {
		setUserName: (state, action) => {
			state.name = action.payload;
		},
		clearName: (state) => {
			state.name = null;
		},
	},
});

export const { setUserName, clearName } = NameSlice.actions;
export default NameSlice.reducer;
