# ===============================
# Build stage
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy source
COPY . .

# Build Strapi admin
RUN npm run build


# ===============================
# Runtime stage
# ===============================
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Copy built app
COPY --from=builder /app /app

EXPOSE 1337

CMD ["npm", "start"]
