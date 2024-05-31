import type { FastifyInstance } from 'fastify'

import { OutputAdapter } from '../output/outputAdapter'
import { ExampleService } from '../../app/service/service'
import { type GetInputRequest, InputAdapter } from '../input/inputAdapter'

export const inputRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const outputAdapter = new OutputAdapter()
  const service = new ExampleService(outputAdapter)
  const inputAdapter = new InputAdapter(service)

  fastify.get('/api/:id', {
    handler: async (request, reply) => {
      await inputAdapter.processInputRequest(request as GetInputRequest, reply)
    }
  })
}
