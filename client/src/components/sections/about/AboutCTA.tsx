import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GradientButton from '@/components/ui/GradientButton';
import { Skeleton } from '@/components/ui/skeleton';
import { PageSection } from '@/lib/types/core';
import { ANIMATION_PRESETS } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';
import { getUIText } from '@/lib/fallbacks';

import type { AboutCTAProps } from '@/lib/types';

const AboutCTA: React.FC<AboutCTAProps> = ({
    title,
    subtitle,
    content,
    settings,
    isPageLoading
}) => {
    const [ctaRef] = useInView({ triggerOnce: true, threshold: 0.2 });

    if (isPageLoading) {
        return (
            <section className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
                <div className="container-custom max-w-8xl">
                    <div className="text-center max-w-3xl mx-auto">
                        <Skeleton className="h-8 w-32 mx-auto mb-4" />
                        <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
                        <Skeleton className="h-6 w-full mx-auto mb-2" />
                        <Skeleton className="h-6 w-5/6 mx-auto mb-8" />
                        <Skeleton className="h-12 w-40 mx-auto" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <motion.section
            ref={ctaRef}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="py-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]"
        >
            <div className="container-custom max-w-8xl">
                <div className="text-center max-w-3xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        variants={ANIMATION_PRESETS.ctaBadge}
                        className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in"
                    >
                        {getUIText(undefined, 'getStarted', 'buttons')}
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        variants={ANIMATION_PRESETS.ctaTitle}
                        className="section-title text-blue-900 dark:text-blue-200"
                    >
                        {title || getUIText(undefined, 'getStarted', 'buttons') + '?'}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        variants={ANIMATION_PRESETS.ctaSubtitle}
                        className="section-subtitle mb-8"
                    >
                        {subtitle}
                    </motion.p>

                    {/* Content */}
                    <div className="text-base text-gray-600 dark:text-gray-300 mb-8">
                        {content}
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={ANIMATION_PRESETS.ctaButtons}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {settings?.primaryButton ? (
                            <GradientButton href={settings.primaryButton.href} size="lg" endIcon={<ArrowRight />}>
                                {settings.primaryButton.children || settings.primaryButton.title}
                            </GradientButton>
                        ) : (
                            <GradientButton href="/contact" size="lg" endIcon={<ArrowRight />}>
                                {settings?.primaryButton?.children || getUIText(undefined, 'getStarted', 'buttons')}
                            </GradientButton>
                        )}

                        {settings?.secondaryButton && (
                            <GradientButton href={settings.secondaryButton.href} variant="outline" size="lg">
                                {settings.secondaryButton.children || settings.secondaryButton.title || getUIText(undefined, 'learnMore', 'buttons')}
                            </GradientButton>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default AboutCTA;