FROM node:18.16.0-alpine3.16

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

ENTRYPOINT [ "npm", "start" ]
