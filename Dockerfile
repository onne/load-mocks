FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./
COPY .npmrc ./

RUN npm ci && npx tsc

EXPOSE 80
CMD [ "node", "built/echo.js" ]