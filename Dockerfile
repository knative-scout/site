FROM alpine:latest

RUN apk add caddy nodejs yarn python python3

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn add react-scripts
RUN yarn build

CMD caddy
