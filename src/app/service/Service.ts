import { log } from '../../infrastructure/config'
import { type ExamplePort } from '../ports/ExamplePort'

// your service class to run business logic and call output ports
export class ExampleService {
  private readonly outputAdapter: ExamplePort

  constructor (outputAdapter: ExamplePort) {
    this.outputAdapter = outputAdapter
  }

  async getById (id: string): Promise<any> {
    if (id === '') {
      log.error('id is required')
      throw new Error('id is required')
    }
    const response = await this.outputAdapter.getById(id)
    return response
  }
}
