# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS builder

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY . .
RUN npm ci
RUN --mount=type=secret,id=production_env,target=/app/apps/web/.env.production,required=false \
    npm run build --workspace=@cybercom/web

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health >/dev/null || exit 1

CMD ["node", "apps/web/server.js"]
