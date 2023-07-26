FROM node:current-alpine

RUN mkdir /workdir
WORKDIR /workdir

EXPOSE 3000

COPY . .
RUN rm -rf .env
RUN yarn install
RUN yarn build

ENTRYPOINT [ "node", "build/index.js" ]
