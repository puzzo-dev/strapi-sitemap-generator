# Strapi Ads Setup Guide

## 🎯 Overview
This guide explains how to set up dynamic ads in Strapi CMS that will be displayed in the blog sidebar and other parts of the I-VARSE website.

## 📋 Strapi Content Type Setup

### 1. Create Ad Slides Content Type
In your Strapi admin panel, create a new content type called `ad-slides` with the following fields:

#### **Basic Information**
- `title` - Text (required) - Ad headline
- `subtitle` - Text (optional) - Secondary text
- `description` - Rich Text (required) - Ad description

#### **Visual & Style**
- `bgColor` - Text (optional) - Tailwind gradient classes (e.g., "from-blue-600 to-blue-800")
- `icon` - Text (optional) - Lucide icon name (e.g., "Star", "Zap", "Shield")
- `image` - Media (optional) - Banner image

#### **Call to Action**
- `cta` - Text (required) - Button text (e.g., "Learn More", "Get Started")
- `ctaUrl` - Text (required) - Target URL

#### **Scheduling & Targeting**
- `startDate` - DateTime (optional) - When ad becomes active
- `endDate` - DateTime (optional) - When ad expires
- `isActive` - Boolean (required, default: true) - Manual on/off toggle
- `priority` - Number (optional, default: 999) - Display priority (lower = higher priority)

#### **Targeting & Analytics**
- `targetAudience` - Component (repeatable) - See section below
- `position` - Enumeration - Options: "blog_sidebar", "homepage_hero", "footer", "popup"
- `adType` - Enumeration - Options: "banner", "text", "video", "interactive"
- `clickTrackingId` - Text (optional) - Custom tracking identifier

### 2. Create Target Audience Component
Create a component called `target-audience` with:
- `audience` - Text (required) - Options: "general", "business-owners", "developers", "startups", "enterprise", "healthcare", "fintech", "education"

### 3. Create Ad Analytics Content Type (Optional)
For tracking ad performance:
- `adId` - Text (required)
- `action` - Enumeration - Options: "view", "click"
- `timestamp` - DateTime (required)
- `userAgent` - Text (optional)
- `referrer` - Text (optional)
- `sessionId` - Text (optional)

## 🚀 How to Add Ads

### **Step 1: Access Strapi Admin**
1. Go to your Strapi admin panel
2. Navigate to "Content Manager"
3. Select "Ad Slides"

### **Step 2: Create a New Ad**
1. Click "Create new entry"
2. Fill out the ad information:

#### **Example ERP Solutions Ad:**
```
Title: "ERP Solutions"
Subtitle: "Streamline Your Operations"
Description: "Complete business management with ERPNext. Automate workflows, manage inventory, and boost productivity."
Background Color: "from-blue-600 to-blue-800"
Icon: "Star"
CTA: "Learn More"
CTA URL: "/services/erp-solutions"
Priority: 1
Is Active: ✓
Position: "blog_sidebar"
Ad Type: "banner"
Target Audience: 
  - "business-owners"
  - "enterprise"
```

#### **Example Cloud Services Ad:**
```
Title: "Cloud Services"
Subtitle: "Scale with Confidence"
Description: "Secure, reliable cloud infrastructure for modern businesses. 99.9% uptime guaranteed."
Background Color: "from-green-600 to-green-800"
Icon: "Cloud"
CTA: "Get Started"
CTA URL: "/services/cloud-services"
Priority: 2
Is Active: ✓
Position: "blog_sidebar"
Target Audience:
  - "developers"
  - "startups"
```

### **Step 3: Configure Targeting**
Use the Target Audience component to specify who should see the ad:
- **general** - Everyone
- **business-owners** - Business decision makers
- **developers** - Technical professionals
- **startups** - Early-stage companies
- **enterprise** - Large organizations
- **healthcare** - Healthcare industry
- **fintech** - Financial services
- **education** - Educational institutions

### **Step 4: Schedule Ads (Optional)**
- Set `startDate` for when the ad should go live
- Set `endDate` for campaign expiration
- Leave blank for always-active ads

## 🎨 Styling Options

### **Background Colors**
Use Tailwind CSS gradient classes:
- `from-blue-600 to-blue-800` - Blue theme
- `from-green-600 to-green-800` - Green theme
- `from-purple-600 to-purple-800` - Purple theme
- `from-red-600 to-red-800` - Red theme
- `from-orange-600 to-orange-800` - Orange theme

### **Available Icons**
Popular Lucide icons:
- `Star` - Featured/premium services
- `Zap` - Fast/powerful solutions
- `Shield` - Security/protection
- `Cloud` - Cloud services
- `Database` - Data management
- `Smartphone` - Mobile solutions
- `Globe` - Global/web services
- `Lock` - Security services
- `Cpu` - Technical/AI services
- `BarChart3` - Analytics/reporting

## 📊 Analytics & Tracking

### **Automatic Tracking**
The system automatically tracks:
- Ad views (impressions)
- Ad clicks
- User agent information
- Referrer data
- Session information

### **Custom Tracking**
Set `clickTrackingId` for custom analytics:
- Use format: `category-service-location` (e.g., "sidebar-erp-banner")
- Integrate with Google Analytics or other tools

## 🔧 Technical Implementation

### **API Endpoints**
The ads are fetched from:
```
GET /api/ad-slides?filters[isActive][$eq]=true&populate=*
```

### **Filtering Options**
- **By Position**: `filters[position][$eq]=blog_sidebar`
- **By Active Status**: `filters[isActive][$eq]=true`
- **By Date Range**: `filters[startDate][$lte]=now&filters[endDate][$gte]=now`
- **By Priority**: `sort[0]=priority:desc`

### **Frontend Integration**
Ads are automatically loaded and displayed in:
- Blog sidebar (right side of blog pages)
- Other positions (configurable via position field)

## 🎯 Best Practices

### **Ad Content**
- Keep titles under 25 characters
- Use action-oriented CTAs
- Write compelling descriptions (50-100 characters)
- Use high-contrast color combinations

### **Targeting**
- Use multiple audience tags for broader reach
- Create industry-specific ads for better conversion
- Test different variations with A/B testing

### **Scheduling**
- Schedule seasonal campaigns
- Set end dates for limited-time offers
- Use priority to control ad rotation

### **Performance**
- Monitor click-through rates
- Update inactive ads regularly
- Keep total active ads under 10 for optimal performance

## 🚨 Troubleshooting

### **Ads Not Showing**
1. Check `isActive` is set to true
2. Verify start/end dates
3. Ensure target audience matches
4. Check Strapi API connectivity

### **Styling Issues**
1. Verify background color uses valid Tailwind classes
2. Check icon name matches Lucide icon library
3. Ensure image URLs are accessible

### **Tracking Issues**
1. Check browser console for errors
2. Verify Strapi analytics endpoint
3. Confirm tracking permissions

## 🔄 Updates & Maintenance

### **Regular Tasks**
- Review ad performance monthly
- Update expired campaigns
- Refresh creative content quarterly
- Monitor analytics data

### **Content Updates**
- All changes in Strapi take effect immediately
- No code deployment required
- Cache refreshes every 5 minutes

This system provides a complete solution for managing dynamic ads through Strapi while maintaining fallback to static content when needed.
