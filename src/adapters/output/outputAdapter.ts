import { type ExamplePort } from '../../app/domain/ports/examplePort'

export class OutputAdapter implements ExamplePort {
  private readonly url: string
  private readonly fakeDb: any = {
    1: { id: '1', name: 'John Doe' },
    2: { id: '2', name: 'Jane Doe' }
  }

  constructor () {
    this.url = process.env.API_URL ?? ''
  }

  async getById (id: string): Promise<any> {
    const response = this.fakeDb[id]
    return response
  }
}
