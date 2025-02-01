"use client";

import { ProductCarousel } from "@/components/customer/UI/carousel/product-carousel";
import { Product } from "@prisma/client";

export function PromotionalProducts({
  products,
  error,
}: {
  products: Partial<Product>[];
  error?: string;
}) {
  return (
    <ProductCarousel
      products={products}
      error={error}
      title="Khuyến mãi hấp dẫn"
      subtitle="Chương trình khuyến mãi hấp dẫn đang chờ đợi bạn"
    ></ProductCarousel>
  );
}
