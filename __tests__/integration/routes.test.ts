import Fastify from 'fastify'
import { inputRoutes } from '../../src/adapters/routes/inputRoutes'

describe('inputRoutes', () => {
  let fastify: any

  beforeAll(async () => {
    fastify = Fastify()
    await fastify.register(inputRoutes)
    await fastify.ready()
  })

  afterAll(async () => {
    await fastify.close()
  })

  it('GET /api/:id should return 200 for valid id', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/1',
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({ response: { id: '1', name: 'John Doe' } })
  })

  it('GET /api/:id should return 400 for empty id', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/',
    })

    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.body)).toEqual({ message: 'id is required' })
  })

  it('GET /api/:id should return 404 for non-existent id', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/3',
    })

    expect(response.statusCode).toBe(404)
    expect(JSON.parse(response.body)).toEqual({ message: 'Not found' })
  })
})
