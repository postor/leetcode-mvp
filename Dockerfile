FROM node:8-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm i 

COPY . /app

RUN npm run build

ENV NODE_ENV=production

CMD node server/index.js