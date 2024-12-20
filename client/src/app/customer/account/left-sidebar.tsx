"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { routePath } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/provider/app-provider";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Home,
  ShoppingBag,
} from "lucide-react";
import { RiEdit2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Link } from "@/components/ui/link";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  url: string;
  key: string;
  subItems?: { label: string; url: string; key: string }[];
};

const menuItems: MenuItem[] = [
  { icon: Home, label: "Trang chủ", url: routePath.customer.home, key: "home" },
  {
    icon: User,
    label: "Tài khoản của tôi",
    url: "",
    key: "account",
    subItems: [
      {
        label: "Hồ sơ",
        url: routePath.customer.account.profile,
        key: "profile",
      },
      { label: "Ngân hàng", url: routePath.customer.account.bank, key: "bank" },
      {
        label: "Địa chỉ",
        url: routePath.customer.account.address,
        key: "address",
      },
      {
        label: "Đổi mật khẩu",
        url: routePath.customer.account.changePassword,
        key: "change-password",
      },
      {
        label: "Đổi email",
        url: routePath.customer.account.changeEmail,
        key: "change-email",
      },
      {
        label: "Đổi số điện thoại",
        url: routePath.customer.account.changePhoneNumber,
        key: "change-phone-number",
      },
    ],
  },
  {
    icon: ShoppingBag,
    label: "Đơn mua",
    url: routePath.customer.account.orders,
    key: "orders",
  },
  {
    icon: Bell,
    label: "Thông báo",
    url: routePath.customer.account.notifications,
    key: "notifications",
  },
  {
    icon: CreditCard,
    label: "Kho voucher",
    url: routePath.customer.account.vouchers,
    key: "vouchers",
  },
];

export function LeftSidebar() {
  const { account } = useAppContext();
  const router = useRouter();
  const [expandedItem, setExpandedItem] = useState<string | null>(
    menuItems.find((item) => location.pathname.includes(item.key))?.label ||
      null
  );

  useEffect(() => {
    setExpandedItem(
      menuItems.find((item) => location.pathname.includes(item.key))?.label ||
        null
    );
  }, [router]);

  return (
    <div className="w-72 bg-transparent p-4 border-gray-200 text-sm font-semibold">
      <div className="grid grid-cols-[max-content_auto] items-center space-x-3 mb-8">
        <Avatar className="w-12 h-12 relative ">
          {account?.avatar ? (
            <AvatarImage src={account.avatar} className="object-cover" />
          ) : (
            <AvatarFallback className="bg-gray-100">
              <User className="w-6 h-6" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="w-[calc(100%_-_3rem)]">
          <p className="font-semibold text-ellipsis overflow-hidden">
            {account?.fullname}
          </p>
          <Link
            href={routePath.customer.account.profile}
            className="!text-gray-500 no-underline !hover:text-gray-500 flex flex-row items-center gap-1"
          >
            <RiEdit2Line />
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <nav>
        {menuItems.map((item, index) => {
          const isParentActive = window.location.pathname.includes(item.key);
          return (
            <div key={index}>
              <div
                className={cn(
                  "!text-gray-700 no-underline cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg mb-1 hover:text-lime-600",
                  isParentActive && "!text-lime-600"
                )}
                onClick={() => {
                  if (item.url) {
                    router.push(item.url);
                  } else {
                    setExpandedItem(
                      expandedItem === item.label ? null : item.label
                    );
                  }
                }}
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
              </div>
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
                    {item.subItems.map((subItem, subIndex) => {
                      const isChildActive = window.location.pathname.includes(
                        subItem.key
                      );
                      return (
                        <a
                          key={subIndex}
                          href={subItem.url}
                          className={cn(
                            "block px-4 py-2 rounded-lg mb-1 text-sm text-gray-600 hover:text-lime-600",
                            isChildActive && "text-lime-600"
                          )}
                        >
                          {subItem.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
