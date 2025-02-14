import AppBreadcrumb from "@/components/customer/layout/breadcrumb";
import { routePath } from "@/constants/routes";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Printer } from "lucide-react";
import Image from "next/image";
import PrintLayout from "./print-layout";
import Actions from "./actions";

export default function CartPage() {
  const orderDetails = {
    orderNumber: "1034",
    email: "tranghoang1992@gmail.com",
    customerName: "Hoàng Trang",
    customerPhone: "+84582134565",
    customerEmail: "tranghoang1992@gmail.com",
    shippingAddress: {
      name: "Hoàng Trang",
      address: "152",
      ward: "Phường Lê Lợi, Thị xã Sơn Tây, Hà Nội",
      phone: "+84582134565",
    },
    products: [
      {
        name: "Xả lách xoong Đà Lạt",
        quantity: 1,
        price: 4500,
        weight: "300g",
        image: "/placeholder.svg",
      },
    ],
    subtotal: 4500,
    shippingFee: 40000,
    total: 44500,
  };

  return (
    <>
      {" "}
      <div className="print:hidden flex flex-col w-full items-center justify-center h-full text-sm font-medium">
        <AppBreadcrumb
          pageTitle="Giỏ hàng"
          breadcrumbItems={[
            {
              title: "Trang chủ",
              href: routePath.customer.home,
            },
            {
              title: "Giỏ hàng",
            },
          ]}
        ></AppBreadcrumb>
        <div className="w-screen p-8 flex items-center justify-center h-full">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="bg-gray-50 py-8">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OV2j7FMwZuVkcX1fYuGz6DOUOh5l64.png"
                    alt="Dola Organic Logo"
                    width={200}
                    height={60}
                    className="mx-auto"
                  />
                </div>

                <div className="max-w-4xl mx-auto">
                  {/* Success Message */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h1 className="text-xl font-semibold">
                        Cảm ơn bạn đã đặt hàng
                      </h1>
                      <p className="text-gray-600">
                        Một email xác nhận đã được gửi tới
                        tranghoang1992@gmail.com.
                        <br />
                        Xin vui lòng kiểm tra email của bạn
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Order Details - Left Column */}
                    <div className="md:col-span-2">
                      <Card className="p-6">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Customer Information */}
                          <div>
                            <h2 className="font-semibold text-lg mb-4">
                              Thông tin mua hàng
                            </h2>
                            <div className="space-y-2 text-gray-600">
                              <p>Hoàng Trang</p>
                              <p>tranghoang1992@gmail.com</p>
                              <p>+84582134565</p>
                            </div>
                          </div>

                          {/* Shipping Address */}
                          <div>
                            <h2 className="font-semibold text-lg mb-4">
                              Địa chỉ nhận hàng
                            </h2>
                            <div className="space-y-2 text-gray-600">
                              <p>Hoàng Trang</p>
                              <p>152</p>
                              <p>Phường Lê Lợi, Thị xã Sơn Tây, Hà Nội</p>
                              <p>+84582134565</p>
                            </div>
                          </div>

                          {/* Payment Method */}
                          <div>
                            <h2 className="font-semibold text-lg mb-4">
                              Phương thức thanh toán
                            </h2>
                            <p className="text-gray-600">
                              Thanh toán khi giao hàng (COD)
                            </p>
                          </div>

                          {/* Shipping Method */}
                          <div>
                            <h2 className="font-semibold text-lg mb-4">
                              Phương thức vận chuyển
                            </h2>
                            <p className="text-gray-600">Giao hàng tận nơi</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Order Summary - Right Column */}
                    <div>
                      <Card className="p-6">
                        <h2 className="font-semibold text-lg mb-4">
                          Đơn hàng #1034 (1)
                        </h2>

                        <div className="border-b pb-4 mb-4">
                          <div className="flex items-start gap-4">
                            <div className="relative w-20 h-20">
                              <div className="absolute -top-2 -right-2 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                1
                              </div>
                              <Image
                                src="/placeholder.svg"
                                alt="Xả lách xoong Đà Lạt"
                                width={80}
                                height={80}
                                className="rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">
                                Xả lách xoong Đà Lạt
                              </h3>
                              <p className="text-sm text-gray-500">300g</p>
                              <p className="mt-1">4.500₫</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tạm tính</span>
                            <span>4.500₫</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Phí vận chuyển
                            </span>
                            <span>40.000₫</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-2 border-t">
                            <span>Tổng cộng</span>
                            <span className="text-blue-600">44.500₫</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 mt-8">
                    <Actions></Actions>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrintLayout orderDetails={orderDetails} />
    </>
  );
}
