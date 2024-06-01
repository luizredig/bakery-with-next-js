"use client";

import { Product } from "@prisma/client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export interface ICartProduct extends Product {
  quantity: number;
}

export interface ICart {
  items: ICartProduct[] | [];
}

const Cart = () => {
  const cart = useSelector((store: RootState) => store.cart);

  return <></>;
};

export default Cart;
