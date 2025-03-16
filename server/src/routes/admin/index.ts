import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import AdminProductRoutes from './admin-product.route'
import { requireAminHook, requireLoggedHook } from '@/hooks/auth.hooks'
import { AdminCategoryRoutes } from './admin-category.route'
import AdminOrderRoutes from './admin-order.route'

export default function adminRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook('preValidation', fastify.auth([requireLoggedHook, requireAminHook]))
  fastify.register(AdminProductRoutes, { prefix: '/products' })
  fastify.register(AdminCategoryRoutes, { prefix: '/category' })
  fastify.register(AdminOrderRoutes, { prefix: '/orders' })
}
