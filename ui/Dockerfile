FROM node:18.16.0

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
