import { log } from '../../infrastructure/config'
import { type FastifyInstance } from 'fastify'
import { type ExampleService } from '../../app/service/Service'

export class InputAdapter {
  private readonly fastify: FastifyInstance
  private readonly service: ExampleService

  constructor (fastify: FastifyInstance, service: ExampleService) {
    this.fastify = fastify
    this.service = service
  }

  initializeRoutes (): void {
    this.fastify.get<{ Params: { id: string } }>('/api/:id', async (request, reply) => {
      try {
        log.info(`GET /api/:id request received - id: ${request.params.id}`)

        const response = await this.service.getById(request.params.id)

        log.info(`GET /api/:id response sent - response: ${response}`)

        await reply.code(200).send({ response })
      } catch (err) {
        await reply.code(500).send({ message: 'Error ao procurar accountId' })
      }
    })
  }
}
