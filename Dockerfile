# Builder Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

# Production Stage (Distroless)
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=builder /app /app
USER 65532:65532
EXPOSE 3000
CMD ["apps/wallet/server.mjs"]
