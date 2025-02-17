import z from 'zod'

export const AccountMeSchema = z
  .object({
    id: z.string(),
    fullname: z.string(),
    email: z.string(),
    phoneNumber: z.string().nullable().optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).nullable().optional(),
    dateOfBirth: z
      .preprocess((val) => (val instanceof Date ? val : new Date(val as string)), z.date())
      .nullable()
      .optional(),
    avatar: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    shippingAddress: z
      .object({
        address: z.string(),
        district: z.string(),
        ward: z.string(),
        province: z.string()
      })
      .optional(),
    role: z.enum(['USER', 'ADMIN'])
  })
  .strip()
export const AccountMeResponseSchema = z
  .object({
    data: AccountMeSchema,
    message: z.string()
  })
  .strict()

export type AccountMeType = z.TypeOf<typeof AccountMeSchema>
export type AccountMeResponseType = z.TypeOf<typeof AccountMeResponseSchema>

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
