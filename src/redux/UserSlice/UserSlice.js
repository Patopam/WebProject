import { createSlice } from "@reduxjs/toolkit";

export const UserData = createSlice({
  name: "user",
  initialState: {
    uidUser: "",
    name: "",
    Email: "",
    Fecha: "",
  },
  reducers: {},
});
export default UserData.reducer;
