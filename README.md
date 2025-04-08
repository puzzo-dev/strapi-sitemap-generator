# I-Varse Limited Corporate Website

A modern, responsive company website for I-Varse Limited that delivers an engaging digital experience with advanced web technologies and multilingual support.

![I-Varse Logo](attached_assets/I-VARSELogo3@3x.png)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Development](#development)
- [Backend Integration](#backend-integration)
- [Internationalization](#internationalization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is the official website of I-Varse Limited, a digital technology company providing services including web development, mobile app development, cloud infrastructure, and more. The website features a modern design with responsive layouts, animations, multilingual support, and integration with backend services.

## Features

- **Modern UI/UX**: Engaging, responsive design with interactive elements and animations
- **Content Management**: Dynamic content loading from Strapi CMS with local fallbacks
- **Multilingual Support**: Content available in English, Yoruba, Igbo, Hausa, French, Spanish, and Swahili
- **Form Handling**: Contact, booking, and newsletter forms integrated with ERPNext
- **Blog System**: Dynamic blog/insights section powered by ERPNext's Blogger module
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured data
- **Dark/Light Mode**: Theme support for user preference
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG-compliant components and color contrast

## Technology Stack

- **Frontend**:
  - React 18+
  - TailwindCSS for styling
  - Framer Motion for animations
  - React Hook Form with Zod validation
  - TanStack Query for data fetching
  - Wouter for routing

- **Backend**:
  - Express server
  - PostgreSQL database
  - Drizzle ORM
  - Strapi CMS integration
  - ERPNext integration

## Project Structure

```
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── layout/      # Layout components (Navbar, Footer, etc.)
│   │   │   └── ui/          # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions and API clients
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Application entry point
│   └── index.html           # HTML template
├── server/                  # Backend Express server
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes definition
│   ├── storage.ts           # Data storage interface
│   ├── vite.ts              # Vite server configuration
│   └── db.ts                # Database connection
├── shared/                  # Shared code between client and server
│   └── schema.ts            # Database schema definition
├── attached_assets/         # Static assets and images
├── drizzle.config.ts        # Drizzle ORM configuration
├── package.json             # Project dependencies and scripts
├── theme.json               # Theme configuration
└── vite.config.ts           # Vite bundler configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Strapi CMS instance (optional for development)
- ERPNext instance (optional for development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ivarse/corporate-website.git
   cd corporate-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database:
   ```bash
   createdb ivarse_website
   ```

4. Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) section)

5. Initialize the database:
   ```bash
   npm run db:push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/ivarse_website

# Strapi CMS
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your_strapi_api_token

# ERPNext
VITE_ERP_NEXT_URL=http://localhost:8000
VITE_ERP_NEXT_API_KEY=your_erpnext_api_key
VITE_ERP_NEXT_API_SECRET=your_erpnext_api_secret
VITE_ERPNEXT_API_URL=http://localhost:8000
VITE_ERPNEXT_API_TOKEN=your_erpnext_token
```

## Development

### Running the Application

```bash
# Start development server (both frontend and backend)
npm run dev

# Start frontend only
npm run dev:client

# Start backend only
npm run dev:server
```

### Building for Production

```bash
# Build both frontend and backend
npm run build

# Build frontend only
npm run build:client

# Build backend only
npm run build:server
```

### Code Quality

```bash
# Run linter
npm run lint

# Run tests
npm run test

# Type check
npm run type-check
```

## Backend Integration

### Strapi CMS

The website is designed to fetch content from a Strapi CMS instance with the following content types:

- Services
- Products
- Testimonials
- Team members
- Navigation items
- Footer columns
- Site content
- Page content

In the absence of a Strapi connection (missing token or unreachable server), the application falls back to local data defined in `client/src/lib/data.ts`.

### ERPNext Integration

The following forms are integrated with ERPNext:

- **Contact Form**: Submits to ERPNext Lead module
- **Booking Form**: Creates appointments in ERPNext Event module
- **Newsletter Form**: Adds subscribers to ERPNext Email Group
- **Blog System**: Fetches content from ERPNext Blogger module

Integration is managed through the API client in `client/src/lib/strapi.ts`.

## Internationalization

The website supports the following languages:

- English (default)
- Yoruba
- Igbo
- Hausa
- French
- Spanish
- Swahili

Language settings are managed through the context provider in `client/src/components/context/LanguageContext.tsx`.

Content is fetched from Strapi CMS with the appropriate language parameter, falling back to English if translations are unavailable.

## Deployment

For detailed deployment instructions, refer to the [deployment-plan.txt](./deployment-plan.txt) file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and owned by I-Varse Limited. All rights reserved.