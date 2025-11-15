#!/bin/bash
# Docker Entrypoint for I-Varse Website
# Starts both Frontend (serve) and Strapi CMS using PM2

set -e

echo "🚀 Starting I-Varse Website Services..."
echo "========================================"

# Wait for database to be ready
echo "⏳ Waiting for database connection..."
until nc -z -v -w30 "${DATABASE_HOST:-mariadb-database}" "${DATABASE_PORT:-3306}"; do
  echo "Waiting for database at ${DATABASE_HOST:-mariadb-database}:${DATABASE_PORT:-3306}..."
  sleep 5
done
echo "✅ Database is ready!"

# Run Strapi database migrations
echo "🔄 Running Strapi database migrations..."
cd /app/strapi
npm run strapi -- migrations:run || echo "⚠️ Migration skipped or failed"

# Create PM2 ecosystem file
cat > /app/ecosystem.config.js <<'EOF'
module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: '/app',
      script: 'serve',
      args: '-s frontend/dist -l 3000',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '/app/logs/frontend-error.log',
      out_file: '/app/logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'strapi',
      cwd: '/app/strapi',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        DATABASE_CLIENT: process.env.DATABASE_CLIENT,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        JWT_SECRET: process.env.JWT_SECRET,
        ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
        API_TOKEN_SALT: process.env.API_TOKEN_SALT,
        APP_KEYS: process.env.APP_KEYS
      },
      error_file: '/app/logs/strapi-error.log',
      out_file: '/app/logs/strapi-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
EOF

# Start services with PM2
echo "🎬 Starting services with PM2..."
cd /app
pm2-runtime start ecosystem.config.js
