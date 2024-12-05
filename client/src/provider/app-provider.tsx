"use client";

import { Account } from "@prisma/client";
import useMessage from "antd/es/message/useMessage";
import ms from "ms";
import type { MessageInstance } from "antd/es/message/interface";
import {
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { authApiRequest } from "@/api-request/auth";
import envConfig from "@/envConfig";
import { isTokenExpired } from "@/utils/auth";

const AppContext = createContext<{
  accessToken: string;
  refreshToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  setRefreshToken: Dispatch<SetStateAction<string>>;
  messageApi: MessageInstance;
}>({
  accessToken: "",
  refreshToken: "",
  setAccessToken: () => {},
  setRefreshToken: () => {},
  messageApi: {} as MessageInstance,
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
  initialAccessToken,
  initialRefreshToken,
}: {
  children: ReactNode;
  user?: Partial<Account>;
  initialAccessToken?: string;
  initialRefreshToken?: string;
}) {
  const [accessToken, setAccessToken] = useState(initialAccessToken || "");
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken || "");

  const [messageApi, contextHolder] = useMessage();

  // Kiểm tra ở client(server thì ở trong http.ts)
  const callApiRefreshToken = async () => {
    try {
      const res = await authApiRequest.refreshTokenFromClientToNextServer();
      const { accessToken, refreshToken } = res.payload.data;
      await authApiRequest.setToken(accessToken, refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (accessToken && isTokenExpired(accessToken)) {
      console.log(ms(envConfig?.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN || "1d"));
      const interval = setInterval(() => {
        callApiRefreshToken();
      }, ms(envConfig?.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN || "1d"));
      return () => clearInterval(interval);
    }
  }, [accessToken]);

  return (
    <AppContext.Provider
      value={{
        messageApi,
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {contextHolder}
      {children}
    </AppContext.Provider>
  );
}
