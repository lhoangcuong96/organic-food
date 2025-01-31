import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    label: "Thịt heo",
    url: "/",
    children: [
      {
        label: "Ba chỉ",
        url: "/",
      },
      {
        label: "Sườn",
        url: "/",
      },
      {
        label: "Thịt xay",
        url: "/",
      },
      {
        label: "Thịt vai",
        url: "/",
      },
      {
        label: "Thịt nạc",
        url: "/",
      },
      {
        label: "Xương",
        url: "/",
      },
      {
        label: "Chân giò",
        url: "/",
      },
      {
        label: "Thịt heo khác",
        url: "/",
      },
    ],
  },
  {
    label: "Các loại thực phẩm chế biến từ thịt heo",
    url: "/",
    children: [
      {
        label: "Chả lụa",
        url: "/",
      },
      {
        label: "Xúc xích",
        url: "/",
      },
      {
        label: "Mộc",
        url: "/",
      },
      {
        label: "Chả chiên",
        url: "/",
      },
      {
        label: "Thịt xông khói",
        url: "/",
      },
    ],
  },
  {
    label: "Các loại thịt khác",
    url: "/",
    children: [
      {
        label: "Thịt gà",
        url: "/",
      },
      {
        label: "Thịt bò",
        url: "/",
      },
    ],
  },
];
export function ProductMenu() {
  return (
    <Card className="rounded-sm p-4">
      <div className="grid grid-cols-[auto_max-content] gap-2">
        <div className="grid grid-cols-3 gap-4">
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
