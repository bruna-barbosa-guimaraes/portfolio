FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json

RUN npm ci

FROM node:20-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL=http://localhost:3333
ARG NEXT_PUBLIC_GITHUB_URL=https://github.com/seu-usuario
ARG NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/seu-usuario
ARG NEXT_PUBLIC_EMAIL=bruna@example.com
ARG NEXT_PUBLIC_FORMSPREE_ENDPOINT=
ARG API_INTERNAL_URL=http://api:3333

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL
ENV NEXT_PUBLIC_LINKEDIN_URL=$NEXT_PUBLIC_LINKEDIN_URL
ENV NEXT_PUBLIC_EMAIL=$NEXT_PUBLIC_EMAIL
ENV NEXT_PUBLIC_FORMSPREE_ENDPOINT=$NEXT_PUBLIC_FORMSPREE_ENDPOINT
ENV API_INTERNAL_URL=$API_INTERNAL_URL

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/web ./apps/web

RUN npm run build --workspace apps/web
RUN npm prune --omit=dev

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV API_INTERNAL_URL=http://api:3333

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace", "apps/web", "--", "-H", "0.0.0.0", "-p", "3000"]
