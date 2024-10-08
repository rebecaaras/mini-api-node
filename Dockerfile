
FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["npm", "run", "start"]
