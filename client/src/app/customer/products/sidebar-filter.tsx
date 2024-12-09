import { Checkbox } from "@/components/ui/checkbox";

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
      <div>
        <h2 className="text-lg font-semibold mb-4 bg-green-50 p-2 rounded">
          Danh mục sản phẩm 🍃
        </h2>
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

      <div>
        <h2 className="text-lg font-semibold mb-4">Bộ lọc sản phẩm</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Chọn mức giá</h3>
            {priceRanges.map((range) => (
              <div key={range} className="flex items-center space-x-2 mb-2">
                <Checkbox id={range} />
                <label htmlFor={range} className="text-sm">
                  {range}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-2">Trọng lượng</h3>
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
      </div>
    </div>
  );
}
