FROM node:22-alpine AS installer
WORKDIR /usr/app/

COPY package*.json .

RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /usr/app

COPY . .
COPY --from=installer /usr/app/node_modules node_modules

RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /usr/app

COPY --from=builder /usr/app/node_modules node_modules
COPY --from=builder /usr/app/dist .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["server/index.js"]
