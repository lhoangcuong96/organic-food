import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { ProductSearch } from "./product-search";
import { ProductTable } from "./product-table";

const demoProducts = [
  {
    id: "1",
    name: "test22233333333333",
    sku: "1623182162",
    price: 111111,
    stock: "Hết hàng",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
  },
  // Add more demo products as needed
];

export default async function ProductList() {
  // const [] = await Promise.all([
  //   // productRequestApi.getProductMetrics(),
  //   productRequestApi.getProducts({
  //     page: 1,
  //     limit: 20,
  //     search: "",
  //     sort: "name",
  //     order: Order.Desc,
  //   }),
  // ]);
  return (
    <div>
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
        <span>Quản lý sản phẩm</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-700">Tất cả sản phẩm</span>
      </div>
      <div className="space-y-4 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tất cả sản phẩm</h2>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            + Thêm 1 sản phẩm mới
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="active">Đang hoạt động (3)</TabsTrigger>
            <TabsTrigger value="violation">Vi phạm (0)</TabsTrigger>
            <TabsTrigger value="pending">Chờ duyệt bởi Shopee (0)</TabsTrigger>
            <TabsTrigger value="unapproved">Chưa được dáng (0)</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <ProductSearch />
          </div>

          <TabsContent value="all" className="mt-4">
            <ProductTable products={demoProducts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
