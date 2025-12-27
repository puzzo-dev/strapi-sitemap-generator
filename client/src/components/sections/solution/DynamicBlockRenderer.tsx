import React from 'react';
import {
    ProductDetailHeroSection,
    ProductDetailDescriptionSection,
    ProductFeaturesSection,
    ProductCTASection,
} from '@/components/sections/solution';

interface BlockData {
    __component: string;
    [key: string]: any;
}

interface DynamicBlockRendererProps {
    blocks: BlockData[];
    projectData: any; // Base project data
    siteConfig: any;
}

/**
 * DynamicBlockRenderer for Projects/Solutions - Maps Strapi block components to React components
 * 
 * Block types from Strapi:
 * - hero.hero-simple: Hero section with title, description, badge, buttons
 * - blocks.base-row: Flexible content rows with baseCards
 *   - Can contain: description, features, benefits, case studies, FAQs
 */
const DynamicBlockRenderer: React.FC<DynamicBlockRendererProps> = ({
    blocks,
    projectData,
    siteConfig
}) => {
    // Track hovered gallery image across blocks to avoid hook-in-switch issues
    const [hoveredGallery, setHoveredGallery] = React.useState<{ blockIndex: number; imageIndex: number | null }>({
        blockIndex: -1,
        imageIndex: null
    });

    if (!blocks || blocks.length === 0) {
        return <div>No content available</div>;
    }

    console.log('🔍 DynamicBlockRenderer - Total blocks:', blocks.length);
    blocks.forEach((b, i) => console.log(`Block ${i + 1}:`, b.__component, '- Title:', b.title || 'NO TITLE'));

    return (
        <>
            {blocks.map((block, index) => {
                const key = `block-${block.__component}-${index}`;

                switch (block.__component) {
                    case 'hero.hero-simple': {
                        // Transform hero block to project props format
                        const heroProject = {
                            ...projectData,
                            title: block.title || projectData.title,
                            description: block.description || projectData.description,
                            content: [{
                                __component: 'hero.hero-simple',
                                title: block.title,
                                description: block.description,
                                heroBadge: block.heroBadge,
                                heroBtns: block.heroBtns
                            }]
                        };
                        return <ProductDetailHeroSection key={key} product={heroProject} isLoading={false} pageContent={undefined} />;
                    }

                    case 'blocks.base-row': {
                        // Determine what type of base-row this is based on its content

                        // Check if it's a description block (no title, just content cards)
                        if (!block.title && block.baseCards && block.baseCards.length > 0) {
                            // Find the main description card (no title or not "Key Features")
                            const descCard = block.baseCards.find((card: any) =>
                                !card.title || card.title.toLowerCase() !== 'key features'
                            );

                            // Find the Key Features card
                            const keyFeaturesCard = block.baseCards.find((card: any) =>
                                card.title && card.title.toLowerCase() === 'key features'
                            );

                            // Parse bullet points from Key Features card
                            let keyFeatures: string[] = [];
                            if (keyFeaturesCard?.cardContent) {
                                keyFeatures = keyFeaturesCard.cardContent
                                    .split('\n')
                                    .filter((line: string) => line.trim().startsWith('-'))
                                    .map((line: string) => line.trim().replace(/^-\s*/, ''));
                            }

                            // Look ahead to find benefits from the next block if it's cards.base-card
                            const nextBlockIndex = blocks.findIndex((b: any) => b === block) + 1;
                            const nextBlock = blocks[nextBlockIndex];
                            let benefits: string[] = [];

                            if (nextBlock && nextBlock.__component === 'cards.base-card') {
                                benefits = nextBlock.cardContent?.split('\n')
                                    .filter((line: string) => line.trim().startsWith('-'))
                                    .map((line: string) => line.trim().replace(/^-\s*/, ''));
                            }

                            const descProject = {
                                ...projectData,
                                fullDescription: descCard?.cardContent || '',
                                keyFeatures: keyFeatures.length > 0 ? keyFeatures : undefined,
                                benefits: benefits.length > 0 ? benefits : undefined,
                                benefitsLabel: nextBlock?.title || 'Benefits'
                            };

                            return <ProductDetailDescriptionSection key={key} product={descProject} isLoading={false} pageContent={undefined} />;
                        }

                        // Check if it's a features block (has "feature" in badge or title)
                        const isFeaturesBlock =
                            block.badge?.badgeText?.toLowerCase().includes('feature') ||
                            block.title?.toLowerCase().includes('feature');

                        if (isFeaturesBlock && block.baseCards) {
                            const featuresProject = {
                                ...projectData,
                                sectionTitle: block.title || 'Powerful Features',
                                sectionBadge: block.badge?.badgeText || '⚡ Key Capabilities',
                                sectionDescription: block.description || '',
                                features: block.baseCards.map((card: any) => ({
                                    title: card.title || 'Feature',
                                    description: card.cardContent || '',
                                    icon: null
                                }))
                            };
                            return <ProductFeaturesSection key={key} product={featuresProject} isLoading={false} pageContent={undefined} />;
                        }

                        // If block has CTA, render it
                        if (block.cta) {
                            return (
                                <ProductCTASection
                                    key={key}
                                    product={projectData}
                                    isLoading={false}
                                    pageContent={undefined}
                                />
                            );
                        }

                        // Fallback for ANY base-row with title and baseCards (Powerful Features, Project Lineup, etc.)
                        if (block.title && block.baseCards && block.baseCards.length > 0) {
                            const fallbackProject = {
                                ...projectData,
                                sectionTitle: block.title || '',
                                sectionBadge: block.badge?.badgeText || '',
                                sectionDescription: block.description || '',
                                features: block.baseCards.map((card: any) => ({
                                    title: card.title || '',
                                    description: card.cardContent || '',
                                    icon: null,
                                    link: card.cardLink && card.cardLink.length > 0 ? card.cardLink[0] : null
                                }))
                            };
                            return <ProductFeaturesSection key={key} product={fallbackProject} isLoading={false} pageContent={undefined} />;
                        }

                        // Fallback for other base-row types
                        return null;
                    }

                    case 'cards.base-card': {
                        // Skip if already processed as part of description section
                        // Check if previous block was base-row without title (description block)
                        const currentBlockIndex = blocks.findIndex((b: any) => b === block);
                        const prevBlock = blocks[currentBlockIndex - 1];

                        if (prevBlock && prevBlock.__component === 'blocks.base-row' && !prevBlock.title) {
                            // Benefits already handled in description section, skip rendering
                            return null;
                        }

                        // Standalone benefits card (fallback, shouldn't normally reach here)
                        const benefits = block.cardContent?.split('\n').filter((line: string) => line.trim().startsWith('-')).map((line: string) => line.trim().substring(1).trim()) || [];

                        const benefitsProject = {
                            ...projectData,
                            benefits,
                            benefitsLabel: block.title || 'Benefits'
                        };

                        return (
                            <ProductDetailDescriptionSection
                                product={benefitsProject}
                                isLoading={false}
                                pageContent={undefined}
                            />
                        );
                    }

                    case 'blocks.gallery-section': {
                        // Mosaic grid slideshow with fluid expansion
                        const images = block.galleryImages || [];
                        const [currentSlide, setCurrentSlide] = React.useState(0);
                        const imagesPerSlide = 6;
                        const totalSlides = Math.ceil(images.length / imagesPerSlide);
                        const visibleImages = images.slice(currentSlide * imagesPerSlide, (currentSlide + 1) * imagesPerSlide);

                        const hasHovered = hoveredGallery.blockIndex === index && hoveredGallery.imageIndex !== null;

                        // Mobile-friendly: Simple grid on mobile, complex mosaic on desktop
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

                        // Calculate dynamic grid template based on hover state
                        const getColumnTemplate = () => {
                            if (isMobile) {
                                // Mobile: expand hovered image to full width
                                if (!hasHovered) return '1fr 1fr'; // Simple 2-column grid for mobile
                                const hoveredIdx = hoveredGallery.imageIndex!;
                                // On mobile, make hovered column 4x and other column 0.5x
                                const cols = [1, 1];
                                const hoveredCol = hoveredIdx % 2; // 0 or 1 for 2-column layout
                                cols[hoveredCol] = 4;
                                cols[1 - hoveredCol] = 0.5;
                                return cols.map(c => `${c}fr`).join(' ');
                            }
                            if (!hasHovered) return '2fr 2fr 1fr 1fr 2fr 2fr'; // Default balanced

                            const hoveredIdx = hoveredGallery.imageIndex!;
                            // Patterns: which columns each image occupies
                            const colMapping = [
                                [0, 1, 2], // Image 1: cols 0-2
                                [3, 4, 5], // Image 2: cols 3-5
                                [3, 4, 5], // Image 3: cols 3-5
                                [0, 1],    // Image 4: cols 0-1
                                [2, 3],    // Image 5: cols 2-3
                                [4, 5],    // Image 6: cols 4-5
                            ];

                            const cols = [1, 1, 1, 1, 1, 1]; // Start with equal
                            const hoveredCols = colMapping[hoveredIdx] || [];

                            // Make hovered columns 3x larger
                            hoveredCols.forEach(c => cols[c] = 3);

                            return cols.map(c => `${c}fr`).join(' ');
                        };

                        const getRowTemplate = () => {
                            if (isMobile) {
                                // Mobile: expand hovered row
                                if (!hasHovered) return '1fr 1fr 1fr'; // Simple 3-row grid for mobile
                                const hoveredIdx = hoveredGallery.imageIndex!;
                                const rows = [1, 1, 1];
                                const hoveredRow = Math.floor(hoveredIdx / 2); // 0, 1, or 2 for 3-row layout
                                rows[hoveredRow] = 3;
                                return rows.map(r => `${r}fr`).join(' ');
                            }
                            if (!hasHovered) return '3fr 3fr 2fr 2fr'; // Taller top rows for rectangular images
                            const hoveredIdx = hoveredGallery.imageIndex!;
                            // Patterns: which rows each image occupies
                            const rowMapping = [
                                [0, 1],    // Image 1: rows 0-1
                                [0],       // Image 2: row 0
                                [1],       // Image 3: row 1
                                [2, 3],    // Image 4: rows 2-3
                                [2, 3],    // Image 5: rows 2-3
                                [2, 3],    // Image 6: rows 2-3
                            ];

                            const rows = [1, 1, 1, 1]; // Start with equal
                            const hoveredRows = rowMapping[hoveredIdx] || [];

                            // Make hovered rows 3x larger
                            hoveredRows.forEach(r => rows[r] = 3);

                            return rows.map(r => `${r}fr`).join(' ');
                        };

                        const nextSlide = () => {
                            setCurrentSlide((prev) => (prev + 1) % totalSlides);
                        };

                        const prevSlide = () => {
                            setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
                        };

                        // Mobile-friendly grid patterns
                        const mobileGridPattern = [
                            { col: '1 / 2', row: '1 / 2' },    // Image 1: col 1, row 1
                            { col: '2 / 3', row: '1 / 2' },    // Image 2: col 2, row 1
                            { col: '1 / 2', row: '2 / 3' },    // Image 3: col 1, row 2
                            { col: '2 / 3', row: '2 / 3' },    // Image 4: col 2, row 2
                            { col: '1 / 2', row: '3 / 4' },    // Image 5: col 1, row 3
                            { col: '2 / 3', row: '3 / 4' },    // Image 6: col 2, row 3
                        ];

                        // Desktop mosaic grid positions
                        const desktopGridPattern = [
                            { col: '1 / 4', row: '1 / 3' },    // Image 1: cols 1-3, rows 1-2
                            { col: '4 / 7', row: '1 / 2' },    // Image 2: cols 4-6, row 1
                            { col: '4 / 7', row: '2 / 3' },    // Image 3: cols 4-6, row 2
                            { col: '1 / 3', row: '3 / 5' },    // Image 4: cols 1-2, rows 3-4
                            { col: '3 / 5', row: '3 / 5' },    // Image 5: cols 3-4, rows 3-4
                            { col: '5 / 7', row: '3 / 5' },    // Image 6: cols 5-6, rows 3-4
                        ];

                        const gridPattern = isMobile ? mobileGridPattern : desktopGridPattern;

                        return (
                            <section key={key} className="content-section bg-white dark:bg-[#132f4c]">
                                <div className="container-custom max-w-7xl px-4 sm:px-6">
                                    <div className="text-center mb-8 md:mb-12">
                                        {block.title && (
                                            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-200 mb-3 md:mb-4">{block.title}</h2>
                                        )}
                                        {block.description && (
                                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{block.description}</p>
                                        )}
                                    </div>

                                    {/* Fluid Mosaic Grid Layout */}
                                    <div className="relative">
                                        <div
                                            className="grid gap-2 md:gap-3 h-[600px] md:h-[650px] lg:h-[800px] overflow-hidden transition-all duration-700 ease-out"
                                            style={{
                                                gridTemplateColumns: getColumnTemplate(),
                                                gridTemplateRows: getRowTemplate(),
                                            }}
                                            onMouseLeave={() => setHoveredGallery({ blockIndex: -1, imageIndex: null })}
                                        >
                                            {visibleImages.map((item: any, idx: number) => {
                                                const isHovered = hoveredGallery.blockIndex === index && hoveredGallery.imageIndex === idx;
                                                const pattern = gridPattern[idx % gridPattern.length];

                                                return (
                                                    <div
                                                        key={`${currentSlide}-${idx}`}
                                                        className="relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-out"
                                                        style={{
                                                            gridColumn: pattern.col,
                                                            gridRow: pattern.row,
                                                        }}
                                                        onMouseEnter={() => setHoveredGallery({ blockIndex: index, imageIndex: idx })}
                                                    >
                                                        {/* Image */}
                                                        <img
                                                            src={`${siteConfig?.strapiUrl || 'http://localhost:1337'}${item.galleryImage?.url}`}
                                                            alt={item.imageCaption || item.imageTag || `Gallery image ${idx + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />

                                                        {/* Gradient Overlay */}
                                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                                                            }`} />

                                                        {/* Content Overlay */}
                                                        {isHovered && (
                                                            <div className="absolute inset-0 flex flex-col justify-end p-4 animate-fade-in">
                                                                <div className="text-white space-y-2">
                                                                    {item.imageTag && (
                                                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-full text-xs font-semibold backdrop-blur-sm">
                                                                            <span>🏷️</span>
                                                                            <span>{item.imageTag}</span>
                                                                        </div>
                                                                    )}
                                                                    {item.imageCaption && (
                                                                        <p className="text-sm md:text-base leading-relaxed font-semibold drop-shadow-2xl">
                                                                            {item.imageCaption}
                                                                        </p>
                                                                    )}
                                                                    {!item.imageTag && !item.imageCaption && (
                                                                        <p className="text-xs text-white/70">Gallery Image {idx + 1}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Highlight Border */}
                                                        {isHovered && (
                                                            <div className="absolute inset-0 ring-4 ring-blue-500 ring-inset rounded-2xl pointer-events-none" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Yellow Navigation Buttons */}
                                        {totalSlides > 1 && (
                                            <>
                                                {/* Previous Button */}
                                                <button
                                                    onClick={prevSlide}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group z-20"
                                                    aria-label="Previous images"
                                                >
                                                    <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>

                                                {/* Next Button */}
                                                <button
                                                    onClick={nextSlide}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group z-20"
                                                    aria-label="Next images"
                                                >
                                                    <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>

                                                {/* Slide Indicators */}
                                                <div className="flex justify-center gap-2 mt-6">
                                                    {Array.from({ length: totalSlides }).map((_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setCurrentSlide(i)}
                                                            className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide
                                                                ? 'w-8 bg-yellow-400'
                                                                : 'w-2 bg-gray-300 hover:bg-gray-400'
                                                                }`}
                                                            aria-label={`Go to slide ${i + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* CTA Text and Button */}
                                    {(block.galleryCtaText || block.galleryCtaButton) && (
                                        <div className="text-center mt-8 md:mt-12 space-y-3 md:space-y-4">
                                            {block.galleryCtaText && (
                                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{block.galleryCtaText}</p>
                                            )}
                                            {block.galleryCtaButton && (
                                                <div>
                                                    <button className={`px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base rounded-lg font-semibold transition-all duration-300 ${block.galleryCtaButton.variant === 'primary'
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                                                        }`}>
                                                        {block.galleryCtaButton.label}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </section>
                        );
                    }

                    case 'blocks.cta-section': {
                        // Handle CTA section block
                        return (
                            <ProductCTASection
                                key={key}
                                product={projectData}
                                isLoading={false}
                                pageContent={undefined}
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
