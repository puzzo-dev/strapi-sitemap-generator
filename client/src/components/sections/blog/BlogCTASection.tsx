import React from 'react';
import { Button } from '@/components/ui/button';
import NewsletterForm from '@/components/ui/NewsletterForm';
import type { BlogCTASectionProps } from '@/lib/types';

const BlogCTASection: React.FC<BlogCTASectionProps> = ({ pageContent }) => {
    // Get CTA section from page content
    const ctaSection = pageContent?.sections?.find(s => s.type === 'cta');

    if (!ctaSection) return null;

    return (
        <div className={`mt-16 p-8 rounded-xl ${ctaSection.settings?.backgroundColor || 'bg-blue-50 dark:bg-blue-900/20'}`}>
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-3 text-blue-900 dark:text-blue-200">{ctaSection.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{ctaSection.subtitle}</p>
                {ctaSection.content && (
                    <p className="mb-6 text-muted-foreground">{ctaSection.content}</p>
                )}

                {/* Newsletter Form */}
                <div className="mb-6">
                    <NewsletterForm className="max-w-md mx-auto" />
                </div>

                {/* Secondary Button (if exists) */}
                {ctaSection.settings?.secondaryButton && (
                    <Button
                        variant="outline"
                        size="lg"
                        className="mt-4"
                    >
                        {ctaSection.settings.secondaryButton.children}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BlogCTASection;