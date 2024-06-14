"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import Loading from "@/app/loading";

import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchCategories } from "@/app/redux/categorySlice";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { ToastAction } from "@/app/components/ui/toast";
import { useToast } from "@/app/components/ui/use-toast";
import { format } from "date-fns";

const formSchema = z.object({
  basePrice: z.preprocess(
    (value) => {
      if (typeof value === "string") {
        value = value.replace(",", ".");
      }
      const parsed = parseFloat(value as string);
      return isNaN(parsed) ? undefined : parsed;
    },
    z
      .number({ required_error: "Base price is required." })
      .positive()
      .transform((value) => parseFloat(value.toFixed(2))),
  ),
  categoryId: z.string({
    required_error: "Category is required.",
  }),
  discountPercentage: z
    .preprocess((value) => {
      if (typeof value === "string") {
        value = value.replace(",", ".");
      }
      const parsed = parseFloat(value as string);
      return isNaN(parsed) ? undefined : parsed;
    }, z.number().nonnegative().optional())
    .optional(),
  hasDiscountPercentage: z.boolean().optional(),
  name: z.string({ required_error: "Name is required." }),
});

const Page = () => {
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discountPercentage: 0,
      hasDiscountPercentage: false,
    },
  });

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const json = JSON.stringify(data);

    try {
      setIsSubmitLoading(true);

      const response = await fetch("/api/create/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();

      if (result.status === 200) {
        toast({
          title: "Product has been created",
          description: format(new Date(), "dd/MM/yy hh:mm"),
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: JSON.stringify(error),
        description: format(new Date(), "dd/MM/yy hh:mm"),
      });
    } finally {
      setIsSubmitLoading(false);
      router.refresh();
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

  const hasDiscountPercentage = form.watch("hasDiscountPercentage");

  return (
    <>
      {isSubmitLoading ? (
        <Loading />
      ) : (
        <Card className="mx-5 my-5 sm:mx-20 lg:mx-40">
          <CardHeader>
            <CardTitle>Creating product</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-2"
              >
                {/* Category */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>

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

                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter the product name"
                          onChange={field.onChange}
                          defaultValue={field.value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Base price */}
                <FormField
                  control={form.control}
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base price</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter the product base product"
                          onChange={field.onChange}
                          defaultValue={field.value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Checkbox discount percentage */}
                <FormField
                  control={form.control}
                  name="hasDiscountPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center gap-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>

                        <FormLabel>
                          Has this product a discount percentage ?
                        </FormLabel>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Discount percentage */}
                {hasDiscountPercentage && (
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount percentage</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="%"
                            onChange={field.onChange}
                            defaultValue={field.value}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Button type="submit">Enviar</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Page;
