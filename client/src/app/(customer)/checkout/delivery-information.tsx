"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/provider/app-provider";

export default function DeliveryInformation() {
  const { account } = useAppContext();
  const { shippingAddress } = account;
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Customer Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Thông tin nhận hàng</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              defaultValue={account?.email}
            />
          </div>
          <div>
            <Label htmlFor="name">Họ và tên</Label>
            <Input
              id="name"
              placeholder="Họ và tên"
              defaultValue={account?.fullname}
            />
          </div>
          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <div className="flex">
              <Select defaultValue="+84">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="+84" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+84">+84</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="phone"
                placeholder="Số điện thoại"
                className="flex-1 ml-2"
                defaultValue={account?.phoneNumber || ""}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Địa chỉ</Label>
            <Input id="address" placeholder="Địa chỉ" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="province">Tỉnh thành</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tỉnh thành" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hanoi">Hà Nội</SelectItem>
                  <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="district">Quận huyện</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quận huyện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="district1">Quận 1</SelectItem>
                  <SelectItem value="district2">Quận 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ward">Phường xã</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phường xã" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ward1">Phường 1</SelectItem>
                  <SelectItem value="ward2">Phường 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="!m-0 flex justify-end">
            <Button variant="link" className="p-0 text-lime-600 underline">
              Lưu địa chỉ
            </Button>
          </div>
          <div>
            <Label htmlFor="note">Ghi chú</Label>
            <Input id="note" placeholder="Ghi chú" />
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Vận chuyển</h2>
        <div className="bg-blue-50 p-4 rounded-md text-sm">
          Vui lòng nhập thông tin giao hàng
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Thanh toán</h2>
        <RadioGroup defaultValue="cod">
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod">Thanh toán khi giao hàng (COD)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
