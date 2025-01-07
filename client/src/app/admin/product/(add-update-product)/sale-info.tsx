"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function SaleInfo() {
  const form = useFormContext();
  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="mb-4 text-lg font-medium">Thông tin bán hàng</h2>

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Giá bán <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="Nhập giá bán" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Số lượng <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="Nhập số lượng" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sku"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mã SKU</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nhập mã SKU" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
