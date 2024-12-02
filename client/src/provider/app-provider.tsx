"use client";

import { Account } from "@prisma/client";
import useMessage from "antd/es/message/useMessage";
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MessageInstance } from "antd/es/message/interface";
import { createContext, ReactNode, useContext, useState } from "react";

const AppContext = createContext({
  accessToken: "",
  refreshToken: "",
  setAccessToken: (token: string) => {},
  setRefreshToken: (token: string) => {},
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
  user,
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
