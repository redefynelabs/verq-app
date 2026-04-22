FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable

ENV NODE_ENV=production

# Copy only lock + package
COPY package.json pnpm-lock.yaml ./

# Install deps using pnpm
RUN pnpm install --frozen-lockfile

# Copy rest (node_modules ignored via .dockerignore)
COPY . .

# Build Strapi
RUN pnpm build


FROM node:20-alpine

WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production

COPY --from=builder /app /app

EXPOSE 1337

CMD ["pnpm", "start"]