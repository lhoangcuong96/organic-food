"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ProductCreateFormValues,
  productCreateFormSchema,
} from "@/validation-schema/product";
import BasicInfo from "./basic-info";
import { SuggestionsSidebar } from "./suggestions-sidebar";
import SaleInfo from "./sale-info";

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
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="sales">Thông tin bán hàng</TabsTrigger>
              {/* <TabsTrigger value="shipping">Vận chuyển</TabsTrigger>
              <TabsTrigger value="other">Thông tin khác</TabsTrigger> */}
            </TabsList>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="basic" className="space-y-6">
                <BasicInfo />
              </TabsContent>

              <TabsContent value="sales" className="space-y-6">
                <SaleInfo />
              </TabsContent>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Hủy
                </Button>
                <Button type="submit" variant="secondary">
                  Lưu & Ẩn
                </Button>
                <Button type="submit">Lưu & Hiển thị</Button>
              </div>
            </form>
          </Tabs>
        </div>
      </FormProvider>
    </div>
  );
}
