"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  ProductCreateFormValues,
  productCreateFormSchema,
} from "@/validation-schema/product";
import BasicInfo from "./basic-info";
import SaleInfo from "./sale-info";
import { SuggestionsSidebar } from "./suggestions-sidebar";

export function ProductForm() {
  const form = useForm<ProductCreateFormValues>({
    resolver: zodResolver(productCreateFormSchema),
    defaultValues: {
      productImages: undefined,
      coverImage: undefined,
      video: undefined,
      name: "",
      category: [],
      description: "",
      price: "",
      stock: "",
      sku: "",
    },
    mode: "all",
  });

  const onSubmit = async (data: ProductCreateFormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="flex">
      <FormProvider {...form}>
        <SuggestionsSidebar />
        <div className="flex-1 p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfo />
            <SaleInfo />
            <div className="flex justify-end gap-4 py-7 px-3 sticky bottom-0 bg-white shadow-xl">
              <Button type="button" variant="outline">
                Hủy
              </Button>
              <Button type="submit" variant="secondary">
                Lưu & Ẩn
              </Button>
              <Button type="submit">Lưu & Hiển thị</Button>
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
