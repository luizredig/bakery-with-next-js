"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { Category, Product } from "@prisma/client";
import { Button } from "@/app/components/ui/button";
import { SearchIcon } from "lucide-react";
import EditableProductItem from "@/app/components/editable-product-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchCategories } from "@/app/redux/categorySlice";
import { Slider } from "@/app/components/ui/slider";

const formSchema = z.object({
  text: z.string({ required_error: "Insert a text to search." }),
  basePrice: z.string().optional(),
  categoryId: z.string().optional(),
  discountPercentage: z.string().optional(),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basePrice: "50",
      discountPercentage: "0",
    },
  });

  const budget = form.watch("basePrice");
  const discountPercentage = form.watch("discountPercentage");

  const [hasUserMadeASearch, setHasUserMadeASearch] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const { text, basePrice, categoryId, discountPercentage } = data;

    try {
      const response = await fetch(
        `/api/search/product?text=${text}&category=${categoryId}&budget=${basePrice}&discount=${discountPercentage}`,
        {
          method: "GET",
        },
      );

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

  const dispatch = useDispatch<AppDispatch>();

  // Async categories fetch
  const categories = useSelector(
    (state: RootState) => state.category.categories,
  );

  const [categoriesState, setCategoriesState] = useState<Category[]>([]);

  useEffect(() => {
    setCategoriesState(categories);
  }, [categories]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
              <div className="flex w-full flex-row gap-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
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

                {/* Category */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Category</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category..." />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {categoriesState.length > 0 &&
                            categoriesState.map((category: Category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full flex-row gap-4">
                {/* Base price */}
                <FormField
                  control={form.control}
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Max budget</FormLabel>

                      <FormControl>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-center">
                            <p className="font-semibold">
                              {Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(Number(budget))}
                            </p>
                          </div>

                          <Slider
                            defaultValue={[50]}
                            max={100}
                            step={1}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Discount percentage */}
                <FormField
                  control={form.control}
                  name="discountPercentage"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Min discount percentage</FormLabel>

                      <FormControl>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-center">
                            <p className="font-semibold">{`${discountPercentage}%`}</p>
                          </div>

                          <Slider
                            defaultValue={[0]}
                            max={100}
                            step={10}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6 flex w-full justify-end">
                <Button className="flex max-w-32 flex-row gap-1" type="submit">
                  <SearchIcon />

                  <p className="hidden sm:flex">Search</p>
                </Button>
              </div>
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
                No results found. Try another search.
              </p>
            )
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
