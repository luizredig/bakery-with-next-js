"use client";

import { createSlice } from "@reduxjs/toolkit";
import { ICart } from "../components/cart";

const initialState: ICart[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
