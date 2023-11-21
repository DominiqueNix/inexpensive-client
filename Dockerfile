FROM node:20-alpine3.17

COPY package.json package-lock.json .

RUN npm install

COPY . .

# RUN npm run build

CMD ["npm", "start"]
