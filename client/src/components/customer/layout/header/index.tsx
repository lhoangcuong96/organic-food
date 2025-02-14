"use client";

import { useAppContext } from "@/provider/app-provider";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";

const Header = () => {
  const { account, cart } = useAppContext();
  return (
    <div className="print:hidden w-full flex justify-center">
      <DesktopHeader
        className="hidden lg:block"
        account={account}
        cart={cart}
      ></DesktopHeader>
      <MobileHeader
        className="block lg:hidden"
        account={account}
      ></MobileHeader>
    </div>
  );
};

export default Header;
