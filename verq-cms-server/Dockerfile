FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable

ENV NODE_ENV=production

# Copy only lock + package
COPY package.json pnpm-lock.yaml ./

# Install deps using pnpm
RUN pnpm install --frozen-lockfile

# Copy rest
COPY . .

# Build Strapi
RUN pnpm build


FROM node:22-alpine

WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production

COPY --from=builder /app /app

EXPOSE 1337

CMD ["pnpm", "start"]