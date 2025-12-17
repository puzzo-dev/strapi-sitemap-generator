import React, { useState } from 'react';
import { usePageContent, useFAQItems } from '@/hooks/useContent';
import PageLayout from '@/components/layout/PageLayout';
import { generateOrganizationSchema } from '@/components/seo/StructuredData';
import { faqPageContent as localFAQPageContent } from '@/lib/data/pages';

// Import section components
import {
    FAQHeroSection,
    FAQCategoriesSection,
    FAQContactSection,
    FAQStatsSection,
    FAQPopularSection
} from "@/components/sections/faq";

const FAQ: React.FC = () => {
    // State for FAQ categories section
    const [activeCategory, setActiveCategory] = useState<number>(1);
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set<number>());

    // Fetch page content from Strapi or use local data
    const { data: pageContent, isLoading: isPageLoading } = usePageContent('faq');

    // Fetch FAQ items from Strapi
    const { data: apiFAQItems, isLoading: isFAQLoading } = useFAQItems();

    // Use local page content if Strapi data is not available
    const displayPageContent = pageContent || localFAQPageContent;

    // Use API FAQ items if available, otherwise fall back to local data from faqPageContent
    const displayFAQItems = apiFAQItems || localFAQPageContent.sections?.find(s => s.type === 'custom')?.settings?.faqItems || [];
    const displayCategories = localFAQPageContent.sections?.find(s => s.type === 'custom')?.settings?.faqCategories || [];

    const structuredData = generateOrganizationSchema();

    // Extract sections with fallback to local data
    const heroSection = displayPageContent?.sections?.find(s => s.type === 'hero')
        || localFAQPageContent.sections.find(s => s.type === 'hero');
    const categoriesSection = displayPageContent?.sections?.find(s => s.type === 'custom')
        || localFAQPageContent.sections.find(s => s.type === 'custom');
    const contactSection = displayPageContent?.sections?.find(s => s.type === 'contact')
        || localFAQPageContent.sections.find(s => s.type === 'contact');

    // Handle FAQ item expansion
    const toggleItem = (id: number) => {
        const newSet = new Set(expandedItems);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedItems(newSet);
    }; return (
        <PageLayout
            title={displayPageContent.metaTitle}
            description={displayPageContent.metaDescription}
            canonicalUrl="https://itechnologies.ng/faq"
            ogImage="https://itechnologies.ng/faq-og-image.jpg"
            pageContent={displayPageContent}
            isLoading={isPageLoading}
            structuredData={structuredData}
        >
            {/* Hero Section */}
            <FAQHeroSection
                title={heroSection?.title || "Frequently Asked Questions"}
                description={heroSection?.content || "Find answers to common questions about our services and solutions."}
                isLoading={isPageLoading}
            />

            {/* FAQ Stats Section */}
            <FAQStatsSection
                categories={displayCategories}
                faqItems={displayFAQItems}
            />

            {/* FAQ Categories Section */}
            <FAQCategoriesSection
                categories={displayCategories}
                faqItems={displayFAQItems}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                expandedItems={expandedItems}
                toggleItem={toggleItem}
                isLoading={isFAQLoading}
            />

            {/* FAQ Popular Section */}
            <FAQPopularSection
                faqItems={displayFAQItems}
                onQuestionClick={() => { }}
            />

            {/* Contact Section */}
            <FAQContactSection />
        </PageLayout>
    );
};

export default FAQ;
