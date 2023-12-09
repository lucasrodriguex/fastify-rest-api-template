import app, { log } from './infrastructure/config'
import { config as dotenvConfig } from 'dotenv'
import * as process from 'process'
import { InputAdapter } from './adapters/input/InputAdapter'
import { OutputAdapter } from './adapters/output/OutputAdapter'

import { ExampleService } from './app/service/Service'
import { HealthCheck } from './infrastructure/health'
import { Swagger } from './infrastructure/swagger'
import { Metrics } from './infrastructure/metrics'

dotenvConfig()

const start = async (): Promise<void> => {
  try {
    initHealthcheck()
    await initMetrics()

    await initSwagger()
    initDependencies()

    await app.ready()
    await app.listen({ port: parseInt(process.env.API_PORT ?? '3000'), host: '0.0.0.0' })
  } catch (err) {
    log.error(err)
    process.exit(1)
  }
}

void start()

function initDependencies (): void {
  const outputAdapter = new OutputAdapter()
  const service = new ExampleService(outputAdapter)
  const restAdapter = new InputAdapter(app, service)

  restAdapter.initializeRoutes()
}

async function initMetrics (): Promise<void> {
  const metrics = new Metrics(app)
  await metrics.initMetrics()
}

function initHealthcheck (): void {
  const healthCheck = new HealthCheck(app)
  healthCheck.initHealthCheck()
}

async function initSwagger (): Promise<void> {
  const swagger = new Swagger(app)
  await swagger.initSwagger()
}
