# Production Build

# Stage 1: Build react client
FROM node:16.13.0 as client
WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install --production
COPY client/ ./
RUN npm run build

# Stage 2 : Build Server
FROM node:16.13.0
WORKDIR /usr/src/app/
COPY --from=client /usr/app/client/build/ ./client/build/
WORKDIR /usr/src/app/server/
COPY server/package*.json ./
RUN npm install --production
COPY server/ ./

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]