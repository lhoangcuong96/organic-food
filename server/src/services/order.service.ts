import prisma from '@/database'
import { CreateOrderBodyType } from '@/schemaValidations/order.schema'
import { Order } from '@prisma/client'

export default class OrderService {
  public async createOrder(order: CreateOrderBodyType): Promise<Order> {
    prisma.$transaction(async (prisma) => {})
    return await Order.create(order)
  }
}
