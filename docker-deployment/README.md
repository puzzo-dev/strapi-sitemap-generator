# Email Marketing SaaS - Docker Deployment

Complete Docker deployment configuration with Jenkins CI/CD pipeline.

## 📁 Structure

```
docker-deployment/
├── Dockerfile                          # Multi-stage Docker build
├── docker-compose.production.yml      # Production deployment config
├── docker-entrypoint.sh               # Container startup script
├── .dockerignore                      # Build context exclusions
├── .env.production.example            # Environment template
└── README.md                          # This file
```

## 🚀 Features

- ✅ **Single Container**: Frontend (React) + Backend (Flask) + RQ Worker
- ✅ **Multi-stage Build**: Optimized image size
- ✅ **Traefik Integration**: Automatic HTTPS with Let's Encrypt
- ✅ **External Redis**: Uses existing production Redis
- ✅ **Health Checks**: Built-in monitoring
- ✅ **Graceful Shutdown**: Proper signal handling
- ✅ **Jenkins Pipeline**: Automated build, test, and deployment

## 📋 Prerequisites

### Production Server

1. **Docker & Docker Compose** installed
2. **Traefik** reverse proxy running with:
   - Network: `traefik-public`
   - Certificate resolver configured
3. **Redis** server accessible (existing)
4. **Domain** configured with DNS pointing to server

### Jenkins Server

1. **Jenkins** with Docker plugin
2. **Credentials** configured:
   - `github-username`: GitHub username
   - `github-token`: GitHub Personal Access Token (PAT)
   - `github-container-registry`: GitHub Container Registry credentials
   - `production-host`: Production server hostname/IP
   - `production-user`: SSH user for deployment
   - `production-ssh-key`: SSH private key for deployment
   - `app-domain`: Your application domain

## 🔧 Setup Instructions

### Step 1: Configure Environment

```bash
# On production server
cd /opt/email-marketing-saas
cp docker-deployment/.env.production.example docker-deployment/.env.production

# Edit with your actual values
nano docker-deployment/.env.production
```

**Required Environment Variables:**

```bash
# Security
SECRET_KEY=your-super-secret-key-min-32-chars-long
JWT_SECRET_KEY=your-jwt-secret-key-min-32-chars-long

# Domain
DOMAIN=mail.yourdomain.com

# Redis (existing)
REDIS_HOST=your-redis-server
REDIS_PORT=6379

# Admin
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=SecurePassword123!

# Email (system)
MAIL_SERVER=smtp.gmail.com
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# BTCPay (if using)
BTCPAY_SERVER_URL=https://btcpay.yourdomain.com
BTCPAY_API_KEY=your-api-key
BTCPAY_STORE_ID=your-store-id
BTCPAY_WEBHOOK_SECRET=your-webhook-secret
```

### Step 2: Configure Jenkins

1. **Create New Pipeline Job**:
   - Name: `email-marketing-saas-deploy`
   - Type: Pipeline
   - Pipeline from SCM: Git
   - Repository URL: Your Git repo
   - Script Path: `Jenkinsfile`

2. **Add Credentials** (Jenkins → Manage Jenkins → Credentials):

```groovy
// GitHub Container Registry
Username: your-github-username
Password: ghp_your_github_personal_access_token

// Production Server SSH
Private Key: -----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----

// Domain
Secret text: mail.yourdomain.com
```

3. **Configure Webhooks** (optional):
   - GitHub: Repository → Settings → Webhooks
   - URL: `https://jenkins.yourdomain.com/github-webhook/`
   - Content type: `application/json`
   - Events: Push events

### Step 3: Initial Deployment

#### Option A: Via Jenkins (Recommended)

1. Go to Jenkins job
2. Click "Build Now"
3. Monitor console output
4. Verify deployment

#### Option B: Manual Deployment

```bash
# Clone repository
git clone https://github.com/your-username/email-marketing-saas.git
cd email-marketing-saas

# Build and push image
docker build \
  --tag ghcr.io/your-username/email-marketing-saas:latest \
  --file docker-deployment/Dockerfile \
  .

echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin
docker push ghcr.io/your-username/email-marketing-saas:latest

# Deploy on production server
scp docker-deployment/* user@your-server:/opt/email-marketing-saas/

ssh user@your-server '
  cd /opt/email-marketing-saas
  docker-compose -f docker-compose.production.yml pull
  docker-compose -f docker-compose.production.yml up -d
'
```

## 🔄 CI/CD Pipeline

The Jenkinsfile automates:

1. **Checkout**: Clone repository
2. **Validate**: Check required files
3. **Build Frontend**: npm build
4. **Build Docker Image**: Multi-stage build
5. **Test Image**: Basic validation
6. **Push to Registry**: GitHub Container Registry
7. **Deploy**: Deploy to production (main branch only)
8. **Health Check**: Verify deployment
9. **Smoke Tests**: Test critical endpoints
10. **Cleanup**: Remove old images

### Pipeline Triggers

- **Automatic**: On push to `main` branch (if webhook configured)
- **Manual**: Click "Build Now" in Jenkins
- **Scheduled**: Configure in Jenkins (optional)

## 🏥 Health Monitoring

### Health Check Endpoint

```bash
curl https://mail.yourdomain.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-31T10:00:00Z",
  "version": "1.0.0"
}
```

### Container Health

```bash
# Check container health
docker ps | grep email-marketing

# View health check logs
docker inspect --format='{{json .State.Health}}' email-marketing-saas | jq
```

## 📊 Monitoring & Logs

### View Logs

```bash
# Real-time logs
docker logs -f email-marketing-saas

# Last 100 lines
docker logs --tail 100 email-marketing-saas

# Logs from specific time
docker logs --since 30m email-marketing-saas

# Container logs directory
docker exec email-marketing-saas ls -lh /app/backend/logs/
```

### Container Stats

```bash
# Resource usage
docker stats email-marketing-saas

# Container details
docker inspect email-marketing-saas

# Network info
docker network inspect traefik-public
```

## 🔧 Maintenance

### Update Application

```bash
# Via Jenkins
# Just push to main branch or click "Build Now"

# Manual update
cd /opt/email-marketing-saas
docker-compose -f docker-compose.production.yml pull
docker-compose -f docker-compose.production.yml up -d
```

### Restart Services

```bash
# Restart container
docker-compose -f docker-compose.production.yml restart

# Restart specific service
docker restart email-marketing-saas

# Full redeploy
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml up -d
```

### Database Operations

```bash
# Backup database (SQLite)
docker cp email-marketing-saas:/app/backend/instance/emailsaas.db ./backup-$(date +%Y%m%d).db

# Restore database
docker cp backup-20251031.db email-marketing-saas:/app/backend/instance/emailsaas.db
docker restart email-marketing-saas

# Run migrations
docker exec email-marketing-saas python3 -m flask db upgrade
```

### Redis Operations

```bash
# Check Redis connection
docker exec email-marketing-saas redis-cli -h $REDIS_HOST ping

# Monitor Redis
docker exec -it your-redis-container redis-cli monitor

# Check Redis keys
docker exec -it your-redis-container redis-cli keys "rq:*"
```

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs email-marketing-saas

# Check environment variables
docker exec email-marketing-saas env | sort

# Verify Redis connection
docker exec email-marketing-saas nc -zv $REDIS_HOST $REDIS_PORT

# Check file permissions
docker exec email-marketing-saas ls -la /app/backend/
```

### Traefik Routing Issues

```bash
# Check Traefik logs
docker logs traefik

# Verify labels
docker inspect email-marketing-saas | jq '.[0].Config.Labels'

# Test internal connection
docker exec email-marketing-saas curl -f http://localhost:5000/api/health

# Check network connectivity
docker exec email-marketing-saas ping traefik
```

### Performance Issues

```bash
# Check resource usage
docker stats email-marketing-saas

# Check RQ worker status
docker exec email-marketing-saas ps aux | grep rq_worker

# Check queue length
docker exec -it your-redis-container redis-cli llen rq:queue:email

# Analyze logs
docker logs email-marketing-saas | grep ERROR
docker logs email-marketing-saas | grep WARNING
```

### Jenkins Pipeline Failures

1. **Build Stage Fails**:
   - Check Jenkins console output
   - Verify Node.js version in Jenkins
   - Check npm dependencies

2. **Docker Build Fails**:
   - Verify Docker daemon is accessible
   - Check Docker permissions for Jenkins user
   - Verify Dockerfile syntax

3. **Deployment Fails**:
   - Check SSH connectivity
   - Verify production server credentials
   - Check disk space on production server

4. **Health Check Fails**:
   - Verify application started successfully
   - Check Redis connectivity
   - Review application logs

## 🔒 Security Considerations

- ✅ Container runs as non-root user
- ✅ Secrets managed via environment variables
- ✅ HTTPS enforced via Traefik
- ✅ Redis connection secured (if password set)
- ✅ Health checks don't expose sensitive data
- ✅ File uploads restricted by size
- ✅ CORS properly configured

## 📈 Scaling

### Horizontal Scaling

```yaml
# In docker-compose.production.yml
services:
  email-marketing-app:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

### Load Balancing

Traefik automatically load balances between multiple containers.

### Separate RQ Workers

For high volume, run dedicated RQ workers:

```yaml
  rq-worker:
    image: ghcr.io/your-username/email-marketing-saas:latest
    command: python3 rq_worker.py
    deploy:
      replicas: 5
```

## 📞 Support

- **Documentation**: Check project README
- **Issues**: GitHub Issues
- **Logs**: Check container logs first

## 📄 License

Same as main project license.
