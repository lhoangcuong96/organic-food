import { cookies } from "next/headers";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import { Account } from "@prisma/client";
import { jwtDecode } from "jwt-decode";

const Header = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let account: Partial<Account> | undefined;
  if (accessToken) {
    const tokenPayload = jwtDecode<{ account: Partial<Account> }>(accessToken);
    account = tokenPayload?.account;
  }
  return (
    <>
      <DesktopHeader
        className="hidden lg:block"
        account={account}
      ></DesktopHeader>
      <MobileHeader
        className="block lg:hidden"
        account={account}
      ></MobileHeader>
    </>
  );
};

export default Header;
