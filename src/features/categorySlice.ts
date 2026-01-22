import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CategoryFormData } from "../types";

interface CategoryState {
  categoryFormData: CategoryFormData;
  status: "idle" | "pending" | "succeded" | "rejected";
  error: string | null;
}

const initialState: CategoryState = {
  categoryFormData: {
    name: "",
  },
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    updateCategoryFormData(
      state,
      action: PayloadAction<Partial<CategoryFormData>>
    ) {
      state.categoryFormData = { ...state.categoryFormData, ...action.payload };
    },

    resetCategoryFormData(state) {
      state.categoryFormData = {
        name: "",
      };
    },
  },
});

const { actions, reducer } = categorySlice;

export const { updateCategoryFormData, resetCategoryFormData } = actions;
export default reducer;
