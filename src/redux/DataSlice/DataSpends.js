import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const DataSpendsSlice = createSlice({
  name: "DataSpends",
  initialState,
  reducers: {
    setDataSpends: (state, action) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setDataSpends, clearUser } = DataSpendsSlice.actions;
export default DataSpendsSlice.reducer;
