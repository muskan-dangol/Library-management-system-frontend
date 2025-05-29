import axios from "axios";
import { AxiosError } from "axios";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { apiBaseUrl } from "../../constant";
import { LoginFormData } from "../../types";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

interface LoginState {
  formData: LoginFormData;
  userInfo: { email: string; name: string } | null;
  userToken: string | null;
  loading: boolean;
  success: boolean;
  errorMessage: string | null;
}

const initialState: LoginState = {
  formData: {
    email: "",
    password: "",
  },
  userInfo: null,
  userToken: userToken,
  loading: false,
  success: false,
  errorMessage: null,
};

export const userLogin = createAsyncThunk(
  "login/loginUser",
  async (formDate: LoginFormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/auth/login`, formDate, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("userToken", res.data.token);
      console.log(res.data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data.message || "Login failed");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<LoginFormData>>) {
      state.formData = { ...state.formData, ...action.payload };
      console.log(current(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.success = false;
        state.errorMessage = action.payload as string;
      });
  },
});

const { actions, reducer } = loginSlice;
export const { updateFormData } = actions;
export default reducer;
