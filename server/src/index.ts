// Import the framework and instantiate it
import envConfig, { API_URL } from '@/config'
import { errorHandlerPlugin } from '@/plugins/errorHandler.plugins'
import validatorCompilerPlugin from '@/plugins/validatorCompiler.plugins'
import accountRoutes from '@/routes/account.route'
import authRoutes from '@/routes/auth.route'
import mediaRoutes from '@/routes/media.route'
import productRoutes from '@/routes/product.route'
import staticRoutes from '@/routes/static.route'
import testRoutes from '@/routes/test.route'
import { createFolder } from '@/utils/helpers'
import fastifyAuth from '@fastify/auth'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import RateLimit from '@fastify/rate-limit'
import fastifyRedis from '@fastify/redis'
import Fastify from 'fastify'
import path from 'path'
import { BloomFilterService } from './lb/bloom-filter'

const fastify = Fastify({
  logger: true
})

// Run the server!
const start = async () => {
  try {
    createFolder(path.resolve(envConfig.UPLOAD_FOLDER))

    // Register redis
    await fastify.register(fastifyRedis, {
      url: envConfig.REDIS_URL
    })
    // sử dụng lrucache để lưu trữ dữ liệu
    // redis cloud không hỗ trợ những key này
    // fastify.redis.config('SET', 'maxmemory', '20mb')
    // fastify.redis.config('SET', 'maxmemory-policy', 'allkeys-lru')

    // Sử dụng bloom filter để lưu trữ email và phoneNumber
    const bloomFilter = new BloomFilterService(fastify)
    bloomFilter.createBloomFilter({ filterName: 'email', expectedElements: 100000, falsePositiveRate: 0.001 })
    bloomFilter.createBloomFilter({ filterName: 'phoneNumber', expectedElements: 100000, falsePositiveRate: 0.001 })

    // Giới hạn số lượng requests của 1 IP
    fastify.register(RateLimit, {
      max: 100,
      timeWindow: '1 minute',
      allowList: ['127.0.0.1', 'localhost'],
      errorResponseBuilder(req, context) {
        return {
          statusCode: 429,
          error: 'Too Many Requests',
          message: 'Quá nhiều requests từ IP này, vui lòng thử lại sau 1 phút',
          date: new Date().toISOString(),
          expires: context.ttl
        }
      }
    })

    const whitelist = ['*']
    fastify.register(cors, {
      origin: whitelist, // Cho phép tất cả các domain gọi API
      credentials: true // Cho phép trình duyệt gửi cookie đến server
    })

    fastify.register(fastifyAuth, {
      defaultRelation: 'and'
    })
    fastify.register(fastifyHelmet, {
      crossOriginResourcePolicy: {
        policy: 'cross-origin'
      }
    })
    fastify.register(fastifyCookie)
    fastify.register(validatorCompilerPlugin)
    fastify.register(errorHandlerPlugin)
    fastify.register(authRoutes, {
      prefix: '/auth'
    })
    fastify.register(accountRoutes, {
      prefix: '/account'
    })
    fastify.register(mediaRoutes, {
      prefix: '/media'
    })
    fastify.register(staticRoutes, {
      prefix: '/static'
    })
    fastify.register(productRoutes, {
      prefix: '/products'
    })
    fastify.register(testRoutes, {
      prefix: '/test'
    })
    await fastify.listen({
      port: envConfig.PORT,
      host: envConfig.IS_PRODUCTION ? '0.0.0.0' : 'localhost'
    })
    console.log(`Server đang chạy dưới local tại: ${API_URL}`)
    if (envConfig.IS_PRODUCTION) {
      console.log(`Đang ở mode production với domain: ${envConfig.PRODUCTION_URL}`)
    }
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
