# Stage 1: Build the frontend
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build the backend and serve the application
FROM node:20-alpine
WORKDIR /app
COPY server/package*.json ./server/
RUN npm install --prefix server --omit=dev

COPY server/ ./server/
COPY --from=client-builder /app/client/dist ./client/dist

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

WORKDIR /app/server
CMD ["node", "server.js"]
