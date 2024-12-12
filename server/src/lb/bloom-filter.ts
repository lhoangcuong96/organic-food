import { FastifyInstance } from 'fastify'

// Tạo bloom filter để lưu trữ email và phoneNumber cho 100000 phần tử với sai số 0.001

export class BloomFilterService {
  fastify: FastifyInstance | undefined
  static instance: BloomFilterService
  constructor(fastify?: FastifyInstance) {
    if (BloomFilterService.instance) {
      return (BloomFilterService.instance = this)
    }
    this.fastify = fastify
    BloomFilterService.instance = this
  }
  async createBloomFilter({
    filterName,
    expectedElements,
    falsePositiveRate
  }: {
    filterName: string
    expectedElements: number
    falsePositiveRate: number
  }) {
    try {
      const result = await this.fastify?.redis.call('BF.RESERVE', filterName, expectedElements, falsePositiveRate)
      return { success: true, message: `Bloom Filter "email" created.` }
    } catch (error) {
      console.error(`Bloom filter ${filterName} đã được tạo sẵn.`)
    }
  }
  async add({ filterName, value }: { filterName: string; value: string }) {
    const result = await this.fastify?.redis.call('BF.ADD', filterName, value)
    return { success: true, message: result ? 'Email added.' : 'Email may already exist.' }
  }
  async check({ filterName, value }: { filterName: string; value: string }): Promise<boolean> {
    const result = await this.fastify?.redis.call('BF.EXISTS', filterName, value)
    return result as boolean
  }
  static getInstance() {
    if (!BloomFilterService.instance) {
      throw new Error('BloomFilterService is not initialized.')
    }
    return BloomFilterService.instance
  }
}
