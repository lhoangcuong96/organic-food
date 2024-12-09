import { Card } from "@/components/customer/UI/card/index";
import { routePath } from "@/constants/routes";
import { formatCurrency } from "@/helper";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { AppProgress } from "../progress";

export function ProductCard({ product }: { product: Partial<Product> }) {
  return (
    <Link
      href={`${routePath.customer.productDetail}/${product.slug}`}
      className="w-56 p-3 flex flex-col rounded-lg relative m-1 gap-1"
    >
      <Card className="w-56 p-3 flex flex-col rounded-lg relative m-1 gap-1">
        <div className="absolute -left-[1px] -top-[1px] bg-red-500 text-white px-3 py-1 text-sm rounded-br-lg rounded-tl-lg z-50">
          <p>Giảm 11%</p>
        </div>
        <Image
          src={product?.image?.thumbnail || ""}
          alt={product.description || ""}
          height={234}
          width={234}
          className="m-auto"
        ></Image>

        <h3
          className="font-semibold hover:text-lime-600 h-12"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h3>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-lime-600 font-semibold">
            {formatCurrency(product.price || 0)}
          </p>
          <p className="line-through text-xs">
            {formatCurrency(product.price || 0)}
          </p>
        </div>
        <AppProgress />
        <p className="font-semibold text-sm">Đã bán: 136</p>
      </Card>
    </Link>
  );
}
