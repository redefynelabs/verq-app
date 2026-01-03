# ===============================
# Build stage
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Disable telemetry & control memory
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=2048

# Copy dependency files
COPY package.json package-lock.json ./

# Install deps
RUN npm install

# Copy source
COPY . .

# Build Next.js
RUN npm run build


# ===============================
# Runtime stage
# ===============================
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "start"]
