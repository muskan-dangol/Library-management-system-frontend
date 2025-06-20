import { api } from "./api";

export interface BookResponse {
  id: string;
  title: string;
  author: string;
  release_date: string;
  available: number;
  short_description: string;
  long_description: string;
  image: string;
  created_on: string;
}

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooksDetails: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["book"],
    }),
  }),
});

export const { useGetAllBooksDetailsQuery } = bookApi;
