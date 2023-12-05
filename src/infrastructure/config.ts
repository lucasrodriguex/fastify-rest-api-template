import Fastify, { type FastifyInstance } from 'fastify'
import ecsFormat from '@elastic/ecs-pino-format'
import { nanoid } from 'nanoid'
import { AsyncLocalStorage } from 'async_hooks'

const executionContext = new AsyncLocalStorage< string>()

const config: FastifyInstance = Fastify({
  logger: {
    ...ecsFormat(),
    mixin () {
      return {
        'trace.id': executionContext.getStore()
      }
    }
  },
  disableRequestLogging: true,
  genReqId: () => nanoid(10),
  requestIdLogLabel: 'trace.id'
})

config.addHook('preHandler', (request, _, next) => {
  executionContext.run(request.id, next)
})

export default config
export const log = config.log
