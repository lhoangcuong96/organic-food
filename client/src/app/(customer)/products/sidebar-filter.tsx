import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export function SidebarFilter() {
  const categories = [
    "Cam, bưởi",
    "Xoài",
    "Chuối",
    "Nho",
    "Dưa",
    "Táo",
    "Trái cây khác",
  ];
  const priceRanges = [
    "Dưới 10.000đ",
    "Từ 10.000đ - 50.000đ",
    "Từ 50.000đ - 100.000đ",
    "Từ 100.000đ - 200.000đ",
    "Từ 200.000đ - 300.000đ",
    "Từ 300.000đ - 500.000đ",
    "Từ 500.000đ - 1 triệu",
  ];
  const weights = ["90g", "100g", "107g", "120g", "200g"];

  return (
    <div className="space-y-8">
      <div className="bg-lime-100 px-3 py-2 rounded-md">
        <div className="text-lg font-semibold mb-4 rounded flex flex-row gap-2 items-center justify-between">
          <h2 className="text-lime-600">Danh mục sản phẩm</h2>
          <Image
            src="/images/icons/leaf.webp"
            alt="icon"
            width={25}
            height={25}
          ></Image>
        </div>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              className="text-sm hover:text-green-600 cursor-pointer"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-lime-600 p-4 border-dashed border-2 border-lime-600">
        Bộ lọc sản phẩm
      </h2>
      <div className="bg-lime-100 px-3 py-2 rounded-md">
        <div className="text-lg font-semibold mb-4 rounded flex flex-row gap-2 items-center justify-between">
          <h3 className="text-lime-600">Chọn mức giá</h3>
        </div>
        {priceRanges.map((range) => (
          <div key={range} className="flex items-center space-x-2 mb-2">
            <Checkbox id={range} />
            <label htmlFor={range} className="text-sm">
              {range}
            </label>
          </div>
        ))}
      </div>
      <div className="bg-lime-100 px-3 py-2 rounded-md">
        <div className="text-lg font-semibold mb-4 rounded flex flex-row gap-2 items-center justify-between">
          <h3 className="text-lime-600">Trọng lượng</h3>
        </div>
        {weights.map((weight) => (
          <div key={weight} className="flex items-center space-x-2 mb-2">
            <Checkbox id={weight} />
            <label htmlFor={weight} className="text-sm">
              {weight}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
