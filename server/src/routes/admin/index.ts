import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import adminProductRoutes from './product'
import { requireAminHook, requireLoggedHook } from '@/hooks/auth.hooks'

export default function adminRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook('preValidation', fastify.auth([requireLoggedHook, requireAminHook]))
  fastify.register(adminProductRoutes, { prefix: '/products' })
}
