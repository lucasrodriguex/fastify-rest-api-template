import { ExampleService } from '../../src/app/service/service'
import { OutputAdapter } from '../../src/adapters/output/outputAdapter'
import { AppError } from '../../src/app/domain/errors/appError'

jest.mock('../../src/adapters/output/outputAdapter')

describe('ExampleService', () => {
  let exampleService: ExampleService
  let outputAdapter: OutputAdapter

  beforeEach(() => {
    outputAdapter = new OutputAdapter()
    exampleService = new ExampleService(outputAdapter)
  })

  it('should return response for valid id', async () => {
    outputAdapter.getById = jest.fn().mockResolvedValue({ id: '1', name: 'John Doe' })

    const response = await exampleService.getById('1')

    expect(response).toEqual({ id: '1', name: 'John Doe' })
  })

  it('should throw AppError for empty id', async () => {
    await expect(exampleService.getById('')).rejects.toThrow(new AppError('id is required', 400))
  })

  it('should throw AppError for not found response', async () => {
    outputAdapter.getById = jest.fn().mockResolvedValue(null)

    await expect(exampleService.getById('1')).rejects.toThrow(new AppError('Not found', 404))
  })
})
