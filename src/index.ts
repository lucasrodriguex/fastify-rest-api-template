import app, { log } from './infrastructure/config'
import { config as dotenvConfig } from 'dotenv'
import * as process from 'process'
import { InputAdapter } from './adapters/input/InputAdapter'
import { OutputAdapter } from './adapters/output/OutputAdapter'
import metricsPlugin from 'fastify-metrics'
import { ExampleService } from './app/service/Service'
import { HealthCheck } from './infrastructure/health'

dotenvConfig()

function initDependencies (): void {
  const outputAdapter = new OutputAdapter()
  const service = new ExampleService(outputAdapter)
  const restAdapter = new InputAdapter(app, service)

  const healthCheck = new HealthCheck(app)

  restAdapter.initializeRoutes()
  healthCheck.initHealthCheck()
}

const start = async (): Promise<void> => {
  try {
    await app.register(metricsPlugin, {
      endpoint: '/metrics'
    })

    initDependencies()

    await app.ready()
    await app.listen({ port: parseInt(process.env.API_PORT ?? '3000'), host: '0.0.0.0' })
  } catch (err) {
    log.error(err)
    process.exit(1)
  }
}

void start()
