#!/bin/bash
set -e

echo "🚀 Starting Email Marketing SaaS..."

# Database connection details
DB_HOST=${DB_HOST:-mariadb-database}
DB_PORT=${DB_PORT:-3306}
DB_NAME=${DB_NAME:-emailsaas}
DB_USER=${DB_USER:-root}

# Wait for database to be ready
echo "⏳ Waiting for MariaDB database to be ready..."
while ! nc -z $DB_HOST $DB_PORT; do
  echo "⏳ Database not ready yet, waiting..."
  sleep 2
done
echo "✅ Database is ready!"

# Wait for existing Redis to be ready
echo "⏳ Waiting for Redis to be ready..."
REDIS_HOST=${REDIS_HOST:-crypto-indices-redis}
REDIS_PORT=${REDIS_PORT:-6379}
while ! nc -z $REDIS_HOST $REDIS_PORT; do
  echo "⏳ Redis not ready yet, waiting..."
  sleep 2
done
echo "✅ Redis is ready!"

# Stay in the current directory (/app) - backend files are already here
# cd /app/backend  # Not needed - backend files copied directly to /app

# Run database migrations
echo "🔄 Running database migrations..."
python -c "
import os
import sys
import traceback
sys.path.insert(0, '/app')

# Ensure production environment
os.environ['FLASK_ENV'] = 'production'

try:
    # Create MINIMAL Flask app for migration only - DO NOT import from main app
    from flask import Flask
    from flask_sqlalchemy import SQLAlchemy
    from flask_migrate import Migrate
    from app.config import ProductionConfig
    
    print('✅ Creating minimal migration app...')
    app = Flask(__name__)
    
    # Load production config
    config = ProductionConfig()
    app.config.from_object(config)
    print(f'🔍 Database URI: {app.config[\"SQLALCHEMY_DATABASE_URI\"]}')
    
    # Create fresh SQLAlchemy instance for migration
    db = SQLAlchemy()
    db.init_app(app)
    migrate = Migrate(app, db)
    
    with app.app_context():
        # Test database connection first
        with db.engine.connect() as conn:
            conn.execute(db.text('SELECT 1'))
        print('✅ Database connection successful')
        
        # Import models VERY carefully to avoid triggering services
        print('📋 Importing models individually...')
        
        # Models that should be safe to import (no service dependencies in class definition)
        try:
            from app.models.user import User
            from app.models.system_config import SystemConfig
            print('  ✅ Core models imported')
        except Exception as e:
            print(f'  ⚠️  Core model import issue: {e}')
        
        try:
            from app.models.campaign import Campaign, Template, Recipient, CampaignLog, CampaignSubject, CampaignBody, CampaignCombinationHistory
            print('  ✅ Campaign models imported')
        except Exception as e:
            print(f'  ⚠️  Campaign model import issue: {e}')
        
        try:
            from app.models.smtp import SMTPConfig, Sender
            print('  ✅ SMTP models imported')
        except Exception as e:
            print(f'  ⚠️  SMTP model import issue: {e}')
        
        try:
            from app.models.billing import Payment, Usage, CreditBalance, CreditTransaction, CreditPackage
            from app.models.settings import UserSettings
            from app.models.fbl import FBLEntry, UnsubscribeToken
            from app.models.tracking import EmailOpen, EmailClick
            from app.models.auth_tokens import AuthToken
            from app.models.notification import Notification
            print('  ✅ Remaining models imported')
        except Exception as e:
            print(f'  ⚠️  Other model import issue: {e}')
        
        # Run flask db upgrade using the migration system
        print('🔄 Running flask db upgrade...')
        from flask_migrate import upgrade
        upgrade()
        print('✅ Migration upgrade completed successfully')
        
        # Ensure all tables exist (backup)
        print('🔄 Creating any missing tables...')
        db.create_all()
        print('✅ Table creation completed')
        
        # Final verification
        from sqlalchemy import inspect
        inspector = inspect(db.engine)
        tables_after = inspector.get_table_names()
        print(f'✅ Final table count: {len(tables_after)} tables')
        
        expected_tables = ['users', 'campaigns', 'templates', 'smtp_configs', 'recipients', 'alembic_version']
        missing_critical = [t for t in expected_tables if t not in tables_after]
        if missing_critical:
            print(f'❌ Critical tables missing: {missing_critical}')
            print(f'📋 Available tables: {sorted(tables_after)}')
            sys.exit(1)
        else:
            print('✅ All critical tables present - migration successful!')
            
except Exception as e:
    print(f'❌ Migration failed: {e}')
    print('🔍 Full traceback:')
    traceback.print_exc()
    sys.exit(1)
"

# Create admin user if it doesn't exist
if [ ! -z "$ADMIN_EMAIL" ] && [ ! -z "$ADMIN_PASSWORD" ]; then
    echo "👤 Creating admin user if not exists..."
    python -c "
import os
import sys
sys.path.insert(0, '/app')

# Direct SQLAlchemy approach using raw SQL to avoid model binding issues
import pymysql
from werkzeug.security import generate_password_hash

try:
    # Connect directly to database
    connection = pymysql.connect(
        host=os.environ.get('DB_HOST', 'mariadb-database'),
        port=int(os.environ.get('DB_PORT', 3306)),
        user=os.environ.get('DB_USER', 'root'),
        password=os.environ.get('DB_PASSWORD'),
        database=os.environ.get('DB_NAME', 'emailsaas'),
        charset='utf8mb4'
    )
    
    admin_email = os.environ.get('ADMIN_EMAIL')
    admin_password = os.environ.get('ADMIN_PASSWORD')
    
    with connection.cursor() as cursor:
        # Check if admin user exists
        cursor.execute('SELECT id FROM users WHERE email = %s', (admin_email,))
        existing_user = cursor.fetchone()
        
        if not existing_user:
            # Create admin user with minimal columns that should exist
            password_hash = generate_password_hash(admin_password)
            cursor.execute('''
                INSERT INTO users (email, password_hash, is_active, created_at)
                VALUES (%s, %s, %s, NOW())
            ''', (admin_email, password_hash, True))
            connection.commit()
            print(f'✅ Admin user created: {admin_email}')
        else:
            print(f'ℹ️  Admin user already exists: {admin_email}')
    
    connection.close()
    
except Exception as e:
    print(f'❌ Admin user creation failed: {e}')
    import traceback
    traceback.print_exc()
"
fi

echo "🎯 Starting Email Marketing SaaS services..."

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

# Already in /app directory - backend files are here
# cd /app/backend  # Not needed

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
    --worker-class sync \
    --timeout 120 \
    --keep-alive 5 \
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
