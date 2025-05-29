import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/user/userSignupSlice";
import loginReducer from "../features/user/userLoginSlice";
import { authApi } from "../services/auth/authService";

// calling combineReducer
export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
