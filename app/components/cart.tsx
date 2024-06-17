"use client";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartProduct, { ICartItem } from "./cart-item";
import { Separator } from "./ui/separator";

import "@/app/css/scrollbar.css";

export interface ICart {
  items: ICartItem[];
  subtotalPrice: number;
  totalPrice: number;
}

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotalPrice = useSelector(
    (state: RootState) => state.cart.subtotalPrice,
  );
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-light">
              Subtotal:{" "}
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(subtotalPrice))}
            </p>

            <p className="text-lg font-semibold">
              Total:{" "}
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(totalPrice))}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Separator orientation="horizontal" className="max-w-[90%]" />
          </div>

          <div className="scrollbar flex flex-col gap-3 overflow-y-scroll border-none">
            {cartItems.map((product: ICartItem) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <p>No products have been added yet.</p>
      )}
    </>
  );
};

export default Cart;
