FROM node:20-alpine AS build-env
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src

FROM gcr.io/distroless/nodejs20-debian12:nonroot
COPY --from=build-env /app /app
WORKDIR /app
CMD ["node_modules/.bin/ts-node", "src/index.ts"]