import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setStoredToken: (state, {payload: {token}}) => {
      state.value = token;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setStoredToken } = tokenSlice.actions;

export default tokenSlice.reducer;
