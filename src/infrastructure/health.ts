import { type FastifyInstance } from 'fastify'

export class HealthCheck {
  private readonly fastify: FastifyInstance

  constructor (fastify: FastifyInstance) {
    this.fastify = fastify
  }

  initHealthCheck (): void {
    this.fastify.get('/health', async () => {
      return { status: 'UP' }
    })
  }
}
