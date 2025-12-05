import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GradientButton from '@/components/ui/GradientButton';
import { PageSection } from '@/lib/types/core';
import { scaleUp, fadeInUp, staggerChildren } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TeamCTAProps extends PageSection {
    isPageLoading: boolean;
}

const TeamCTA: React.FC<TeamCTAProps> = ({
    title,
    subtitle,
    content,
    settings,
    isPageLoading
}) => {
    const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.section 
            ref={ctaRef}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="content-section bg-white dark:bg-[#132f4c]"
        >
            <div className="container-custom max-w-7xl">
                <motion.div 
                    variants={scaleUp(0.95, 0.8)}
                >
                    <Card className="p-8 md:p-12 gradient-bg shadow-lg text-center">
                        <CardContent>
                            {/* CTA Content */}
                            <motion.div className="relative z-10">
                                <motion.h2 
                                    variants={fadeInUp(20, 0.7)}
                                    className="text-2xl md:text-3xl font-bold text-white mb-6"
                                >
                                    {title || "Ready to Work With Our Team?"}
                                </motion.h2>
                                <motion.p 
                                    variants={fadeInUp(20, 0.7, 0.1)}
                                    className="text-white/90 max-w-3xl mx-auto mb-8"
                                >
                                    {subtitle || "Contact us today to discuss how our experts can help you achieve your business goals."}
                                </motion.p>
                                {content && (
                                    <motion.p 
                                        variants={fadeInUp(20, 0.7, 0.2)}
                                        className="text-base text-white/90 max-w-2xl mx-auto mb-8"
                                    >
                                        {content}
                                    </motion.p>
                                )}
                                <motion.div 
                                    variants={staggerChildren(0.1, 0.2)}
                                    className="flex flex-wrap justify-center gap-4"
                                >
                                    {settings?.primaryButton && (
                                        <motion.div variants={fadeInUp(10, 0.5)}>
                                            <GradientButton 
                                                href={settings.primaryButton.href} 
                                                variant="light" 
                                                className="border border-white/20"
                                            >
                                                {settings.primaryButton.children || settings.primaryButton.title}
                                            </GradientButton>
                                        </motion.div>
                                    )}
                                    {settings?.secondaryButton && (
                                        <motion.div variants={fadeInUp(10, 0.5, 0.1)}>
                                            <GradientButton 
                                                href={settings.secondaryButton.href} 
                                                variant="light" 
                                                className="border border-white/20"
                                            >
                                                {settings.secondaryButton.children || settings.secondaryButton.title}
                                            </GradientButton>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TeamCTA; 