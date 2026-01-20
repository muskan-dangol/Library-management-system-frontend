import { api } from "./api";
import { Book, FiltersState, BookFormData } from "../types";

export type BookResponse = Book;
export type CreateNewBookRequest = BookFormData;

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
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

    addBook: builder.mutation<BookResponse, CreateNewBookRequest>({
      query: (newBook) => {
        const formData = new FormData();

        formData.append("title", newBook.title);
        formData.append("author", newBook.author);
        formData.append("release_date", newBook.release_date);
        formData.append("available", String(newBook.available));
        formData.append("short_description", newBook.short_description);
        formData.append("long_description", newBook.long_description);
        formData.append("category_id", newBook.category_id);
        formData.append("image", newBook.image);

        return {
          url: "/books",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useLazyFetchFilteredBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
} = bookApi;
