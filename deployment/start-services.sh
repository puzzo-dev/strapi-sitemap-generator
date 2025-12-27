#!/bin/bash
# Start I-Varse Website Services in Production

set -e

echo "🚀 Starting I-Varse Website Deployment"
echo "======================================"

# Load environment variables
if [ -f .env.production ]; then
    echo "✅ Loading environment variables from .env.production"
    export $(grep -v '^#' .env.production | xargs)
else
    echo "❌ Error: .env.production file not found!"
    echo "Copy .env.production.example to .env.production and configure it."
    exit 1
fi

# Validate required variables
REQUIRED_VARS=(
    "DOMAIN"
    "DB_PASSWORD"
    "JWT_SECRET"
    "ADMIN_JWT_SECRET"
    "API_TOKEN_SALT"
    "APP_KEYS"
)

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: Required variable $var is not set in .env.production"
        exit 1
    fi
done

echo "✅ All required variables are set"
echo ""

# Set build information
export BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
export VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
export VERSION=${VERSION:-1.0.0}

echo "📦 Build Information:"
echo "   Date: $BUILD_DATE"
echo "   VCS Ref: $VCS_REF"
echo "   Version: $VERSION"
echo ""

# Pull latest image if exists
echo "🔄 Pulling latest image (if available)..."
docker-compose -f docker-compose.production.yml pull || echo "⚠️ Image pull skipped"

# Build the image
echo "🔨 Building Docker image..."
docker-compose -f docker-compose.production.yml build \
    --build-arg BUILD_DATE="$BUILD_DATE" \
    --build-arg VCS_REF="$VCS_REF" \
    --build-arg VERSION="$VERSION"

# Stop existing container
echo "🛑 Stopping existing services..."
docker-compose -f docker-compose.production.yml down || echo "No services to stop"

# Start services
echo "🚀 Starting services..."
docker-compose -f docker-compose.production.yml up -d

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo ""
echo "🔍 Checking service status..."
docker-compose -f docker-compose.production.yml ps

# Show logs
echo ""
echo "📋 Recent logs:"
docker-compose -f docker-compose.production.yml logs --tail=50

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your services are available at:"
echo "   - Frontend: https://$DOMAIN"
echo "   - Strapi CMS: https://cms.$DOMAIN"
echo ""
echo "📊 View logs:"
echo "   docker-compose -f docker-compose.production.yml logs -f"
echo ""
echo "🛑 Stop services:"
echo "   docker-compose -f docker-compose.production.yml down"
echo ""
