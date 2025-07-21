import React, { useState, useEffect } from 'react';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import MetaTags from '@/components/seo/MetaTags';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/StructuredData';

// Import company logo for service slider

// Import section components
import OriginalHero from '@/components/sections/home/OriginalHero';
import SpecializationsSection from '@/components/sections/home/SpecializationsSection';
import AboutSection from '@/components/sections/home/AboutSection';
import ProductsSection from '@/components/sections/home/ProductsSection';
import CaseStudiesSection from '@/components/sections/home/CaseStudiesSection';
import ClientsSection from '@/components/sections/home/ClientsSection';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import BlogPostsSection from '@/components/sections/home/BlogPostsSection';

// Import data
import {
    homePageContent as localHomePageContent,
    services,
    products,
    caseStudies,
    clients,
    testimonials,
    blogPosts
} from '@/lib/data';

// Import types
import { PageContent } from '@/lib/types/core';

const Home: React.FC = () => {
    const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

    // State for loading and data
    const [isLoading, setIsLoading] = useState(true);
    const [homePageContent, setHomePageContent] = useState<PageContent | null>(null);

    // Simulate loading from Strapi (since useStrapiContent is not available)
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 500));

                // Use local fallback data since Strapi is not available
                setHomePageContent(localHomePageContent);
            } catch (error) {
                console.error('Error loading home page data:', error);
                // Fallback to local data on error
                setHomePageContent(localHomePageContent);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Use fallback data if no content is loaded
    const displayHomePageContent = homePageContent || localHomePageContent;

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
                <OriginalHero />

                {/* Specializations Section (includes services) */}
                <SpecializationsSection
                    homePageContent={displayHomePageContent}
                    services={services}
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
                    products={products}
                    isLoading={isLoading}
                />

                {/* Case Studies Section */}
                <CaseStudiesSection
                    homePageContent={displayHomePageContent}
                    caseStudies={caseStudies}
                    isLoading={isLoading}
                />

                {/* Testimonials Section */}
                <TestimonialsSection
                    homePageContent={displayHomePageContent}
                    testimonials={testimonials}
                    isLoading={isLoading}
                />

                {/* Blog Posts Section */}
                <BlogPostsSection
                    homePageContent={displayHomePageContent}
                    blogPosts={blogPosts}
                    isLoading={isLoading}
                />
                {/* Clients Section */}
                <ClientsSection
                    homePageContent={displayHomePageContent}
                    clientLogos={clients}
                    isLoading={isLoading}
                />
            </main>
        </>
    );
};

export default Home;
