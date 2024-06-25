import { Product } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { PenIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

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
          description: format(new Date(), "dd/MM/yy hh:mm"),
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
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="pointer-events-none h-full min-h-[190px] w-full object-cover"
          />

          <div className="flex flex-col gap-1 px-3 py-5">
            <p className="truncate font-semibold">{product.name}</p>

            {operation === "update" && (
              <Button
                variant={"outline"}
                className="hover:bg-primary hover:text-white"
                onClick={handleUpdateProduct}
              >
                <PenIcon />
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
