import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CircuitBoard, Sparkles, Shield } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import GradientButton from '@/components/ui/GradientButton';
import { PageSection } from '@/lib/types';
import { fadeInUp } from '@/lib/animations';

const AboutCTA: React.FC<PageSection & { isPageLoading: boolean }> = ({
    title,
    subtitle,
    settings,
    isPageLoading
}) => {
    const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.section
            ref={ctaRef}
            initial="initial"
            animate={ctaInView ? "animate" : "initial"}
            variants={fadeInUp(30)}
            className="content-section bg-blue-50 dark:bg-[#0a1929] relative overflow-hidden"
        >
            {/* Tech-inspired background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
                <CircuitBoard className="absolute left-10 top-10 h-32 w-32 text-blue-400 dark:text-blue-600 animate-float" />
                <Sparkles className="absolute right-10 bottom-10 h-28 w-28 text-indigo-400 dark:text-indigo-600 animate-pulse-slower" />
                <Shield className="absolute top-1/2 right-1/3 h-24 w-24 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
            </div>

            <div className="container-custom relative z-10">
                {isPageLoading ? (
                    <div className="card p-8 md:p-12 border-2 border-blue-100 dark:border-blue-800/30 text-center">
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 w-3/4 mx-auto animate-pulse"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full mx-auto animate-pulse"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-5/6 mx-auto animate-pulse"></div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                ) : (
                    <div className="card p-8 md:p-12 border-2 border-blue-100 dark:border-blue-800/30 text-center">
                        <h2 className="heading-lg text-gray-800 dark:text-white mb-6">
                            {title || 'Ready to Transform Your Business?'}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                            {subtitle ||
                                "Partner with I-VARSE to unlock your digital potential. Let's create innovative solutions together that drive real business value."}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <GradientButton
                                href={settings?.primaryCta?.url || "/contact"}
                                size="lg"
                                endIcon={<ArrowRight />}
                            >
                                {settings?.primaryCta?.text || "Get Started"}
                            </GradientButton>
                            <GradientButton
                                href={settings?.secondaryCta?.url || "/services"}
                                variant="outline"
                                size="lg"
                            >
                                {settings?.secondaryCta?.text || "Explore Services"}
                            </GradientButton>
                        </div>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default AboutCTA;