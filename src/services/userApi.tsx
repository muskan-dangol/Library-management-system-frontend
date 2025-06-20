import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetail: builder.query({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"], // Enable cache invalidation
    }),
  }),
});

export const { useGetUserDetailQuery } = userApi;
