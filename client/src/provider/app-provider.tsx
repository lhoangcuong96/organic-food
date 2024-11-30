"use client";

import { Account } from "@prisma/client";
import useMessage from "antd/es/message/useMessage";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";
import type { MessageInstance } from "antd/es/message/interface";

const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
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
  initialSessionToken,
}: {
  children: ReactNode;
  user?: Partial<Account>;
  initialSessionToken?: string;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken || "");
  const [messageApi, contextHolder] = useMessage();
  return (
    <AppContext.Provider value={{ messageApi, sessionToken, setSessionToken }}>
      {contextHolder}
      {children}
    </AppContext.Provider>
  );
}
