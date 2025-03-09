FROM oven/bun:latest AS builder
ARG CXY_LANG_PLAYGROUND_API_SERVER
ENV VITE_CXY_API_SERVER=$CXY_LANG_PLAYGROUND_API_SERVER
# Build the application
COPY . /app
WORKDIR /app
RUN bun install
RUN bunx --bun vite build

FROM suilteam/cxyfs:latest 
RUN mkdir -p /etc/cxy-playground
COPY --from=builder /app/dist /etc/cxy-playground/www
ENV CXY_WWW_DIR=/etc/cxy-playground/www