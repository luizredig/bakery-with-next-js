"use client";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartProduct, { ICartItem } from "./cart-item";
import { Separator } from "./ui/separator";

import "@/app/css/scrollbar.css";

export interface ICart {
  items: ICartItem[];
}

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-light">Subtotal:</p>

            <p className="text-lg font-semibold">Total:</p>
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
