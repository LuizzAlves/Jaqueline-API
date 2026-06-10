FROM node:20-alpine

WORKDIR /app

COPY client/package*.json ./client/
COPY server/package*.json ./server/

ARG GIT_SHA=local

RUN npm install --include=optional --prefix ./client \
  && npm install --no-save --prefix ./client @rollup/rollup-linux-x64-musl@4.61.1 \
  && npm install --omit=dev --prefix ./server

COPY . .

RUN npm run build --prefix ./client

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start", "--prefix", "server"]
