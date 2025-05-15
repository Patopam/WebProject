import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
