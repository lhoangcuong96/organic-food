import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductListType } from "@/validation-schema/admin/product";

export function ProductTable({ products }: { products: ProductListType }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox />
          </TableHead>
          <TableHead>Tên sản phẩm</TableHead>
          <TableHead>Doanh số</TableHead>
          <TableHead>Giá</TableHead>
          <TableHead>Kho hàng</TableHead>
          <TableHead>Chất Lượng Nội Dung</TableHead>
          <TableHead>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Image
                  src={product.image.thumbnail || ""}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <p>{product.name}</p>
                {/* <div>
                  <div>{product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    SKU: {product.sku}
                  </div>
                </div> */}
              </div>
            </TableCell>
            <TableCell>10</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              {product.stock ? (
                product.stock
              ) : (
                <Button variant="link" className="text-lime-600">
                  Cập nhật
                </Button>
              )}
            </TableCell>
            <TableCell>
              <Button variant="link" className="text-lime-600">
                Xem thêm
              </Button>
            </TableCell>
            <TableCell className="flex flex-col gap-2">
              <Button variant="link" className="text-lime-600">
                Cập nhật
              </Button>
              {product.isDraft ? (
                <Button variant="link" className="text-lime-600">
                  Đẩy sản phẩm
                </Button>
              ) : (
                <Button variant="link" className="text-lime-600">
                  Ẩn sản phẩm
                </Button>
              )}

              <Button variant="link" className="text-lime-600">
                Xem trước
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
