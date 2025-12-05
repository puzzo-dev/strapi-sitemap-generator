import React, { useState, useRef } from 'react';
import GradientButton from '@/components/ui/GradientButton';
import ExpressionOfInterestForm from './ExpressionOfInterestForm';
import { PageContent } from '@/lib/types/core';

interface CareersCTASectionProps {
    pageContent?: PageContent | null;
    isLoading?: boolean;
    showExpressionForm?: boolean;
    onShowExpressionForm?: () => void;
    onHideExpressionForm?: () => void;
}

const CareersCTASection: React.FC<CareersCTASectionProps> = ({
    pageContent,
    isLoading = false,
    showExpressionForm: externalShowForm,
    onShowExpressionForm,
    onHideExpressionForm
}) => {
    const [internalShowForm, setInternalShowForm] = useState(false);

    // Use external state if provided, otherwise use internal state
    const showForm = externalShowForm !== undefined ? externalShowForm : internalShowForm;
    const setShowForm = onShowExpressionForm || (() => setInternalShowForm(true));
    const hideForm = onHideExpressionForm || (() => setInternalShowForm(false));
    const formRef = useRef<HTMLDivElement>(null);

    // Get CTA section from page content
    const ctaSection = pageContent?.sections?.find(s => s.type === 'cta');

    // If no page content or CTA section, don't render anything
    if (!pageContent || !ctaSection) {
        return null;
    }

    const title = ctaSection.title;
    const subtitle = ctaSection.subtitle;
    const content = ctaSection.content;
    const primaryButton = ctaSection.settings?.primaryButton;
    const secondaryButton = ctaSection.settings?.secondaryButton;
    const backgroundColor = ctaSection.backgroundColor;
    const textColor = ctaSection.textColor;

    const handleSendResumeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowForm();
    };

    return (
        <>
            <section className={`content-section ${backgroundColor || 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900'} ${textColor || 'text-white'}`}>
                <div className="container-custom max-w-8xl">
                    <div className="text-center max-w-4xl mx-auto">
                        {isLoading ? (
                            <div className="animate-pulse space-y-6">
                                <div className="h-8 bg-white/20 rounded w-3/4 mx-auto"></div>
                                <div className="h-6 bg-white/20 rounded w-2/3 mx-auto"></div>
                                <div className="h-4 bg-white/20 rounded w-5/6 mx-auto"></div>
                            </div>
                        ) : (
                            <>
                                <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100/20 px-3 py-1 text-sm font-medium text-blue-200 mb-4">
                                    {/* <span className="flex h-2 w-2 rounded-full bg-blue-300 mr-2 animate-pulse"></span> */}
                                    {ctaSection.settings?.badge || "Get Started"}
                                </div>
                                <h2 className="section-title text-white mb-6">
                                    {title}
                                </h2>
                                <p className="text-xl text-blue-100 mb-8">
                                    {subtitle}
                                </p>
                                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                                    {content}
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {primaryButton && (
                                        <GradientButton
                                            href={primaryButton.href}
                                            variant={primaryButton.variant as any}
                                        >
                                            {primaryButton.children || primaryButton.title}
                                        </GradientButton>
                                    )}

                                    {secondaryButton && (
                                        <GradientButton
                                            href={secondaryButton.href === '/contact?type=careers' ? '#' : secondaryButton.href}
                                            variant={secondaryButton.variant as any}
                                            onClick={secondaryButton.href === '/contact?type=careers' ? handleSendResumeClick : undefined}
                                        >
                                            {secondaryButton.children || secondaryButton.title}
                                        </GradientButton>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Expression of Interest Form */}
            <ExpressionOfInterestForm
                isVisible={showForm}
                onClose={hideForm}
            />
        </>
    );
};

export default CareersCTASection;