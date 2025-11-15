#!/bin/bash
set -e

echo "🔗 EmailSaaS Network Connection Fix"
echo "=================================="

# Get the container name
CONTAINER_NAME="email-marketing-saas"

# Check if container exists and is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo "❌ Container '$CONTAINER_NAME' is not running!"
    echo ""
    echo "Available containers:"
    docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"
    echo ""
    echo "Let's check if it exists but is stopped:"
    docker ps -a | grep -E "(email|marketing|saas)" || echo "No EmailSaaS containers found"
    echo ""
    echo "To start the container:"
    echo "  cd /opt/email-marketing-saas"
    echo "  docker-compose -f docker-compose.production.yml up -d"
    exit 1
fi

echo "✅ Container '$CONTAINER_NAME' is running"

# Function to connect to network if not already connected
connect_to_network() {
    local network=$1
    local container=$2
    
    echo -n "🔍 Checking connection to $network... "
    
    # Check if already connected
    if docker network inspect "$network" --format '{{range .Containers}}{{.Name}} {{end}}' | grep -q "$container"; then
        echo "✅ Already connected"
    else
        echo "❌ Not connected. Connecting..."
        if docker network connect "$network" "$container" 2>/dev/null; then
            echo "✅ Successfully connected to $network"
        else
            echo "❌ Failed to connect to $network"
            return 1
        fi
    fi
}

# Connect to required networks
echo ""
echo "📡 Connecting to required networks:"

connect_to_network "mariadb-network" "$CONTAINER_NAME"
connect_to_network "email-marketing-network" "$CONTAINER_NAME"
connect_to_network "traefik-public" "$CONTAINER_NAME"

echo ""
echo "🔍 Current network connections for $CONTAINER_NAME:"
docker inspect "$CONTAINER_NAME" --format '{{range $net, $conf := .NetworkSettings.Networks}}{{$net}} {{end}}'

echo ""
echo "🔍 MariaDB network members:"
docker network inspect mariadb-network --format '{{range .Containers}}{{.Name}} {{end}}' || echo "mariadb-network not found"

echo ""
echo "🔍 Email marketing network members:"
docker network inspect email-marketing-network --format '{{range .Containers}}{{.Name}} {{end}}' || echo "email-marketing-network not found"

echo ""
echo "✅ Network connection fix completed!"
echo ""
echo "🚀 Testing database connectivity..."
docker exec "$CONTAINER_NAME" python3 -c "
import os
import sys
sys.path.append('/app/backend')

try:
    # Test basic MySQL connectivity
    import pymysql
    
    # Get connection details from environment
    host = os.environ.get('DB_HOST', 'mariadb-database')
    port = int(os.environ.get('DB_PORT', 3306))
    user = os.environ.get('DB_USER', 'root')
    password = os.environ.get('DB_PASSWORD')
    
    print(f'🔌 Testing connection to {host}:{port} as {user}...')
    
    # Test connection
    conn = pymysql.connect(
        host=host,
        port=port,
        user=user,
        password=password,
        connect_timeout=5
    )
    
    with conn.cursor() as cursor:
        cursor.execute('SELECT VERSION()')
        version = cursor.fetchone()[0]
        print(f'✅ Database connection successful! MariaDB version: {version}')
    
    conn.close()
    
except Exception as e:
    print(f'❌ Database connection failed: {e}')
    sys.exit(1)
" && echo "🎉 Database connectivity test passed!" || echo "❌ Database connectivity test failed"

echo ""
echo "📋 Next steps if still having issues:"
echo "1. Check container logs: docker logs $CONTAINER_NAME"
echo "2. Restart the container: docker-compose -f docker-compose.production.yml restart"
echo "3. Check MariaDB is accessible: docker exec mariadb-database mysqladmin ping"