import { api } from "./api";
import { Category } from "../types";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], string>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
