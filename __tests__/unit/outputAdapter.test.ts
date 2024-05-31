import { OutputAdapter } from '../../src/adapters/output/outputAdapter'

describe('OutputAdapter', () => {
  let outputAdapter: OutputAdapter

  beforeEach(() => {
    outputAdapter = new OutputAdapter()
  })

  it('should return correct response for valid id', async () => {
    const response = await outputAdapter.getById('1')
    expect(response).toEqual({ id: '1', name: 'John Doe' })
  })

  it('should return null for invalid id', async () => {
    const response = await outputAdapter.getById('3')
    expect(response).toBeUndefined()
  })
})
