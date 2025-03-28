FROM oven/bun:latest AS builder
ARG CXY_LANG_PLAYGROUND_API_SERVER
ENV VITE_CXY_API_SERVER=$CXY_LANG_PLAYGROUND_API_SERVER
# Build the application
COPY . /app
WORKDIR /app
RUN bun install
RUN bunx --bun vite build

FROM suilteam/cxyfs:alpine-latest 
RUN mkdir -p /etc/cxy-playground
COPY --from=builder /app/dist /etc/cxy-playground/www
# Create the default configuration
RUN echo '{"root":"/etc/cxy-playground/www"}' > /etc/cxy-playground/cxyfs.json
ENV CXY_FS_CONFIG=/etc/cxy-playground/cxyfs.json
