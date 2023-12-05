# Fastify Boilerplate
This project contains a template to build Fastify Rest APIs with all configuration

Lang: Typescript

Lint: eslint configured

Logs: configured using elastic search ecs logging, with configured traceId

Monitorig: built in monitoring using prometheus in `/metrics` endpoint

Architecture: this project organization follows [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) pattern

Healthcheck: health check endpoint is `/health`, feel free to change if you need to validade some dependency

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

## Run VSCode Debug
This project is configured to run in VSCode in folder `.vscode`

To run in Debug in VSCode click on Run -> Start Debugging

Debug configuration is registered as `Launch Program with ts-node`

## Run production

```bash
npm start
```
