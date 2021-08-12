import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {updateCategories} = categorySlice.actions;
export default categorySlice.reducer;