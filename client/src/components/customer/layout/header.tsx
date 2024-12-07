import Image from "next/image";
import { BiSolidPhoneCall } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import {
  IoCartOutline,
  IoLocationOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import DefaultButton from "../UI/button/default-button";
import DefaultInput from "../UI/input/default-input";

import { routePath } from "@/constants/routes";
import { Account } from "@prisma/client";
import { Dropdown, MenuProps } from "antd";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Link from "next/link";
import { MdOutlinePassword } from "react-icons/md";

import Menu from "./menu";

const unLoggedProfileItems: MenuProps["items"] = [
  {
    label: <Link href={routePath.customer.signIn}>Đăng nhập</Link>,
    key: routePath.customer.signIn,
    icon: <RiLoginBoxLine className="!text-lg" />,
  },
  {
    label: <Link href={routePath.customer.signUp}>Đăng ký</Link>,
    key: routePath.customer.signUp,
    icon: <FaUserCircle className="!text-lg" />,
  },
];
const loggedProfileItems: MenuProps["items"] = [
  {
    label: <Link href={routePath.customer.account.profile}>Tài khoản</Link>,
    key: routePath.customer.signIn,
    icon: <CgProfile className="!text-lg" />,
  },
  {
    label: (
      <Link href={routePath.customer.account.changePassword}>
        Thay đổi mật khẩu
      </Link>
    ),
    key: routePath.customer.account.changePassword,
    icon: <MdOutlinePassword className="!text-lg" />,
  },
  {
    label: <Link href={routePath.customer.signOut}>Đăng xuất</Link>,
    key: routePath.customer.signOut,
    icon: <RiLoginBoxLine className="!text-lg" />,
  },
];
export default async function Header() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let account = null;
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
          <Dropdown
            menu={{
              items: account ? loggedProfileItems : unLoggedProfileItems,
            }}
            placement="bottomCenter"
            arrow={true}
          >
            <DefaultButton
              suffix={<CgProfile className="!w-6 !h-6"></CgProfile>}
              className="!font-semibold"
            ></DefaultButton>
          </Dropdown>

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
