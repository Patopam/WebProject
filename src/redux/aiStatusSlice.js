import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	loading: false,
};
const aiStatusSlice = createSlice({
	name: 'aiStatus',
	initialState,
	reducers: {
		setAiLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});
export const { setAiLoading } = aiStatusSlice.actions;
export default aiStatusSlice.reducer;
