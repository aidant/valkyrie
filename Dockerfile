FROM node:8

RUN apt-get update \
  && apt-get install -y libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install; exit 0

COPY . /usr/src/app
RUN node_modules/.bin/gulp

ENV NODE_ENV production
CMD npm run start
