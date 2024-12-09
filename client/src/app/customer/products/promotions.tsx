import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DefaultButton from "@/components/customer/UI/button/default-button";

export function Promotions() {
  const promotions = [
    {
      code: "DOLA10",
      description: "Giảm 10.000đ giá trị đơn hàng",
      date: "HSD: 1/10/2023",
    },
    {
      code: "FREESHIP",
      description: "Miễn phí vận chuyển",
      date: "HSD: Không thời hạn",
    },
    {
      code: "DOLA20",
      description: "Giảm 20% giá trị đơn hàng",
      date: "HSD: 1/10/2023",
    },
    {
      code: "DOLA50K",
      description: "Giảm 50k",
      date: "HSD: 1/10/2023",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {promotions.map((promo) => (
        <Card key={promo.code} className="border border-lime-600">
          <CardContent className="p-4 flex justify-between items-center">
            <div className="space-y-1 w-full">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{promo.code}</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                {promo.description}
              </p>
              <div className="flex flex-row justify-between w-full  items-center">
                <p className="text-xs text-muted-foreground">{promo.date}</p>
                <DefaultButton
                  variant="outline"
                  className="text-sm px-3 py-1 !h-8 rounded-lg"
                >
                  Sao chép
                </DefaultButton>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
