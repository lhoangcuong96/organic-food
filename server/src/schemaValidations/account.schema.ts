import z, { nullable } from 'zod'

export const AccountRes = z
  .object({
    data: z.object({
      id: z.string(),
      fullname: z.string(),
      email: z.string(),
      phoneNumber: z.string(),
      gender: z.enum(['MALE', 'FEMALE', 'OTHER']).nullable().optional(),
      dateOfBirth: z.date().nullable().optional(),
      avatar: z.string().nullable().optional()
    }),
    message: z.string()
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const UpdateProfileBody = z.object({
  fullname: z.string().trim().min(2, 'Họ và tên ít nhất 2 kí tự').max(256, 'Họ và tên nhiều nhất 256 kí tự'),
  phoneNumber: z
    .string()
    .regex(new RegExp('^(0[1-9]{1}[0-9]{8})$|^(84[1-9]{1}[0-9]{8})$'), 'Số điện thoại không đúng!'),
  address: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  dateOfBirth: z.date().optional()
})

export type UpdateProfileBodyType = z.TypeOf<typeof UpdateProfileBody>

export const ChangePasswordBody = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, 'Mật khẩu mới ít nhất 6 kí tự')
})

export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>
