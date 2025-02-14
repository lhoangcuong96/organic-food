"use client";

import { Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHandleMessage } from "@/hooks/use-hande-message";

interface Voucher {
  code: string;
  description: string;
  expiry: string;
}

const vouchers: Voucher[] = [
  {
    code: "DOLA10",
    description: "Giảm 10.000đ giá trị đơn hàng",
    expiry: "HSD: 1/10/2023",
  },
  {
    code: "FREESHIP",
    description: "Miễn phí vận chuyển",
    expiry: "HSD: Không thời hạn",
  },
  {
    code: "DOLA20",
    description: "Giảm 20% giá trị đơn hàng",
    expiry: "HSD: 1/10/2023",
  },
  {
    code: "DOLA50K",
    description: "Giảm 50k",
    expiry: "HSD: 1/10/2023",
  },
];

export default function VoucherSection() {
  const { messageApi } = useHandleMessage();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    messageApi.success({
      title: "Sao chép thành công",
      description: "Mã voucher đã được sao chép vào bộ nhớ tạm",
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {vouchers.map((voucher) => (
        <div
          key={voucher.code}
          className="border rounded-lg p-4 flex flex-col justify-between border-lime-700"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-semibold">{voucher.code}</div>
              <div className="text-sm text-muted-foreground">
                {voucher.description}
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chi tiết voucher</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {voucher.expiry}
            </span>
            <Button
              variant="default"
              className="bg-lime-600 "
              size="sm"
              onClick={() => copyToClipboard(voucher.code)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Sao chép
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
