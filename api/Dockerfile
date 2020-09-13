FROM node:11-alpine
WORKDIR /home/nodejs/app
COPY . .
COPY .env_docker .env
RUN npm install --production
CMD npm start
