import { useDispatch } from "react-redux";
import {
  incrementProductQuantity,
  decrementProductQuantity,
  removeProductFromCart,
} from "@/app/redux/cartSlice";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Product } from "@prisma/client";
import Image from "next/image";

export interface ICartItem extends Product {
  quantity: number;
}

interface CartItemProps {
  product: ICartItem;
}

const CartProduct = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleIncrementProductQuantity = () => {
    dispatch(incrementProductQuantity(product.id));
  };

  const handleDecrementProductQuantity = () => {
    dispatch(decrementProductQuantity(product.id));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(product.id));
  };

  return (
    <>
      <Card className="relative">
        <Button
          className="absolute right-1 top-1 hover:bg-red-500 hover:text-white"
          size={"sm"}
          variant={"outline"}
          onClick={handleRemoveFromCart}
        >
          <TrashIcon size={16} />
        </Button>

        <CardContent className="flex flex-col items-center justify-between gap-4 p-5">
          <div className="flex w-full flex-row items-center justify-start gap-4 pt-4">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              width={0}
              height={0}
              sizes="100vw"
              className="min-h-8 min-w-8 rounded-lg xs:h-8 xs:w-8 sm:h-16 sm:w-16"
            />

            <div className="flex flex-col gap-1">
              <p className="truncate font-semibold">{product.name}</p>

              <p className="text-lg font-bold">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(product.basePrice * product.quantity))}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4">
            <Button
              onClick={handleDecrementProductQuantity}
              size={"icon"}
              className="h-8 w-8"
            >
              <MinusIcon size={16} />
            </Button>

            <span className="font-semibold">{product.quantity}</span>

            <Button
              onClick={handleIncrementProductQuantity}
              size={"icon"}
              className="h-8 w-8"
            >
              <PlusIcon size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CartProduct;
