import { http } from "@/lib/http";
import { ProfileResponseDataType } from "@/validation-schema/account";

export const accountApiRequest = {
  getProfile: async (accessToken: string) =>
    http.get<ProfileResponseDataType>("/account/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
