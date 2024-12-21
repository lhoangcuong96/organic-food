import envConfig from '@/config'
import { BloomFilterService } from '@/lb/bloom-filter'
import fastifyRedis, { FastifyRedis } from '@fastify/redis'
import { FastifyInstance } from 'fastify'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      redis?: FastifyRedis
    }
  }
}

export async function registerRedis(fastify: FastifyInstance) {
  fastify
    .register(fastifyRedis, {
      url: envConfig.REDIS_URL
    })
    .after(() => {
      ;(global as NodeJS.Global).redis = fastify.redis
      // sử dụng lrucache để lưu trữ dữ liệu
      // redis cloud không hỗ trợ những key này
      // fastify.redis.config('SET', 'maxmemory', '20mb')
      // fastify.redis.config('SET', 'maxmemory-policy', 'allkeys-lru')

      // Sử dụng bloom filter để lưu trữ email và phoneNumber
      const bloomFilter = new BloomFilterService(fastify)
      bloomFilter.createBloomFilter({ filterName: 'email', expectedElements: 100000, falsePositiveRate: 0.001 })
      bloomFilter.createBloomFilter({ filterName: 'phoneNumber', expectedElements: 100000, falsePositiveRate: 0.001 })
    })
}

export const redisInstance = (global as NodeJS.Global).redis
