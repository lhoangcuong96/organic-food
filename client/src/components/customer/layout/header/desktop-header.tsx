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
import { Account } from "@prisma/client";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import ProfileDropdown from "../profile-dropdown";
import Menu from "./menu";

export default async function DesktopHeader({
  className,
  account,
}: {
  className?: string;
  account?: Partial<Account>;
}) {
  return (
    <header
      className={`max-w-screen-xl w-full h-fit mt-5 relative z-50 ${className}`}
    >
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
          suffix={
            <DefaultButton
              className="!w-8 !h-8"
              suffix={<IoSearchOutline className="!w-5 !h-5"></IoSearchOutline>}
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
          <DefaultButton
            suffix={<IoCartOutline className="!w-6 !h-6"></IoCartOutline>}
            className="!font-semibold"
          ></DefaultButton>
        </div>
      </div>
      <Menu></Menu>
    </header>
  );
}
