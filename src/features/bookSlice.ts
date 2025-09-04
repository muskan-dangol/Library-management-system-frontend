import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BookFormData } from "../types";

interface BookState {
  bookFormData: BookFormData;
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
}

const initialState: BookState = {
  bookFormData: {
    title: "",
    author: "",
    image: null,
    release_date: "",
    available: 0,
    short_description: "",
    long_description: "",
    category_id: "",
  },
  status: "idle",
  error: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,

  reducers: {
    updateBookFormData(state, action: PayloadAction<Partial<BookFormData>>) {
      state.bookFormData = { ...state.bookFormData, ...action.payload };
    },

    resetBookFormData(state) {
      state.bookFormData = {
        title: "",
        author: "",
        image: null,
        release_date: "",
        available: 0,
        short_description: "",
        long_description: "",
        category_id: "",
      };
    },
  },
});

const { actions, reducer } = bookSlice;

export const { updateBookFormData, resetBookFormData } = actions;
export default reducer;
