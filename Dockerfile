FROM node:17-alpine3.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/
RUN chown -R node:node /usr/src/app/
USER node

CMD npm run start
