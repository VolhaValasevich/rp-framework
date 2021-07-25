FROM node:lts-alpine

COPY / ./workdir/
WORKDIR workdir

RUN npm i
