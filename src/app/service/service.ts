import { log } from '../../infrastructure/config'
import { type ExamplePort } from '../domain/ports/examplePort'
import { AppError } from '../domain/errors/appError'

// your service class to run business logic and call output ports
export class ExampleService {
  constructor(private readonly outputAdapter: ExamplePort) {}

  async getById(id: string): Promise<any> {
    if (id === '') {
      log.error('id is required')
      throw new AppError('id is required', 400)
    }

    const response = await this.outputAdapter.getById(id)
    if (response == null) {
      log.warn('response is null')
      throw new AppError('Not found', 404)
    }

    return response
  }
}
