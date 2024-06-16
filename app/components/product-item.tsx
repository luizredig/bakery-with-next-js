"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

import { useDispatch } from "react-redux";
import { addProductToCart } from "@/app/redux/cartSlice";
import { ICartItem } from "./cart-item";

import { useToast } from "@/app/components/ui/use-toast";
import { format } from "date-fns";

interface ProductItemProps {
  product: ICartItem;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAddToCart = () => {
    try {
      dispatch(addProductToCart({ ...product, quantity: 1 }));
      toast({
        title: `${product.name} has been added to your cart.`,
        description: format(new Date(), "dd/MM/yy hh:mm"),
      });
    } catch (error) {
      toast({
        title: JSON.stringify(error),
        description: format(new Date(), "dd/MM/yy hh:mm"),
      });
    }
  };

  return (
    <>
      <Card className="w-48 min-w-48 max-w-48 select-none overflow-hidden rounded-2xl shadow-md">
        <CardContent className="relative p-0">
          <Button
            variant={"default"}
            size={"icon"}
            className="absolute bottom-3 right-3 flex cursor-pointer items-center justify-center rounded-full"
            onClick={handleAddToCart}
          >
            <div className="flex flex-row">
              <PlusIcon />
            </div>
          </Button>

          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="pointer-events-none h-full w-full object-contain"
          />

          <div className="flex flex-col gap-1 px-3 py-5">
            <p className="truncate font-semibold">{product.name}</p>

            <p className="text-lg font-bold">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(product.basePrice))}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductItem;
