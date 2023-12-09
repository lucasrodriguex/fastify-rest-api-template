// await app.register(swagger)

import { type FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

export class Swagger {
  private readonly fastify: FastifyInstance

  constructor (fastify: FastifyInstance) {
    this.fastify = fastify
  }

  async initSwagger (): Promise<void> {
    await this.fastify.register(swagger)

    await this.fastify.register(swaggerUI, {
      routePrefix: '/',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      staticCSP: true,
      transformSpecificationClone: true
    })
  }
}
