import axios from "axios";
import { AxiosError } from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../../constant";
import { SignupFormData } from "../../types";


const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

interface SignupState {
  formData: SignupFormData;
  userInfo: { email: string; firstname: string } | null;
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

export const userSignup = createAsyncThunk(
  "signup/signupUser",
  async (formData: SignupFormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/auth/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("userToken", res.data.token);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

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
  },
  extraReducers(builder) {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
        state.success = true;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.success = false;
        state.errorMessage = action.payload as string;
      });
  },
});

const { actions, reducer } = signupSlice;

export const { updateFormData, resetFormData } = actions;

export default reducer;
