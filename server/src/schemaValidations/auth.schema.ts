import z from 'zod'

export const RegisterBody = z
  .object({
    fullname: z.string().trim().min(2, 'Họ và tên ít nhất 2 kí tự').max(256, 'Họ và tên nhiều nhất 256 kí tự'),
    phoneNumber: z
      .string()
      .regex(new RegExp('^(0[1-9]{1}[0-9]{8})$|^(84[1-9]{1}[0-9]{8})$'), 'Số điện thoại không đúng!'),
    email: z.string().email('Email không đúng!'),
    password: z.string().min(6, 'Password ít nhất 6 kí tự').max(100, 'Password nhiều nhất 100 kí tự'),
    confirmPassword: z.string().min(6, 'Password ít nhất kí tự').max(100, 'Password nhiều nhất 100 kí tự')
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
      })
    }
  })

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.string(),
      fullname: z.string(),
      email: z.string()
    })
  }),
  message: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>
export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>
export const SlideSessionRes = RegisterRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>
