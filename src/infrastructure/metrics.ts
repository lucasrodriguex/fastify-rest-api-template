import { type FastifyInstance } from 'fastify'
import metricsPlugin from 'fastify-metrics'

export class Metrics {
  private readonly fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  async initMetrics(): Promise<void> {
    await this.fastify.register(metricsPlugin, {
      endpoint: '/metrics',
    })
  }
}
