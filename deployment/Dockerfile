# Production Dockerfile for I-Varse Corporate Website
# Expects frontend to be pre-built by Jenkins CI/CD pipeline
# Multi-service container: Frontend (Node serve) + Strapi CMS

FROM node:18-slim AS runtime

# Build args for cache busting
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    netcat-openbsd \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Install serve globally for frontend
RUN npm install -g serve pm2

# Cache busting: Invalidates cache when BUILD_DATE changes
RUN echo "Build date: ${BUILD_DATE}" > /app/build_info.txt && \
    echo "VCS ref: ${VCS_REF}" >> /app/build_info.txt && \
    echo "Version: ${VERSION}" >> /app/build_info.txt

# Copy PRE-BUILT frontend from Jenkins (dist folder)
COPY client/dist ./frontend/dist

# Copy Strapi backend
COPY I-VarseTech\ CMS\ Backend ./strapi/

# Install Strapi dependencies
WORKDIR /app/strapi
RUN npm ci --only=production

# Copy deployment scripts
WORKDIR /app
COPY deployment/ ./deployment/

# Create necessary directories and set permissions
RUN mkdir -p logs && \
    chmod +x ./deployment/*.sh && \
    useradd -m -u 1000 ivarse && \
    chown -R ivarse:ivarse /app

# Switch to non-root user
USER ivarse

# Set environment variables
ENV NODE_ENV=production
ENV STRAPI_ADMIN_PATH=/admin

# Expose ports
# 3000 - Frontend (serve)
# 1337 - Strapi CMS
EXPOSE 3000 1337

# Health check - verify both services are running
HEALTHCHECK --interval=30s --timeout=30s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/ && \
        curl -f http://localhost:1337/_health || exit 1

# Use entrypoint script to start both services with PM2
ENTRYPOINT ["./deployment/docker-entrypoint.sh"]
