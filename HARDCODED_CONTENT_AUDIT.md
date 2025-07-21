# 🔍 **HARDCODED CONTENT AUDIT**

## Overview
This document lists all hardcoded text content found in the project that should be moved to a centralized content management system or configuration files to make the application more maintainable and easier to customize.

---

## 📋 **FORMS & INPUT COMPONENTS**

### ContactForm.tsx
**Location**: `client/src/components/ui/ContactForm.tsx`

**Hardcoded Content:**
- Labels: "Phone *", "Request Type *", "Message *"
- Placeholders: "Enter your phone number", "Tell us about your project"
- Select Options: "Select request type", "Product Enquiry", "Request for Information", "Suggestions", "Other"
- Form Title: Variable but could be centralized

### BookingForm.tsx
**Location**: `client/src/components/ui/BookingForm.tsx`

**Hardcoded Content:**
- Form Title: "BOOK AN APPOINTMENT"
- Labels: "Full Name *", "Email *", "Phone *", "Topic *", "Date *", "Time *", "Message *"
- Placeholders: "Enter your full name", "Enter your email address", "Enter your phone number", "Meeting topic", "Tell us more about what you'd like to discuss"
- Button Text: "Book Appointment", "Booking..."
- Toast Messages: "Success!", "Your appointment has been scheduled...", "Error!", "There was a problem scheduling..."

### NewsletterForm.tsx
**Location**: `client/src/components/ui/NewsletterForm.tsx`

**Hardcoded Content:**
- Placeholder: "Enter your email"
- Button text: Likely "Subscribe" or similar

### Job Application Forms
**Location**: `client/src/components/sections/job/JobApplicationSidebar.tsx`

**Uses configurable content**: ✅ Good - uses `applicationContent?.placeholders?.`

---

## 🎯 **NAVIGATION & LAYOUT**

### Footer.tsx
**Location**: `client/src/components/layout/Footer.tsx`

**Hardcoded Content:**
- Newsletter Section: "Subscribe to our newsletter", "Stay updated with our latest news and offers"
- Mobile Newsletter: "Subscribe to Our Newsletter", "Stay updated with our latest tech insights and offers"
- Copyright Text: "All rights reserved."
- Contact Section Labels: "Phone", "Email"

### Navbar.tsx
**Location**: `client/src/components/layout/Navbar.tsx`

**Hardcoded Content:**
- Fallback Button Text: "Contact Us"
- Aria Labels: "Toggle mobile menu"

### MobileMenu.tsx
**Location**: `client/src/components/layout/MobileMenu.tsx`

**Hardcoded Content:**
- Aria Label: "Close mobile menu"

---

## 🔄 **LOADING & ERROR STATES**

### Error Pages
**Location**: `client/src/lib/data/errors.ts`, `client/src/pages/not-found.tsx`

**Content**: Error messages, titles, and button text - **✅ Already organized in data files**

### Loading Components
**Multiple locations**

**Hardcoded Content:**
- Loading skeleton aria-labels
- Loading state messages like "Loading...", "Submitting...", "Booking..."

---

## 📝 **COMPONENT LABELS & MESSAGES**

### FAQ Components
**Location**: `client/src/components/sections/faq/`

**Hardcoded Content:**
- Search placeholder: "Search frequently asked questions..."
- Section badges: "📈 Most Popular", various emoji badges
- Button text: "Clear search", search result counts
- Contact section: "Still have questions?", "Can't find what you're looking for?"

### Product/Service Components
**Location**: `client/src/components/sections/product/`, `client/src/components/sections/service/`

**Hardcoded Content:**
- Section titles: "Key Features", "Benefits", "Flexible Plans for Every Need"
- Button text: "Most Popular", "Get Started", "Learn More"
- Default fallback text for missing content

### Blog Components
**Location**: `client/src/components/sections/blog/`

**Uses translation system**: ✅ Good - uses `t('ui.searchPlaceholder')` pattern

---

## 🎨 **SECTION HEADERS & BADGES**

### Hero Sections
**Multiple locations**

**Hardcoded Content:**
- Badge text with emojis: "🚀 Digital Innovation", "👥 Team Member", "💼 Current Openings"
- Default titles when content is missing
- Loading state placeholder text

### CTA Sections
**Multiple locations**

**Hardcoded Content:**
- Default CTA text: "Get Started", "Contact Us", "Learn More"
- Fallback descriptions and button labels

---

## ⚠️ **VALIDATION MESSAGES**

### Form Validation
**Multiple form components**

**Hardcoded Content:**
- "Name must be at least 2 characters"
- "Please enter a valid email address"
- "Please enter a valid phone number"
- "Message must be at least 10 characters"
- "Cover letter must be at least 50 characters"
- "You must agree to the terms"
- "Please select a request type"

---

## 🔗 **SOCIAL LINKS & METADATA**

### Structured Data
**Location**: `client/src/components/seo/StructuredData.ts`

**Hardcoded Content:**
- Company name: "I-VARSE Technologies"
- Social media URLs
- Contact information

**Note**: Some of this should remain hardcoded as it's company-specific metadata.

---

## 📊 **STATISTICS & COUNTERS**

### Stats Sections
**Multiple locations**

**Hardcoded Content:**
- Stat labels and descriptions
- Counter text and formatting

---

## 🎯 **RECOMMENDATIONS FOR IMPLEMENTATION**

### 1. **Create Centralized UI Text System**
```typescript
// client/src/lib/data/ui-text.ts
export const uiText = {
  forms: {
    labels: {
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      message: "Message",
      requestType: "Request Type"
    },
    placeholders: {
      fullName: "Enter your full name",
      email: "Enter your email address",
      phone: "Enter your phone number",
      message: "Tell us about your project"
    },
    validation: {
      nameMinLength: "Name must be at least 2 characters",
      invalidEmail: "Please enter a valid email address",
      // ... more validation messages
    }
  },
  buttons: {
    submit: "Submit",
    cancel: "Cancel",
    loading: "Loading...",
    // ... more button text
  },
  // ... more categories
};
```

### 2. **Update Forms to Use Centralized Text**
Replace hardcoded strings with references to the centralized system:
```typescript
// Instead of
<FormLabel>Phone *</FormLabel>
<Input placeholder="Enter your phone number" />

// Use
<FormLabel>{getUIText('phone', 'forms.labels')} *</FormLabel>
<Input placeholder={getUIText('phone', 'forms.placeholders')} />
```

### 3. **Create Content Management Interface**
- Add all hardcoded text to Strapi CMS
- Create fallback system for when CMS is unavailable
- Use the existing fallback pattern from the migration

### 4. **Implement Progressive Enhancement**
- Start with high-impact areas (forms, navigation, CTAs)
- Move to section content and messages
- Finally handle metadata and structured data

---

## ✅ **PRIORITY LEVELS**

### 🔴 **HIGH PRIORITY** (User-facing text that changes frequently)
- Form labels and placeholders
- Button text and CTAs
- Error and success messages
- Navigation labels

### 🟡 **MEDIUM PRIORITY** (Content that might need customization)
- Section headers and badges
- Loading states and placeholders
- FAQ and help text
- Statistics and counters

### 🟢 **LOW PRIORITY** (Technical or rarely-changing content)
- Validation messages
- Aria labels and accessibility text
- Structured data and metadata
- Developer-oriented text

---

## 📝 **NEXT STEPS**

1. **Implement centralized UI text system** (High Priority items first)
2. **Update form components** to use the new system
3. **Create CMS content types** for UI text management
4. **Add fallback mechanism** following existing patterns
5. **Test and validate** all changes
6. **Document the new system** for future developers

This audit ensures the project follows true DRY principles and allows non-technical users to manage all content through the CMS.
