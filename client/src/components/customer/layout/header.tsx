import Image from "next/image";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import {
  IoCartOutline,
  IoLocationOutline,
  IoSearchOutline,
} from "react-icons/io5";

import DefaultButton from "../UI/button/default-button";
import DefaultInput from "../UI/input/default-input";

import { routePath } from "@/constants/routes";
import { Account } from "@prisma/client";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Link from "next/link";

import Menu from "./menu";
import ProfileDropdown from "./profile-dropdown";

export default async function Header() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let account: Partial<Account> | undefined;
  if (accessToken) {
    const tokenPayload = jwtDecode<{ account: Partial<Account> }>(accessToken);
    account = tokenPayload?.account;
  }
  return (
    <header className="max-w-screen-xl w-full h-fit mt-5 relative z-50">
      <div className="grid grid-cols-[max-content_auto_max-content] items-center gap-4">
        <Link href={routePath.customer.home}>
          <Image
            src="/images/logo.webp"
            width="220"
            height="63"
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
            0582134596
          </DefaultButton>
          <ProfileDropdown account={account}></ProfileDropdown>

          <DefaultButton
            suffix={
              <IoLocationOutline className="!w-6 !h-6"></IoLocationOutline>
            }
            className="!font-semibold"
          ></DefaultButton>
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
