"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { accountMenuItems } from "./left-sidebar";

export default function NavigationTabs() {
  return (
    <div className="flex gap-3 flex-wrap overflow-x-auto text-sm lg:hidden">
      {accountMenuItems.map((item) => {
        const isActive = window.location.pathname.includes(item.key);
        const hasChildren = item.subItems && item.subItems.length > 0;
        if (hasChildren) {
          return (
            <DropdownMenu key={item.key}>
              <DropdownMenuTrigger>
                <button
                  key={item.key}
                  className={cn(
                    "flex gap-2 items-center px-2 py-1 text-sm font-medium transition-all whitespace-nowrap",
                    "border-b-2 hover:text-primary focus:outline-none",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:border-primary/50"
                  )}
                >
                  {item.icon && <item.icon className="!w-5 !h-5"></item.icon>}
                  {item.label}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="px-4 py-2 mb-2 ">
                  {item.subItems?.map((subItem, subIndex) => {
                    const isSubActive =
                      window.location.pathname === subItem.url;
                    return (
                      <a
                        key={subIndex}
                        href={subItem.url}
                        className={cn(
                          "block py-2 rounded-lg mb-1 text-sm text-gray-600 hover:text-lime-600",
                          isSubActive && "text-lime-600"
                        )}
                      >
                        {subItem.label}
                      </a>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
        return (
          <button
            key={item.key}
            className={cn(
              "flex gap-2 items-center px-2 py-1 text-sm font-medium transition-all whitespace-nowrap",
              "border-b-2 hover:text-primary focus:outline-none focus:!ring-0 focus-visible:ring-0",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:border-primary/50"
            )}
          >
            {item.icon && <item.icon className="!w-5 !h-5"></item.icon>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
