"use client";

import { useCallback } from "react";
import { EntityError } from "@/lib/http";
import { UseFormSetError } from "react-hook-form";
import { useAppContext } from "@/provider/app-provider";

export const useHandleMessage = () => {
  const { messageApi } = useAppContext();

  const handleError = useCallback(
    ({
      error,
      setError,
      duration,
    }: {
      error: any;
      setError?: UseFormSetError<any>;
      duration?: number;
    }) => {
      console.log(typeof error);

      if (error instanceof EntityError && setError) {
        error.payload.errors.forEach((item) => {
          setError(item.field, {
            type: "server",
            message: item.message,
          });
        });
      } else {
        messageApi.error(
          error.payload?.message || "Lỗi không xác định",
          duration || 3
        );
      }
    },
    [messageApi]
  );

  return { handleError, messageApi };
};

import { useState, useEffect } from "react";

const useIsMobile = (breakpoint: number = 992) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkIsMobile();

    // Set up event listener for window resize
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIsMobile, 150);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
