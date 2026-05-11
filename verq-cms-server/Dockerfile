FROM node:22-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json* ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build


FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app /app

EXPOSE 1337

CMD ["npm", "run", "start"]
