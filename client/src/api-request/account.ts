import { http } from "@/lib/http";
import {
  ChangePasswordDataType,
  ProfileResponseDataType,
  UpdateProfileDataType,
} from "@/validation-schema/account";
import { MessageResponseType } from "@/validation-schema/common";

export const accountApiRequest = {
  getProfile: async () =>
    http.get<ProfileResponseDataType>("/account/me", {
      isPrivate: true,
    }),
  updateProfile: async (data: UpdateProfileDataType) => {
    return http.put<ProfileResponseDataType>("/account/me", data, {
      isPrivate: true,
    });
  },
  changePassword: async (data: ChangePasswordDataType) => {
    return http.post<MessageResponseType>("/account/change-password", data, {
      isPrivate: true,
    });
  },
};
