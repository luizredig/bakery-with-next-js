import { Product } from "@prisma/client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <>
      <Card className="min-h-[250px] min-w-[170px] overflow-hidden xs:max-h-[250px] xs:max-w-[170px] lg:max-h-[355px] lg:min-h-[355px] lg:min-w-[255px] lg:max-w-[255px]">
        <CardHeader className="h-1/2 w-full p-0 lg:h-1/2">
          <Image
            src={"/cake.png"}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="h-full w-full"
          />
        </CardHeader>

        <CardContent className="flex flex-col justify-center gap-2 p-4 text-sm">
          <div className="flex flex-col gap-1">
            <p className="overflow-hidden text-ellipsis text-nowrap font-semibold lg:text-2xl">
              {product.name}
            </p>

            <p className="text-sm font-light lg:text-2xl">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(product.basePrice))}
            </p>
          </div>

          <Button>Ver mais...</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductItem;
