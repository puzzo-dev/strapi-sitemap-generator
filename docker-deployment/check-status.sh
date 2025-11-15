#!/bin/bash

echo "📊 Email Marketing SaaS Status Check"
echo "===================================="

# Check if RQ worker is running
RQ_STATUS=$(ps aux | grep "rq_worker.py" | grep -v grep | wc -l)
if [ $RQ_STATUS -gt 0 ]; then
    echo "✅ RQ Worker: RUNNING"
    ps aux | grep "rq_worker.py" | grep -v grep | awk '{print "   PID:", $2, "CMD:", $11, $12, $13}'
else
    echo "❌ RQ Worker: NOT RUNNING"
fi

# Check if Gunicorn is running
GUNICORN_STATUS=$(ps aux | grep "gunicorn" | grep -v grep | wc -l)
if [ $GUNICORN_STATUS -gt 0 ]; then
    echo "✅ Gunicorn: RUNNING"
    ps aux | grep "gunicorn.*wsgi:application" | grep -v grep | awk '{print "   PID:", $2, "Workers:", $NF}'
else
    echo "❌ Gunicorn: NOT RUNNING"
fi

# Check database connectivity
echo ""
echo "🗄️  Database Connection Test:"
python3 -c "
import os
import sys
sys.path.insert(0, '/app/backend')

try:
    from app import create_app
    from app.models import db
    
    app = create_app()
    with app.app_context():
        db.engine.execute('SELECT 1')
        print('✅ Database: CONNECTED')
except Exception as e:
    print(f'❌ Database: ERROR - {e}')
" 2>/dev/null

# Check Redis connectivity
echo ""
echo "📦 Redis Connection Test:"
python3 -c "
import redis
import os

try:
    redis_host = os.environ.get('REDIS_HOST', 'crypto-indices-redis')
    redis_port = int(os.environ.get('REDIS_PORT', 6379))
    r = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)
    r.ping()
    print('✅ Redis: CONNECTED')
    
    # Check RQ queue
    from rq import Queue
    queue = Queue(connection=r)
    job_count = len(queue)
    print(f'📋 RQ Queue: {job_count} jobs pending')
except Exception as e:
    print(f'❌ Redis: ERROR - {e}')
" 2>/dev/null

echo ""
echo "🌐 Service Endpoints:"
echo "   Frontend: http://localhost:5000/"
echo "   API: http://localhost:5000/api/"
echo "   Health: http://localhost:5000/api/settings/info"