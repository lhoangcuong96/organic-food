import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { BiSolidPhoneCall } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline, IoLocationOutline } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import DefaultButton from "../UI/button/default-button";
import DefaultInput from "../UI/input/default-input";

import { routePath } from "@/constants/routes";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import Menu from "./menu";
import { ButtonLogout } from "../UI/button/button-logout";

const profileItems: MenuProps["items"] = [
  {
    label: <Link href={routePath.customer.signIn}>Đăng nhập</Link>,
    key: routePath.customer.signIn,
    icon: <RiLoginBoxLine className="!text-lg" />,
  },
  {
    label: <Link href={routePath.customer.signUp}>Đăng ký</Link>,
    key: routePath.customer.signUp,
    icon: <UserOutlined className="!text-lg" />,
  },
  {
    label: <ButtonLogout></ButtonLogout>,
    key: "logout",
  },
];
export default function Header() {
  return (
    <header className="max-w-screen-xl w-full h-fit mt-5 relative z-50">
      <div className="grid grid-cols-[max-content_auto_max-content] items-center gap-4">
        <Link href={routePath.customer.home}>
          <Image
            src="/images/logo.webp"
            width="220"
            height="27"
            alt="logo"
            className="pointer"
          ></Image>
        </Link>

        <DefaultInput
          className="max-w-[400px]"
          suffix={
            <DefaultButton
              icon={<SearchOutlined></SearchOutlined>}
            ></DefaultButton>
          }
        ></DefaultInput>
        <div className="flex flex-1 gap-3">
          <DefaultButton
            icon={<BiSolidPhoneCall className="text-2xl"></BiSolidPhoneCall>}
            className="!font-semibold"
          >
            0582134596
          </DefaultButton>
          <Dropdown
            menu={{ items: profileItems }}
            placement="bottomCenter"
            arrow={true}
          >
            <DefaultButton
              icon={<CgProfile className="text-2xl"></CgProfile>}
              className="!font-semibold"
            ></DefaultButton>
          </Dropdown>

          <DefaultButton
            icon={<IoLocationOutline className="text-2xl"></IoLocationOutline>}
            className="!font-semibold"
          ></DefaultButton>
          <DefaultButton
            icon={<FaRegHeart className="text-2xl"></FaRegHeart>}
            className="!font-semibold"
          ></DefaultButton>
          <DefaultButton
            icon={<IoCartOutline className="text-2xl"></IoCartOutline>}
            className="!font-semibold"
          ></DefaultButton>
        </div>
      </div>
      <Menu></Menu>
    </header>
  );
}
