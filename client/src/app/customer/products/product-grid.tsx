"use client";

import { ProductCard } from "@/components/customer/UI/card/product-card";
import { ProductListType } from "@/validation-schema/product";
import { Product } from "@prisma/client";

export default function ProductGrid({
  initialProducts,
}: {
  initialProducts: ProductListType;
}) {
  // const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {initialProducts.map((product) => {
        return (
          <ProductCard
            product={product as Partial<Product>}
            key={product.id}
          ></ProductCard>
        );
      })}
    </div>
  );
}
