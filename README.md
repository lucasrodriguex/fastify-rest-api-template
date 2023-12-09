# Fastify Boilerplate
This project contains a template to build cloud native REST APIs using Fastify with all configuration

Lang: Typescript

Lint: eslint configured

Logs: configured using elastic search ecs logging, with configured traceId

Monitoring: built in monitoring using prometheus in `/metrics` endpoint

Architecture: this project organization follows [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) pattern

Healthcheck: health check endpoint is `/health`, feel free to change if you need to validade some dependency

Swagger: you can access auto generate swagger in `/` route of application. Feel free to customize Swagger, more details [here](https://github.com/fastify/fastify-swagger)

Dockerfile with distroless image and docker-compose file so you can easily run in any cloud provider

API default PORT is 3000, you can change setting env var API_PORT to other.

## Setup
```bash
npm install
```

## Run development with live reload

```bash
npm run dev
```

## Run application

```bash
npm start
```

## Run with Docker using docker compose

```bash
docker compose up
```

## Run VSCode Debug
This project is configured to run in VSCode in folder `.vscode`

To run in Debug in VSCode click on Run -> Start Debugging

Debug configuration is registered as `Launch Program with ts-node`