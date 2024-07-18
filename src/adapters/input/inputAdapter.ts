import { log } from '../../infrastructure/config'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { type ExampleService } from '../../app/service/service'
import { AppError } from '../../app/domain/errors/appError'

export interface GetInputRequest extends FastifyRequest {
  params: {
    id: string
  }
}

export class InputAdapter {
  constructor(private readonly service: ExampleService) {}

  async processInputRequest(request: GetInputRequest, reply: FastifyReply): Promise<void> {
    try {
      log.info(`GET /api/:id request received - id: ${request.params.id}`)

      const response = await this.service.getById(request.params.id)

      log.info(`GET /api/:id response sent - response: ${JSON.stringify(response)}`)

      await reply.code(200).send({ response })
    } catch (err) {
      if (err instanceof AppError) {
        log.error(err)
        await reply.code(err.statusCode).send({ message: err.message })
      } else {
        await reply.code(500).send({ message: 'Error ao procurar accountId' })
      }
    }
  }
}
