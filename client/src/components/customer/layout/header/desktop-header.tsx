"use client";

import Image from "next/image";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import {
  IoCartOutline,
  IoLocationOutline,
  IoSearchOutline,
} from "react-icons/io5";

import DefaultButton from "../../UI/button/default-button";
import DefaultInput from "../../UI/input/default-input";

import { routePath } from "@/constants/routes";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAppContext } from "@/provider/app-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import ProfileDropdown from "../profile-dropdown";
import { CartPopup } from "./cart-popup";
import Menu from "./menu";

export default function DesktopHeader() {
  const { cart, account } = useAppContext();
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    if (searchRef.current) {
      const paramsObject: Record<string, string | string[]> = {};

      // Process search params to support multiple values per key
      searchParams.forEach((value, key) => {
        if (paramsObject[key]) {
          paramsObject[key] = Array.isArray(paramsObject[key])
            ? [...paramsObject[key], value] // Append new values to existing array
            : [paramsObject[key], value]; // Convert single value to array
        } else {
          paramsObject[key] = value; // Store as string initially
        }
      });
      paramsObject["search"] = searchRef.current.value;
      console.log(paramsObject);
      router.push(
        routePath.customer.products({
          ...paramsObject,
        })
      );
    }
  };

  return (
    <header className="max-w-screen-xl w-full h-fit mt-5 relative z-50 hidden lg:block">
      <div className="grid grid-cols-[max-content_auto_max-content] items-center gap-4">
        <Link href={routePath.customer.home}>
          <Image
            src="/images/logo-3.jpeg"
            width="128"
            height="128"
            alt="logo"
            className="pointer"
          ></Image>
        </Link>

        <DefaultInput
          wrapperClassName="max-w-[400px] w-full"
          className="!h-10"
          ref={searchRef}
          defaultValue={searchParams.get("search") || ""}
          placeholder="Bạn muốn tìm gì ..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return handleSearch();
            }
          }}
          suffix={
            <DefaultButton
              className="!w-8 !h-8"
              suffix={<IoSearchOutline className="!w-5 !h-5"></IoSearchOutline>}
              onClick={() => {
                return handleSearch();
              }}
            ></DefaultButton>
          }
        ></DefaultInput>
        <div className="flex flex-1 gap-3">
          <DefaultButton
            suffix={<BiSolidPhoneCall className="!w-6 !h-6"></BiSolidPhoneCall>}
            className="!font-semibold"
          >
            0975209429
          </DefaultButton>
          <ProfileDropdown account={account}></ProfileDropdown>
          <Link href={routePath.customer.storeLocations}>
            <DefaultButton
              suffix={
                <div className="relative">
                  <IoLocationOutline className="!w-6 !h-6"></IoLocationOutline>
                  <Badge className="rounded-full bg-red-600 w-4 h-4 p-0 absolute -top-1/4 -right-1/4 hover:bg-red-500">
                    <p className="w-full">1</p>
                  </Badge>
                </div>
              }
              className="!font-semibold"
            ></DefaultButton>
          </Link>

          <DefaultButton
            suffix={<FaRegHeart className="!w-6 !h-6"></FaRegHeart>}
            className="!font-semibold"
          ></DefaultButton>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href={account ? routePath.customer.cart : routePath.signIn}
                >
                  <NavigationMenuTrigger>
                    <div className="relative">
                      <IoCartOutline className="!w-6 !h-6"></IoCartOutline>
                      {cart && (
                        <Badge className="rounded-full bg-red-600 w-4 h-4 p-0 absolute -top-1/4 -right-1/4 hover:bg-red-500">
                          <p className="w-full">{cart?.items.length}</p>
                        </Badge>
                      )}
                    </div>
                  </NavigationMenuTrigger>
                </Link>
                {account && (
                  <NavigationMenuContent>
                    <CartPopup />
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <Menu></Menu>
    </header>
  );
}
