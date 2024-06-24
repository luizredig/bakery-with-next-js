"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Product } from "@prisma/client";
import { Button } from "@/app/components/ui/button";
import { SearchIcon } from "lucide-react";
import EditableProductItem from "@/app/components/editable-product-item";

const formSchema = z.object({
  text: z.string({ required_error: "Insert a text to search" }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [hasUserMadeASearch, setHasUserMadeASearch] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const { text } = data;

    try {
      const response = await fetch(`/api/find/product/${text}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setFilteredProducts(result.products);
      setHasUserMadeASearch(true);
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  return (
    <>
      <Card className="mx-5 my-5 sm:mx-20 lg:mx-40">
        <CardHeader>
          <CardTitle>Deleting product</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <div className="flex flex-row gap-4">
                      <FormControl>
                        <Input
                          placeholder="Search for products..."
                          onChange={field.onChange}
                          defaultValue={field.value}
                        />
                      </FormControl>

                      <Button className="flex flex-row gap-1" type="submit">
                        <SearchIcon />

                        <p>Search</p>
                      </Button>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {filteredProducts.length > 0 ? (
            <>
              <h1 className="mt-5 text-2xl font-semibold">Results</h1>

              <div className="scrollbar mt-5 flex flex-row gap-5 overflow-x-auto p-1">
                {filteredProducts.map((product) => (
                  <EditableProductItem
                    key={product.id}
                    product={product}
                    operation="delete"
                  />
                ))}
              </div>
            </>
          ) : (
            hasUserMadeASearch && <p className="mt-5">No results was found.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
