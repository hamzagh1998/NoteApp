import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./theme.slice";
import tokenReducer from "./token.slice";
import userReducer from "./user.slice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    token: tokenReducer,
    user: userReducer
  }
});