FROM node:16-alpine3.18 

WORKDIR /usr/src/app

# Install curl to be used during healthcheck
RUN apk update && \
    apk add --no-cache curl

COPY package*.json ./

RUN apt-get update && apt-get install -y curl

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
