import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  isLoading: true,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setStoredToken: (state, {payload: {token, isLoading}}) => {
      state.value = token;
      state.isLoading = isLoading;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setStoredToken } = tokenSlice.actions;

export default tokenSlice.reducer;
