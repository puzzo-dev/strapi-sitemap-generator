import React from 'react';
import { Button } from '@/components/ui/button';
import type { BlogCTASectionProps } from '@/lib/types';

const BlogCTASection: React.FC<BlogCTASectionProps> = ({ pageContent }) => {
    // Get CTA section from page content
    const ctaSection = pageContent?.sections?.find(s => s.type === 'cta');
    
    if (!ctaSection) return null;

    return (
        <div className={`mt-16 p-8 rounded-xl ${ctaSection.settings?.backgroundColor || 'bg-blue-50 dark:bg-blue-900/20'}`}>
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-3 text-blue-900 dark:text-blue-200">{ctaSection.title}</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">{ctaSection.subtitle}</p>
                {ctaSection.content && (
                    <p className="mb-6 text-muted-foreground">{ctaSection.content}</p>
                )}
                {ctaSection.settings?.primaryButton && (
                    <Button
                        variant="default"
                        size="lg"
                    >
                        {ctaSection.settings.primaryButton.children}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BlogCTASection;