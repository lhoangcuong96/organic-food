import prisma from '@/database'
import { UpdateProfileBodyType } from '@/schemaValidations/account.schema'
import { comparePassword, hashPassword } from '@/utils/crypto'
import { StatusError } from '@/utils/errors'

export const updateMeController = async (accountId: string, body: UpdateProfileBodyType) => {
  const account = prisma.account.update({
    where: {
      id: accountId
    },
    data: {
      ...body
    }
  })
  return account
}

export const changePasswordController = async (accountId: string, oldPassword: string, newPassword: string) => {
  const account = await prisma.account.findUnique({ where: { id: accountId } })
  if (!account) {
    throw new StatusError({
      message: 'Tài khoản không tồn tại',
      status: 404
    })
  }
  const isPasswordMatch = await comparePassword(oldPassword, account.password!)
  if (!isPasswordMatch) {
    throw new StatusError({
      message: 'Mật khẩu cũ không đúng',
      status: 400
    })
  }
  const hashedPassword = await hashPassword(newPassword)
  return await prisma.account.update({
    where: {
      id: accountId
    },
    data: {
      password: hashedPassword
    }
  })
}
