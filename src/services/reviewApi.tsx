import { api } from "./api";

export interface ReviewResponse {
  id: string;
  user_id: string;
  book_id: string;
  comment: string;
  averageRating: number;
  created_on: string;
}

export interface CreateReviewRequest {
  user_id: string;
  book_id: string;
  comment: string;
  rating: number;
}

export interface UpdateReviewRequest {
  id: string;
  comment: string;
  rating: number;
}

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookReviews: builder.query({
      query: (id: string) => ({
        url: `reviews/book/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),

    addBookReview: builder.query<ReviewResponse, CreateReviewRequest>({
      query: (newBookReview) => ({
        url: `reviews`,
        method: "POST",
        body: newBookReview,
      }),
      // invalidatesTags: ["review"],
    }),

    updateBookReview: builder.query<ReviewResponse, UpdateReviewRequest>({
      query: ({ id: reviewId, ...rest }) => ({
        url: `reviews/${reviewId}`,
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
