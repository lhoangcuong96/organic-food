import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Please input your password!" }),
  remember: z.boolean().optional(),
});

export const signUpSchema = z
  .object({
    fullname: z.string().min(1, "Xin vui lòng nhập họ và tên!"),
    phoneNumber: z.string().min(1, "Xin vui lòng nhập số điện thoại!"),
    email: z.string().email("Email không đúng!"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự!")
      .max(100, "Mật khẩu có nhiều nhất 100 kí tự!"),
    confirmPassword: z.string().min(1, "Xin vui lòng nhập mật khẩu!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không trùng khớp!",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
