FROM node:current-alpine

RUN mkdir /workdir
WORKDIR /workdir

EXPOSE 3000

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN rm -rf .env && mv docker.env .env
RUN yarn build

ENTRYPOINT [ "node", "build/index.js" ]
