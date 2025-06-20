import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoginFormData } from "../../types";
import { AuthResponse } from "../../services/authApi";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

interface LoginState {
  formData: LoginFormData;
  userInfo: AuthResponse | null;
  userToken: string | null;
  errorMessage: string | null;
}

const initialState: LoginState = {
  formData: {
    email: "",
    password: "",
  },
  userInfo: null,
  userToken: userToken,
  errorMessage: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<LoginFormData>>) {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData(state) {
      state.formData = { email: "", password: "" };
    },
    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.errorMessage = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

const { actions, reducer } = loginSlice;
export const { updateFormData, resetFormData, logout, setCredentials } =
  actions;
export default reducer;
