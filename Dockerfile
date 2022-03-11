FROM node:alpine

WORKDIR /app

ENV NODE_ENV = production

COPY package*.json ./

RUN npm ci

COPY ./dist ./

CMD ["node", "main.js"]
