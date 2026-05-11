FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build


FROM node:22-alpine

WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production

COPY --from=builder /app /app

EXPOSE 1337

CMD ["pnpm", "start"]