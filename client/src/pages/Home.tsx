import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/context/LanguageContext';
import { useSeoHelpers } from '@/hooks/useSeoHelpers';
import MetaTags from '@/components/seo/MetaTags';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/StructuredData';

// Import company logo for service slider
import IVarseLogo from '@assets/I-VARSELogo3@3x.png';

// Import section components
import OriginalHero from '@/components/sections/home/OriginalHero';
import SpecializationsSection from '@/components/sections/home/SpecializationsSection';
import AboutSection from '@/components/sections/home/AboutSection';
import ProductsSection from '@/components/sections/home/ProductsSection';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import BlogPostsSection from '@/components/sections/home/BlogPostsSection';
import ClientsSection from '@/components/sections/home/ClientsSection';
// Import UI components
import ModernHero from '@/components/sections/home/ModernHero';
import { Zap } from 'lucide-react';

// Import hooks and data
import {
    useHeroContent,
    usePageContent,
    useServices,
} from '@/hooks/useStrapiContent';
import { services, heroSlides as localHeroSlides, defaultHeroProps } from '@/lib/data';
import { ServiceProps, PageContent, HeroProps, HeroSlide } from '@/lib/types';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [showModernHero, setShowModernHero] = useState(false);

    // SEO optimization helpers
    const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

    // Fetch page content from Strapi
    const { data: pageContent, isLoading: isPageLoading } = usePageContent('home');

    // Fetch dynamic hero content
    const { data: heroData, isLoading: isHeroLoading } = useHeroContent();

    // Fetch services from Strapi
    const { data: apiServices, isLoading: isServicesLoading } = useServices();

    // Pause autoplay on hover
    const handleMouseEnter = () => setAutoplayEnabled(false);
    const handleMouseLeave = () => setAutoplayEnabled(true);

    // Generate structured data
    const structuredData = {
        ...generateWebsiteSchema(),
        ...generateOrganizationSchema()
    };

    // For compatibility with components expecting an array of hero slides
    const heroSlides = useMemo((): HeroSlide[] => {
        if (isHeroLoading || !heroData) {
            return localHeroSlides;
        }

        // If heroData.heroContents is available, use it in an array
        if (heroData.heroContents) {
            return [heroData.heroContents];
        }

        // Fallback to local hero slides
        return localHeroSlides;
    }, [heroData, isHeroLoading]);

    // Get the current hero slide with safety check
    const currentHeroSlide = heroSlides[currentHeroIndex] || heroSlides[0] || {};

    // Prepare SEO metadata with proper null checking
    const pageTitle = generateSeoTitle(
        currentHeroSlide?.title || 'I-VARSE Technologies - Innovative Digital Solutions'
    );

    const pageDescription = generateSeoDescription(
        currentHeroSlide?.subtitle || 'Elevate your business with our cutting-edge digital solutions. We combine innovation, technology, and strategic thinking to transform your digital presence.'
    );



    // Create service slides with fallback to local data if API fails
    const serviceItems: ServiceProps[] = useMemo(() => {
        return isServicesLoading || !apiServices?.length
            ? services.slice(0, 5)
            : apiServices.slice(0, 5);
    }, [apiServices, isServicesLoading]);

    // Service slide indicators (simple dots with different colors)
    const serviceIcons = [
        <div key="icon-1" className="w-2 h-2 rounded-full bg-blue-500"></div>,
        <div key="icon-2" className="w-2 h-2 rounded-full bg-indigo-500"></div>,
        <div key="icon-3" className="w-2 h-2 rounded-full bg-cyan-500"></div>,
        <div key="icon-4" className="w-2 h-2 rounded-full bg-purple-500"></div>,
        <div key="icon-5" className="w-2 h-2 rounded-full bg-blue-500"></div>
    ];

    // Dummy service images for the slides
    const serviceImages = [
        // High-quality immersive tech image for Digital Solutions
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        // Modern app development with code projection
        "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        // Futuristic data center for Cloud Solutions 
        "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        // AI and machine learning visualization
        "https://images.unsplash.com/photo-1677442135131-4668bd807267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        // Cybersecurity concept with digital lock
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ];

    // Handle slide navigation
    const nextSlide = () => {
        setCurrentServiceIndex((prev) => (prev === serviceItems.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentServiceIndex((prev) => (prev === 0 ? serviceItems.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentServiceIndex(index);
    };


    // Auto-rotate slides
    useEffect(() => {
        if (!autoplayEnabled) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, [currentServiceIndex, autoplayEnabled]);

    // Create a properly structured hero props object
    const heroProps = useMemo((): HeroProps => {
        if (isHeroLoading || !heroData) {
            // Fallback to default hero props from data.ts
            return {
                ...defaultHeroProps,
                isHeroLoading: true,
                isPageLoading,
                handleMouseEnter,
                handleMouseLeave,
                currentIndex: currentHeroIndex
            };
        }

        // Use the hero data from the API
        return {
            ...heroData,
            handleMouseEnter,
            handleMouseLeave,
            currentIndex: currentHeroIndex
        };
    }, [heroData, isHeroLoading, isPageLoading, serviceItems, isServicesLoading, currentHeroIndex]);

    // Auto-rotate hero content for more dynamic feel
    useEffect(() => {
        // If we only have one hero slide or loading, don't rotate
        if (heroSlides.length <= 1) return;

        // Rotate hero content every 7 seconds (slightly slower than service slides)
        const timer = setInterval(() => {
            setCurrentHeroIndex(prev => (prev + 1) % heroSlides.length);
        }, 7000);

        return () => clearInterval(timer);
    }, [heroSlides]);

    return (
        <>
            <div className="fixed top-20 right-4 z-50">
                <button
                    onClick={() => setShowModernHero(!showModernHero)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-lg flex items-center space-x-2"
                >
                    <span>{showModernHero ? 'Show Original Hero' : 'Show Modern Hero'}</span>
                    <Zap className="h-4 w-4" />
                </button>
            </div>

            {/* SEO Metadata */}
            <MetaTags
                title={pageTitle}
                description={pageDescription}
                canonicalUrl="https://itechnologies.ng"
                ogImage="https://itechnologies.ng/og-image.jpg"
                ogUrl="https://itechnologies.ng"
                ogType="website"
                twitterCard="summary_large_image"
                alternateLanguages={[
                    { lang: 'en', url: 'https://itechnologies.ng' },
                    { lang: 'yo', url: 'https://itechnologies.ng/yo' },
                    { lang: 'ig', url: 'https://itechnologies.ng/ig' },
                    { lang: 'ha', url: 'https://itechnologies.ng/ha' },
                    { lang: 'fr', url: 'https://itechnologies.ng/fr' },
                    { lang: 'es', url: 'https://itechnologies.ng/es' },
                    { lang: 'sw', url: 'https://itechnologies.ng/sw' }
                ]}
                structuredData={structuredData}
            />

            {/* Hero Section */}
            {showModernHero ? (
                <ModernHero
                    heroContents={heroProps.heroContents}
                    currentIndex={currentHeroIndex}
                    isHeroLoading={heroProps.isHeroLoading}
                    isPageLoading={heroProps.isPageLoading}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    companyLogo={IVarseLogo}
                />
            ) : (
                <OriginalHero
                    heroContents={heroProps.heroContents}
                    currentIndex={currentHeroIndex}
                    isHeroLoading={heroProps.isHeroLoading}
                    isPageLoading={heroProps.isPageLoading}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                />
            )}
            {/* Specializations Section */}
            <SpecializationsSection />

            {/* About Section */}
            <AboutSection />

            {/* Products Section */}
            <ProductsSection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Blog Posts Section */}
            <BlogPostsSection />

            {/* Clients Section */}
            <ClientsSection />
        </>
    );
};

export default Home;
