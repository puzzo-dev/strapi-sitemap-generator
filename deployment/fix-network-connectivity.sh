#!/bin/bash
# Fix network connectivity issues for I-Varse Website

echo "🔧 Fixing Network Connectivity"
echo "==============================="
echo ""

# Load environment
if [ -f .env.production ]; then
    export $(grep -v '^#' .env.production | xargs)
fi

echo "1️⃣ Recreating networks..."
docker network rm ivarse-website-network 2>/dev/null || true
docker-compose -f docker-compose.production.yml up --no-start

echo ""
echo "2️⃣ Reconnecting to external networks..."
docker network connect traefik-public ivarse-website-v1 2>/dev/null || echo "Already connected to traefik-public"
docker network connect mariadb-network ivarse-website-v1 2>/dev/null || echo "Already connected to mariadb-network"

echo ""
echo "3️⃣ Restarting container..."
docker-compose -f docker-compose.production.yml restart

echo ""
echo "4️⃣ Checking network connectivity..."
sleep 5
docker exec ivarse-website-v1 nc -zv ${DB_HOST:-mariadb-database} ${DB_PORT:-3306} && \
    echo "✅ Database connectivity OK" || \
    echo "❌ Database connectivity failed"

echo ""
echo "✅ Network fix complete!"
echo ""
echo "Check status with:"
echo "  ./check-status.sh"
echo ""
