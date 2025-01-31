"use client";

import { useToast } from "@/hooks/use-toast";
import { EntityError } from "@/lib/http";
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
        duration: duration || 3000,
      });
    }
    if (typeof error === "string") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        type: "foreground",
        description: error,
        duration: duration || 3000,
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
      variant: "success",
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
