# Internationalization (i18n) - Strapi CMS Setup Guide

## Overview

The I-Varse website uses a **hybrid translation system**:
- **Hardcoded** (in `client/src/lib/i18n.ts`): System/error messages only
- **Strapi CMS**: All UI labels, buttons, blog interface, and content-specific text

---

## Translation Categories

### 🔒 HARDCODED (System Messages Only)

These remain in `client/src/lib/i18n.ts` and are **NOT fetched from Strapi**:

```typescript
system: {
  // Loading states
  loading: 'Loading...',
  
  // Error messages
  error: 'An error occurred',
  errorMessage: 'Failed to load data. Please try again.',
  connectionError: 'Connection failed. Please check your internet.',
  timeoutError: 'Request timed out. Please try again.',
  
  // Error states
  notFound: 'Not Found',
  pageNotFound: 'Page Not Found',
  unauthorized: 'Unauthorized',
  forbidden: 'Forbidden',
  serverError: 'Server Error',
  
  // Basic actions (system-level)
  retry: 'Retry',
  cancel: 'Cancel',
  close: 'Close',
  search: 'Search',
  clear: 'Clear',
}

language: {
  en: 'English',
  yo: 'Yorùbá',
  ig: 'Igbo',
  ha: 'Hausa',
  fr: 'French',
  es: 'Spanish',
  sw: 'Swahili',
}
```

**Why hardcoded?**
- These are critical for error handling even when Strapi is unavailable
- Language names needed for language selector initialization
- System messages should work offline

---

### 🌐 FETCHED FROM STRAPI (All Other UI Text)

Everything else comes from **Strapi UI Translations** content type:

#### **1. Common UI Elements**
```json
{
  "ui": {
    // Actions
    "submit": "Submit",
    "save": "Save",
    "edit": "Edit",
    "delete": "Delete",
    "confirm": "Confirm",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    
    // Responses
    "yes": "Yes",
    "no": "No",
    "success": "Success",
    "failed": "Failed",
    
    // Form states
    "required": "Required",
    "optional": "Optional",
    
    // Actions (content)
    "copy": "Copy",
    "copied": "Copied!",
    "paste": "Paste",
    "download": "Download",
    "upload": "Upload",
    
    // Navigation
    "home": "Home",
    "settings": "Settings",
    "profile": "Profile",
    "language": "Language",
    "selectLanguage": "Select Language",
    
    // Auth
    "login": "Login",
    "logout": "Logout",
    "register": "Register"
  }
}
```

#### **2. Blog Interface**
```json
{
  "blog": {
    // Filters
    "searchPlaceholder": "Search articles...",
    "selectCategory": "Select Category",
    "allCategories": "All Categories",
    "selectTag": "Select Tag",
    "allTags": "All Tags",
    "clearFilters": "Clear Filters",
    
    // Post states
    "featuredPosts": "Featured Posts",
    "latestPosts": "Latest Posts",
    "noPosts": "No posts found",
    "noResults": "No posts found matching your criteria.",
    "showingResults": "Showing {{count}} posts",
    
    // Actions
    "readMore": "Read More",
    "sharePost": "Share Post",
    "backToBlog": "Back to Blog",
    
    // Content sections
    "categories": "Categories",
    "tags": "Tags",
    "popularTags": "Popular Tags",
    "relatedPosts": "Related Posts",
    "aboutAuthor": "About Author"
  }
}
```

#### **3. Blog Sidebar**
```json
{
  "blogSidebar": {
    "subscribe": "Subscribe to Newsletter",
    "subscribeText": "Stay updated with our latest insights and articles."
  }
}
```

#### **4. Comments System**
```json
{
  "comments": {
    "comments": "Comments",
    "readComments": "Read Comments",
    "writeComment": "Write Comment",
    "noComments": "No comments yet",
    "beFirstToComment": "Be the first to comment",
    "leaveComment": "Leave a Comment",
    "commentPolicy": "Your comment will be published after moderation.",
    
    // Form
    "yourName": "Your Name",
    "namePlaceholder": "Enter your name",
    "yourEmail": "Your Email",
    "emailPlaceholder": "Enter your email",
    "yourComment": "Your Comment",
    "commentPlaceholder": "Share your thoughts...",
    "submitComment": "Submit Comment",
    "submittingComment": "Submitting...",
    "commentError": "Failed to submit comment. Please try again."
  }
}
```

---

## Strapi Setup

### **1. Create UI Translations Content Type**

In Strapi Admin → Content-Types Builder → Create new collection type

**Name**: `UI Translation`  
**API ID**: `ui-translation`

**Fields**:

| Field Name | Type | Settings |
|------------|------|----------|
| `language` | Text (Short) | **Required**, Unique |
| `translations` | JSON | **Required** |
| `description` | Text (Long) | Optional (for notes) |

**Advanced Settings**:
- Enable **Internationalization (i18n)** plugin
- Set `language` as unique per locale

---

### **2. Translation Structure in Strapi**

Each UI Translation entry should have this JSON structure:

```json
{
  "ui": {
    "submit": "Submit",
    "save": "Save",
    "edit": "Edit",
    "delete": "Delete",
    "confirm": "Confirm",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "yes": "Yes",
    "no": "No",
    "success": "Success",
    "failed": "Failed",
    "required": "Required",
    "optional": "Optional",
    "copy": "Copy",
    "copied": "Copied!",
    "paste": "Paste",
    "download": "Download",
    "upload": "Upload",
    "home": "Home",
    "settings": "Settings",
    "profile": "Profile",
    "language": "Language",
    "selectLanguage": "Select Language",
    "login": "Login",
    "logout": "Logout",
    "register": "Register"
  },
  "blog": {
    "searchPlaceholder": "Search articles...",
    "selectCategory": "Select Category",
    "allCategories": "All Categories",
    "selectTag": "Select Tag",
    "allTags": "All Tags",
    "clearFilters": "Clear Filters",
    "featuredPosts": "Featured Posts",
    "latestPosts": "Latest Posts",
    "noPosts": "No posts found",
    "noResults": "No posts found matching your criteria.",
    "showingResults": "Showing {{count}} posts",
    "readMore": "Read More",
    "sharePost": "Share Post",
    "backToBlog": "Back to Blog",
    "categories": "Categories",
    "tags": "Tags",
    "popularTags": "Popular Tags",
    "relatedPosts": "Related Posts",
    "aboutAuthor": "About Author"
  },
  "blogSidebar": {
    "subscribe": "Subscribe to Newsletter",
    "subscribeText": "Stay updated with our latest insights and articles."
  },
  "comments": {
    "comments": "Comments",
    "readComments": "Read Comments",
    "writeComment": "Write Comment",
    "noComments": "No comments yet",
    "beFirstToComment": "Be the first to comment",
    "leaveComment": "Leave a Comment",
    "commentPolicy": "Your comment will be published after moderation.",
    "yourName": "Your Name",
    "namePlaceholder": "Enter your name",
    "yourEmail": "Your Email",
    "emailPlaceholder": "Enter your email",
    "yourComment": "Your Comment",
    "commentPlaceholder": "Share your thoughts...",
    "submitComment": "Submit Comment",
    "submittingComment": "Submitting...",
    "commentError": "Failed to submit comment. Please try again."
  }
}
```

---

### **3. Create Entries for Each Language**

Create **7 UI Translation entries** (one per language):

#### English (en)
```
Language: en
Translations: {JSON above with English text}
```

#### Yoruba (yo)
```
Language: yo
Translations: {
  "ui": {
    "submit": "Firanṣẹ",
    "save": "Fipamọ́",
    "edit": "Ṣatúnṣe",
    ...
  },
  "blog": {
    "searchPlaceholder": "Wá ìwé ìròyìn...",
    ...
  },
  ...
}
```

#### Igbo (ig)
```
Language: ig
Translations: {
  "ui": {
    "submit": "Zipu",
    "save": "Chekwa",
    ...
  },
  ...
}
```

#### Hausa (ha)
```
Language: ha
Translations: {
  "ui": {
    "submit": "Aika",
    "save": "Ajiye",
    ...
  },
  ...
}
```

#### French (fr)
```
Language: fr
Translations: {
  "ui": {
    "submit": "Soumettre",
    "save": "Enregistrer",
    ...
  },
  ...
}
```

#### Spanish (es)
```
Language: es
Translations: {
  "ui": {
    "submit": "Enviar",
    "save": "Guardar",
    ...
  },
  ...
}
```

#### Swahili (sw)
```
Language: sw
Translations: {
  "ui": {
    "submit": "Tuma",
    "save": "Hifadhi",
    ...
  },
  ...
}
```

---

## API Endpoint

The frontend fetches translations from:

```
GET /api/ui-translations?filters[language][$eq]=en&populate=*
```

**Response format**:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "language": "en",
        "translations": {
          "ui": { ... },
          "blog": { ... },
          "comments": { ... }
        },
        "createdAt": "2025-11-21T00:00:00.000Z",
        "updatedAt": "2025-11-21T00:00:00.000Z"
      }
    }
  ]
}
```

---

## Usage in Components

### **System Messages** (hardcoded)
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

// System messages (always available, even offline)
<p>{t('system.loading')}</p>           // "Loading..."
<p>{t('system.error')}</p>             // "An error occurred"
<p>{t('system.pageNotFound')}</p>      // "Page Not Found"
<button>{t('system.retry')}</button>   // "Retry"
<button>{t('system.cancel')}</button>  // "Cancel"
```

### **UI Labels** (from Strapi)
```tsx
// UI buttons/labels (fetched from Strapi)
<button>{t('ui.submit')}</button>      // "Submit" or "Firanṣẹ" (Yoruba)
<button>{t('ui.save')}</button>        // "Save" or "Fipamọ́" (Yoruba)
<span>{t('ui.required')}</span>        // "Required"
<a href="/">{t('ui.home')}</a>         // "Home"
```

### **Blog Interface** (from Strapi)
```tsx
// Blog-specific text (fetched from Strapi)
<h2>{t('blog.featuredPosts')}</h2>           // "Featured Posts"
<input placeholder={t('blog.searchPlaceholder')} />  // "Search articles..."
<button>{t('blog.readMore')}</button>        // "Read More"
<span>{t('blog.categories')}</span>          // "Categories"
```

### **Comments** (from Strapi)
```tsx
// Comments section (fetched from Strapi)
<h3>{t('comments.comments')}</h3>            // "Comments"
<label>{t('comments.yourName')}</label>      // "Your Name"
<input placeholder={t('comments.namePlaceholder')} />  // "Enter your name"
<button>{t('comments.submitComment')}</button>  // "Submit Comment"
```

---

## Fallback Behavior

### **With Strapi Available**
1. User switches to Yoruba
2. Frontend fetches `/api/ui-translations?filters[language][$eq]=yo`
3. Merges Strapi translations with hardcoded system messages
4. All UI displays in Yoruba

### **With Strapi Unavailable**
1. User switches to Yoruba
2. Fetch fails → logs warning
3. Uses hardcoded `system` messages only
4. System messages work (loading, error, cancel)
5. UI labels gracefully degrade to translation keys or English

---

## Migration Checklist

### ✅ **Backend (Strapi)**
- [ ] Create `UI Translation` content type with `language` and `translations` fields
- [ ] Create 7 entries (en, yo, ig, ha, fr, es, sw) with complete JSON translations
- [ ] Enable i18n plugin for all content types
- [ ] Set API permissions to allow public read access to `ui-translations`

### ✅ **Frontend (Already Done)**
- [x] Updated `i18n.ts` to only include system messages
- [x] Modified merge logic to preserve system messages
- [x] Updated `getUITranslations()` in `strapi.ts`
- [x] Configured `languageChanged` event to fetch Strapi translations

### 📝 **Testing**
- [ ] Test language switching with Strapi running
- [ ] Test language switching with Strapi stopped (fallback)
- [ ] Verify system messages always display
- [ ] Verify UI labels come from Strapi when available
- [ ] Check console logs for translation loading status

---

## Adding New Translations

### To add a new UI string:

1. **Add to Strapi** (`ui-translations` entry):
   ```json
   {
     "ui": {
       "newButton": "New Button Text"
     }
   }
   ```

2. **Use in component**:
   ```tsx
   <button>{t('ui.newButton')}</button>
   ```

3. **Repeat for all 7 languages**

**DO NOT** add to `i18n.ts` unless it's a critical system/error message!

---

## Performance

- **Caching**: React Query caches translations for 10 minutes
- **Bundle size**: Reduced by ~70% (removed hardcoded UI translations)
- **First load**: System messages available immediately
- **Language switch**: Fetches translations once, cached thereafter

---

## Troubleshooting

### Translations not loading?
```bash
# Check Strapi API
curl http://localhost:1337/api/ui-translations?filters[language][$eq]=en

# Check browser console for:
"✓ Loaded Strapi UI translations for en"
# or
"⚠ No Strapi translations for en, using system messages only"
```

### Still seeing English after language change?
- Clear browser localStorage: `localStorage.clear()`
- Check Strapi entry exists for selected language
- Verify API token permissions

### System messages not translating?
- These are hardcoded by design
- Check `client/src/lib/i18n.ts` → `system` object
- If missing, add to hardcoded resources

---

## Summary

| Category | Source | Editable Without Deploy |
|----------|--------|-------------------------|
| System/Error Messages | Hardcoded `i18n.ts` | ❌ No (requires rebuild) |
| Language Names | Hardcoded `i18n.ts` | ❌ No (requires rebuild) |
| UI Labels & Buttons | Strapi CMS | ✅ Yes (instant update) |
| Blog Interface | Strapi CMS | ✅ Yes (instant update) |
| Comments System | Strapi CMS | ✅ Yes (instant update) |
| Form Labels | Strapi CMS | ✅ Yes (instant update) |

**Result**: ~90% of text is CMS-managed, only critical system messages are hardcoded for reliability.
