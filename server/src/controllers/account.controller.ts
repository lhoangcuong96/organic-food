import prisma from '@/database'
import { UpdateProfileBodyType } from '@/schemaValidations/account.schema'

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
