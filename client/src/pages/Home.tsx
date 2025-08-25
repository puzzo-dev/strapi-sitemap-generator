import React from 'react';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import MetaTags from '@/components/seo/MetaTags';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/StructuredData';

// Import section components
import OriginalHero from '@/components/sections/home/OriginalHero';
import ModernHero from '@/components/sections/home/ModernHero';
import SpecializationsSection from '@/components/sections/home/SpecializationsSection';
import AboutSection from '@/components/sections/home/AboutSection';
import ProductsSection from '@/components/sections/home/ProductsSection';
import CaseStudiesSection from '@/components/sections/home/CaseStudiesSection';
import ClientsSection from '@/components/sections/home/ClientsSection';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import BlogPostsSection from '@/components/sections/home/BlogPostsSection';

// Import hooks and services (temporarily using fallback data directly)
// import { 
//     useGenericList,
//     useGenericPageContent 
// } from '@/hooks/useGenericContent';
// import { StrapiService, StrapiPageContentSource } from '@/lib/services/StrapiService';

// Import fallback data for now (will be removed once Strapi is fully set up)
import {
    homePageContent as localHomePageContent,
    services as fallbackServices,
    products as fallbackProducts,
    caseStudies as fallbackCaseStudies,
    clients as fallbackClients,
    testimonials as fallbackTestimonials,
    blogPosts as fallbackBlogPosts,
    socialLinks
} from '@/lib/data';
import { heroStats, heroFeatures, defaultHeroProps } from '@/lib/data/hero';

// Import types
import { PageContent } from '@/lib/types/core';

const Home: React.FC = () => {
    const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

    // Initialize services (temporarily disabled)
    // const strapiService = new StrapiService();
    // const pageContentSource = new StrapiPageContentSource(strapiService);

    // For now, use fallback page content directly until Strapi is configured
    const pageContentQuery = {
        data: localHomePageContent,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false
    };

    // For now, use fallback data directly until Strapi is fully configured
    // This ensures the homepage works while we set up the CMS
    const servicesQuery = {
        data: fallbackServices,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false,
        isEmpty: false,
        hasData: true,
        count: fallbackServices.length
    };

    const productsQuery = {
        data: fallbackProducts,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false,
        isEmpty: false,
        hasData: true,
        count: fallbackProducts.length
    };

    const caseStudiesQuery = {
        data: fallbackCaseStudies,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false,
        isEmpty: false,
        hasData: true,
        count: fallbackCaseStudies.length
    };

    const testimonialsQuery = {
        data: fallbackTestimonials,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false,
        isEmpty: false,
        hasData: true,
        count: fallbackTestimonials.length
    };

    const clientsQuery = {
        data: fallbackClients,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false,
        isEmpty: false,
        hasData: true,
        count: fallbackClients.length
    };

    const blogPostsQuery = {
        data: fallbackBlogPosts,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false,
        isEmpty: false,
        hasData: true,
        count: fallbackBlogPosts.length
    };

    // Extract data with fallbacks
    const displayHomePageContent = pageContentQuery.data;
    const isLoading = false; // Using fallback data, so no loading state needed

    // SEO data
    const seoTitle = generateSeoTitle(displayHomePageContent?.title || 'I-VARSE Technologies');
    const seoDescription = generateSeoDescription(displayHomePageContent?.description || 'Innovative digital solutions for modern businesses');

    return (
        <>
            <MetaTags
                title={seoTitle}
                description={seoDescription}
                keywords={["digital solutions", "web development", "cloud infrastructure", "mobile applications", "digital marketing", "I-VARSE Technologies"]}
                ogImage="/og-image.jpg"
                ogType="website"
                twitterCard="summary_large_image"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        ...generateWebsiteSchema(),
                        ...generateOrganizationSchema()
                    })
                }}
            />

            <main className="min-h-screen">
                {/* Hero Section */}
                {/* <OriginalHero /> */}
                <ModernHero
                    badge={defaultHeroProps.badge}
                    socialLinks={socialLinks}
                    stats={heroStats}
                    features={heroFeatures}
                />

                {/* Specializations Section (includes services) */}
                <SpecializationsSection
                    homePageContent={displayHomePageContent}
                    services={servicesQuery.data}
                    isLoading={isLoading}
                />

                {/* About Section */}
                <AboutSection
                    homePageContent={displayHomePageContent}
                    isLoading={isLoading}
                />

                {/* Products Section */}
                <ProductsSection
                    homePageContent={displayHomePageContent}
                    products={productsQuery.data}
                    isLoading={isLoading}
                />

                {/* Case Studies Section */}
                <CaseStudiesSection
                    homePageContent={displayHomePageContent}
                    caseStudies={caseStudiesQuery.data}
                    isLoading={isLoading}
                />

                {/* Testimonials Section */}
                <TestimonialsSection
                    homePageContent={displayHomePageContent}
                    testimonials={testimonialsQuery.data}
                    isLoading={isLoading}
                />

                {/* Blog Posts Section */}
                <BlogPostsSection
                    homePageContent={displayHomePageContent}
                    blogPosts={blogPostsQuery.data}
                    isLoading={isLoading}
                />
                {/* Clients Section */}
                <ClientsSection
                    homePageContent={displayHomePageContent}
                    clientLogos={clientsQuery.data}
                    isLoading={isLoading}
                />
            </main>
        </>
    );
};

export default Home;
