FROM node:14-alpine

ENV CI=true

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .

RUN ["npm", "install", "--production"]
COPY . .

CMD ["npm", "start"]