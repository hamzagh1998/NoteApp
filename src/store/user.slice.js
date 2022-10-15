import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userSlice= createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, {payload: {userData}}) {
      state.value = userData;
    }
  }
}); 

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions;

export default userSlice.reducer;