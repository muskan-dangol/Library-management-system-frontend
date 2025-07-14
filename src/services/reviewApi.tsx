import { api } from "./api";

export interface ReviewResponse {
  id: string;
  user_id: string;
  book_id: string;
  comment: string;
  average_rating: number;
  created_on: string;
}

export interface CreateReviewRequest {
  user_id: string;
  book_id: string;
  comment: string;
  rating: number;
}

export interface UpdateReviewRequest {
  review_id: string;
  book_id: string;
  comment: string;
  rating: number;
}

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookReviews: builder.query({
      query: (bookId: string) => ({
        url: `books/${bookId}/reviews`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),

    addBookReview: builder.query<ReviewResponse, CreateReviewRequest>({
      query: ({ book_id, ...newBookReview }) => ({
        url: `books/${book_id}/reviews`,
        method: "POST",
        body: newBookReview,
      }),
      // invalidatesTags: ["review"],
    }),

    updateBookReview: builder.query<ReviewResponse, UpdateReviewRequest>({
      query: ({ book_id, review_id, ...rest }) => ({
        url: `books/${book_id}/reviews/${review_id}`,
        method: "PATCH",
        body: rest,
      }),
      // invalidatesTags: ["review"]
    }),
  }),
});

export const {
  useGetAllBookReviewsQuery,
  useAddBookReviewQuery,
  useUpdateBookReviewQuery,
} = bookApi;
