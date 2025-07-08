import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Review {
  id: string;
  user_id: string;
  book_id: string;
  comment: string;
  rating: number;
  created_on: string;
}

interface ReviewState {
  items: Review[];
}

const initialState: ReviewState = {
  items: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview(state, action: PayloadAction<Review[]>) {
      state.items = action.payload;
    },
    addReview(state, action: PayloadAction<Review>) {
      state.items.push(action.payload);
    },
    updateReview(state, action: PayloadAction<Review>) {
      const index = state.items.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteReview(state, action: PayloadAction<string>) {
      state.items = state.items.filter((r) => r.id !== action.payload);
    },
  },
});

const { actions, reducer } = reviewSlice;

export const { setReview, addReview, updateReview, deleteReview } = actions;
export default reducer;
