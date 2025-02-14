import { http } from "@/lib/http";
import {
  ChangePasswordDataType,
  AccountResponseDataType,
  UpdateAccountDataType,
} from "@/validation-schema/account";
import { MessageResponseType } from "@/validation-schema/common";

export const accountApiRequest = {
  getMe: async () =>
    http.get<AccountResponseDataType>("/account/me", {
      isPrivate: true,
    }),
  updateProfile: async (data: UpdateAccountDataType) => {
    return http.put<AccountResponseDataType>("/account/me", data, {
      isPrivate: true,
    });
  },
  changePassword: async (data: ChangePasswordDataType) => {
    return http.post<MessageResponseType>("/account/change-password", data, {
      isPrivate: true,
    });
  },
};
