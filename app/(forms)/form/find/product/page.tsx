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

const formSchema = z.object({
  text: z.string({ required_error: "Search for products" }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

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

                    <FormControl>
                      <Input
                        placeholder="Search for products..."
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
