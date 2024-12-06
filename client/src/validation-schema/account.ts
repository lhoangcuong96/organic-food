import { isValidDate } from "@/lib/utils";
import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).nullable().optional(),
  dateOfBirth: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
});

export const profileResponseSchema = z.object({
  data: profileSchema,
  message: z.string(),
});

export const updateProfileSchema = z.object({
  fullname: z.string().min(1, "Họ và tên không hợp lệ"),
  dateOfBirth: z.string().refine((value) => isValidDate(value), {
    message: "Ngày sinh không hợp lệ",
  }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  avatar: z.string().nullable().optional(),
});

export type ProfileDataType = z.infer<typeof profileSchema>;
export type ProfileResponseDataType = z.infer<typeof profileResponseSchema>;

export type UpdateProfileDataType = z.infer<typeof updateProfileSchema>;
