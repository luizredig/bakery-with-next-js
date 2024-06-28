import { Product } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, PencilIcon, PercentIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import ImageLoader from "./image-loader";
import { Badge } from "./ui/badge";

interface IEditableProductItemProps {
  product: Product;
  operation: "find" | "update" | "delete";
}

const EditableProductItem = ({
  product,
  operation,
}: IEditableProductItemProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdateProduct = async () => {
    router.push(`/form/update/product/${product.id}`);
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(`/api/delete/product/${product.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.status === 200) {
        toast({
          title: "Product has been deleted!",
          description: format(new Date(), "dd/MM/yy HH:mm"),
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };
  return (
    <>
      <Card className="w-48 min-w-48 max-w-48 select-none overflow-hidden rounded-2xl shadow-md">
        <CardContent className="relative p-0">
          {operation === "find" && product.discountPercentage > 0 && (
            <Badge className="absolute left-2 top-2 z-[1] flex flex-row gap-1">
              <ArrowDown size={16} />

              <div className="flex flex-row">
                <p>{product.discountPercentage}</p>

                <PercentIcon size={16} />
              </div>
            </Badge>
          )}

          <ImageLoader
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
          />

          <div className="flex flex-col gap-1 px-3 py-5">
            <p className="truncate font-semibold">{product.name}</p>

            {operation === "find" && (
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
            )}

            {operation === "update" && (
              <Button
                variant={"outline"}
                className="hover:bg-primary hover:text-white"
                onClick={handleUpdateProduct}
              >
                <PencilIcon />
              </Button>
            )}

            {operation === "delete" && (
              <Button
                variant={"outline"}
                className=" hover:bg-red-500 hover:text-white"
                onClick={handleDeleteProduct}
              >
                <TrashIcon />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EditableProductItem;
