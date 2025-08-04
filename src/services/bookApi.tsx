import { api } from "./api";
import { Book, FiltersState } from "../types";

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
    getAllBooks: builder.query<Book[], string>({
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

    fetchFilteredBooks: builder.query<
      Book[],
      { sortBy?: string; filterBy?: FiltersState; searchKeyword?: string }
    >({
      query: ({ sortBy, filterBy, searchKeyword }) => ({
        url: `/books/search`,
        method: "POST",
        body: {
          sortBy,
          filterCategories: filterBy?.Category,
          filterAuthors: filterBy?.Author,
          filterReleaseDate: filterBy?.ReleaseDate,
          searchKeyword,
        },
      }),
      providesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useLazyFetchFilteredBooksQuery,
  useFetchFilteredBooksQuery,
  useGetBookByIdQuery,
} = bookApi;
