import { createSlice } from "@reduxjs/toolkit";

import { lightTheme } from "../infrastructure/themes/light.theme";
import { darkTheme } from "../infrastructure/themes/dark.themes";

const initialState = {
  mode: "light",
  currentTheme: lightTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: state => {
      state.mode = state.mode === "light" ? "dark" : "light";
      state.currentTheme = state.mode === "light" ? lightTheme : darkTheme;
    },
    setStoredTheme: (state, {payload: {theme}}) => {
      state.mode = theme;
      state.currentTheme = theme === "light" ? lightTheme : darkTheme;
    }
  }
});

// Action creators are generated for each case reducer function
export const { toggleTheme, setStoredTheme } = themeSlice.actions;

export default themeSlice.reducer;
