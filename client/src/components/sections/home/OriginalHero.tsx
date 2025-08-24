import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/context/LanguageContext';
import {
    ChevronRight,
    Sparkles,
    CircuitBoard,
    Cpu,
    Code,
    Database,
    Globe,
    LineChart,
    Smartphone,
    Cloud,
    ShieldCheck,
    LayoutGrid,
    Zap,
    ChevronLeft,
    Play,
    Pause
} from 'lucide-react';
import {
    HeroProps,
    ServiceProps,
    HeroSlide,
} from '@/lib/types/content';
import { SocialLink } from '@/lib/types/layout';
import { SiteConfig } from '@/lib/types/core';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/GradientButton';
import { services as localServices, heroSlides as localHeroSlides } from '@/lib/data/';
import {
    fadeInUp,
    staggerChildren,
    scaleUp,
    slideIn
} from '@/lib/animations';
import IVarseLogo from '@/components/ui/IVarseLogo';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLink from '@/components/ui/AppLink';
import { cn } from '@/lib/utils';
import { LoadingSkeletons } from '@/components/ui/LoadingSkeleton';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { getThemeColors, getSpacing, getAnimationVariants } from '@/lib/utils/theme-helpers';
import { isString, isValidUrl } from '@/lib/utils/type-guards';

// Helper function to get social icon paths
const getSocialIconPath = (platform: string): string => {
    const lowerPlatform = platform.toLowerCase();

    switch (lowerPlatform) {
        case 'facebook':
            return "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z";
        case 'twitter':
            return "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z";
        case 'instagram':
            return "M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792";
        case 'linkedin':
            return "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z";
        default:
            return "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z";
    }
};

interface OriginalHeroProps extends Partial<HeroProps> {
    heroData?: any;
    siteConfig?: SiteConfig;
    services?: ServiceProps[];
    socialLinks?: SocialLink[];
    heroSlides?: HeroSlide[];
}

const OriginalHero: React.FC<OriginalHeroProps> = ({
    currentIndex = 0,
    isPageLoading = false,
    handleMouseEnter = () => { },
    handleMouseLeave = () => { },
    heroContents: propHeroContents,
    heroData,
    siteConfig,
    services: propServices,
    socialLinks: propSocialLinks,
    heroSlides: propHeroSlides,
}) => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();

    const [isPaused, setIsPaused] = useState(false);

    // Use props instead of hooks
    const isHeroLoading = false; // No longer loading from hook
    const isSiteConfigLoading = false; // No longer loading from hook
    const isServicesLoading = false; // No longer loading from hook
    const isSocialLinksLoading = false; // No longer loading from hook

    // Use props data with fallbacks
    const apiServices = propServices;
    const socialLinks = propSocialLinks;
    const heroSlides = propHeroSlides || localHeroSlides;

    // Determine which services to display with fallback to local data
    const services = useMemo(() => {
        return apiServices && apiServices.length > 0 ? apiServices : localServices;
    }, [apiServices]);

    // Determine which hero content to use with fallback to local data
    const heroContents = useMemo(() => {
        // First check if heroContents were passed as props
        if (propHeroContents) {
            return propHeroContents;
        }
        // Then check if we got them from the API
        if (heroData?.heroContents) {
            return heroData.heroContents;
        }
        // Fall back to local data
        return localHeroSlides[0];
    }, [heroData, propHeroContents]);

    // Determine which social links to display
    const displaySocialLinks = useMemo(() => {
        return socialLinks && socialLinks.length > 0 ? socialLinks : [];
    }, [socialLinks]);

    // Set up auto-rotation for hero slides
    const [currentSlideIndex, setCurrentSlideIndex] = useState(currentIndex);

    useEffect(() => {
        if (isPaused || !heroSlides || heroSlides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlideIndex((prevIndex) =>
                prevIndex === (heroSlides.length - 1) ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isPaused, heroSlides]);

    // Get the current slide content
    const currentSlide = useMemo(() => {
        return heroSlides && heroSlides.length > 0 ?
            heroSlides[currentSlideIndex] : heroContents;
    }, [heroSlides, currentSlideIndex, heroContents]);

    // Pause rotation on mouse enter
    const handleHeroMouseEnter = () => {
        setIsPaused(true);
        handleMouseEnter();
    };

    // Resume rotation on mouse leave
    const handleHeroMouseLeave = () => {
        setIsPaused(false);
        handleMouseLeave();
    };

    // Replace the existing content extraction with this
    // Use currentSlide for title and subtitle
    const displayTitle =
        currentSlide.title || "Innovative Digital Solutions for Modern Businesses";
    const displaySubtitle =
        currentSlide.subtitle ||
        "Elevate your business with our cutting-edge digital solutions.";

    // Get button info from currentSlide
    const primaryBtnText = currentSlide.primaryButton?.children || "GET STARTED";
    const primaryBtnUrl = currentSlide.primaryButton?.href || "/services";
    const secondaryBtnText = currentSlide.secondaryButton?.children || "LEARN MORE";
    const secondaryBtnUrl = currentSlide.secondaryButton?.href || "/#about";

    // Use isPageLoading or isHeroLoading as fallback for isLoading
    const showLoading = isPageLoading || isHeroLoading || isSiteConfigLoading;

    // Get company logo from site config
    const companyLogo = siteConfig?.logoLight || "/assets/I-VARSELogo3@3x.png";
    // Extract data from heroContents if available
    return (
        <motion.section
            initial="initial"
            animate="animate"
            className={cn(
                "h-fit md:h-[calc(100vh-2rem)] relative overflow-hidden py-25 md:pt-24 md:pb-16 hero-section",
                getThemeColors('background', 'gradient'),
                getThemeColors('border', 'muted')
            )}>
            {/* Tech-inspired background elements - Enhanced with more icons */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Animated gradient orbs */}
                <motion.div
                    variants={scaleUp(0.8, 1.5, 0.2)}
                    className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 pointer-events-none"
                />
                <motion.div
                    variants={scaleUp(0.8, 1.8, 0.5)}
                    className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 pointer-events-none"
                />
                <motion.div
                    variants={scaleUp(0.8, 2, 0.8)}
                    className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/30 pointer-events-none"
                />

                {/* Enhanced tech pattern with more icons */}
                <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20, rotate: 0 }}
                        animate={{
                            opacity: 0.3,
                            y: 0,
                            rotate: 12,
                            transition: {
                                duration: 0.8,
                                delay: 0.3
                            }
                        }}
                        className="absolute right-0 top-0"
                    >
                        <motion.div
                            animate={{
                                y: [0, -15, 0, 10, 0],
                                rotate: [12, 15, 10, 13, 12],
                                transition: {
                                    repeat: Infinity,
                                    duration: 10,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <Cpu className="h-48 w-48 text-indigo-700" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20, rotate: 0 }}
                        animate={{
                            opacity: 0.2,
                            y: 0,
                            rotate: 45,
                            transition: {
                                duration: 0.8,
                                delay: 0.7
                            }
                        }}
                        className="absolute right-1/4 bottom-1/4"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 5, -5, 0],
                                rotate: [45, 48, 43, 46, 45],
                                transition: {
                                    repeat: Infinity,
                                    duration: 8,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <Code className="h-56 w-56 text-cyan-700" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20, rotate: 0 }}
                        animate={{
                            opacity: 0.25,
                            y: 0,
                            rotate: -6,
                            transition: {
                                duration: 0.8,
                                delay: 0.9
                            }
                        }}
                        className="absolute left-1/4 top-1/3"
                    >
                        <motion.div
                            animate={{
                                y: [0, 5, -5, 10, 0],
                                rotate: [-6, -4, -8, -3, -6],
                                transition: {
                                    repeat: Infinity,
                                    duration: 9,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <LayoutGrid className="h-40 w-40 text-blue-600" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 0.2,
                            scale: 1,
                            transition: {
                                duration: 1,
                                delay: 1.1
                            }
                        }}
                        className="absolute left-10 top-10"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 0.98, 1.02, 1],
                                opacity: [0.2, 0.3, 0.2, 0.25, 0.2],
                                transition: {
                                    repeat: Infinity,
                                    duration: 5,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <Sparkles className="h-32 w-32 text-purple-600" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Animated tech scan line */}
                <motion.div
                    initial={{ opacity: 0, top: '100%' }}
                    animate={{
                        opacity: [0, 0.6, 0.1],
                        top: ['100%', '0%', '0%'],
                        transition: {
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 5
                        }
                    }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                />

                {/* Snowfall particles */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => {
                        // Precalculate random values to avoid React errors
                        const randomLeft = (i * 6.67) % 100; // Distribute evenly across width
                        const randomScale = 0.5 + ((i % 5) * 0.1); // 0.5 to 0.9
                        const randomDuration = 8 + ((i % 5) * 1); // 8 to 12 seconds
                        const randomDelay = (i % 5) * 1; // 0 to 4 seconds

                        return (
                            <motion.div
                                key={`snowfall-particle-${i}`}
                                className="absolute h-1 w-1 rounded-full bg-blue-500/50 dark:bg-blue-400/50"
                                initial={{
                                    y: -20,
                                    opacity: 0,
                                    scale: randomScale
                                }}
                                animate={{
                                    y: '120%',
                                    opacity: [0, 0.8, 0.5, 0],
                                    transition: {
                                        duration: randomDuration,
                                        delay: randomDelay,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }
                                }}
                                style={{
                                    left: `${randomLeft}%`,
                                }}
                            />
                        );
                    })}
                </div>

                {/* Animated network connections */}
                <svg className="absolute inset-0 w-full h-full z-0 opacity-10 dark:opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.circle
                        cx="20" cy="20" r="2"
                        className="text-blue-500 fill-current"
                        initial={{ opacity: 0, r: 0 }}
                        animate={{
                            opacity: 1,
                            r: [0, 2, 1.5, 2],
                            transition: {
                                duration: 3,
                                delay: 0.2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                times: [0, 0.3, 0.8, 1]
                            }
                        }}
                    />
                    <motion.circle
                        cx="80" cy="30" r="2"
                        className="text-cyan-500 fill-current"
                        initial={{ opacity: 0, r: 0 }}
                        animate={{
                            opacity: 1,
                            r: [0, 2, 1.5, 2],
                            transition: {
                                duration: 3,
                                delay: 0.7,
                                repeat: Infinity,
                                repeatType: "reverse",
                                times: [0, 0.3, 0.8, 1]
                            }
                        }}
                    />
                    <motion.circle
                        cx="50" cy="70" r="2"
                        className="text-indigo-500 fill-current"
                        initial={{ opacity: 0, r: 0 }}
                        animate={{
                            opacity: 1,
                            r: [0, 2, 1.5, 2],
                            transition: {
                                duration: 3,
                                delay: 1.2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                times: [0, 0.3, 0.8, 1]
                            }
                        }}
                    />
                    <motion.circle
                        cx="30" cy="80" r="2"
                        className="text-purple-500 fill-current"
                        initial={{ opacity: 0, r: 0 }}
                        animate={{
                            opacity: 1,
                            r: [0, 2, 1.5, 2],
                            transition: {
                                duration: 3,
                                delay: 1.7,
                                repeat: Infinity,
                                repeatType: "reverse",
                                times: [0, 0.3, 0.8, 1]
                            }
                        }}
                    />
                    <motion.circle
                        cx="70" cy="60" r="2"
                        className="text-blue-500 fill-current"
                        initial={{ opacity: 0, r: 0 }}
                        animate={{
                            opacity: 1,
                            r: [0, 2, 1.5, 2],
                            transition: {
                                duration: 3,
                                delay: 2.2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                times: [0, 0.3, 0.8, 1]
                            }
                        }}
                    />

                    <motion.line
                        x1="20" y1="20" x2="80" y2="30"
                        className="text-blue-500 stroke-current"
                        initial={{ opacity: 0, strokeWidth: 0 }}
                        animate={{
                            opacity: 0.5,
                            strokeWidth: 0.2,
                            pathLength: [0, 1],
                            transition: {
                                duration: 2,
                                delay: 0.5,
                                ease: "easeInOut"
                            }
                        }}
                    />
                    <motion.line
                        x1="80" y1="30" x2="50" y2="70"
                        className="text-cyan-500 stroke-current"
                        initial={{ opacity: 0, strokeWidth: 0 }}
                        animate={{
                            opacity: 0.5,
                            strokeWidth: 0.2,
                            pathLength: [0, 1],
                            transition: {
                                duration: 2,
                                delay: 1,
                                ease: "easeInOut"
                            }
                        }}
                    />
                    <motion.line
                        x1="50" y1="70" x2="30" y2="80"
                        className="text-indigo-500 stroke-current"
                        initial={{ opacity: 0, strokeWidth: 0 }}
                        animate={{
                            opacity: 0.5,
                            strokeWidth: 0.2,
                            pathLength: [0, 1],
                            transition: {
                                duration: 2,
                                delay: 1.5,
                                ease: "easeInOut"
                            }
                        }}
                    />
                    <motion.line
                        x1="30" y1="80" x2="70" y2="60"
                        className="text-purple-500 stroke-current"
                        initial={{ opacity: 0, strokeWidth: 0 }}
                        animate={{
                            opacity: 0.5,
                            strokeWidth: 0.2,
                            pathLength: [0, 1],
                            transition: {
                                duration: 2,
                                delay: 2,
                                ease: "easeInOut"
                            }
                        }}
                    />
                    <motion.line
                        x1="70" y1="60" x2="20" y2="20"
                        className="text-blue-500 stroke-current"
                        initial={{ opacity: 0, strokeWidth: 0 }}
                        animate={{
                            opacity: 0.5,
                            strokeWidth: 0.2,
                            pathLength: [0, 1],
                            transition: {
                                duration: 2,
                                delay: 2.5,
                                ease: "easeInOut"
                            }
                        }}
                    />
                </svg>
            </div>

            <div className="container-custom relative z-20 mx-auto h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative">
                    {/* Mobile Header (Shows above the slider on mobile) */}
                    <div className="block lg:hidden w-full mb-4 pt-10">
                        {showLoading ? (
                            <LoadingSkeletons.Text lines={2} className="space-y-3" />
                        ) : (
                            <>
                                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                                    💻 Digital Innovation
                                </div>
                                <h1
                                    className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 relative z-10 animate-fade-in-up"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    <span className="gradient-text">
                                        {displayTitle.split(" ").slice(0, 2).join(" ")}
                                    </span>{" "}
                                    {displayTitle.split(" ").slice(2).join(" ")}
                                </h1>
                            </>
                        )}
                    </div>

                    {/* Left column - Content (Shows second on mobile, first on desktop) */}
                    <div className="order-2 lg:order-1 z-10 relative ">
                        <div className="space-y-6 md:space-y-8">
                            {/* Desktop-only heading - hidden on mobile */}
                            <div className="hidden lg:block">
                                {showLoading ? (
                                    <LoadingSkeletons.Text lines={2} className="space-y-3" />
                                ) : (
                                    <>
                                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                                            💻 Digital Innovation
                                        </div>
                                        <h1
                                            className="heading-xl text-5xl md:text-6xl font-black mb-4 animate-fade-in-up"
                                            style={{ animationDelay: "0.2s" }}
                                        >
                                            <span className="gradient-text">
                                                {displayTitle.split(" ").slice(0, 2).join(" ")}
                                            </span>{" "}
                                            {displayTitle.split(" ").slice(2).join(" ")}
                                        </h1>
                                    </>
                                )}
                            </div>

                            {/* Always visible subtitle */}
                            {showLoading ? (
                                <LoadingSkeletons.Text lines={2} className="space-y-3" />
                            ) : (
                                <p
                                    className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    {displaySubtitle}
                                </p>
                            )}
                            {/* Desktop-only buttons */}
                            <div className="pt-4 md:flex-row gap-4 hidden md:flex">
                                <GradientButton
                                    href={primaryBtnUrl}
                                    size="lg"
                                    endIcon={<ChevronRight />}
                                    className="w-auto py-3 animate-snowfall z-10"
                                    target={currentSlide.primaryButton?.openInNewTab ? "_blank" : undefined}
                                    rel={currentSlide.primaryButton?.isExternal ? "noopener noreferrer" : undefined}
                                >
                                    {primaryBtnText}
                                </GradientButton>
                                <GradientButton
                                    href={secondaryBtnUrl}
                                    variant="outline"
                                    size="lg"
                                    className="w-auto py-3 z-10"
                                    target={currentSlide.secondaryButton?.openInNewTab ? "_blank" : undefined}
                                    rel={currentSlide.secondaryButton?.isExternal ? "noopener noreferrer" : undefined}
                                >
                                    {secondaryBtnText}
                                </GradientButton>
                            </div>

                            {/* Desktop Social Media Links */}
                            <div className="hidden md:flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                                {isSocialLinksLoading ? (
                                    <div className="flex space-x-4">
                                        {Array(4).fill(0).map((_, i) => (
                                            <LoadingSkeletons.Base key={i} className="w-5 h-5 rounded-full" />
                                        ))}
                                    </div>
                                ) : (
                                    displaySocialLinks.map((link) => (
                                        <a
                                            key={link.id}
                                            href={isValidUrl(link.href) ? link.href : '#'}
                                            className={cn(
                                                "transition-colors cursor-pointer",
                                                getThemeColors('text', 'muted'),
                                                "hover:text-blue-600 dark:hover:text-blue-400"
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={isString(link.platform) ? link.platform : 'Social Link'}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d={getSocialIconPath(link.platform)}></path>
                                            </svg>
                                        </a>
                                    ))
                                )}
                            </div>

                            {/* Mobile buttons */}
                            <div className="md:hidden py-6 flex flex-col gap-5 w-full">
                                <GradientButton
                                    href={primaryBtnUrl}
                                    size="lg"
                                    endIcon={<ChevronRight />}
                                    className="w-full py-5 justify-center animate-snowfall text-lg"
                                    fullWidth
                                    target={currentSlide.primaryButton?.openInNewTab ? "_blank" : undefined}
                                    rel={currentSlide.primaryButton?.isExternal ? "noopener noreferrer" : undefined}
                                >
                                    {primaryBtnText}
                                </GradientButton>
                                <GradientButton
                                    href={secondaryBtnUrl}
                                    variant="outline"
                                    size="lg"
                                    className="w-full py-5 justify-center text-lg"
                                    fullWidth
                                    target={currentSlide.secondaryButton?.openInNewTab ? "_blank" : undefined}
                                    rel={currentSlide.secondaryButton?.isExternal ? "noopener noreferrer" : undefined}
                                >
                                    {secondaryBtnText}
                                </GradientButton>

                                {/* Mobile Social Media Links */}
                                <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                                    {isSocialLinksLoading ? (
                                        <div className="flex space-x-2">
                                            {Array(4).fill(0).map((_, i) => (
                                                <LoadingSkeletons.Base key={i} className="w-6 h-6 rounded-full" />
                                            ))}
                                        </div>
                                    ) : (
                                        displaySocialLinks.map((link) => (
                                            <a
                                                key={link.id}
                                                href={isValidUrl(link.href) ? link.href : '#'}
                                                className={cn(
                                                    "transition-colors cursor-pointer",
                                                    getThemeColors('text', 'muted'),
                                                    "hover:text-blue-600 dark:hover:text-blue-400"
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={isString(link.platform) ? link.platform : 'Social Link'}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-6 h-6"
                                                >
                                                    <path d={getSocialIconPath(link.platform)}></path>
                                                </svg>
                                            </a>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Service Slider (Shows first on both mobile and desktop) */}
                    <div className="order-1 md:order-2">
                        <div
                            className="relative rounded-xl overflow-hidden aspect-video shadow-2xl shadow-blue-900/10 dark:shadow-blue-500/10 fade-in-slide"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Service slider container */}
                            <div className="relative h-full w-full border border-blue-200 dark:border-blue-800 rounded-xl bg-white/80 dark:bg-gray-900/80 p-3">
                                {/* Main content area with tech corners and animated backdrop */}
                                <div className="relative h-full w-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 rounded-lg overflow-hidden">
                                    {/* Tech corners */}
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>

                                    {/* Animated background tech elements */}
                                    <div className="absolute inset-0 pointer-events-none z-0">
                                        <CircuitBoard className="absolute top-6 left-6 h-12 w-12 text-blue-300/30 dark:text-blue-700/30 animate-float" />
                                        <Cpu
                                            className="absolute bottom-6 right-6 h-12 w-12 text-indigo-300/30 dark:text-indigo-700/30 animate-float"
                                            style={{ animationDelay: "1s" }}
                                        />

                                        {/* Animated dots & lines */}
                                        <svg
                                            className="absolute inset-0 w-full h-full opacity-20"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                        >
                                            <circle
                                                cx="20"
                                                cy="20"
                                                r="1"
                                                className="text-blue-400 fill-current animate-pulse-light"
                                            />
                                            <circle
                                                cx="80"
                                                cy="30"
                                                r="1"
                                                className="text-cyan-400 fill-current animate-pulse-light"
                                                style={{ animationDelay: "0.5s" }}
                                            />
                                            <circle
                                                cx="50"
                                                cy="70"
                                                r="1"
                                                className="text-indigo-400 fill-current animate-pulse-light"
                                                style={{ animationDelay: "1s" }}
                                            />
                                            <circle
                                                cx="30"
                                                cy="80"
                                                r="1"
                                                className="text-purple-400 fill-current animate-pulse-light"
                                                style={{ animationDelay: "1.5s" }}
                                            />
                                            <circle
                                                cx="70"
                                                cy="60"
                                                r="1"
                                                className="text-blue-400 fill-current animate-pulse-light"
                                                style={{ animationDelay: "2s" }}
                                            />

                                            <line
                                                x1="20"
                                                y1="20"
                                                x2="80"
                                                y2="30"
                                                className="text-blue-400 stroke-current"
                                                strokeWidth="0.2"
                                            />
                                            <line
                                                x1="80"
                                                y1="30"
                                                x2="50"
                                                y2="70"
                                                className="text-cyan-400 stroke-current"
                                                strokeWidth="0.2"
                                            />
                                            <line
                                                x1="50"
                                                y1="70"
                                                x2="30"
                                                y2="80"
                                                className="text-indigo-400 stroke-current"
                                                strokeWidth="0.2"
                                            />
                                            <line
                                                x1="30"
                                                y1="80"
                                                x2="70"
                                                y2="60"
                                                className="text-purple-400 stroke-current"
                                                strokeWidth="0.2"
                                            />
                                            <line
                                                x1="70"
                                                y1="60"
                                                x2="20"
                                                y2="20"
                                                className="text-blue-400 stroke-current"
                                                strokeWidth="0.2"
                                            />
                                        </svg>
                                    </div>

                                    {/* Hero Slides Container - Original Design */}
                                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                        {isHeroLoading ? (
                                            <div className="flex items-center justify-center h-full">
                                                <LoadingSkeletons.Base className="w-16 h-16 rounded-full" />
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-full">
                                                {/* Main image with gradient overlay */}
                                                <div className="absolute inset-0 z-10">
                                                    {heroSlides.map((slide, index) => (
                                                        <div
                                                            key={slide.id || index}
                                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlideIndex
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                                }`}
                                                        >
                                                            <img
                                                                src={slide.backgroundImage || ""}
                                                                alt={slide.title}
                                                                className="w-full h-full object-cover opacity-40 dark:opacity-30"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-900/20 dark:from-blue-900/50 dark:to-indigo-900/40"></div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Company logo */}
                                                <div className="absolute bottom-1 left-2 w-16 h-16 opacity-30 dark:opacity-20 z-10 flex items-end">
                                                    <IVarseLogo
                                                        size={25} // smaller size for corner placement
                                                        variant="auto" // automatically switches based on theme
                                                        className="w-full h-full object-contain object-bottom drop-shadow-sm"
                                                    />
                                                </div>


                                                {/* Animated tech elements */}
                                                <CircuitBoard className="absolute top-6 left-6 h-12 w-12 text-blue-300 dark:text-blue-700 opacity-30 animate-float" />
                                                <Cpu
                                                    className="absolute bottom-6 right-6 h-12 w-12 text-indigo-300 dark:text-indigo-700 opacity-30 animate-float"
                                                    style={{ animationDelay: "1s" }}
                                                />

                                                {/* Animated dots & lines */}
                                                <svg
                                                    className="absolute inset-0 w-full h-full"
                                                    viewBox="0 0 100 100"
                                                    preserveAspectRatio="none"
                                                >
                                                    <circle
                                                        cx="20"
                                                        cy="20"
                                                        r="1"
                                                        className="text-blue-400 fill-current animate-pulse-light"
                                                    />
                                                    <circle
                                                        cx="80"
                                                        cy="30"
                                                        r="1"
                                                        className="text-cyan-400 fill-current animate-pulse-light"
                                                        style={{ animationDelay: "0.5s" }}
                                                    />
                                                    <circle
                                                        cx="50"
                                                        cy="70"
                                                        r="1"
                                                        className="text-indigo-400 fill-current animate-pulse-light"
                                                        style={{ animationDelay: "1s" }}
                                                    />
                                                    <circle
                                                        cx="30"
                                                        cy="80"
                                                        r="1"
                                                        className="text-purple-400 fill-current animate-pulse-light"
                                                        style={{ animationDelay: "1.5s" }}
                                                    />
                                                    <circle
                                                        cx="70"
                                                        cy="60"
                                                        r="1"
                                                        className="text-blue-400 fill-current animate-pulse-light"
                                                        style={{ animationDelay: "2s" }}
                                                    />

                                                    <line
                                                        x1="20"
                                                        y1="20"
                                                        x2="80"
                                                        y2="30"
                                                        className="text-blue-400 stroke-current"
                                                        strokeWidth="0.2"
                                                    />
                                                    <line
                                                        x1="80"
                                                        y1="30"
                                                        x2="50"
                                                        y2="70"
                                                        className="text-cyan-400 stroke-current"
                                                        strokeWidth="0.2"
                                                    />
                                                    <line
                                                        x1="50"
                                                        y1="70"
                                                        x2="30"
                                                        y2="80"
                                                        className="text-indigo-400 stroke-current"
                                                        strokeWidth="0.2"
                                                    />
                                                    <line
                                                        x1="30"
                                                        y1="80"
                                                        x2="70"
                                                        y2="60"
                                                        className="text-purple-400 stroke-current"
                                                        strokeWidth="0.2"
                                                    />
                                                    <line
                                                        x1="70"
                                                        y1="60"
                                                        x2="20"
                                                        y2="20"
                                                        className="text-blue-400 stroke-current"
                                                        strokeWidth="0.2"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default OriginalHero;
