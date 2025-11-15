# Production Dockerfile for Email Marketing SaaS
# Expects frontend to be pre-built by CI/CD pipeline

FROM python:3.11-slim AS runtime

# Build arg for cache busting - forces Docker to invalidate cache layers
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    default-libmysqlclient-dev \
    mariadb-client \
    curl \
    wget \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements first for better caching
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY backend/ .

# Cache busting: This invalidates cache when BUILD_DATE changes
RUN echo "Build date: ${BUILD_DATE}" > /app/build_info.txt && \
    echo "VCS ref: ${VCS_REF}" >> /app/build_info.txt && \
    echo "Version: ${VERSION}" >> /app/build_info.txt

# Copy PRE-BUILT frontend from CI/CD pipeline (not rebuilding)
# This layer will be invalidated by the RUN command above
# Jenkins builds frontend before Docker, so we just copy the dist folder
COPY frontend-clean/dist ./frontend/dist

# Copy docker deployment scripts
COPY docker-deployment/ ./docker-deployment/

# Create necessary directories and set permissions BEFORE changing user
RUN mkdir -p uploads logs backups && \
    chmod +x ./docker-deployment/*.sh && \
    useradd -m -u 1000 emailsaas && \
    chown -R emailsaas:emailsaas /app

# Switch to non-root user
USER emailsaas

# Set environment variables
ENV FLASK_APP=run.py
ENV FLASK_ENV=production
ENV PYTHONPATH=/app

# Expose port
EXPOSE 5000

# Health check - verify both Flask and RQ worker are running
HEALTHCHECK --interval=30s --timeout=30s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:5000/api/settings/info && \
        ps aux | grep "rq_worker.py" | grep -v grep > /dev/null || exit 1

# Use entrypoint script
ENTRYPOINT ["./docker-deployment/docker-entrypoint.sh"]