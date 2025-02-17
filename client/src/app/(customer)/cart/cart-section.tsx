"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import QuantitySelector from "@/components/ui/quantity-selector";
import { routePath } from "@/constants/routes";
import useCart from "@/hooks/modules/use-cart";
import Link from "next/link";
import { useEffect } from "react";

export default function CartSection() {
  const {
    total,
    cart,
    isLoadingCart,
    handleGetCart,
    handleRemoveProductFromCart,
    handleUpdateCartItemQuantity,
  } = useCart();

  useEffect(() => {
    handleGetCart();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">
                Thông tin sản phẩm
              </TableHead>
              <TableHead className="font-semibold">Đơn giá</TableHead>
              <TableHead className="font-semibold w-32">Số lượng</TableHead>
              <TableHead className="font-semibold text-right">
                Thành tiền
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingCart && (
              <TableRow>
                <TableCell colSpan={4}>
                  <p className="text-center leading-10">
                    Đang tải dữ liệu giỏ hàng ...
                  </p>
                </TableCell>
              </TableRow>
            )}
            {!isLoadingCart &&
              cart &&
              cart.items.length > 0 &&
              cart.items.map((item) => (
                <TableRow key={item.product.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.product.image.thumbnail || "/placeholder.svg"}
                        alt={item.product.name}
                        width={80}
                        height={60}
                        className="rounded-lg"
                      />
                      <div>
                        <div className="font-medium">{item.product.name}</div>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button
                              variant="link"
                              className="p-0 text-lime-600 underline"
                            >
                              Xóa
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Xác nhận xóa sản phẩm
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ
                                hàng không?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Huỷ</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleRemoveProductFromCart(item.product.id)
                                }
                              >
                                Tiếp tục
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.product.price.toLocaleString()}đ</TableCell>
                  <TableCell>
                    <QuantitySelector
                      id={item.product.id}
                      quantity={item.quantity}
                      onUpdateQuantity={(id: string, quantity: number) => {
                        handleUpdateCartItemQuantity({
                          productId: id,
                          quantity,
                        });
                      }}
                    ></QuantitySelector>
                  </TableCell>
                  <TableCell className="text-right">
                    {(item.product.price * item.quantity).toLocaleString()}đ
                  </TableCell>
                </TableRow>
              ))}
            {!isLoadingCart && (!cart || cart.items.length === 0) && (
              <TableRow>
                <TableCell colSpan={4}>
                  <p className="text-center leading-10">Giỏ hàng trống</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end mt-4">
          <div className="text-base font-semibold">
            Tổng tiền: {total.toLocaleString()}đ
          </div>
        </div>
      </div>

      <div>
        <div className="border rounded-lg p-4 bg-lime-50">
          <h3 className="font-medium mb-4">Thời gian giao hàng</h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Input type="date" className="pl-10" />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Buổi sáng</SelectItem>
                  <SelectItem value="afternoon">Buổi chiều</SelectItem>
                  <SelectItem value="evening">Buổi tối</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="invoice" />
              <label
                htmlFor="invoice"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Xuất hóa đơn công ty
              </label>
            </div>
          </div>
        </div>

        <Link href={routePath.customer.checkout}>
          <Button className="w-full mt-4 bg-lime-600 ">Thanh toán</Button>
        </Link>
      </div>
    </div>
  );
}
