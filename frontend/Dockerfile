# Install dependencies
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable
ENV pnpm_config_dangerously_allow_all_builds=true
RUN pnpm install --frozen-lockfile

# Build app
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable
RUN pnpm build

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable 

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["pnpm", "start"]