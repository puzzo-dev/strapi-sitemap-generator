# 🚀 Complete Strapi CMS Guide for I-Varse Website

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites & Installation](#prerequisites--installation)
- [Complete Content Types Setup](#complete-content-types-setup)
- [Page-Specific Content Types](#page-specific-content-types)
- [API Configuration](#api-configuration)
- [Frontend Integration](#frontend-integration)
- [Recent Implementation Updates](#recent-implementation-updates)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This comprehensive guide covers Strapi CMS setup for the complete I-Varse website ecosystem. The website has extensive pages and detail views that require specific content type structures.

### Complete Page Structure
Based on the client folder, the website includes:

**Main Pages:**
- `Home.tsx` - Homepage with hero, services, products, testimonials, case studies
- `About.tsx` - About us page with team, company story, values
- `Contact.tsx` - Contact page with forms, location, contact info
- `Blog.tsx` - Blog listing page with categories and search
- `Careers.tsx` - Careers page with job listings and company culture
- `FAQ.tsx` - Frequently asked questions page
- `Services.tsx` - Services listing page
- `Products.tsx` - Products listing page
- `CaseStudies.tsx` - Case studies listing page
- `Industries.tsx` - Industries listing page
- `Team.tsx` - Team members listing page

**Detail Pages:**
- `ServiceDetail.tsx` - Individual service pages with full descriptions
- `ProductDetail.tsx` - Individual product pages with features, pricing
- `CaseStudyDetail.tsx` - Individual case study pages with full project details
- `IndustryDetail.tsx` - Individual industry pages with specific solutions
- `TeamMember.tsx` - Individual team member profile pages
- `BlogPost.tsx` - Individual blog post pages
- `JobDetail.tsx` - Individual job posting pages

**Utility Pages:**
- `Privacy.tsx`, `Terms.tsx`, `Cookies.tsx` - Legal pages
- `Accessibility.tsx` - Accessibility statement
- `Sitemap.tsx` - Site structure
- `not-found.tsx` - 404 error page

### Technology Stack
- **Frontend**: React + TypeScript with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **CMS**: Strapi (with static fallbacks)
- **State Management**: React Query for data fetching
- **Database**: PostgreSQL (production) / SQLite (development)

### Current Data Structure
The website uses comprehensive static data files in `/client/src/lib/data/`:
- `services.ts` - Service offerings with full descriptions, benefits, case studies
- `products.ts` - Product catalog with features, pricing, gallery, industry targets  
- `team.ts` - Team member profiles with social links, projects, detailed bios
- `case-studies.ts` - Project case studies with metrics, testimonials, results
- `industries.ts` - Industry-specific solutions with challenges, solutions, case studies
- `blog.ts` - Blog posts and articles with categories and metadata
- `testimonials.ts` - Client testimonials and reviews with ratings
- `jobs.ts` - Job listings with requirements and benefits
- `config.ts` - Site configuration, settings, and navigation (navItems)
- `pages.ts` - Page content and metadata for all site pages
- `policies.ts` - Privacy policy, terms of service, legal documents
- `sitemap.ts` - Site structure and URL mappings
- `faq.ts` - Frequently asked questions and answers
- `footer.ts` - Footer content and links
- `hero.ts` - Hero section content for various pages
- `benefits.ts` - Benefits and value propositions
- `clients.ts` - Client logos and information
- `errors.ts` - Error messages and content
- `ads.ts` - Advertisement and promotional content

---

## 🔧 Prerequisites & Installation

### Required Software
- **Node.js**: Version 16.x or 18.x
- **npm**: Version 7.x or higher
- **Database**: PostgreSQL, MySQL, or SQLite
- **Git**: For version control

### Step 1: Create Strapi Backend
```bash
# Navigate to your project root
cd /path/to/ivarse-website

# Create Strapi backend
npx create-strapi-app@latest backend --quickstart

# Navigate to backend directory
cd backend

# Start Strapi in development mode
npm run develop
```

### Step 2: Admin Setup
1. Open `http://localhost:1337/admin`
2. Create admin user account
3. Complete initial setup

---

## 📊 Complete Content Types Setup

### 1. Site Configuration
**Collection Type: `site-config`**

Fields for overall site settings (matching your config.ts defaultSiteConfig):
- `siteName` (Text, required)
- `siteDescription` (Text)
- `siteUrl` (Text, required)
- `contactEmail` (Email)
- `contactPhone` (Text)
- `contactAddress` (Text)
- `logoLight` (Media - Single)
- `logoDark` (Media - Single)
- `favicon` (Media - Single)
- `erpNextUrl` (Text)
- `erpNextApiKey` (Text)
- `erpNextApiSecret` (Text)

### 2. Navigation & Footer
**Collection Type: `navigation-items`**

Fields for main navigation (matching your navItems structure in config.ts):
- `label` (Text, required)
- `url` (JSON) - Object with url property
- `order` (Number)
- `isButton` (Boolean, default: false)
- `isVisible` (Boolean, default: true)
- `children` (Relation - navigation-items, has many)

**Collection Type: `footer-content`**

Fields for footer sections:
- `sectionTitle` (Text, required)
- `content` (Rich Text)
- `links` (JSON) - Array of {title, url, external}
- `order` (Number)
- `isVisible` (Boolean, default: true)

### 3. Services (Complete)
**Collection Type: `services`**

Fields for Services.tsx and ServiceDetail.tsx:
- `title` (Text, required)
- `slug` (UID, target: title)
- `description` (Text, required) - For listing page
- `fullDescription` (Rich Text) - For detail page
- `shortDescription` (Text) - For cards/previews
- `icon` (Text) - FontAwesome icon names
- `image` (Media - Single)
- `heroImage` (Media - Single) - For detail page hero
- `price` (Text) - Starting price display
- `duration` (Text) - Typical project duration
- `isActive` (Boolean, default: true)
- `isFeatured` (Boolean, default: false)
- `order` (Number)

Create component `service-benefit`:
- `title` (Text)
- `description` (Text)
- `icon` (Text)

Create component `service-feature`:
- `title` (Text)
- `description` (Text)
- `included` (Boolean, default: true)

Create component `service-process-step`:
- `title` (Text)
- `description` (Text)
- `order` (Number)
- `icon` (Text)

Create component `service-faq`:
- `question` (Text)
- `answer` (Rich Text)

Add to services:
- `benefits` (Component - service-benefit, repeatable)
- `features` (Component - service-feature, repeatable)
- `process` (Component - service-process-step, repeatable)
- `faqs` (Component - service-faq, repeatable)
- `relatedServices` (Relation - services, has many)
- `targetIndustries` (Relation - industries, has many)

### 4. Products (Complete)
**Collection Type: `products`**

Fields for Products.tsx and ProductDetail.tsx:
- `title` (Text, required)
- `slug` (UID, target: title)
- `description` (Rich Text)
- `shortDescription` (Text)
- `tagline` (Text) - Marketing tagline
- `image` (Media - Single)
- `heroImage` (Media - Single)
- `logo` (Media - Single)
- `status` (Enumeration: Active, Beta, Coming Soon, Discontinued)
- `featured` (Boolean, default: false)
- `launchDate` (Date)
- `version` (Text)
- `demoUrl` (Text)
- `documentationUrl` (Text)
- `supportUrl` (Text)

Create component `gallery-item`:
- `image` (Media - Single)
- `title` (Text)
- `type` (Enumeration: screenshot, feature, demo, interface, video)
- `size` (Enumeration: large, medium, small, tall)
- `description` (Text)
- `videoUrl` (Text)

Create component `pricing-plan`:
- `name` (Text)
- `description` (Text)
- `price` (Number)
- `period` (Text)
- `currency` (Text, default: "USD")
- `features` (JSON)
- `isRecommended` (Boolean, default: false)
- `buttonText` (Text)
- `buttonUrl` (Text)

Create component `product-feature`:
- `title` (Text)
- `description` (Text)
- `icon` (Text)
- `image` (Media - Single)

Create component `industry-target`:
- `title` (Text)
- `description` (Text)
- `icon` (Text)

Create component `integration`:
- `name` (Text)
- `description` (Text)
- `logo` (Media - Single)
- `url` (Text)

Add to products:
- `keyFeatures` (JSON)
- `detailedFeatures` (Component - product-feature, repeatable)
- `benefits` (Component - service-benefit, repeatable)
- `targetIndustries` (Component - industry-target, repeatable)
- `pricing` (Component - pricing-plan, repeatable)
- `gallery` (Component - gallery-item, repeatable)
- `integrations` (Component - integration, repeatable)
- `relatedProducts` (Relation - products, has many)

### 5. Case Studies (Complete)
**Collection Type: `case-studies`**

Fields for CaseStudies.tsx and CaseStudyDetail.tsx:
- `title` (Text, required)
- `slug` (UID, target: title)
- `description` (Text, required)
- `client` (Text, required)
- `clientLogo` (Media - Single)
- `industry` (Text, required)
- `duration` (Text)
- `teamSize` (Number)
- `budget` (Text)
- `challenge` (Rich Text)
- `solution` (Rich Text)
- `implementation` (Rich Text)
- `results` (Rich Text)
- `content` (Rich Text) - Full case study content
- `image` (Media - Single)
- `heroImage` (Media - Single)
- `status` (Enumeration: Completed, In Progress, Planned)
- `featured` (Boolean, default: false)
- `publishedDate` (Date)
- `completedDate` (Date)

Create component `case-study-metric`:
- `label` (Text)
- `value` (Text)
- `description` (Text)
- `type` (Enumeration: percentage, number, currency, time)

Create component `technology-used`:
- `name` (Text)
- `category` (Text)
- `logo` (Media - Single)

Create component `project-phase`:
- `title` (Text)
- `description` (Text)
- `duration` (Text)
- `deliverables` (JSON)
- `order` (Number)

Create component `testimonial-quote`:
- `quote` (Rich Text)
- `author` (Text)
- `position` (Text)
- `company` (Text)
- `authorImage` (Media - Single)

Add to case-studies:
- `technologies` (Component - technology-used, repeatable)
- `metrics` (Component - case-study-metric, repeatable)
- `phases` (Component - project-phase, repeatable)
- `testimonials` (Component - testimonial-quote, repeatable)
- `relatedCaseStudies` (Relation - case-studies, has many)
- `relatedServices` (Relation - services, has many)
- `relatedProducts` (Relation - products, has many)

### 6. Industries (Complete)
**Collection Type: `industries`**

Fields for Industries.tsx and IndustryDetail.tsx:
- `name` (Text, required)
- `slug` (UID, target: name)
- `description` (Text, required)
- `content` (Rich Text) - Full description for detail page
- `shortDescription` (Text)
- `icon` (Text)
- `image` (Media - Single)
- `heroImage` (Media - Single)
- `featured` (Boolean, default: false)
- `order` (Number)

Create component `industry-challenge`:
- `title` (Text)
- `description` (Text)
- `icon` (Text)

Create component `industry-solution`:
- `title` (Text)
- `description` (Text)
- `icon` (Text)
- `services` (Relation - services, has many)

Create component `industry-benefit`:
- `title` (Text)
- `description` (Text)
- `icon` (Text)

Create component `industry-stat`:
- `label` (Text)
- `value` (Text)
- `description` (Text)

Add to industries:
- `challenges` (Component - industry-challenge, repeatable)
- `solutions` (Component - industry-solution, repeatable)
- `benefits` (Component - industry-benefit, repeatable)
- `statistics` (Component - industry-stat, repeatable)
- `technologies` (JSON)
- `relatedServices` (Relation - services, has many)
- `relatedProducts` (Relation - products, has many)
- `caseStudies` (Relation - case-studies, has many)

### 7. Team Members (Complete)
**Collection Type: `team-members`**

Fields for Team.tsx and TeamMember.tsx:
- `name` (Text, required)
- `position` (Text, required)
- `slug` (UID, target: name)
- `bio` (Rich Text)
- `role` (Text)
- `image` (Media - Single)
- `description` (Text)
- `email` (Email)
- `phone` (Text)
- `location` (Text)
- `joinedAt` (Text) - Join date as text
- `isActive` (Boolean, default: true)

Create component `social-link`:
- `platform` (Text)
- `url` (Text)
- `icon` (Text)
- `title` (Text)

Create component `project-item`:
- `title` (Text)
- `description` (Text)
- `subtitle` (Text)

Add to team-members:
- `socialLinks` (Component - social-link, repeatable)
- `projects` (JSON) - Projects section with items array
- `relatedTeamMembers` (JSON) - Related team members section
- `erpNextId` (Text)
- `erpNextStatus` (Enumeration: active, inactive, terminated)
- `erpNextDepartment` (Text)

### 8. Blog Posts (Complete)
**Collection Type: `blog-posts`**

Fields for Blog.tsx and BlogPost.tsx:
- `title` (Text, required)
- `slug` (UID, target: title)
- `excerpt` (Text)
- `content` (Rich Text)
- `featuredImage` (Media - Single)
- `publishedAt` (DateTime)
- `updatedAt` (DateTime)
- `isPublished` (Boolean, default: false)
- `isFeatured` (Boolean, default: false)
- `readingTime` (Number) - Estimated reading time in minutes
- `views` (Number, default: 0)
- `metaTitle` (Text)
- `metaDescription` (Text)

Create component `blog-category`:
- `name` (Text)
- `slug` (Text)
- `description` (Text)
- `color` (Text)

Create component `blog-tag`:
- `name` (Text)
- `slug` (Text)

Create component `related-link`:
- `title` (Text)
- `url` (Text)
- `description` (Text)

Add to blog-posts:
- `author` (Relation - team-members, has one)
- `categories` (Component - blog-category, repeatable)
- `tags` (Component - blog-tag, repeatable)
- `relatedPosts` (Relation - blog-posts, has many)
- `relatedLinks` (Component - related-link, repeatable)

### 9. Job Listings (Complete)
**Collection Type: `job-listings`**

Fields for Careers.tsx and JobDetail.tsx:
- `title` (Text, required)
- `slug` (UID, target: title)
- `description` (Rich Text)
- `shortDescription` (Text)
- `location` (Text)
- `type` (Enumeration: Full-time, Part-time, Contract, Internship, Remote)
- `level` (Enumeration: Entry, Junior, Mid, Senior, Lead, Principal, Director)
- `department` (Enumeration: Engineering, Design, Operations, Sales, Marketing, HR, Finance)
- `salary` (Text)
- `benefits` (Rich Text)
- `requirements` (Rich Text)
- `responsibilities` (Rich Text)
- `qualifications` (Rich Text)
- `isPublished` (Boolean, default: false)
- `isFeatured` (Boolean, default: false)
- `isRemote` (Boolean, default: false)
- `applicationDeadline` (Date)
- `postedAt` (DateTime)
- `updatedAt` (DateTime)

Create component `job-requirement`:
- `title` (Text)
- `description` (Text)
- `isRequired` (Boolean, default: true)
- `category` (Text)

Create component `job-benefit`:
- `title` (Text)
- `description` (Text)
- `icon` (Text)
- `category` (Text)

Create component `job-responsibility`:
- `title` (Text)
- `description` (Text)
- `category` (Text)

Add to job-listings:
- `detailedRequirements` (Component - job-requirement, repeatable)
- `detailedBenefits` (Component - job-benefit, repeatable)
- `detailedResponsibilities` (Component - job-responsibility, repeatable)
- `hiringManager` (Relation - team-members, has one)
- `department` (Relation - team-members, has many) - Team they'll join

### 10. Testimonials (Complete)
**Collection Type: `testimonials`**

Fields for testimonial sections across pages:
- `name` (Text, required)
- `position` (Text)
- `company` (Text)
- `content` (Rich Text)
- `rating` (Number, min: 1, max: 5)
- `image` (Media - Single)
- `companyLogo` (Media - Single)
- `isPublished` (Boolean, default: true)
- `isFeatured` (Boolean, default: false)
- `category` (Enumeration: Service, Product, General, Case Study)
- `linkedProject` (Relation - case-studies, has one)
- `linkedService` (Relation - services, has one)
- `linkedProduct` (Relation - products, has one)

### 11. FAQ (Complete)
**Collection Type: `faqs`**

Fields for FAQ.tsx and FAQ sections:
- `question` (Text, required)
- `answer` (Rich Text, required)
- `category` (Enumeration: General, Services, Products, Billing, Technical, Support)
- `order` (Number)
- `isPublished` (Boolean, default: true)
- `isFeatured` (Boolean, default: false)
- `relatedService` (Relation - services, has one)
- `relatedProduct` (Relation - products, has one)
- `tags` (JSON)

## 📄 Page-Specific Content Types

### 12. Page Content
**Collection Type: `page-content`**

Fields for dynamic page content (Home, About, Contact, etc.):
- `pageName` (Text, required) - e.g., "home", "about", "contact"
- `slug` (UID, target: pageName)
- `title` (Text)
- `description` (Rich Text)
- `metaTitle` (Text)
- `metaDescription` (Text)
- `metaKeywords` (Text)
- `ogImage` (Media - Single)
- `sections` (JSON) - Array of page sections with type, title, content, settings

### 13. Legal Pages
**Collection Type: `legal-pages`**

Fields for Privacy.tsx, Terms.tsx, Cookies.tsx:
- `title` (Text, required)
- `slug` (UID, target: title)
- `content` (Rich Text, required)
- `lastUpdated` (DateTime)
- `effectiveDate` (Date)
- `version` (Text)
- `isActive` (Boolean, default: true)

### 14. Careers Information
**Collection Type: `careers-info`**

Fields for Careers.tsx page:
- `title` (Text)
- `description` (Rich Text)
- `whyJoinUs` (Rich Text)
- `culture` (Rich Text)

Create component `career-benefit`:
- `title` (Text)
- `description` (Text)
- `icon` (Text)
- `category` (Text)

Create component `career-value`:
- `title` (Text)
- `description` (Text)
- `icon` (Text)

Add to careers-info:
- `benefits` (Component - career-benefit, repeatable)
- `values` (Component - career-value, repeatable)

### 15. Advertisement Content
**Collection Type: `advertisements`**

Fields for dynamic ads system (matching your actual AdSlide interface):
- `title` (Text, required)
- `subtitle` (Text, required)
- `description` (Text, required)
- `bgColor` (Text) - Gradient classes like "from-blue-600 to-blue-800"
- `icon` (Text) - Lucide icon name reference
- `image` (Media - Single)
- `cta` (Text) - Call to action text
- `ctaUrl` (Text)
- `isActive` (Boolean, default: true)
- `priority` (Number)
- `startDate` (DateTime)
- `endDate` (DateTime)
- `targetAudience` (JSON) - Array of audience strings
- `clickTrackingId` (Text)

---

## 🔌 API Configuration

### Step 1: Configure Permissions
1. Go to Settings → Users & Permissions Plugin → Roles
2. Select "Public" role
3. Enable permissions for all content types:

**Core Content:**
- `site-config`: find, findOne
- `navigation-items`: find, findOne
- `footer-content`: find, findOne
- `page-content`: find, findOne
- `careers-info`: find, findOne

**Main Content Types:**
- `services`: find, findOne
- `products`: find, findOne
- `case-studies`: find, findOne (where isPublished = true)
- `industries`: find, findOne
- `team-members`: find, findOne (where isActive = true)
- `blog-posts`: find, findOne (where isPublished = true)
- `job-listings`: find, findOne (where isPublished = true)
- `testimonials`: find, findOne (where isPublished = true)
- `faqs`: find, findOne (where isPublished = true)

**Utility Content:**
- `legal-pages`: find, findOne (where isActive = true)
- `advertisements`: find, findOne (where isActive = true)

### Step 2: Generate API Token
1. Settings → API Tokens → Create new API Token
2. Name: "Frontend API Token"
3. Type: "Read-only"
4. Duration: "Unlimited"
5. Save and copy the token

### Step 3: Test API Endpoints
```bash
# Test core configuration
curl http://localhost:1337/api/site-config?populate=*
curl http://localhost:1337/api/navigation-items?populate=*
curl http://localhost:1337/api/page-content?populate=*

# Test main content types
curl http://localhost:1337/api/services?populate=*
curl http://localhost:1337/api/products?populate=*
curl http://localhost:1337/api/team-members?populate=*&filters[isActive][$eq]=true

# Test detail pages content
curl http://localhost:1337/api/case-studies?populate=*&filters[isPublished][$eq]=true
curl http://localhost:1337/api/industries?populate=*
curl http://localhost:1337/api/blog-posts?populate=*&filters[isPublished][$eq]=true

# Test job and testimonial content
curl http://localhost:1337/api/job-listings?populate=*&filters[isPublished][$eq]=true
curl http://localhost:1337/api/testimonials?populate=*&filters[isPublished][$eq]=true
curl http://localhost:1337/api/faqs?populate=*&filters[isPublished][$eq]=true

# Test utility pages
curl http://localhost:1337/api/legal-pages?populate=*&filters[isActive][$eq]=true
curl http://localhost:1337/api/careers-info?populate=*
```

---

## 🔗 Frontend Integration

### Environment Variables
Create `.env` file in client directory:
```env
VITE_STRAPI_API_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your-api-token-here
VITE_STRAPI_UPLOADS_URL=http://localhost:1337/uploads
```

### Complete Data Flow Pattern
The application uses a comprehensive fallback system for all pages:

```typescript
// Main pages pattern (Home, About, Contact, etc.)
const { data: pageContent } = useQuery({
  queryKey: ['pageContent', 'home'],
  queryFn: async () => {
    try {
      const strapiContent = await getPageContent('home');
      return strapiContent || localHomePageData;
    } catch {
      return localHomePageData;
    }
  }
});

// Detail pages pattern (ServiceDetail, ProductDetail, etc.)
const { data: serviceDetail } = useQuery({
  queryKey: ['serviceDetail', slug],
  queryFn: async () => {
    try {
      const strapiData = await getServiceBySlug(slug);
      return strapiData || localServices.find(s => s.slug === slug);
    } catch {
      return localServices.find(s => s.slug === slug);
    }
  }
});

// Listing pages pattern (Services, Products, CaseStudies, etc.)
const { data: servicesList } = useQuery({
  queryKey: ['services'],
  queryFn: async () => {
    try {
      const strapiData = await getAllServices();
      return strapiData || localServices;
    } catch {
      return localServices;
    }
  }
});
```

### Complete Integration Architecture
```
Static Data (Fallback) ← Strapi CMS → React Query → UI Components
                                    ↓
                            Page Components:
                            ├── Home.tsx
                            ├── About.tsx
                            ├── Contact.tsx
                            ├── Services.tsx → ServiceDetail.tsx
                            ├── Products.tsx → ProductDetail.tsx
                            ├── CaseStudies.tsx → CaseStudyDetail.tsx
                            ├── Industries.tsx → IndustryDetail.tsx
                            ├── Team.tsx → TeamMember.tsx
                            ├── Blog.tsx → BlogPost.tsx
                            ├── Careers.tsx → JobDetail.tsx
                            └── FAQ.tsx
                                    ↓
                            Dynamic Systems:
                            ├── Ad Manager ← Contextual Targeting
                            ├── Career Management ← ERPNext Integration
                            ├── Analytics ← User Behavior Tracking
                            └── SEO ← Meta Tags & Schema
```

### Hook Integration for All Pages
```typescript
// For main pages
export const useHomePage = () => usePageContent('home', localHomeData);
export const useAboutPage = () => usePageContent('about', localAboutData);
export const useContactPage = () => usePageContent('contact', localContactData);

// For listing pages
export const useServices = () => useListContent('services', localServices);
export const useProducts = () => useListContent('products', localProducts);
export const useCaseStudies = () => useListContent('case-studies', localCaseStudies);
export const useIndustries = () => useListContent('industries', localIndustries);
export const useTeamMembers = () => useListContent('team-members', localTeam);
export const useBlogPosts = () => useListContent('blog-posts', localBlog);
export const useJobListings = () => useListContent('job-listings', localJobs);

// For detail pages
export const useServiceDetail = (slug) => useDetailContent('services', slug, localServices);
export const useProductDetail = (slug) => useDetailContent('products', slug, localProducts);
export const useCaseStudyDetail = (slug) => useDetailContent('case-studies', slug, localCaseStudies);
export const useIndustryDetail = (slug) => useDetailContent('industries', slug, localIndustries);
export const useTeamMemberDetail = (slug) => useDetailContent('team-members', slug, localTeam);
export const useBlogPostDetail = (slug) => useDetailContent('blog-posts', slug, localBlog);
export const useJobDetail = (slug) => useDetailContent('job-listings', slug, localJobs);

// For utility content
export const useSiteConfig = () => useUtilityContent('site-config', defaultSiteConfig);
export const useNavigation = () => useUtilityContent('navigation-items', navItems);
export const useFooterContent = () => useUtilityContent('footer-content', footerContent);
export const useCareersInfo = () => useUtilityContent('careers-info', localCareersInfo);
export const useLegalPages = () => useUtilityContent('legal-pages', localPolicies);
export const useTestimonials = () => useUtilityContent('testimonials', testimonials);
export const useFAQs = () => useUtilityContent('faqs', faqData);
```

---

## 🚀 Recent Implementation Updates

### **Major Fixes Implemented (2024-2025)**

#### **✅ Service Card Typography Fix**
**Issue**: Service card fonts were too small for readability
**Solution**: Updated `ServiceCard.tsx` typography
```typescript
// Before: text-xs and text-sm
// After: text-lg for titles, text-base for descriptions
<h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
<p className="text-base text-gray-300 leading-relaxed">{description}</p>
```

#### **✅ Product Display System Fixes**
**Issue**: ProductCard component prop naming inconsistency
**Solution**: Fixed prop naming across all components
```typescript
// Correct usage throughout application
<ProductCard item={product} isReversed={index % 2 !== 0} />
```

#### **✅ Case Studies Display Fix**
**Issue**: Team size was showing on case studies cards ("👥 16") when it shouldn't be displayed
**Solution**: Removed team size display from `CaseStudiesGridSection.tsx`
```typescript
// Before: Showing both duration and team size
<span className="mr-4">📅 {cs.duration}</span>
<span>👥 {cs.teamSize}</span>

// After: Only showing duration
<span>📅 {cs.duration}</span>
```

#### **✅ Service Detail Page Duplication Fix**
**Issue**: Service description was being repeated in both Hero and Description sections
**Solution**: Removed fallback to `service.description` in Description Section
```typescript
// Before: Fallback caused duplication
{service.fullDescription?.split('\n\n').map(...) || (
  <p>{service.description}</p>
)}

// After: Only show fullDescription
{service.fullDescription && (
  service.fullDescription.split('\n\n').map(...)
)}
```

#### **✅ Enhanced User Interface Components**
- **GradientButton**: Fixed onClick handling for mixed href/onClick scenarios
- **Social Sharing**: Added `SocialShareButtons` component
- **Theme Management**: Implemented `ThemeSelector` with auto-scheduling
- **Dynamic Ads**: Created `DynamicAdCarousel` for contextual ad display

#### **✅ Career System Implementation**
- Expression of Interest Form with Framer Motion animations
- Enhanced `useCareersPageState` hook with form visibility controls
- ERPNext integration for job application submissions

---

## 🛠️ Development Guidelines

### Component Standards

#### 1. Prop Naming Consistency
```typescript
// ✅ Correct
<ProductCard item={product} />
<ServiceCard service={service} />

// ❌ Incorrect
<ProductCard product={product} />
```

#### 2. Typography Scale
```typescript
// ✅ Recommended typography
className="text-lg font-semibold"    // Titles
className="text-base leading-relaxed" // Descriptions
className="text-sm text-gray-500"    // Meta information

// ❌ Avoid
className="text-xs" // Too small for main content
```

#### 3. Button Interactions
```typescript
// Handle mixed href/onClick scenarios
const handleClick = (e: React.MouseEvent) => {
  if (onClick) onClick(e);
};

<GradientButton href="#" onClick={handleClick}>
  Button Text
</GradientButton>
```

### Type Safety Requirements
- All components must use proper TypeScript types from `/lib/types/`
- No hardcoded types - use generic patterns where applicable
- Ensure proper prop interfaces for all custom components

### Performance Best Practices
- **Lazy Loading**: All route components are lazy-loaded
- **Image Optimization**: Responsive images with proper sizing
- **Animation Performance**: Hardware-accelerated animations with Framer Motion
- **Bundle Splitting**: Optimized chunk splitting for faster initial loads
- **React Query Caching**: 5-minute stale time, 10-minute cache time

---

## 🚀 Deployment

### Database Setup (Production)
```sql
CREATE DATABASE ivarse_strapi;
CREATE USER strapi_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE ivarse_strapi TO strapi_user;
```

### Environment Variables (Production)
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ivarse_strapi
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=secure_password
```

### Production Deployment
```bash
# Build and start with PM2
cd backend
npm run build
pm2 start npm --name "strapi" -- start
pm2 save
pm2 startup
```

---

## 🔍 Troubleshooting

### Common Issues

**1. API Returns Empty Data**
- Verify content exists and is published
- Check permissions are set correctly
- Test endpoints with curl

**2. CORS Errors**
Update `backend/config/middlewares.js`:
```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
        },
      },
    },
  },
  'strapi::cors',
  // ... other middlewares
];
```

**3. Frontend Integration Issues**
- Verify environment variables are set
- Check API token permissions
- Test fallback system when CMS is offline

### Debug Commands
```bash
# View Strapi logs
tail -f backend/logs/strapi.log

# Debug mode
DEBUG=strapi:* npm run develop

# Test both servers
cd backend && npm run develop &
cd client && npm run dev
```

---

## 📝 Migration Checklist

### Pre-Migration
- [ ] Backup existing static data files
- [ ] Test Strapi installation locally
- [ ] Create all content types with proper fields
- [ ] Set up permissions and API tokens
- [ ] Test all API endpoints

### Migration Process
**Phase 1: Core Setup**
- [ ] Start with site configuration and navigation structure
- [ ] Set up footer content and legal pages
- [ ] Configure page content structure for main pages
- [ ] Import company information and contact details

**Phase 2: Main Content Types**
- [ ] Import all services with complete detail page content
- [ ] Import all products with pricing, gallery, and features
- [ ] Import all industries with challenges, solutions, and case studies
- [ ] Add team members with complete profiles and social links

**Phase 3: Project & Content**
- [ ] Import case studies with full project details and metrics
- [ ] Add blog posts with proper categorization and authors
- [ ] Import testimonials and link to relevant projects/services
- [ ] Add FAQ content with proper categorization

**Phase 4: Career & Jobs**
- [ ] Set up careers information and company culture content
- [ ] Import job listings with detailed requirements and benefits
- [ ] Link hiring managers to team members

**Phase 5: Utility & Enhancement**
- [ ] Set up advertisement content for dynamic ads
- [ ] Import sitemap structure and legal documents
- [ ] Verify all API endpoints and relationships
- [ ] Test all page types: main, listing, and detail pages

**Phase 6: Testing & Validation**
- [ ] Test all main pages (Home, About, Contact, FAQ)
- [ ] Test all listing pages (Services, Products, CaseStudies, Industries, Team, Blog, Careers)
- [ ] Test all detail pages (ServiceDetail, ProductDetail, CaseStudyDetail, IndustryDetail, TeamMember, BlogPost, JobDetail)
- [ ] Test utility pages (Privacy, Terms, Cookies, Accessibility, Sitemap)
- [ ] Validate frontend integration and fallback systems
- [ ] Test filtering, search, and navigation functionality

### Post-Migration
- [ ] Performance testing with real data
- [ ] Content team training on admin panel
- [ ] Update documentation
- [ ] Set up monitoring and backup procedures
- [ ] Verify fallback system works correctly

---

## 📞 Support Resources

- **Strapi Documentation**: https://docs.strapi.io/
- **React Query**: https://tanstack.com/query/latest
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/

---

This unified guide provides complete coverage of both Strapi setup and implementation details. The existing frontend code in `/client/src/lib/strapi.ts` and related hooks already support this architecture with robust fallback mechanisms.
