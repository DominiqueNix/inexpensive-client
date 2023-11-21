FROM node:20-alpine3.17

ENV NODE_ENV development

COPY package.json package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

# RUN npm run build

CMD npm start
