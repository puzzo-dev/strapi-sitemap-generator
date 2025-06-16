import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { usePageContent } from "../hooks/useStrapiContent";
import { faqContent } from "../lib/data";
import { FAQItem, FAQCategory, FAQPageContent } from "../lib/types";
import { useSeoHelpers } from "@/hooks/useSeoHelpers";
import MetaTags from "@/components/seo/MetaTags";

// Import section components
import {
    FAQHeroSection,
    FAQStatsSection,
    FAQPopularSection,
    FAQCategoriesSection,
    FAQContactSection
} from "@/components/sections/faq";

const FAQ: React.FC = () => {
    const { data: faqPageContent, isLoading, error } = usePageContent("faq");
    const { generateSeoTitle, generateSeoDescription } = useSeoHelpers();

    // Use fallback data if API data is not available
    const faqData = useMemo(() => {
        return (faqPageContent as FAQPageContent) || faqContent;
    }, [faqPageContent]);

    const title = faqData.title;
    const description = faqData.description;
    const categories = faqData.categories || [];

    // Get items directly from the page content level as per the type definition
    const faqItems = useMemo(() => {
        return faqData.items || [];
    }, [faqData]);

    const [activeCategory, setActiveCategory] = useState<number>(
        categories && categories.length > 0 ? categories[0].id : 1
    );
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const toggleItem = (itemId: number) => {
        setExpandedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handlePopularQuestionClick = (itemId: number) => {
        // Expand the item and scroll to the categories section
        setExpandedItems((prev) =>
            prev.includes(itemId) ? prev : [...prev, itemId]
        );

        // Find the category for this item and set it as active
        const item = faqItems.find(faq => faq.id === itemId);
        if (item && item.categoryIds && item.categoryIds.length > 0) {
            setActiveCategory(item.categoryIds[0]);
        }

        // Scroll to the categories section
        const categoriesSection = document.getElementById('faq-categories');
        if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // SEO metadata
    const pageTitle = generateSeoTitle(title);
    const pageDescription = generateSeoDescription(description);

    // Structured data for FAQ
    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    // Error handling
    if (error) {
        return (
            <main className="container-custom py-16">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading FAQ</h1>
                    <p className="text-red-500">Failed to load FAQ content. Please try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    return (
        <>
            {/* SEO Metadata */}
            <MetaTags
                title={pageTitle}
                description={pageDescription}
                canonicalUrl="https://itechnologies.ng/faq"
                ogImage="https://itechnologies.ng/og-faq.jpg"
                ogUrl="https://itechnologies.ng/faq"
                ogType="website"
                keywords={['FAQ', 'frequently asked questions', 'help', 'support', 'I-VARSE Technologies']}
                structuredData={faqStructuredData}
            />

            <main>
                {/* Hero Section */}
                <FAQHeroSection
                    title={title}
                    description={description}
                    isLoading={isLoading}
                />

                {/* Stats Section */}
                {!isLoading && (
                    <FAQStatsSection
                        categories={categories}
                        faqItems={faqItems}
                    />
                )}

                {/* Popular Questions Section */}
                {!isLoading && faqItems.length > 0 && (
                    <FAQPopularSection
                        faqItems={faqItems}
                        onQuestionClick={handlePopularQuestionClick}
                    />
                )}

                {/* Categories and FAQ Items Section */}
                <div id="faq-categories">
                    <FAQCategoriesSection
                        categories={categories}
                        faqItems={faqItems}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        expandedItems={expandedItems}
                        toggleItem={toggleItem}
                        isLoading={isLoading}
                    />
                </div>

                {/* Contact Section */}
                <FAQContactSection />
            </main>
        </>
    );
};

export default FAQ;
