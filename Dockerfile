FROM node:11-alpine

ENV APP_ROOT /usr/src/app

RUN apk update && apk upgrade && apk add git

RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install --only=production

ENV HOST 0.0.0.0

EXPOSE 3000

CMD npm start
