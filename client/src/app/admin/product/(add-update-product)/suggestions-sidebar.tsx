import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const suggestions = [
  "Thêm ít nhất 3 hình ảnh",
  "Thêm video sản phẩm",
  "Tên sản phẩm có ít nhất 25-100 kí tự",
  "Thêm ít nhất 100 kí tự hoặc 1 hình ảnh trong mô tả sản phẩm",
  "Thêm thương hiệu",
];

export function SuggestionsSidebar() {
  return (
    <div className="w-64 bg-slate-50 p-4">
      <h2 className="mb-4 text-lg font-semibold">Gợi ý điền Thông tin</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-5 w-5 shrink-0 rounded-full"
              >
                <span className="sr-only">Complete suggestion</span>
              </Button>
              <span className="text-sm">{suggestion}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
