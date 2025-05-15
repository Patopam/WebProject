import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Nombre: "HOLA",
};

export const NombreSlice = createSlice({
  name: "userNombre",
  initialState,
  reducers: {
    setUserNombre: (state, action) => {
      state.Nombre = action.payload;
      console.log(state.Nombre);
    },

    clearNombre: (state) => {
      state.Nombre = null;
    },
  },
});

export const { setUserNombre, clearNombre } = NombreSlice.actions;
export default NombreSlice.reducer;
