import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupFormData } from "../../types";
import { AuthResponse } from "../../services/authApi";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

interface SignupState {
  formData: SignupFormData;
  userInfo: AuthResponse | null;
  userToken: string | null;
  loading: boolean;
  success: boolean;
  errorMessage: string | null;
}

const initialState: SignupState = {
  formData: {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  },
  userInfo: null,
  userToken: userToken,
  loading: false,
  success: false,
  errorMessage: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<SignupFormData>>) {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData(state) {
      state.formData = { email: "", password: "", firstname: "", lastname: "" };
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

const { actions, reducer } = signupSlice;

export const { updateFormData, resetFormData, setCredentials } = actions;

export default reducer;
