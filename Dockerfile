FROM node:16.19.0-slim

WORKDIR /app
COPY ./dist/src  ./dist
COPY ./package.json ./.env ./

RUN yarn install

EXPOSE 3000

CMD yarn start:prod
