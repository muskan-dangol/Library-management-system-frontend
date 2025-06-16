import { LoginFormData } from "../types";
import { SignupFormData } from "../types";
import { api } from "./api";


export interface User {
  firstname: string;
  lastname: string;
  id: string;
  is_admin: boolean;
}
export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginFormData>({
      query: (formData) => ({
        url: `/auth/login`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
    signup: builder.mutation<AuthResponse, SignupFormData>({
      query: (formData) => ({
        url: `/auth/signup`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
