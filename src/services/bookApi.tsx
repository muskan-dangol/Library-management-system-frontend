import { api } from "./api";
import { Book } from "../types";

export interface BookResponse {
  id: string;
  title: string;
  author: string;
  release_date: string;
  available: number;
  short_description: string;
  long_description: string;
  image: string;
  category_id?: string;
}

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooksDetails: builder.query<Book[], string>({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["book"],
    }),

    getBookById: builder.query({
      query: (bookId: string) => ({
        url: `/books/${bookId}`,
        method: "GET",
      }),
      providesTags: ["book"],
    }),

    FilteredBooksByKeyword: builder.query<
      Book[],
      { sortBy?: string; searchKeyword?: string }
    >({
      query: ({ sortBy, searchKeyword }) => ({
        url: `/books/search`,
        method: "GET",
        params: {
          sortBy,
          searchKeyword,
        },
      }),
      providesTags: ["book"],
    }),
  }),
});

export const { useGetAllBooksDetailsQuery,useGetBookByIdQuery,  useFilteredBooksByKeywordQuery } =
  bookApi;
