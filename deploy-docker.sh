#!/bin/bash

# I-Varse Docker Deployment Script
set -e

echo "🐳 I-Varse Docker Deployment"
echo "============================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from template..."
    cp .env.example .env
    echo ""
    echo "📝 Please edit .env with your configuration:"
    echo "   - Set your domain"
    echo "   - Set email for Let's Encrypt"
    echo "   - Generate secure secrets (use: openssl rand -base64 32)"
    echo ""
    read -p "Press Enter after editing .env..."
fi

# Load environment variables
source .env

# Validate required variables
if [ "$DOMAIN" == "yourdomain.com" ]; then
    echo "❌ Please set your DOMAIN in .env"
    exit 1
fi

if [ "$JWT_SECRET" == "change-this-jwt-secret-min-32-chars" ]; then
    echo "❌ Please set secure JWT_SECRET in .env"
    echo "   Generate with: openssl rand -base64 32"
    exit 1
fi

echo "✅ Configuration validated"
echo ""

# Build and deploy
echo "🔨 Building containers..."
docker-compose build

echo ""
echo "🚀 Starting services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo ""
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site will be available at:"
echo "   - https://$DOMAIN (Frontend)"
echo "   - https://cms.$DOMAIN (Strapi Admin)"
echo "   - https://traefik.$DOMAIN (Traefik Dashboard)"
echo ""
echo "⚠️  Note: SSL certificates may take a few minutes to provision"
echo ""
echo "📋 Next steps:"
echo "   1. Access Strapi admin: https://cms.$DOMAIN/admin"
echo "   2. Create admin user"
echo "   3. Configure Site Config content type"
echo "   4. Add ERPNext credentials (will be stored privately)"
echo ""
echo "📊 View logs:"
echo "   docker-compose logs -f"
echo ""
