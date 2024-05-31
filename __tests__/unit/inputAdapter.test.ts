import { type FastifyReply } from 'fastify'
import { InputAdapter } from '../../src/adapters/input/inputAdapter'
import { ExampleService } from '../../src/app/service/service'
import { AppError } from '../../src/app/domain/errors/appError'

jest.mock('../../src/app/service/service')

describe('InputAdapter', () => {
  let inputAdapter: InputAdapter
  let exampleService: ExampleService
  let reply: FastifyReply

  beforeEach(() => {
    exampleService = new ExampleService({} as any)
    inputAdapter = new InputAdapter(exampleService)
    reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any
  })

  it('should process input request successfully', async () => {
    const request = { params: { id: '1' } }
    exampleService.getById = jest.fn().mockResolvedValue({ id: '1', name: 'John Doe' })

    await inputAdapter.processInputRequest(request as any, reply)

    expect(reply.code).toHaveBeenCalledWith(200)
    expect(reply.send).toHaveBeenCalledWith({ response: { id: '1', name: 'John Doe' } })
  })

  it('should handle AppError', async () => {
    const request = { params: { id: '' } }
    exampleService.getById = jest.fn().mockRejectedValue(new AppError('id is required', 400))

    await inputAdapter.processInputRequest(request as any, reply)

    expect(reply.code).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({ message: 'id is required' })
  })

  it('should handle unknown errors', async () => {
    const request = { params: { id: '1' } }
    exampleService.getById = jest.fn().mockRejectedValue(new Error('Unknown error'))

    await inputAdapter.processInputRequest(request as any, reply)

    expect(reply.code).toHaveBeenCalledWith(500)
    expect(reply.send).toHaveBeenCalledWith({ message: 'Error ao procurar accountId' })
  })
})
