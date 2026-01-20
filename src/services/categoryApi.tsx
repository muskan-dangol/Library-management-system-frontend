import { api } from "./api";
import { Category, CategoryFormData } from "../types";

export type CategoryResponse = Category;
export type CreateNewCategoryRequest = CategoryFormData;

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], string>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    addCategory: builder.mutation<CategoryResponse, CreateNewCategoryRequest>({
      query: ({ ...newCategory }) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useAddCategoryMutation } = categoryApi;
