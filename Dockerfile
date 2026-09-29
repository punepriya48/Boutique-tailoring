# =========================================================
# STAGE 1: Build the React + Vite Frontend Application
# =========================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package configuration files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy full application source code
COPY . .

# Build production bundle (generates /app/dist)
RUN npm run build

# =========================================================
# STAGE 2: Production Server Runner
# =========================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built frontend dist from builder stage
COPY --from=builder /app/dist ./dist

# Copy server code and source files
COPY --from=builder /app/server ./server
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public

# Expose server port
EXPOSE 5000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start Node.js Express server
CMD ["node", "server/index.js"]
