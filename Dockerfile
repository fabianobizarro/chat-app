FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install

ENV PORT=80
EXPOSE $APP_PORT

CMD ["npm", "start"]