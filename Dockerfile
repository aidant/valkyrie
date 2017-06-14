FROM ubuntu:14.04

RUN sudo apt-get update \
  && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - \
  && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install; exit 0

COPY . /usr/src/app
RUN node_modules/.bin/gulp

ENV NODE_ENV production
CMD npm run start
