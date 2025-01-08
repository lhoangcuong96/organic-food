"use client";

import { useToast } from "@/hooks/use-toast";
import { EntityError } from "@/lib/http";
import { DependencyList, useEffect, useState } from "react";
import { UseFormSetError } from "react-hook-form";

export const useHandleMessage = () => {
  const { toast } = useToast();

  const handleError = ({
    title,
    error,
    setError,
    duration,
  }: {
    title?: string;
    error: EntityError | Error | string;
    setError?: UseFormSetError<any>;
    duration?: number;
  }) => {
    console.error(error);
    if (error instanceof EntityError && setError) {
      error.payload.errors.forEach((item) => {
        setError(item.field, {
          type: "server",
          message: item.message,
        });
      });
    }
    if (error instanceof Error) {
      toast({
        variant: "destructive",
        title: title || "Uh oh! Something went wrong.",
        type: "foreground",
        description: error.message,
        duration,
      });
    }
    if (typeof error === "string") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        type: "foreground",
        description: error,
        duration,
      });
    }
  };

  const handleSuccess = ({
    title,
    description,
    duration,
  }: {
    title?: string;
    description?: string;
    duration?: number;
  }) => {
    toast({
      title: title || "Success",
      type: "foreground",
      description: description || "Thành công",
      duration: duration || 3000,
    });
  };

  const handWarning = ({
    title,
    description,
    duration,
  }: {
    title: string;
    description: string;
    duration?: number;
  }) => {
    toast({
      variant: "destructive",
      title: title || "Warning",
      type: "foreground",
      description: description,
      duration: duration || 3000,
    });
  };

  const messageApi = {
    error: handleError,
    success: handleSuccess,
    warning: handWarning,
  };

  return { messageApi };
};

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn();
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, [deps]);
}

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
