"use client";

import { authApiRequest } from "@/api-request/auth";
import envConfig from "@/envConfig";
import { isTokenExpired } from "@/utils/auth";
import { Account } from "@prisma/client";
import type { MessageInstance } from "antd/es/message/interface";
import useMessage from "antd/es/message/useMessage";
import sessionStore from "@/helper/session";
import ms from "ms";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  Dispatch,
} from "react";

const AppContext = createContext<{
  messageApi: MessageInstance;
  account?: Partial<Account>;
  setAccount: Dispatch<SetStateAction<Partial<Account> | undefined>>;
}>({
  messageApi: {} as MessageInstance,
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
  const [messageApi, contextHolder] = useMessage();
  const [account, setAccount] = useState<Partial<Account> | undefined>(
    initialAccount
  );

  // Kiểm tra ở client(server thì ở trong http.ts)
  const callApiRefreshToken = async () => {
    try {
      const res = await authApiRequest.refreshTokenFromClientToNextServer();
      const { accessToken, refreshToken } = res.payload.data;
      await authApiRequest.setToken(accessToken, refreshToken);
      sessionStore.setTokens(accessToken, refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const accessToken = sessionStore.getAccessToken();
    if (accessToken && isTokenExpired(accessToken)) {
      console.log(ms(envConfig?.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN || "1d"));
      const interval = setInterval(() => {
        callApiRefreshToken();
      }, ms(envConfig?.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN || "1d"));
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        messageApi,
        account,
        setAccount,
      }}
    >
      {contextHolder}
      {children}
    </AppContext.Provider>
  );
}
