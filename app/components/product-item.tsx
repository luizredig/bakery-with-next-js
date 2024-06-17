"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowDown, PercentIcon, PlusIcon } from "lucide-react";

import { useDispatch } from "react-redux";
import {
  addProductToCart,
  calculateSubtotalPrice,
  calculateTotalPrice,
} from "@/app/redux/cartSlice";
import { ICartItem } from "./cart-item";

import { useToast } from "@/app/components/ui/use-toast";
import { format } from "date-fns";
import { Badge } from "./ui/badge";

interface ProductItemProps {
  product: ICartItem;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAddToCart = () => {
    try {
      dispatch(addProductToCart({ ...product, quantity: 1 }));
      dispatch(calculateSubtotalPrice());
      dispatch(calculateTotalPrice());
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
          {product.discountPercentage > 0 && (
            <Badge className="absolute left-2 top-2 flex flex-row gap-1">
              <ArrowDown size={16} />

              <div className="flex flex-row">
                <p>{product.discountPercentage}</p>

                <PercentIcon size={16} />
              </div>
            </Badge>
          )}

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

            {product.discountPercentage > 0 ? (
              <div className="flex flex-row items-center gap-1">
                <p className="truncate text-lg font-bold">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    Number(
                      product.basePrice *
                        (1 - product.discountPercentage / 100),
                    ),
                  )}
                </p>

                <p className="truncate text-sm text-muted-foreground line-through">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(product.basePrice))}
                </p>
              </div>
            ) : (
              <p className="truncate text-lg font-bold">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(product.basePrice))}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductItem;
