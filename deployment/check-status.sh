#!/bin/bash
# Check I-Varse Website Service Status

echo "🔍 I-Varse Website Status Check"
echo "================================"
echo ""

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose not found"
    exit 1
fi

# Load environment
if [ -f .env.production ]; then
    export $(grep -v '^#' .env.production | xargs)
fi

# Check container status
echo "📦 Container Status:"
docker-compose -f docker-compose.production.yml ps
echo ""

# Check service health
CONTAINER_NAME="ivarse-website-v1"

if docker ps | grep -q $CONTAINER_NAME; then
    echo "✅ Container is running"
    echo ""
    
    # Check frontend health
    echo "🌐 Frontend Health Check:"
    docker exec $CONTAINER_NAME curl -f -s http://localhost:3000/ > /dev/null && \
        echo "✅ Frontend is responding" || \
        echo "❌ Frontend is not responding"
    
    # Check Strapi health
    echo ""
    echo "📚 Strapi CMS Health Check:"
    docker exec $CONTAINER_NAME curl -f -s http://localhost:1337/_health > /dev/null && \
        echo "✅ Strapi is responding" || \
        echo "❌ Strapi is not responding"
    
    # Show resource usage
    echo ""
    echo "💻 Resource Usage:"
    docker stats $CONTAINER_NAME --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
    
    # Show recent logs
    echo ""
    echo "📋 Recent Logs (last 20 lines):"
    docker-compose -f docker-compose.production.yml logs --tail=20
    
else
    echo "❌ Container is not running"
    echo ""
    echo "Start it with:"
    echo "  ./start-services.sh"
fi

echo ""
echo "🌐 External URLs:"
echo "   Frontend: https://${DOMAIN:-itechnologies.ng}"
echo "   Strapi: https://cms.${DOMAIN:-itechnologies.ng}"
echo ""
