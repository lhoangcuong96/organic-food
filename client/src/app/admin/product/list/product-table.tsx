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

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: string;
  status: string;
  image: string;
}

export function ProductTable({ products }: { products: Product[] }) {
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
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <div>
                  <div>{product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    SKU: {product.sku}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <Button variant="link" className="text-blue-500">
                Cập nhật
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="link">Xem thêm</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
