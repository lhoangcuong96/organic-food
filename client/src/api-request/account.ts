import { http } from "@/lib/http";
import {
  ProfileResponseDataType,
  UpdateProfileDataType,
} from "@/validation-schema/account";

export const accountApiRequest = {
  getProfile: async () => http.get<ProfileResponseDataType>("/account/me", {}),
  updateProfile: async (data: UpdateProfileDataType) => {
    return http.put<ProfileResponseDataType>("/account/me", data, {});
  },
};
