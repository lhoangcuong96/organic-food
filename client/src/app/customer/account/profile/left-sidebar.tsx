"use client";

import { useState } from "react";
import {
  Home,
  User,
  ShoppingBag,
  Bell,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileDataType } from "@/validation-schema/account";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  subItems?: { label: string; active?: boolean }[];
};

const menuItems: MenuItem[] = [
  { icon: Home, label: "Trang chủ" },
  {
    icon: User,
    label: "Tài khoản của tôi",
    active: true,
    subItems: [
      { label: "Hồ sơ", active: true },
      { label: "Ngân hàng" },
      { label: "Địa chỉ" },
      { label: "Đổi mật khẩu" },
    ],
  },
  { icon: ShoppingBag, label: "Đơn mua" },
  { icon: Bell, label: "Thông báo" },
  { icon: CreditCard, label: "Kho voucher" },
];

export function LeftSidebar({ profile }: { profile: ProfileDataType }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(
    "Tài khoản của tôi"
  );

  return (
    <div className="w-72 bg-transparent p-4 border-gray-200 text-sm font-semibold">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold">
          C
        </div>
        <div>
          <p className="font-semibold">{profile.fullname}</p>
          <p className="text-sm text-gray-500">Sửa hồ sơ</p>
        </div>
      </div>
      <nav>
        {menuItems.map((item, index) => (
          <div key={index}>
            <a
              href="#"
              className={cn(
                "flex items-center justify-between px-4 py-2 rounded-lg mb-1 text-gray-700 hover:text-lime-600",
                item.active && "text-lime-600"
              )}
              onClick={() =>
                setExpandedItem(expandedItem === item.label ? null : item.label)
              }
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.subItems &&
                (expandedItem === item.label ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                ))}
            </a>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-out",
                expandedItem === item.label
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              )}
            >
              {item.subItems && expandedItem === item.label && (
                <div className="ml-9 mb-2 ">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className={cn(
                        "block px-4 py-2 rounded-lg mb-1 text-sm text-gray-600 hover:text-lime-600",
                        subItem.active && "text-lime-600"
                      )}
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
