import React from 'react';
import {
    ServiceDetailHeroSection,
    ServiceDetailDescriptionSection,
    ServiceDetailBenefitsSection,
    ServiceDetailCaseStudiesSection,
    ServiceDetailFAQSection,
    ServiceDetailCTASection,
} from '@/components/sections/serviceDetail';

interface BlockData {
    __component: string;
    [key: string]: any;
}

interface DynamicBlockRendererProps {
    blocks: BlockData[];
    serviceData: any; // Base service data
    siteConfig: any;
}

/**
 * DynamicBlockRenderer - Maps Strapi block components to React components
 * 
 * Block types from Strapi:
 * - hero.hero-simple: Hero section with title, description, badge, buttons
 * - blocks.base-row: Flexible content rows with baseCards, CaseStudies, Faqs, cta
 *   - Can contain: description, benefits, case studies, FAQs
 */
const DynamicBlockRenderer: React.FC<DynamicBlockRendererProps> = ({
    blocks,
    serviceData,
    siteConfig
}) => {
    // Fallback rendering when no CMS blocks are available
    if (!blocks || blocks.length === 0) {
        const heroService = {
            ...serviceData,
            content: [
                {
                    __component: 'hero.hero-simple',
                    title: serviceData.title,
                    description: serviceData.description,
                    heroBadge: { badgeText: serviceData.badge || 'Service Detail' },
                    heroBtns: {
                        ctaLink: [
                            {
                                label: 'Talk to Us',
                                linkType: 'internal',
                                page: { slug: 'contact-us' }
                            },
                            {
                                label: 'View All Services',
                                linkType: 'internal',
                                page: { slug: 'services' }
                            }
                        ]
                    }
                }
            ]
        };

        const descriptionService = {
            ...serviceData,
            fullDescription: serviceData.fullDescription || serviceData.description,
            features: serviceData.features,
            whyChooseUs: serviceData.whyChooseUs
        };

        const benefitsService = {
            ...serviceData,
            benefits: serviceData.benefits || []
        };

        const caseStudiesService = {
            ...serviceData,
            casestudies: serviceData.casestudies || []
        };

        const faqsService = {
            ...serviceData,
            faqs: serviceData.faqs || []
        };

        const fallbackCTA = {
            title: 'Ready to transform your operations?',
            ctaContent: 'Let’s discuss how this capability can unlock measurable outcomes for your business.',
            ctaButtons: [
                { label: 'Talk to Us', linkType: 'internal', page: { slug: 'contact-us' } },
                { label: 'View All Services', linkType: 'internal', page: { slug: 'services' } }
            ]
        };

        return (
            <>
                <ServiceDetailHeroSection service={heroService as any} />
                <ServiceDetailDescriptionSection service={descriptionService as any} />

                {(benefitsService.benefits?.length ?? 0) > 0 && (
                    <ServiceDetailBenefitsSection
                        service={benefitsService as any}
                        badgeText="Key Benefits"
                        blockTitle="Key Benefits"
                        blockDescription="Outcomes we deliver with this capability"
                    />
                )}

                {(caseStudiesService.casestudies?.length ?? 0) > 0 && (
                    <ServiceDetailCaseStudiesSection
                        service={caseStudiesService as any}
                        blockTitle="Success Stories"
                        blockDescription="Real-world impact from recent engagements"
                    />
                )}

                {(faqsService.faqs?.length ?? 0) > 0 && (
                    <ServiceDetailFAQSection
                        service={faqsService as any}
                    />
                )}

                <ServiceDetailCTASection
                    service={serviceData}
                    siteConfig={siteConfig}
                    ctaData={fallbackCTA}
                />
            </>
        );
    }

    return (
        <>
            {blocks.map((block, index) => {
                const key = `block-${block.__component}-${index}`;

                switch (block.__component) {
                    case 'hero.hero-simple': {
                        // Transform hero block to ServiceProps format
                        const heroService = {
                            ...serviceData,
                            title: block.title || serviceData.title,
                            description: block.description || serviceData.description,
                            content: [{
                                __component: 'hero.hero-simple',
                                title: block.title,
                                description: block.description,
                                heroBadge: block.heroBadge,
                                heroBtns: block.heroBtns
                            }]
                        };
                        return <ServiceDetailHeroSection key={key} service={heroService} />;
                    }

                    case 'blocks.base-row': {
                        // Determine what type of base-row this is based on its content

                        // Check if it's a description block (no title, just content cards)
                        if (!block.title && block.baseCards && block.baseCards.length > 0) {
                            // Separate main content (no title) from why choose us (has title)
                            const mainContent = block.baseCards.filter((card: any) => !card.title);
                            const whyChooseUs = block.baseCards.find((card: any) => card.title);

                            const descService = {
                                ...serviceData,
                                fullDescription: mainContent.map((card: any) =>
                                    card.cardContent || ''
                                ).join('\n\n'),
                                whyChooseUs: whyChooseUs ? {
                                    title: whyChooseUs.title,
                                    content: whyChooseUs.cardContent
                                } : undefined
                            };
                            return <ServiceDetailDescriptionSection key={key} service={descService} />;
                        }

                        // Check if it's a benefits block (has "benefit" in badge or title contains "benefit")
                        const isBenefitsBlock =
                            block.badge?.badgeText?.toLowerCase().includes('benefit') ||
                            block.title?.toLowerCase().includes('benefit');

                        if (isBenefitsBlock && block.baseCards) {
                            const benefitsService = {
                                ...serviceData,
                                benefits: block.baseCards.map((card: any) => {
                                    const title = card.title || '';
                                    const description = card.cardContent || '';
                                    // Format as "Title: Description" string for the component
                                    return `${title}: ${description}`;
                                })
                            };
                            return (
                                <ServiceDetailBenefitsSection
                                    key={key}
                                    service={benefitsService}
                                    badgeText={block.badge?.badgeText}
                                    blockTitle={block.title}
                                    blockDescription={block.description}
                                />
                            );
                        }

                        // Check if it has CaseStudies
                        if (block.CaseStudies && block.CaseStudies.length > 0) {
                            const caseStudiesService = {
                                ...serviceData,
                                casestudies: block.CaseStudies.map((cs: any) => {
                                    return {
                                        title: cs.caseStudiesTitle || '',
                                        description: cs.caseStudiesContent || '',
                                        result: cs.caseStudiesResult || ''
                                    };
                                })
                            };
                            return (
                                <ServiceDetailCaseStudiesSection
                                    key={key}
                                    service={caseStudiesService}
                                    blockTitle={block.title}
                                    blockDescription={block.description}
                                />
                            );
                        }

                        // Check if it has Faqs
                        if (block.Faqs && block.Faqs.length > 0) {
                            const faqsService = {
                                ...serviceData,
                                faqs: block.Faqs.map((faqItem: any) => ({
                                    question: faqItem.faq?.faqTitle || 'Question',
                                    answer: faqItem.faq?.faqAnswer || 'Answer'
                                }))
                            };

                            return (
                                <ServiceDetailFAQSection
                                    key={key}
                                    service={faqsService}
                                    ctaData={block.cta || undefined}
                                />
                            );
                        }

                        // Fallback for other base-row types
                        return null;
                    }

                    case 'blocks.cta-section': {
                        // Handle CTA section block
                        return (
                            <ServiceDetailCTASection
                                key={key}
                                service={serviceData}
                                siteConfig={siteConfig}
                                ctaData={block}
                            />
                        );
                    }

                    default:
                        console.warn(`Unknown block component: ${block.__component}`);
                        return null;
                }
            })}
        </>
    );
};

export default DynamicBlockRenderer;
