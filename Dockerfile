FROM node:13-alpine as base
FROM base as builder

RUN apk update && apk upgrade
RUN apk add git

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

FROM base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . /usr/src/app/

RUN npm run build

EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
