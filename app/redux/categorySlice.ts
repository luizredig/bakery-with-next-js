"use client";

import { Category } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CategorySliceProps {
  isLoading: boolean;
  categories: Category[];
  error: boolean;
}

const initialState: CategorySliceProps = {
  isLoading: false,
  categories: [],
  error: false,
};

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const data = await fetch("http://localhost:3000/api/find/category").then(
    (res) => res.json(),
  );
  return data;
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default categorySlice.reducer;
