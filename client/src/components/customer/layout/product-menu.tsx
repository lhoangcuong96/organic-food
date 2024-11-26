import Image from "next/image";
import Link from "next/link";
import { Card } from "antd";

const CATEGORIES = [
  {
    label: "Rau quả",
    url: "/",
    children: [
      {
        label: "Rau Lá",
        url: "/",
      },
      {
        label: "Củ Quả",
        url: "/",
      },
      {
        label: "Nấm Các Loại",
        url: "/",
      },
    ],
  },
  {
    label: "Trái Cây",
    url: "/",
    children: [
      {
        label: "Cam, Bưởi",
        url: "/",
      },
      {
        label: "Xoài",
        url: "/",
      },
      {
        label: "Chuối",
        url: "/",
      },
      {
        label: "Nho",
        url: "/",
      },
      {
        label: "Dưa",
        url: "/",
      },
      {
        label: "Táo",
        url: "/",
      },
      {
        label: "Trái Cây Khác",
        url: "/",
      },
    ],
  },
  {
    label: "Đồ Khô",
    url: "/",
    children: [
      {
        label: "Gạo Các Loại",
        url: "/",
      },
      {
        label: "Bột Các Loại",
        url: "/",
      },
      {
        label: "Đồ Chay Các Loại",
        url: "/",
      },
      {
        label: "Rong Biển, Bánh Tráng, Đậu",
        url: "/",
      },
      {
        label: "Các Loại Đồ Khô Khác",
        url: "/",
      },
    ],
  },
  {
    label: "Nước Ép",
    url: "/",
    children: [
      {
        label: "Nước Ép Đóng Chai",
        url: "/",
      },
      {
        label: "Nước Ép Có Đường",
        url: "/",
      },
      {
        label: "Nước Ép Không Đường",
        url: "/",
      },
    ],
  },
  {
    label: "Salad",
    url: "/",
    children: [
      {
        label: "Cải Xoăn",
        url: "/",
      },
      {
        label: "Rau Xà Lách",
        url: "/",
      },
    ],
  },
  {
    label: "Thực Phẩm Organic Khác",
    url: "/",
    children: [
      {
        label: "Đồ Chay Các Loại",
        url: "/",
      },
    ],
  },
];
export function ProductMenu() {
  return (
    <Card className="rounded-sm">
      <div className="grid grid-cols-[auto_max-content] gap-2">
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map((parentCategory) => {
            return (
              <div key={parentCategory.label} className="flex flex-col">
                <Link
                  href={parentCategory.url}
                  className="text-green-600 font-semibold mb-2"
                >
                  {parentCategory.label}
                </Link>
                {parentCategory.children.map((child) => {
                  return (
                    <Link
                      href={child.url}
                      key={child.label}
                      className="text-gray-700 hover:text-green-600"
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Image
          alt="Product Image"
          src="/images/mega-1-image.webp"
          width={205}
          height={256}
        ></Image>
      </div>
    </Card>
  );
}
