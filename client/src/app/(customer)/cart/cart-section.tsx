"use client";

import { Calendar, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition, useOptimistic } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

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
import { cartRequestApis } from "@/api-request/cart";
import { useHandleMessage } from "@/hooks/use-hande-message";
import type { CartType } from "@/validation-schema/cart";
import { routePath } from "@/constants/routes";
import Link from "next/link";

export default function CartSection() {
  const [cart, setCart] = useState<CartType | null>(null);
  const [optimisticCart, addOptimisticCart] = useOptimistic(cart);
  const [isPending, startTransition] = useTransition();

  const { messageApi } = useHandleMessage();

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const resp = await cartRequestApis.getCart();
      if (resp.payload?.data) {
        return resp.payload.data;
      } else {
        throw new Error("Lỗi lấy thông tin giỏ hàng");
      }
    },
    retry: 1,
    meta: {
      errorMessage: "Lỗi lấy thông tin giỏ hàng",
    },
  });

  const updateCartItemQuantity = async ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => {
    if (!cart) return;

    startTransition(() => {
      addOptimisticCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        };
      });
    });

    try {
      await cartRequestApis.updateCartItemQuantity({ productId, quantity });
      // Update the actual cart state after successful API call
      setCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        };
      });
      messageApi.success({
        description: "Cập nhật số lượng sản phẩm thành công",
      });
    } catch (error) {
      console.error(error);
      messageApi.error({
        error: "Lỗi cập nhật số lượng sản phẩm",
      });
      // The optimistic state will be automatically reverted by React
    }
  };

  const updateCartItemQuantityMutation = useMutation({
    mutationKey: ["updateCartQuantity"],
    mutationFn: updateCartItemQuantity,
  });

  const removeProductFromCart = async (productId: string) => {
    if (!cart) return;

    startTransition(() => {
      addOptimisticCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.filter((item) => item.product.id !== productId),
        };
      });
    });

    try {
      await cartRequestApis.removeProductFromCart(productId);
      // Update the actual cart state after successful API call
      setCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.filter((item) => item.product.id !== productId),
        };
      });
      messageApi.success({
        description: "Xóa sản phẩm khỏi giỏ hàng thành công",
      });
    } catch (error) {
      console.error(error);
      messageApi.error({
        error: "Lỗi xóa sản phẩm khỏi giỏ hàng",
      });
      // The optimistic state will be automatically reverted by React
    }
  };

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  const total =
    optimisticCart?.items.reduce(
      (accumulator, item) => accumulator + item.product.price * item.quantity,
      0
    ) || 0;

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
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <p className="text-center leading-10">Loading...</p>
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              optimisticCart &&
              optimisticCart.items.length > 0 &&
              optimisticCart.items.map((item) => (
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
                                  removeProductFromCart(item.product.id)
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
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          updateCartItemQuantityMutation.mutate({
                            productId: item.product.id,
                            quantity: Math.max(1, item.quantity - 1),
                          });
                        }}
                        disabled={isPending}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartItemQuantityMutation.mutate({
                            productId: item.product.id,
                            quantity: Math.max(1, Number(e.target.value)),
                          })
                        }
                        className="w-16 h-8 text-center"
                        disabled={isPending}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateCartItemQuantityMutation.mutate({
                            productId: item.product.id,
                            quantity: item.quantity + 1,
                          })
                        }
                        disabled={isPending}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {(item.product.price * item.quantity).toLocaleString()}đ
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              (!optimisticCart || optimisticCart.items.length === 0) && (
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
