FROM node:7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install; exit 0

COPY . /usr/src/app
RUN node_modules/.bin/gulp

ENV NODE_ENV production
CMD npm run start
