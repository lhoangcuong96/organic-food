"use client";

import { authApiRequest } from "@/api-request/auth";
import { Toaster } from "@/components/ui/toaster";
import { routePath } from "@/constants/routes";
import envConfig from "@/envConfig";
import SessionStore from "@/helper/local-store/session-store";
import { isTokenExpired } from "@/utils/auth";
import { AccountType } from "@/validation-schema/account";
import { CartType } from "@/validation-schema/cart";
import ms from "ms";
import { redirect } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext<{
  account?: AccountType;
  setAccount: Dispatch<SetStateAction<AccountType | undefined>>;
  cart?: CartType;
  setCart: Dispatch<SetStateAction<CartType | undefined>>;
}>({
  account: undefined,
  setAccount: () => {},
  cart: undefined,
  setCart: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default function AppProvider({
  children,
  initialAccount,
  initialCart,
}: {
  children: ReactNode;
  initialAccount?: AccountType;
  initialCart?: CartType;
}) {
  const [account, setAccount] = useState<AccountType | undefined>(
    initialAccount
  );

  const [cart, setCart] = useState<CartType | undefined>(initialCart);

  // Kiểm tra ở client(server thì ở trong http.ts)
  const callApiRefreshToken = async () => {
    try {
      const res = await authApiRequest.refreshTokenFromClientToNextServer();
      if (!res.payload?.data) {
        throw new Error("Token không hợp lệ");
      }
      const { accessToken, refreshToken } = res.payload.data;
      await authApiRequest.setToken(accessToken, refreshToken);
      SessionStore.setTokens(accessToken, refreshToken);
    } catch (error) {
      console.error(error);
      redirect(routePath.signOut);
    }
  };

  useEffect(() => {
    const accessToken = SessionStore.getAccessToken();
    if (accessToken && isTokenExpired(accessToken)) {
      const interval = setInterval(() => {
        callApiRefreshToken();
      }, ms(envConfig?.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN || "1d"));
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    console.log(initialAccount);
    setAccount(initialAccount);
  }, [initialAccount]);

  return (
    <AppContext.Provider
      value={{
        account,
        setAccount,
        cart,
        setCart,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
}
