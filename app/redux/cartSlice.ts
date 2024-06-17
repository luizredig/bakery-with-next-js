"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../components/cart";
import { ICartItem } from "../components/cart-item";

const initialState: ICart = {
  items: [],
  subtotalPrice: 0,
  totalPrice: 0,
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
    calculateSubtotalPrice(state) {
      let subtotalPrice = 0;

      state.items.forEach((items) => {
        subtotalPrice += items.basePrice * items.quantity;
      });

      state.subtotalPrice = subtotalPrice;
    },
    calculateTotalPrice(state) {
      let totalPrice = 0;

      state.items.forEach((item) => {
        const desconto = item.basePrice * (item.discountPercentage / 100);
        const discountedPrice = item.basePrice - desconto;

        totalPrice += discountedPrice * item.quantity;
      });

      state.totalPrice = totalPrice;
    },
  },
});

export const {
  addProductToCart,
  incrementProductQuantity,
  decrementProductQuantity,
  removeProductFromCart,
  clearCart,
  calculateSubtotalPrice,
  calculateTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
