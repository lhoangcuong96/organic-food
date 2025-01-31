"use client";

import { authApiRequest } from "@/api-request/auth";
import { Toaster } from "@/components/ui/toaster";
import { routePath } from "@/constants/routes";
import envConfig from "@/envConfig";
import SessionStore from "@/helper/local-store/session-store";
import { isTokenExpired } from "@/utils/auth";
import { Account } from "@prisma/client";
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
  account?: Partial<Account>;
  setAccount: Dispatch<SetStateAction<Partial<Account> | undefined>>;
}>({
  account: undefined,
  setAccount: () => {},
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
}: {
  children: ReactNode;
  initialAccount?: Partial<Account>;
}) {
  const [account, setAccount] = useState<Partial<Account> | undefined>(
    initialAccount
  );

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

  return (
    <AppContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
}
