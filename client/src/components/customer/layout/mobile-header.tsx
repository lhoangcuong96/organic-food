import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { routePath } from "@/constants/routes";
import DefaultButton from "../UI/button/default-button";
import DefaultInput from "../UI/input/default-input";

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export default function MobileHeader({ onMenuToggle }: MobileHeaderProps) {
  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex justify-between items-center">
        <Link href={routePath.customer.home}>
          <Image
            src="/images/logo.webp"
            width={150}
            height={19}
            alt="logo"
            className="pointer"
          />
        </Link>
        <button
          className="text-2xl"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <MenuOutlined />
        </button>
      </div>
      <DefaultInput
        className="w-full"
        placeholder="Tìm kiếm..."
        suffix={<DefaultButton suffix={<SearchOutlined />} />}
      />
    </div>
  );
}
