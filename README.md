# I-Varse Corporate Website

## 🌟 Overview

A modern, enterprise-grade corporate website built with React, TypeScript, Strapi CMS, and ERPNext integration. Features a robust fallback system, SOLID architecture principles, and comprehensive content management capabilities.

### 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **CMS**: Strapi v5.x for content management
- **ERP**: ERPNext for blog management and form submissions
- **Deployment**: Docker-ready with CI/CD support
- **Fallbacks**: Comprehensive offline-first approach

### ✨ Key Features

- 🎨 **Modern UI**: Beautiful, responsive design with dark/light themes
- 🌐 **Multilingual**: Built-in i18n support with Strapi integration
- 📝 **Content Management**: Full CMS integration with fallback support
- 📧 **Form Handling**: ERPNext integration for leads and appointments
- 📱 **Mobile-First**: Responsive design for all devices
- 🔒 **Secure**: Environment-based configuration with secure credentials
- ⚡ **Performance**: Optimized loading with caching strategies
- 🛡️ **Reliable**: Website works even when APIs are down

## 📋 Prerequisites

### System Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Git**: Latest version
- **Docker**: v20.0.0 or higher (for deployment)
- **Database**: PostgreSQL 13+ (for Strapi)

### Required Accounts/Services

- **Domain**: For production deployment
- **SSL Certificate**: For HTTPS (Let's Encrypt recommended)
- **Email Service**: For ERPNext notifications (Gmail/SMTP)
- **Cloud Storage**: AWS S3/Cloudflare R2 (for media files)

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-org/ivarse-website.git
cd ivarse-website

# Install dependencies
npm install

# Install backend dependencies
cd "I-VarseTech CMS Backend"
npm install
cd ..
```

### 2. Environment Setup

```bash
# Copy environment files
cp .env.example .env
cp "I-VarseTech CMS Backend/.env.example" "I-VarseTech CMS Backend/.env"

# Edit environment variables
nano .env
nano "I-VarseTech CMS Backend/.env"
```

### 3. Start Development

```bash
# Start Strapi backend (Terminal 1)
cd "I-VarseTech CMS Backend"
npm run dev

# Start frontend (Terminal 2)
cd ..
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:1337` for Strapi admin.

---

## 🏢 Strapi CMS Setup

### Step 1: Install and Configure Strapi

```bash
# Navigate to backend directory
cd "I-VarseTech CMS Backend"

# Install dependencies
npm install

# Configure database (PostgreSQL recommended)
# Edit .env file with your database credentials
```

**Environment Variables (.env):**
```env
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ivarse_strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password

# Strapi
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys_here
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret

# Upload
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_cloudflare_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_cloudflare_secret_key
CLOUDFLARE_BUCKET=your_bucket_name
CLOUDFLARE_REGION=auto
CLOUDFLARE_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
```

### Step 2: Create Database

```bash
# Create PostgreSQL database
sudo -u postgres createdb ivarse_strapi

# Or using psql
psql -U postgres -c "CREATE DATABASE ivarse_strapi;"
```

### Step 3: Start Strapi

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm start
```

### Step 4: Access Admin Panel

1. Visit `http://localhost:1337/admin`
2. Create your admin account
3. Complete the initial setup

### Step 5: Create Content Types

#### A. Page Content Type

Go to **Content-Type Builder** → **Create new collection type** → **Page**

**Fields:**
```
- title (Text, Required)
- slug (UID, Required, attached to title)
- metaTitle (Text)
- metaDescription (Text, Long text)
- metaImage (Media, Single media)
- sections (Dynamic Zone)
```

**Sections Components:**
1. **Hero Section**
   - type (Enumeration: hero)
   - title (Text, Required)
   - subtitle (Text)
   - content (Rich text)
   - backgroundImage (Media)
   - ctaButtons (Component - repeatable)

2. **Content Section**
   - type (Enumeration: content, features, services, products, etc.)
   - title (Text)
   - subtitle (Text)
   - content (Rich text)
   - items (Component - repeatable)

3. **CTA Section**
   - type (Enumeration: cta)
   - title (Text)
   - content (Text)
   - button (Component)

#### B. Products Content Type

**Fields:**
```
- title (Text, Required)
- slug (UID, Required)
- description (Rich text)
- image (Media, Single media)
- keyFeatures (JSON)
- category (Enumeration: SaaS, Enterprise, Mobile, etc.)
- tags (Text, multiple values)
- status (Enumeration: Active, Beta, Coming Soon, Deprecated)
- pricing (Component - repeatable)
- demoUrl (Text)
- downloadUrl (Text)
- supportUrl (Text)
- benefits (Dynamic Zone)
- industries (Dynamic Zone)
- casestudies (Dynamic Zone)
- faqs (Dynamic Zone)
```

#### C. Services Content Type

**Fields:**
```
- title (Text, Required)
- slug (UID, Required)
- description (Rich text)
- image (Media, Single media)
- features (JSON)
- technologies (JSON)
- category (Text, multiple values)
- tags (Text, multiple values)
- process (Dynamic Zone)
- benefits (Dynamic Zone)
- caseStudies (Relation to Case Studies)
- pricing (Component - repeatable)
```

#### D. Team Members Content Type

**Fields:**
```
- name (Text, Required)
- position (Text, Required)
- bio (Rich text)
- image (Media, Single media)
- email (Email)
- phone (Text)
- socialLinks (Component - repeatable)
- skills (JSON)
- experience (Text)
- education (JSON)
- certifications (JSON)
- languages (JSON)
```

#### E. Testimonials Content Type

**Fields:**
```
- name (Text, Required)
- content (Rich text, Required)
- rating (Number, 1-5)
- image (Media, Single media)
- position (Text)
- company (Text)
- featured (Boolean)
```

#### F. Case Studies Content Type

**Fields:**
```
- title (Text, Required)
- slug (UID, Required)
- description (Rich text)
- image (Media, Single media)
- client (Text)
- industry (Text)
- challenge (Rich text)
- solution (Rich text)
- results (JSON)
- technologies (JSON)
- timeline (Text)
- teamSize (Number)
- testimonial (Relation to Testimonials)
- gallery (Media, Multiple media)
- tags (Text, multiple values)
- featured (Boolean)
```

#### G. Industries Content Type

**Fields:**
```
- title (Text, Required)
- slug (UID, Required)
- description (Rich text)
- image (Media, Single media)
- challenges (JSON)
- solutions (JSON)
- technologies (JSON)
- caseStudies (Relation to Case Studies)
- benefits (JSON)
- stats (JSON)
- featured (Boolean)
```

#### H. Job Listings Content Type

**Fields:**
```
- title (Text, Required)
- slug (UID, Required)
- department (Text)
- location (Text)
- type (Enumeration: Full-time, Part-time, Contract, Remote)
- experience (Text)
- salary (Text)
- description (Rich text)
- requirements (JSON)
- responsibilities (JSON)
- benefits (JSON)
- skills (JSON)
- applicationDeadline (Date)
- isActive (Boolean)
- featured (Boolean)
```

#### I. Client Logos Content Type

**Fields:**
```
- name (Text, Required)
- image (Media, Single media, Required)
- url (Text)
- featured (Boolean)
```

#### J. FAQ Items Content Type

**Fields:**
```
- question (Text, Required)
- answer (Rich text, Required)
- category (Text)
- order (Number)
- featured (Boolean)
```

#### K. UI Text Content Type

**Fields:**
```
- category (Enumeration: buttons, forms, errors, loading, navigation)
- key (Text, Required)
- value (Text, Required)
- language (Relation to Languages)
```

#### L. Site Configuration Content Type

**Single Type** - Go to **Content-Type Builder** → **Create new single type** → **Site Configuration**

**Fields:**
```
- siteName (Text)
- siteDescription (Text)
- logo (Media, Single media)
- favicon (Media, Single media)
- supportedLanguages (JSON)
- defaultLanguage (Text)
- socialLinks (Component - repeatable)
- contactInfo (Component)
- navigation (Component - repeatable)
- footer (Component)
- seoDefaults (Component)
```

### Step 6: Configure Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Enable permissions for:
   - **Pages**: find, findOne
   - **Products**: find, findOne
   - **Services**: find, findOne
   - **Team Members**: find, findOne
   - **Testimonials**: find, findOne
   - **Case Studies**: find, findOne
   - **Industries**: find, findOne
   - **Job Listings**: find, findOne
   - **Client Logos**: find, findOne
   - **FAQ Items**: find, findOne
   - **UI Text**: find, findOne
   - **Site Configuration**: find

### Step 7: Create API Tokens

1. Go to **Settings** → **API Tokens**
2. Create a new token with **Read Only** permission
3. Copy the token for frontend configuration

---

## 🏢 ERPNext Setup

### Step 1: Install ERPNext

#### Option A: Docker Installation (Recommended)

```bash
# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Clone ERPNext Docker
git clone https://github.com/frappe/frappe_docker.git
cd frappe_docker

# Copy environment file
cp example.env .env

# Edit environment variables
nano .env
```

**Environment Variables (.env):**
```env
FRAPPE_VERSION=v15.latest
ERPNEXT_VERSION=v15.latest
DB_PASSWORD=your_strong_password
ADMIN_PASSWORD=your_admin_password
ENCRYPTION_KEY=your_encryption_key
SITE_NAME=erp.yourdomain.com
```

```bash
# Start ERPNext
docker-compose up -d

# Create site
docker-compose exec backend bench new-site erp.yourdomain.com \
  --admin-password your_admin_password \
  --db-root-password your_strong_password

# Install ERPNext
docker-compose exec backend bench --site erp.yourdomain.com install-app erpnext

# Enable site
docker-compose exec backend bench use erp.yourdomain.com
```

#### Option B: Manual Installation

```bash
# Install dependencies (Ubuntu/Debian)
sudo apt update
sudo apt install -y python3-dev python3-pip python3-venv
sudo apt install -y mariadb-server mariadb-client
sudo apt install -y redis-server nodejs npm
sudo apt install -y wkhtmltopdf

# Install Frappe Bench
sudo pip3 install frappe-bench

# Initialize bench
bench init frappe-bench --frappe-branch version-15
cd frappe-bench

# Create site
bench new-site erp.yourdomain.com

# Install ERPNext
bench get-app erpnext --branch version-15
bench --site erp.yourdomain.com install-app erpnext

# Start development server
bench start
```

### Step 2: Configure ERPNext

1. Visit `http://localhost:8000` (or your domain)
2. Complete the setup wizard:
   - **Country**: Your country
   - **Timezone**: Your timezone
   - **Currency**: Your currency
   - **Company Details**: I-Varse Technologies

### Step 3: Create Custom Fields

#### A. Blog Post Enhancements

1. Go to **Customize Form** → **Blog Post**
2. Add custom fields:

```
- blog_intro (Data, Label: "Blog Introduction")
- meta_image (Attach Image, Label: "Meta Image")
- featured (Check, Label: "Featured Post")
- tags (Small Text, Label: "Tags (comma-separated)")
```

#### B. Lead Enhancements

1. Go to **Customize Form** → **Lead**
2. Add custom fields:

```
- request_type (Select, Label: "Request Type")
  Options: Product Enquiry, Request for Information, Suggestions, Other
- source_page (Data, Label: "Source Page")
- form_type (Select, Label: "Form Type")
  Options: Contact Form, Appointment Booking, Newsletter
```

#### C. Event Enhancements

1. Go to **Customize Form** → **Event**
2. Add custom fields:

```
- appointment_topic (Data, Label: "Appointment Topic")
- lead_reference (Link, Label: "Related Lead", Options: Lead)
- booking_status (Select, Label: "Booking Status")
  Options: Confirmed, Pending, Cancelled, Completed
```

### Step 4: Create API User

1. Go to **User** → **New User**
2. Create user with details:
   - **Email**: api@ivarse.com
   - **First Name**: API
   - **Last Name**: User
   - **Role Profile**: Website Manager

3. Generate API Key:
   - Go to the user profile
   - Click **Generate Keys**
   - Copy **API Key** and **API Secret**

### Step 5: Configure Permissions

#### For Blog Posts:
1. Go to **Role Permissions Manager** → **Blog Post**
2. Set permissions for **Website Manager**:
   - ✅ Read, Write, Create, Delete

#### For Leads:
1. Go to **Role Permissions Manager** → **Lead**
2. Set permissions for **Website Manager**:
   - ✅ Read, Write, Create

#### For Events:
1. Go to **Role Permissions Manager** → **Event**
2. Set permissions for **Website Manager**:
   - ✅ Read, Write, Create

### Step 6: Enable API Access

1. Go to **System Settings**
2. Enable **Allow CORS**
3. Set **Allowed Origins**: `https://yourdomain.com,http://localhost:5173`

---

## 🔧 Frontend Configuration

### Step 1: Environment Variables

Create `.env` in the project root:

```env
# Development
NODE_ENV=development
VITE_APP_NAME="I-Varse Technologies"
VITE_APP_URL=http://localhost:5173

# Strapi Configuration
VITE_STRAPI_API_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your_strapi_api_token_here

# Feature Flags
VITE_ENABLE_FALLBACKS=true
VITE_ENABLE_ERPNEXT_INTEGRATION=true
VITE_ENABLE_STRAPI_CMS=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEVELOPMENT_TOOLS=true

# Logging
VITE_LOG_LEVEL=debug
```

### Step 2: Configure Strapi Connection

The frontend automatically connects to Strapi using the environment variables. The ERPNext credentials are securely managed through Strapi.

### Step 3: Create ERPNext Credentials in Strapi

1. Go to Strapi Admin → **Content Manager**
2. Create a new **Single Type** called **ERPNext Credentials**:

**Fields:**
```
- baseUrl (Text, Required)
- apiKey (Text, Required)
- apiSecret (Text, Required, Private field)
- siteName (Text)
```

3. Add the credentials:
   - **baseUrl**: `http://localhost:8000` (your ERPNext URL)
   - **apiKey**: Your ERPNext API key
   - **apiSecret**: Your ERPNext API secret
   - **siteName**: I-Varse Technologies

4. Set field permissions to **Private** for apiSecret

---

## 📝 Content Migration

### Step 1: Create Initial Pages

1. Go to Strapi Admin → **Content Manager** → **Pages**
2. Create the following pages:

#### Home Page
```
Title: Home
Slug: home
Meta Title: I-Varse Technologies - Digital Transformation Solutions
Meta Description: Leading provider of digital transformation solutions...

Sections:
- Hero Section:
  Type: hero
  Title: Digital Transformation Solutions
  Subtitle: Empowering businesses with cutting-edge technology
  Content: We help organizations accelerate their digital journey...

- Products Section:
  Type: products
  Title: Our Products
  Subtitle: Innovative software solutions

- Services Section:
  Type: services
  Title: Our Services
  Subtitle: Professional technology services
```

#### About Page
```
Title: About Us
Slug: about
Meta Title: About I-Varse Technologies
Meta Description: Learn about our mission, vision...

Sections:
- Hero Section:
  Type: hero
  Title: About I-Varse Technologies
  Content: We are a leading technology company...
```

### Step 2: Import Products

Use the data migration script:

```bash
# Run the migration script
npm run migrate:products
```

Or manually create products in Strapi using the data from `client/src/lib/data/solutions.ts`.

### Step 3: Import Other Content

Follow the same process for:
- Services
- Team Members
- Testimonials
- Case Studies
- Industries
- Job Listings
- Client Logos
- FAQ Items

### Step 4: Configure UI Text

1. Go to **Content Manager** → **UI Text**
2. Create entries for all button labels, form labels, etc.:

```
Category: buttons, Key: getStarted, Value: Get Started, Language: en
Category: buttons, Key: learnMore, Value: Learn More, Language: en
Category: forms, Key: fullName, Value: Full Name, Language: en
...
```

---

## 🚀 Deployment

### Step 1: Production Environment

Create `.env.production`:

```env
NODE_ENV=production
VITE_APP_URL=https://yourdomain.com

# Strapi (Production)
VITE_STRAPI_API_URL=https://cms.yourdomain.com
VITE_STRAPI_API_TOKEN=your_production_strapi_token

# Feature Flags
VITE_ENABLE_FALLBACKS=true
VITE_ENABLE_ERPNEXT_INTEGRATION=true
VITE_ENABLE_STRAPI_CMS=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEVELOPMENT_TOOLS=false

# Logging
VITE_LOG_LEVEL=error
VITE_LOG_ENDPOINT=https://logs.yourdomain.com
VITE_LOG_API_KEY=your_logging_api_key
```

### Step 2: Build and Deploy

```bash
# Build frontend
npm run build

# Build Strapi
cd "I-VarseTech CMS Backend"
npm run build
cd ..
```

### Step 3: Docker Deployment

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  # Frontend
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - strapi

  # Strapi CMS
  strapi:
    build:
      context: ./I-VarseTech CMS Backend
      dockerfile: Dockerfile
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi_prod
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: ${POSTGRES_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      ADMIN_JWT_SECRET: ${ADMIN_JWT_SECRET}
      APP_KEYS: ${APP_KEYS}
    ports:
      - "1337:1337"
    depends_on:
      - postgres
    volumes:
      - strapi_data:/opt/app/public/uploads

  # Database
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: strapi_prod
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  strapi_data:
  postgres_data:
```

### Step 4: Deploy ERPNext

Use ERPNext Cloud or deploy on your server:

```bash
# Production deployment with bench
cd frappe-bench
bench setup production your_user
```

---

## 🧪 Testing

### Step 1: Run Tests

```bash
# Frontend tests
npm test

# E2E tests
npm run test:e2e

# Backend tests
cd "I-VarseTech CMS Backend"
npm test
```

### Step 2: Manual Testing Checklist

#### Content Management:
- [ ] All pages load from Strapi
- [ ] Fallbacks work when Strapi is down
- [ ] Content updates reflect immediately
- [ ] Media files load correctly

#### Forms:
- [ ] Contact form submits to ERPNext
- [ ] Appointment booking creates events
- [ ] Newsletter subscription works
- [ ] Form validation functions properly

#### Performance:
- [ ] Page load times < 3 seconds
- [ ] Images are optimized
- [ ] Caching works correctly
- [ ] Mobile performance is good

#### SEO:
- [ ] Meta tags are dynamic
- [ ] Structured data is present
- [ ] Sitemap is generated
- [ ] URLs are SEO-friendly

---

## 📚 Content Management Guide

### For Content Editors

#### Adding New Pages:
1. Go to Strapi Admin → **Content Manager** → **Pages**
2. Click **Create new entry**
3. Fill in the page details
4. Add sections using the Dynamic Zone
5. Set SEO metadata
6. Publish the page

#### Managing Products:
1. Go to **Content Manager** → **Products**
2. Create/edit product entries
3. Upload images to the Media Library first
4. Set pricing information
5. Configure product status

#### Writing Blog Posts:
1. Go to ERPNext → **Website** → **Blog Post**
2. Create new blog post
3. Set meta information
4. Enable for website
5. Publish when ready

### For Developers

#### Adding New Content Types:
1. Create content type in Strapi
2. Add corresponding TypeScript interfaces
3. Create data source class
4. Add content hook
5. Update components

#### Customizing Forms:
1. Extend FormFactory with new form type
2. Add validation rules
3. Configure ERPNext integration
4. Test submission flow

---

## 🛠️ Troubleshooting

### Common Issues

#### 1. Strapi Connection Failed

**Symptoms**: Content not loading, fallbacks being used
**Solutions**:
- Check Strapi server is running
- Verify API token is correct
- Check network connectivity
- Review CORS settings

#### 2. ERPNext Form Submission Failed

**Symptoms**: Forms show error messages
**Solutions**:
- Verify ERPNext credentials in Strapi
- Check API user permissions
- Review ERPNext logs
- Test API endpoints manually

#### 3. Images Not Loading

**Symptoms**: Broken image links
**Solutions**:
- Check media library upload
- Verify cloud storage configuration
- Review image URLs in Strapi
- Check CDN settings

#### 4. Performance Issues

**Symptoms**: Slow page loads
**Solutions**:
- Enable caching in production
- Optimize images
- Review database queries
- Use CDN for static assets

### Debug Mode

Enable debug logging:

```env
VITE_LOG_LEVEL=debug
VITE_ENABLE_DEVELOPMENT_TOOLS=true
```

This will show:
- API request/response details
- Cache hit/miss information
- Fallback usage indicators
- Performance metrics

---

## 📞 Support

### Documentation
- [Strapi Documentation](https://docs.strapi.io/)
- [ERPNext Documentation](https://docs.erpnext.com/)
- [React Documentation](https://reactjs.org/)

### Community
- [Strapi Community](https://strapi.io/community)
- [ERPNext Community](https://discuss.erpnext.com/)
- [React Community](https://reactjs.org/community/)

### Professional Support
For enterprise support and customization:
- Email: support@itechnologies.ng
- Website: [I-Varse Technologies](https://itechnologies.ng)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 🎯 Roadmap

- [ ] Multi-tenant support
- [ ] Advanced analytics
- [ ] A/B testing integration
- [ ] Progressive Web App features
- [ ] Offline-first capabilities
- [ ] AI-powered content recommendations

---

**Happy coding! 🚀**
