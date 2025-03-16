"use client";

import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { ProductListQueryType } from "@/validation-schema/product";

import { CategoryInListType } from "@/validation-schema/category";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import CategoryList from "./category-list";
import ProductFilter from "./product-filter";

export function Sidebar({
  categories,
  errorMessage,
  params,
}: {
  categories: CategoryInListType[];
  errorMessage?: string;
  params?: ProductListQueryType;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => {
    return (
      <div className="space-y-8">
        <CategoryList
          categories={categories}
          errorMessage={errorMessage}
          params={params}
        />
        <ProductFilter params={params} />
      </div>
    );
  };
  return (
    <>
      {/* Mobile Filter Button and Drawer */}
      <div className="md:hidden w-full mb-4 relative">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="fixed z-50 right-5 bottom-20 w-14 h-14 rounded-full flex items-center justify-center gap-2 bg-white shadow-lg"
            >
              <Filter className="!w-6 !h-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-100 max-w-[80vw] p-3 h-screen overflow-auto">
            <DrawerHeader>
              <DrawerClose>
                <Button variant="ghost" className="absolute top-3 right-1">
                  <IoClose className="!w-6 !h-6" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <SidebarContent />
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarContent />
      </div>
    </>
  );
}
