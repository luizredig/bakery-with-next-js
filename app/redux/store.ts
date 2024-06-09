"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    category: categorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
