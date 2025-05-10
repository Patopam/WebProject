import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: undefined,
};

export const UserId = createSlice({
  name: "userid",
  initialState,
  reducers: {
    setUserid: (state, action) => {
      state.id = action.payload;
      console.log(state.id);
    },
  },
});

export const { setUserid } = UserId.actions;
export default UserId.reducer;
