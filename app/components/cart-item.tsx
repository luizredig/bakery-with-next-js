import { useDispatch } from "react-redux";
import {
  addProductToCart,
  incrementProductQuantity,
  decrementProductQuantity,
  removeProductFromCart,
} from "@/app/redux/cartSlice";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Product } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";

export interface ICartItem extends Product {
  quantity: number;
}

interface CartItemProps {
  product: ICartItem;
}

const CartProduct = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProductToCart(product));
  };

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
          <div className="flex w-full flex-row items-center justify-start gap-4">
            <Skeleton className="min-h-8 min-w-8 xs:h-8 xs:w-8 sm:h-16 sm:w-16  " />

            <p className="overflow-hidden text-ellipsis text-nowrap">
              {product.name}
            </p>
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
