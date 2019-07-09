FROM node:12-stretch-slim as base
FROM base as builder
RUN apt update && apt upgrade -y
RUN apt install -y git

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

FROM base

RUN GRPC_HEALTH_PROBE_VERSION=v0.2.0 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . /usr/src/app/

RUN npm run build

ENV HOST 0.0.0.0

EXPOSE 3000

CMD [ "npm", "start" ]
