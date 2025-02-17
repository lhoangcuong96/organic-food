"use client";

import { cartRequestApis } from "@/api-request/cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { routePath } from "@/constants/routes";

export default function OrderSummary() {
  const [deliveryCost, setDeliveryCost] = useState(0);
  const { data: cart } = useQuery({
    queryKey: ["order-summary"],
    queryFn: async () => {
      const res = await cartRequestApis.getCart();
      if (!res) {
        throw new Error("Lỗi khi lấy thông tin đơn hàng");
      }
      return res.payload?.data;
    },
    meta: {
      errorMessage: "Lỗi khi lấy thông tin đơn hàng",
    },
  });
  const items = cart?.items || [];
  const productCost = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  const totalCost = productCost + deliveryCost;
  return (
    <div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Đơn hàng ({items.length} sản phẩm)
        </h2>

        <div className="border-b pb-4 mb-4">
          {items.map((item) => (
            <div className="flex items-start gap-4" key={item.product.id}>
              <div className="relative w-20 h-20">
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {item.quantity}
                </div>
                <Image
                  src={item.product.image.thumbnail}
                  alt={item.product.name}
                  width={80}
                  height={60}
                  className="rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="mt-1">
                  {item.product.price.toLocaleString()}đ x {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Nhập mã giảm giá" />
            <Button variant="secondary">Áp dụng</Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{productCost.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>{deliveryCost.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Tổng cộng</span>
              <span>{(totalCost + deliveryCost).toLocaleString()}đ</span>
            </div>
          </div>

          <div className="space-y-4">
            <Link href={routePath.customer.orderConfirmation}>
              <Button className="w-full" size="lg">
                ĐẶT HÀNG
              </Button>
            </Link>

            <Link href={routePath.customer.cart}>
              <Button variant="outline" className="w-full" size="lg">
                Quay về giỏ hàng
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
