import { isValidDate } from "@/lib/utils";
import { z } from "zod";

export const accountSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  email: z.string(),
  phoneNumber: z.string().nullable().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).nullable().optional(),
  dateOfBirth: z.date().nullable().optional(),
  avatar: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  shippingAddress: z
    .object({
      address: z.string(),
      district: z.string(),
      commune: z.string(),
      province: z.string(),
    })
    .optional(),
  role: z.enum(["USER", "ADMIN"]),
});

export const accountResponseSchema = z.object({
  data: accountSchema,
  message: z.string(),
});

export const updateAccountSchema = z.object({
  fullname: z.string().min(1, "Họ và tên không hợp lệ"),
  dateOfBirth: z.string().refine((value) => isValidDate(value), {
    message: "Ngày sinh không hợp lệ",
  }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  avatar: z.string().nullable().optional(),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Vui lòng nhập mật khẩu cũ"),
    newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type AccountType = z.infer<typeof accountSchema>;
export type AccountResponseDataType = z.infer<typeof accountResponseSchema>;

export type UpdateAccountDataType = z.infer<typeof updateAccountSchema>;

export type ChangePasswordDataType = z.infer<typeof changePasswordSchema>;
