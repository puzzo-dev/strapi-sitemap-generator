import React, { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    Pause,
    Brain,
    Lock,
    ArrowRight,
    TrendingUp,
    Users,
    Building2,
} from "lucide-react";
import {
    HeroProps,
    ServiceProps,
    HeroSlide,
} from '@/lib/types/content';
import { SocialLink } from '@/lib/types/layout';
import { SiteConfig } from '@/lib/types/core';
import { ModernHeroProps } from '@/lib/types/components';
import { Button } from "@/components/ui/button";
import GradientButton from "@/components/ui/GradientButton";
import { services as localServices, socialLinks as localSocialLinks, heroSlides as localHeroSlides } from "@/lib/data/";
import {
    fadeInUp,
    staggerChildren,
    scaleUp,
    slideIn
} from '@/lib/animations';
import IVarseLogo from "@/components/ui/IVarseLogo";
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

// Helper function to render service icons
const renderServiceIcon = (iconName: string) => {
    switch (iconName.toLowerCase().replace('fa-', '')) {
        case 'cloud':
            return <Cloud className="h-4 w-4" />;
        case 'mobile-alt':
            return <Smartphone className="h-4 w-4" />;
        case 'code':
            return <Code className="h-4 w-4" />;
        case 'search':
            return <Globe className="h-4 w-4" />;
        case 'cogs':
            return <Cpu className="h-4 w-4" />;
        case 'pen-fancy':
            return <Database className="h-4 w-4" />;
        default:
            return <div className="h-4 w-4 bg-current rounded-full"></div>;
    }
};


const ModernHero: React.FC<ModernHeroProps> = ({
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

    // Use currentSlide for title and subtitle
    const displayTitle =
        currentSlide.title || "Transforming Digital Futures";
    const displaySubtitle =
        currentSlide.subtitle ||
        "Empowering businesses with comprehensive digital transformation solutions that drive innovation, efficiency, and sustainable growth in the modern digital landscape.";

    // Get button info from currentSlide
    const primaryBtnText = currentSlide.primaryButton?.children || "GET STARTED";
    const primaryBtnUrl = currentSlide.primaryButton?.href || "/services";
    const secondaryBtnText = currentSlide.secondaryButton?.children || "LEARN MORE";
    const secondaryBtnUrl = currentSlide.secondaryButton?.href || "/#about";

    // Use isPageLoading or isHeroLoading as fallback for isLoading
    const showLoading = isPageLoading || isHeroLoading || isSiteConfigLoading;

    // Get company logo from site config
    const companyLogo = siteConfig?.logoLight || "/assets/I-VARSELogo3@3x.png";

    return (
        <motion.section
            initial="initial"
            animate="animate"
            className={cn(
                "h-fit md:h-[calc(100vh-2rem)] relative overflow-hidden py-25 md:pt-24 md:pb-16 hero-section w-full",
                getThemeColors('background', 'gradient'),
                getThemeColors('border', 'muted')
            )}
            style={{
                /* 4K optimization */
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                imageRendering: 'crisp-edges'
            }}>
            {/* Tech-inspired background elements - Enhanced with overlay and blur */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ contain: 'layout style paint' }}>
                {/* Moving hi-tech pattern background */}
                <div className="absolute inset-0 z-5 overflow-hidden">
                    {/* Animated grid pattern */}
                    <div className="absolute inset-0 opacity-5 dark:opacity-10">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400/20 dark:text-blue-500/20"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    {/* Moving circuit lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-15" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                        {/* Horizontal moving lines */}
                        <motion.line
                            x1="0" y1="200" x2="1000" y2="200"
                            stroke="url(#movingGradient1)"
                            strokeWidth="1"
                            strokeDasharray="20,10"
                            animate={{
                                strokeDashoffset: [0, -30],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        <motion.line
                            x1="0" y1="600" x2="1000" y2="600"
                            stroke="url(#movingGradient2)"
                            strokeWidth="1"
                            strokeDasharray="15,20"
                            animate={{
                                strokeDashoffset: [0, 35],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        
                        {/* Vertical moving lines */}
                        <motion.line
                            x1="300" y1="0" x2="300" y2="1000"
                            stroke="url(#movingGradient3)"
                            strokeWidth="1"
                            strokeDasharray="25,15"
                            animate={{
                                strokeDashoffset: [0, -40],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        <motion.line
                            x1="700" y1="0" x2="700" y2="1000"
                            stroke="url(#movingGradient4)"
                            strokeWidth="1"
                            strokeDasharray="10,25"
                            animate={{
                                strokeDashoffset: [0, 35],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        {/* Diagonal circuit paths */}
                        <motion.path
                            d="M0,0 L200,200 L400,150 L600,300 L800,250 L1000,400"
                            fill="none"
                            stroke="url(#movingGradient5)"
                            strokeWidth="1"
                            strokeDasharray="30,20"
                            animate={{
                                strokeDashoffset: [0, -50],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        <motion.path
                            d="M1000,0 L800,150 L600,100 L400,250 L200,200 L0,350"
                            fill="none"
                            stroke="url(#movingGradient6)"
                            strokeWidth="1"
                            strokeDasharray="20,30"
                            animate={{
                                strokeDashoffset: [0, 50],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        <defs>
                            <linearGradient id="movingGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                            <linearGradient id="movingGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                            <linearGradient id="movingGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                            <linearGradient id="movingGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#10B981" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                            <linearGradient id="movingGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                            <linearGradient id="movingGradient6" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#EF4444" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Floating data particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {Array.from({ length: 12 }).map((_, i) => {
                            const randomLeft = (i * 8.33) % 100;
                            const randomDelay = (i % 4) * 2;
                            const randomDuration = 8 + ((i % 3) * 2);

                            return (
                                <motion.div
                                    key={`data-particle-${i}`}
                                    className="absolute w-1 h-1 bg-blue-400/20 dark:bg-blue-500/20 rounded-full"
                                    initial={{
                                        y: '110%',
                                        opacity: 0,
                                    }}
                                    animate={{
                                        y: '-10%',
                                        opacity: [0, 0.6, 0.3, 0],
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

                    {/* Pulsing nodes */}
                    <div className="absolute inset-0">
                        {[
                            { x: 20, y: 30 },
                            { x: 80, y: 20 },
                            { x: 15, y: 70 },
                            { x: 85, y: 80 },
                            { x: 50, y: 40 },
                            { x: 30, y: 90 }
                        ].map((node, i) => (
                            <motion.div
                                key={`node-${i}`}
                                className="absolute w-2 h-2 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full"
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.2, 0.6, 0.2],
                                }}
                                transition={{
                                    duration: 3 + (i * 0.5),
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.8,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Background overlay for better content readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/30 dark:from-gray-900/30 dark:via-gray-900/20 dark:to-gray-900/30 backdrop-blur-sm z-10"></div>
                
                {/* Animated gradient orbs */}
                <motion.div
                    variants={scaleUp(0.8, 1.5, 0.2)}
                    className="absolute right-0 top-10 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-900/20 pointer-events-none"
                />
                <motion.div
                    variants={scaleUp(0.8, 1.8, 0.5)}
                    className="absolute left-0 bottom-10 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-900/20 pointer-events-none"
                />
                <motion.div
                    variants={scaleUp(0.8, 2, 0.8)}
                    className="absolute bottom-0 right-1/4 h-64 w-64 md:h-96 md:w-96 rounded-full bg-cyan-200/15 blur-3xl dark:bg-cyan-900/15 pointer-events-none"
                />

                {/* Tech icons with proper z-index to show above overlay */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 0.2, y: 0 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute top-20 left-2 sm:left-4 md:left-10 z-20"
                >
                    <Brain className="h-24 w-24 text-blue-400/70 dark:text-blue-400/50" />
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 0.2, y: 0 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute top-40 right-4 md:right-20 z-20"
                >
                    <Cloud className="h-20 w-20 text-cyan-400/70 dark:text-cyan-400/50" />
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 0.2, x: 0 }}
                    transition={{ duration: 2, delay: 1.5 }}
                    className="absolute bottom-40 left-4 md:left-20 z-20"
                >
                    <Smartphone className="h-18 w-18 text-purple-400/70 dark:text-purple-400/50" />
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.2, x: 0 }}
                    transition={{ duration: 2, delay: 2 }}
                    className="absolute bottom-20 right-4 md:right-10 z-20"
                >
                    <Lock className="h-16 w-16 text-green-400/70 dark:text-green-400/50" />
                </motion.div>
            </div>

            <div className="container-custom relative z-20 mx-auto h-full px-4 sm:px-6 lg:px-8 max-w-full overflow-x-hidden w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center relative w-full max-w-full overflow-x-hidden">
                    {/* Mobile Header (Shows above the slider on mobile) */}
                    <div className="block lg:hidden w-full mb-4 pt-10">
                        {showLoading ? (
                            <LoadingSkeletons.Text lines={2} className="space-y-3" />
                        ) : !isPageLoading && (
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                                <span className="text-lg mr-2">💻</span>
                                Digital Innovation
                            </div>
                        )}
                    </div>
                    
                    {/* Left Column - Hero Content */}
                    <div className="order-2 lg:order-1 z-10 relative space-y-8">
                        {/* Company Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
                        >
                            <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="text-blue-300 font-medium">I-Varse Technologies</span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl 4xl:text-7xl font-black leading-tight tracking-tight mb-4 relative z-10 fade-in-up"
                                style={{
                                    WebkitFontSmoothing: 'antialiased',
                                    textRendering: 'geometricPrecision',
                                    fontSynthesis: 'none'
                                }}>
                                <span className="gradient-text">{displayTitle.split(" ").slice(0, 2).join(" ")}</span>{" "}
                                {displayTitle.split(" ").slice(2).join(" ")}
                            </h1>
                            
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-6 mb-10 leading-relaxed max-w-2xl animate-fade-in-up" 
                               style={{ 
                                   animationDelay: "0.2s",
                                   WebkitFontSmoothing: 'antialiased',
                                   lineHeight: '1.8'
                               }}>
                            {displaySubtitle}
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 mb-12"
                        >
                            <GradientButton
                                href={primaryBtnUrl}
                                size="lg"
                                endIcon={<ChevronRight />}
                                className="w-auto py-3 animate-snowfall z-10"
                                style={{
                                    WebkitBackfaceVisibility: 'hidden',
                                    transform: 'translateZ(0)'
                                }}
                                target={currentSlide.primaryButton?.openInNewTab ? "_blank" : undefined}
                                rel={currentSlide.primaryButton?.isExternal ? "noopener noreferrer" : undefined}
                            >
                                {primaryBtnText}
                            </GradientButton>
                            
                            {secondaryBtnText && secondaryBtnUrl && (
                                <GradientButton
                                    href={secondaryBtnUrl}
                                    variant="outline"
                                    size="lg"
                                    className="w-auto py-3 5xl:py-4k-4 5xl:px-4k-8 5xl:text-4k-lg z-10"
                                    style={{
                                        WebkitBackfaceVisibility: 'hidden',
                                        transform: 'translateZ(0)'
                                    }}
                                    target={currentSlide.secondaryButton?.openInNewTab ? "_blank" : undefined}
                                    rel={currentSlide.secondaryButton?.isExternal ? "noopener noreferrer" : undefined}
                                >
                                    {secondaryBtnText}
                                </GradientButton>
                            )}
                        </motion.div>

                        {/* Service Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-wrap gap-4 sm:gap-6 lg:grid lg:grid-cols-4 lg:gap-4 5xl:gap-4k-6"
                        >
                            <div className="flex items-center space-x-2 text-blue-300">
                                <Brain className="h-5 w-5" />
                                <span className="text-sm font-medium">AI Cloud</span>
                            </div>
                            <div className="flex items-center space-x-2 text-cyan-300">
                                <Smartphone className="h-5 w-5" />
                                <span className="text-sm font-medium">Mobile Apps</span>
                            </div>
                            <div className="flex items-center space-x-2 text-purple-300">
                                <Building2 className="h-5 w-5" />
                                <span className="text-sm font-medium">ERP Systems</span>
                            </div>
                            <div className="flex items-center space-x-2 text-green-300">
                                <Lock className="h-5 w-5" />
                                <span className="text-sm font-medium">Cybersecurity</span>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <div className="hidden md:flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                            {displaySocialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    className="hover:text-foreground transition-colors cursor-pointer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.platform}
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
                            ))}
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 pt-8 5xl:pt-4k-12 border-t border-gray-700"
                        >
                            <div className="text-center">
                                <div className="text-3xl 5xl:text-4k-4xl font-bold text-white">500+</div>
                                <div className="text-sm 5xl:text-4k-base text-gray-400">Projects Delivered</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl 5xl:text-4k-4xl font-bold text-white">10+</div>
                                <div className="text-sm 5xl:text-4k-base text-gray-400">Industries Served</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl 5xl:text-4k-4xl font-bold text-white">99.9%</div>
                                <div className="text-sm 5xl:text-4k-base text-gray-400">Uptime SLA</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Image Slider */}
                    <div className="order-1 md:order-2">
                        <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl shadow-blue-900/10 dark:shadow-blue-500/10 fade-in-slide w-full max-w-full mx-auto" style={{ contain: 'layout style paint' }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 p-2 sm:p-3">
                                <div className="relative h-full w-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 rounded-lg overflow-hidden">
                                    {/* Overlay for better image visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-white/60 dark:from-gray-900/80 dark:via-transparent dark:to-gray-900/60 z-10"></div>
                                    
                                    {/* Tech background icons with enhanced blur and opacity */}
                                    <CircuitBoard className="absolute top-6 left-6 h-12 w-12 text-blue-300/10 dark:text-blue-700/10 animate-float blur-[1px]" />
                                    <Cpu className="absolute bottom-6 right-6 h-12 w-12 text-indigo-300/10 dark:text-indigo-700/10 animate-float blur-[1px]" style={{animationDelay:"1s"} as React.CSSProperties} />
                                    
                                    {/* Animated network dots with reduced opacity */}
                                    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <circle cx="20" cy="20" r="1" className="text-blue-400 fill-current animate-pulse-light" />
                                        <circle cx="80" cy="30" r="1" className="text-cyan-400 fill-current animate-pulse-light" style={{animationDelay:"0.5s"}} />
                                        <circle cx="50" cy="70" r="1" className="text-indigo-400 fill-current animate-pulse-light" style={{animationDelay:"1s"}} />
                                        <circle cx="30" cy="80" r="1" className="text-purple-400 fill-current animate-pulse-light" style={{animationDelay:"1.5s"}} />
                                        <circle cx="70" cy="60" r="1" className="text-blue-400 fill-current animate-pulse-light" style={{animationDelay:"2s"}} />
                                    </svg>
                                    
                                    {/* Main slider content with 4K optimization */}
                                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-20">
                                        {showLoading ? (
                                            <LoadingSkeletons.Base className="w-full h-full" />
                                        ) : (
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentSlideIndex}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 1.05 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="relative w-full h-full flex items-center justify-center"
                                                >
                                                    {currentSlide.backgroundImage ? (
                                                        <img
                                                            src={currentSlide.backgroundImage}
                                                            alt={currentSlide.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                            loading="lazy"
                                                            style={{
                                                                imageRendering: 'crisp-edges',
                                                                WebkitImageRendering: 'crisp-edges',
                                                                msImageRendering: 'crisp-edges',
                                                                imageResolution: '300dpi'
                                                            } as React.CSSProperties}
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 to-purple-900 rounded-lg">
                                                            <div className="text-center space-y-4">
                                                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                                                                    <IVarseLogo className="w-8 h-8" />
                                                                </div>
                                                                <div className="text-xs text-gray-200 drop-shadow-lg">{currentSlide.subtitle}</div>
                                                                <div className="text-sm font-medium text-gray-300">
                                                                    {currentSlide.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
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

export default ModernHero;