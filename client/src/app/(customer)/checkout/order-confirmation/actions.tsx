"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function Actions() {
  return (
    <>
      <Button size="lg">Tiếp tục mua hàng</Button>
      <Button variant="outline" size="lg" onClick={() => window.print()}>
        <Printer className="w-4 h-4 mr-2" />
        In
      </Button>
    </>
  );
}
