# I-Varse Website - Production Deployment

Production deployment configuration for I-Varse Corporate Website with Jenkins CI/CD.

## Architecture

Single Docker container running:
- **Frontend**: React + Vite (served by Node.js `serve` on port 3000)
- **Strapi CMS**: Headless CMS backend (port 1337)
- **Process Manager**: PM2 manages both services

## Prerequisites

- Docker & Docker Compose installed
- Access to existing MariaDB database
- Access to Traefik reverse proxy network
- Domain configured with DNS pointing to server
- Jenkins CI/CD pipeline (for automated builds)

## Quick Start

### 1. Configure Environment

```bash
cd deployment
cp .env.production.example .env.production
nano .env.production
```

Update required values:
- `DOMAIN` - Your domain (e.g., itechnologies.ng)
- `DB_PASSWORD` - MariaDB root password
- `JWT_SECRET`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `APP_KEYS` - Generate with `openssl rand -base64 32`

### 2. Deploy

```bash
chmod +x *.sh
./start-services.sh
```

### 3. Check Status

```bash
./check-status.sh
```

## Directory Structure

```
deployment/
├── Dockerfile                          # Multi-service container build
├── docker-compose.production.yml      # Production compose config
├── .env.production.example            # Environment template
├── docker-entrypoint.sh               # Container startup script
├── start-services.sh                  # Deployment script
├── check-status.sh                    # Health check script
├── fix-network-connectivity.sh        # Network troubleshooting
└── .dockerignore                      # Build exclusions
```

## Services

### Frontend (Port 3000)
- Serves pre-built React application
- Managed by PM2
- Handles client-side routing
- Logs: `/app/logs/frontend-*.log`

### Strapi CMS (Port 1337)
- Content management system
- Stores site configuration and content
- ERPNext credentials stored here
- Logs: `/app/logs/strapi-*.log`

## Traefik Configuration

### Frontend Routes
- `https://yourdomain.com` → Frontend (port 3000)
- `https://www.yourdomain.com` → Redirects to non-www

### Strapi Routes
- `https://cms.yourdomain.com` → Strapi (port 1337)

## Database

Connects to existing MariaDB:
- Network: `mariadb-network` (external)
- Database: `ivarse_strapi` (auto-created)
- User: `root` (configurable)

## Volumes

```
ivarse-strapi-uploads  - Uploaded media files
ivarse-strapi-data     - Strapi temporary data
ivarse-app-logs        - Application logs
```

## Jenkins Integration

### Build Pipeline (Jenkinsfile)

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build Frontend') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh '''
                    cd deployment
                    export BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
                    export VCS_REF=$(git rev-parse --short HEAD)
                    docker-compose -f docker-compose.production.yml build
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'cd deployment && ./start-services.sh'
            }
        }
    }
}
```

### Environment Variables in Jenkins

Set these in Jenkins credentials/environment:
```
DB_PASSWORD
JWT_SECRET
ADMIN_JWT_SECRET
API_TOKEN_SALT
APP_KEYS
ERPNEXT_API_KEY
ERPNEXT_API_SECRET
```

## Commands

### Start Services
```bash
./start-services.sh
```

### Stop Services
```bash
docker-compose -f docker-compose.production.yml down
```

### View Logs
```bash
# All logs
docker-compose -f docker-compose.production.yml logs -f

# Frontend only
docker exec ivarse-website-v1 pm2 logs frontend

# Strapi only
docker exec ivarse-website-v1 pm2 logs strapi
```

### Restart Services
```bash
docker-compose -f docker-compose.production.yml restart
```

### Access Container Shell
```bash
docker exec -it ivarse-website-v1 bash
```

### PM2 Commands Inside Container
```bash
docker exec ivarse-website-v1 pm2 list
docker exec ivarse-website-v1 pm2 restart all
docker exec ivarse-website-v1 pm2 monit
```

## Troubleshooting

### Database Connection Failed
```bash
./fix-network-connectivity.sh
```

### Services Not Starting
1. Check logs: `docker-compose -f docker-compose.production.yml logs`
2. Verify database is running: `docker ps | grep mariadb`
3. Check network: `docker network inspect mariadb-network`

### SSL Certificate Issues
- Traefik handles SSL automatically
- Check Traefik logs: `docker logs traefik`
- Verify DNS is pointing to server

### Frontend Not Loading
```bash
# Check if frontend service is running
docker exec ivarse-website-v1 pm2 list

# Restart frontend only
docker exec ivarse-website-v1 pm2 restart frontend

# Check logs
docker exec ivarse-website-v1 pm2 logs frontend --lines 100
```

### Strapi Not Accessible
```bash
# Check Strapi service
docker exec ivarse-website-v1 pm2 list

# Restart Strapi only
docker exec ivarse-website-v1 pm2 restart strapi

# Check database connection
docker exec ivarse-website-v1 nc -zv mariadb-database 3306
```

## Security Configuration

### ERPNext Credentials
Stored securely in Strapi CMS:
1. Access Strapi admin: `https://cms.yourdomain.com/admin`
2. Go to Content Manager → Site Config
3. Add ERPNext URL, API Key, and API Secret
4. Mark fields as **Private** in content type settings

### Environment Variables
- Never commit `.env.production` to Git
- Use Jenkins secrets for CI/CD
- Rotate secrets regularly

## Backup & Restore

### Backup
```bash
# Backup Strapi uploads
docker run --rm -v ivarse-strapi-uploads:/data -v $(pwd):/backup \
    alpine tar czf /backup/strapi-uploads-$(date +%Y%m%d).tar.gz /data

# Backup database
docker exec mariadb-database mysqldump -u root -p$DB_PASSWORD ivarse_strapi > backup-$(date +%Y%m%d).sql
```

### Restore
```bash
# Restore Strapi uploads
docker run --rm -v ivarse-strapi-uploads:/data -v $(pwd):/backup \
    alpine tar xzf /backup/strapi-uploads-YYYYMMDD.tar.gz -C /

# Restore database
docker exec -i mariadb-database mysql -u root -p$DB_PASSWORD ivarse_strapi < backup-YYYYMMDD.sql
```

## Monitoring

### Health Checks
- Frontend: `http://localhost:3000/`
- Strapi: `http://localhost:1337/_health`
- Combined: `./check-status.sh`

### Logs Location
Inside container:
- Frontend: `/app/logs/frontend-*.log`
- Strapi: `/app/logs/strapi-*.log`

### Resource Monitoring
```bash
docker stats ivarse-website-v1
```

## Updates

### Update Application
```bash
# Jenkins will auto-rebuild on Git push
# Or manually:
cd deployment
./start-services.sh
```

### Update Dependencies
Rebuild image:
```bash
docker-compose -f docker-compose.production.yml build --no-cache
docker-compose -f docker-compose.production.yml up -d
```

## Support

For issues, check:
1. Service logs
2. Network connectivity
3. Database access
4. Traefik configuration
5. DNS resolution

## License

Proprietary - I-Varse Limited
