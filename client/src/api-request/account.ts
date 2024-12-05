import { http } from "@/lib/http";
import {
  ProfileResponseDataType,
  UpdateProfileDataType,
} from "@/validation-schema/account";

export const accountApiRequest = {
  getProfile: async (accessToken: string) =>
    http.get<ProfileResponseDataType>("/account/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  updateProfile: async (accessToken: string, data: UpdateProfileDataType) => {
    return http.put<ProfileResponseDataType>("/account/me", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
