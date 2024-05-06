FROM node:16-alpine3.18 

WORKDIR /usr/src/app

# Mount the secret file, read it, and use it without leaving it in the image layer
# RUN --mount=type=secret,id=OPENAI_API_KEY \
#     OPENAI_API_KEY=$(cat /run/secrets/OPENAI_API_KEY) && \
#     echo "The API key is secured but not exposed in the image"

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
