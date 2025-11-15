#!/bin/bash
set -e

echo "🚀 Starting Email Marketing SaaS services..."

# Function to handle shutdown
cleanup() {
    echo "🛑 Shutting down services..."
    if [ ! -z "$RQ_PID" ]; then
        kill -TERM "$RQ_PID" 2>/dev/null || true
        wait "$RQ_PID" 2>/dev/null || true
        echo "✅ RQ Worker stopped"
    fi
    if [ ! -z "$GUNICORN_PID" ]; then
        kill -TERM "$GUNICORN_PID" 2>/dev/null || true
        wait "$GUNICORN_PID" 2>/dev/null || true
        echo "✅ Gunicorn stopped"
    fi
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

cd /app/backend

# Start RQ Worker in background
echo "🔄 Starting RQ Worker..."
python3 rq_worker.py &
RQ_PID=$!
echo "✅ RQ Worker started (PID: $RQ_PID)"

# Wait a moment to ensure RQ worker starts properly
sleep 2

# Check if RQ worker is still running
if ! kill -0 $RQ_PID 2>/dev/null; then
    echo "❌ RQ Worker failed to start"
    exit 1
fi

# Start Gunicorn
echo "🌐 Starting Gunicorn server..."
gunicorn \
    --bind 0.0.0.0:5000 \
    --workers 4 \
    --worker-class gevent \
    --worker-connections 1000 \
    --timeout 120 \
    --keepalive 5 \
    --max-requests 1000 \
    --max-requests-jitter 100 \
    --preload \
    --access-logfile - \
    --error-logfile - \
    --log-level info \
    --capture-output \
    wsgi:application &

GUNICORN_PID=$!
echo "✅ Gunicorn started (PID: $GUNICORN_PID)"

# Wait for both processes
wait $RQ_PID $GUNICORN_PID