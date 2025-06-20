import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/auth/userSignupSlice";
import loginReducer from "../features/auth/userLoginSlice";
import { api } from "../services/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    signup: signupReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
