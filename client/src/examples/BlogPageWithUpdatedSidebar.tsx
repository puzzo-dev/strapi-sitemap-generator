// Example: How to use the updated BlogSidebarSection with proper lib structure

import React from 'react';
import BlogSidebarSection from '@/components/sections/blog/BlogSidebarSection';
import { AdSlide } from '@/lib/types/ads';
import { blogSidebarAds, campaignAds } from '@/lib/data/ads';

const BlogPageExample: React.FC = () => {
    // Example categories and tags (these would come from your actual data)
    const categories = [
        { id: 1, slug: 'technology', title: 'Technology', name: 'Technology' },
        { id: 2, slug: 'business', title: 'Business', name: 'Business' },
        { id: 3, slug: 'design', title: 'Design', name: 'Design' }
    ];

    const allTags = [
        { tag: 'react', count: 15 },
        { tag: 'typescript', count: 12 },
        { tag: 'nodejs', count: 8 }
    ];

    const categoryCounts = new Map([
        ['technology', 25],
        ['business', 18],
        ['design', 12]
    ]);

    // Example: Custom ads for specific campaigns
    const customAds: AdSlide[] = [
        ...blogSidebarAds,
        ...campaignAds.filter(ad => {
            const now = new Date();
            return (!ad.startDate || ad.startDate <= now) &&
                (!ad.endDate || ad.endDate >= now);
        })
    ];

    return (
        <div className="blog-page">
            <div className="blog-content">
                {/* Your blog posts would go here */}
            </div>

            {/* Updated sidebar with dynamic ads */}
            <BlogSidebarSection
                categories={categories}
                category="all"
                setCategory={(cat) => console.log('Category changed:', cat)}
                allTags={allTags}
                tag=""
                setTag={(tag) => console.log('Tag changed:', tag)}
                categoryCounts={categoryCounts}
                pageContent={{
                    id: 1,
                    slug: 'blog',
                    title: 'Blog',
                    description: 'Our blog',
                    metaTitle: 'Blog',
                    metaDescription: 'Our blog page',
                    sections: []
                }}
                customAds={customAds}
                adConfig={{
                    autoSlideInterval: 5000,
                    showNavigation: true,
                    showIndicators: true,
                    maxAds: 3
                }}
                userContext={{
                    userType: 'business-owner',
                    industry: 'technology',
                    interests: ['cloud', 'erp', 'development']
                }}
            />
        </div>
    );
};

export default BlogPageExample;
