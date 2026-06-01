# ── Stage 1: Dependencies ─────────────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production --ignore-scripts && \
    cp -r node_modules /tmp/prod_modules && \
    npm ci --ignore-scripts

# ── Stage 2: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for public env vars (baked into the bundle at build time)
ARG NEXT_PUBLIC_OWNER_NAME="Alex Johnson"
ARG NEXT_PUBLIC_OWNER_TITLE="Full Stack Developer"
ARG NEXT_PUBLIC_OWNER_EMAIL="alex@example.com"
ARG NEXT_PUBLIC_GITHUB_URL="https://github.com/alexjohnson"
ARG NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/in/alexjohnson"

ENV NEXT_PUBLIC_OWNER_NAME=$NEXT_PUBLIC_OWNER_NAME
ENV NEXT_PUBLIC_OWNER_TITLE=$NEXT_PUBLIC_OWNER_TITLE
ENV NEXT_PUBLIC_OWNER_EMAIL=$NEXT_PUBLIC_OWNER_EMAIL
ENV NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL
ENV NEXT_PUBLIC_LINKEDIN_URL=$NEXT_PUBLIC_LINKEDIN_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 3: Runner ───────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/public           ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
