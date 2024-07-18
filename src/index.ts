import app, { log } from './infrastructure/config'
import { config as dotenvConfig } from 'dotenv'
import * as process from 'process'
import { setupSwagger } from './infrastructure/swagger'
import { Metrics } from './infrastructure/metrics'
import { inputRoutes } from './adapters/routes/inputRoutes'

dotenvConfig()

app.get('/health', async () => {
  return { status: 'ok' }
})

const start = async (): Promise<void> => {
  try {
    await initMetrics()
    await setupSwagger(app)

    await app.register(inputRoutes)

    await app.ready()
    await app.listen({ port: parseInt(process.env.API_PORT ?? '3000'), host: '0.0.0.0' })
  } catch (err) {
    log.error(err)
    process.exit(1)
  }
}

void start()

async function initMetrics(): Promise<void> {
  const metrics = new Metrics(app)
  await metrics.initMetrics()
}
