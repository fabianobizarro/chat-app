FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install

ENV APP_PORT=80
EXPOSE $APP_PORT

CMD ["npm", "start"]