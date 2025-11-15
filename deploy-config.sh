#!/bin/bash

# Secure Configuration Deployment Script
# This script helps deploy the external configuration system

set -e

echo "🔐 I-Varse Secure Configuration Setup"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler CLI not found${NC}"
    echo "Install it with: npm install -g wrangler"
    exit 1
fi

echo -e "${GREEN}✓${NC} Wrangler CLI found"

# Prompt for environment
echo ""
echo "Select deployment environment:"
echo "1) Development"
echo "2) Staging"
echo "3) Production"
read -p "Enter choice [1-3]: " env_choice

case $env_choice in
    1) ENVIRONMENT="development" ;;
    2) ENVIRONMENT="staging" ;;
    3) ENVIRONMENT="production" ;;
    *) echo -e "${RED}Invalid choice${NC}"; exit 1 ;;
esac

echo -e "${YELLOW}Deploying to: $ENVIRONMENT${NC}"
echo ""

# Check if secrets are set
echo "Checking required secrets..."
echo ""

read -p "Have you set the STRAPI_API_TOKEN secret? [y/N]: " has_strapi_token
if [[ ! $has_strapi_token =~ ^[Yy]$ ]]; then
    echo ""
    echo "Set it with: wrangler secret put STRAPI_API_TOKEN --env $ENVIRONMENT"
    read -p "Would you like to set it now? [y/N]: " set_now
    if [[ $set_now =~ ^[Yy]$ ]]; then
        wrangler secret put STRAPI_API_TOKEN --env $ENVIRONMENT
    else
        echo -e "${RED}Deployment cancelled - secret required${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓${NC} STRAPI_API_TOKEN configured"
echo ""

# Optional: Valid user tokens
read -p "Do you want to configure VALID_USER_TOKENS? [y/N]: " config_tokens
if [[ $config_tokens =~ ^[Yy]$ ]]; then
    wrangler secret put VALID_USER_TOKENS --env $ENVIRONMENT
    echo -e "${GREEN}✓${NC} VALID_USER_TOKENS configured"
fi

echo ""
read -p "Do you want to configure JWT_SECRET? [y/N]: " config_jwt
if [[ $config_jwt =~ ^[Yy]$ ]]; then
    wrangler secret put JWT_SECRET --env $ENVIRONMENT
    echo -e "${GREEN}✓${NC} JWT_SECRET configured"
fi

echo ""
echo "Deploying Cloudflare Worker..."
wrangler deploy --env $ENVIRONMENT

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Your worker is deployed and ready to use."
echo ""
echo "Next steps:"
echo "1. Update your frontend .env with:"
echo "   VITE_SECURE_TOKEN_ENDPOINT=<your-worker-url>"
echo ""
echo "2. Test the endpoint:"
echo "   curl -H 'Authorization: Bearer YOUR_USER_TOKEN' <your-worker-url>/config/strapi-token"
echo ""
echo "3. Configure Strapi with ERPNext credentials in the Site Config content type"
echo ""
echo "4. Test your application with the new configuration system"
echo ""
