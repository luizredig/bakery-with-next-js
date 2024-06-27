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
  const [searchedText, setSearchedText] = useState("");

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const { text } = data;
    setSearchedText(text);

    try {
      const response = await fetch(`/api/search/product/${text}`, {
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
          <CardTitle>Finding product</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2 p-6 pt-0"
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

                        <p className="hidden sm:flex">Search</p>
                      </Button>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {filteredProducts.length > 0 ? (
            <div className="flex h-full w-full flex-col">
              <h1 className="mt-5 px-6 text-2xl font-semibold">Results</h1>

              <div className="scrollbar flex flex-row gap-5 overflow-x-auto px-6 py-5">
                {filteredProducts.map((product) => (
                  <EditableProductItem
                    key={product.id}
                    product={product}
                    operation="find"
                  />
                ))}
              </div>
            </div>
          ) : (
            hasUserMadeASearch && (
              <p className="mt-5 p-6 pt-0">
                No results found for{" "}
                <span className="italic">"{searchedText}".</span>
              </p>
            )
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
