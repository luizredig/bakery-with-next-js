"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../components/cart";
import { ICartItem } from "../components/cart-item";

const initialState: ICart = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
      }
    },
    incrementProductQuantity(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        state.items[index].quantity += 1;
      }
    },
    decrementProductQuantity(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        }
      }
    },
    removeProductFromCart(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addProductToCart,
  incrementProductQuantity,
  decrementProductQuantity,
  removeProductFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
