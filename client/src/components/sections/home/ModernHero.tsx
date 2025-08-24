import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Sparkles,
    CircuitBoard,
    Cpu,
    Smartphone,
    Cloud,
    Brain,
    Lock,
    Building2,
} from "lucide-react";
import { ModernHeroProps } from '@/lib/types/components';
import GradientButton from "@/components/ui/GradientButton";
import { services as localServices, heroSlides as localHeroSlides, heroStats, heroFeatures } from "@/lib/data/";
import {
    scaleUp,
} from '@/lib/animations';
import IVarseLogo from "@/components/ui/IVarseLogo";
import { cn } from '@/lib/utils';
import { LoadingSkeletons } from '@/components/ui/LoadingSkeleton';
import { getThemeColors } from '@/lib/utils/theme-helpers';
// Helper function to get social icon paths
const getSocialIconPath = (platform: string): string => {
    const lowerPlatform = platform.toLowerCase();

    switch (lowerPlatform) {
        case 'facebook':
            return "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z";
        case 'twitter':
            return "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z";
        case 'instagram':
            return "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z";
        case 'linkedin':
            return "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z";
        case 'youtube':
            return "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z";
        default:
            return "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z";
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
    stats: propStats,
    features: propFeatures,
}) => {
    const [isPaused, setIsPaused] = useState(false);

    // Use props instead of hooks
    const isHeroLoading = false; // No longer loading from hook
    const isSiteConfigLoading = false; // No longer loading from hook

    // Use props data with fallbacks
    const apiServices = propServices;
    const socialLinks = propSocialLinks;
    const heroSlides = propHeroSlides || localHeroSlides;
    const stats = propStats || heroStats;
    const features = propFeatures || heroFeatures;

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
        <section
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
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400/20 dark:text-blue-500/20" />
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

                {/* Animated gradient orbs - Mobile optimized */}
                <motion.div
                    variants={scaleUp(0.8, 1.5, 0.2)}
                    className="absolute -right-16 top-10 h-32 w-32 md:h-64 md:w-64 md:right-0 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-900/20 pointer-events-none"
                />
                <motion.div
                    variants={scaleUp(0.8, 1.8, 0.5)}
                    className="absolute -left-16 bottom-10 h-36 w-36 md:h-72 md:w-72 md:left-0 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-900/20 pointer-events-none"
                />
                <motion.div
                    variants={scaleUp(0.8, 2, 0.8)}
                    className="absolute bottom-0 right-1/4 h-32 w-32 md:h-64 md:w-64 lg:h-96 lg:w-96 rounded-full bg-cyan-200/15 blur-3xl dark:bg-cyan-900/15 pointer-events-none"
                />

                {/* Tech icons with proper z-index to show above overlay - Mobile optimized */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 0.2, y: 0 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute top-20 left-2 sm:left-4 md:left-10 z-20"
                >
                    <Brain className="h-16 w-16 md:h-24 md:w-24 text-blue-400/70 dark:text-blue-400/50" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 0.2, y: 0 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute top-40 right-2 sm:right-4 md:right-20 z-20"
                >
                    <Cloud className="h-14 w-14 md:h-20 md:w-20 text-cyan-400/70 dark:text-cyan-400/50" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 0.2, y: 0 }}
                    transition={{ duration: 2, delay: 1.5 }}
                    className="absolute bottom-40 left-2 sm:left-4 md:left-20 z-20"
                >
                    <Smartphone className="h-14 w-14 md:h-18 md:w-18 text-purple-400/70 dark:text-purple-400/50" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 0.2, y: 0 }}
                    transition={{ duration: 2, delay: 2 }}
                    className="absolute bottom-20 right-2 sm:right-4 md:right-10 z-20"
                >
                    <Lock className="h-12 w-12 md:h-16 md:w-16 text-green-400/70 dark:text-green-400/50" />
                </motion.div>
            </div>

            <div className="relative z-20 mx-auto h-full px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center relative w-full max-w-full overflow-hidden">
                    {/* Mobile Header (Shows above the slider on mobile) */}
                    <div className="block lg:hidden w-full mb-4 pt-10">
                        {showLoading && (
                            <LoadingSkeletons.Text lines={2} className="space-y-3" />
                        )}
                    </div>

                    {/* Left Column - Hero Content */}
                    <div className="order-2 lg:order-1 z-10 relative space-y-8">
                        {/* Company Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
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

                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-6 mb-10 leading-relaxed max-w-2xl animate-fade-in-up">
                                {displaySubtitle}
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-row justify-start items-start sm:items-center gap-4 mb-12 py-4"
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

                        {/* Service Highlights - Dynamic */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 5xl:gap-4k-6 md:justify-start justify-center"
                        >
                            {features.map((feature, index) => {
                                const IconComponent = {
                                    Brain,
                                    Smartphone,
                                    Building2,
                                    Lock,
                                    Cloud,
                                    Cpu,
                                    CircuitBoard
                                }[feature.icon] || Brain;
                                
                                const colors = [
                                    "text-blue-300",
                                    "text-cyan-300", 
                                    "text-purple-300",
                                    "text-green-300"
                                ];
                                
                                return (
                                    <div key={index} className={`flex items-center space-x-2 ${colors[index % colors.length]}`}>
                                        <IconComponent className="h-5 w-5" />
                                        <span className="text-sm font-medium">{feature.label}</span>
                                    </div>
                                );
                            })}
                        </motion.div>


                        {/* Stats - Dynamic */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex md:justify-start gap-6 sm:gap-8 lg:gap-12 pt-8 5xl:pt-4k-12 border-t border-gray-700 py-8"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl 5xl:text-4k-4xl font-bold text-primary dark:text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm 5xl:text-4k-base dark:text-gray-200 text-gray-500">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column - Image Slider */}
                    <div className="order-1 md:order-2">
                        <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl shadow-blue-900/10 dark:shadow-blue-500/10 fade-in-slide w-full max-w-full mx-auto" onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Company Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="md:hidden inline-flex items-center px-4 py-2 my-6 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
                            >
                                <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
                                <span className="text-blue-300 font-medium">I-Varse Technologies</span>
                            </motion.div>
                            <div className="w-full h-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 p-2 sm:p-3">
                                <div className="relative h-full w-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 rounded-lg overflow-hidden">
                                    {/* Overlay for better image visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-white/60 dark:from-gray-900/80 dark:via-transparent dark:to-gray-900/60 z-10"></div>

                                    {/* Tech background icons with enhanced blur and opacity */}
                                    <CircuitBoard className="absolute top-6 left-6 h-12 w-12 text-blue-300/10 dark:text-blue-700/10 animate-float blur-[1px]" />
                                    <Cpu className="absolute bottom-6 right-6 h-12 w-12 text-indigo-300/10 dark:text-indigo-700/10 animate-float blur-[1px]" style={{ animationDelay: "1s" } as React.CSSProperties} />

                                    {/* Animated network dots with reduced opacity */}
                                    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <circle cx="20" cy="20" r="1" className="text-blue-400 fill-current animate-pulse-light" />
                                        <circle cx="80" cy="30" r="1" className="text-cyan-400 fill-current animate-pulse-light" style={{ animationDelay: "0.5s" }} />
                                        <circle cx="50" cy="70" r="1" className="text-indigo-400 fill-current animate-pulse-light" style={{ animationDelay: "1s" }} />
                                        <circle cx="30" cy="80" r="1" className="text-purple-400 fill-current animate-pulse-light" style={{ animationDelay: "1.5s" }} />
                                        <circle cx="70" cy="60" r="1" className="text-blue-400 fill-current animate-pulse-light" style={{ animationDelay: "2s" }} />
                                    </svg>

                                    {/* Main slider content - Stable opacity-only transitions */}
                                    <div className="absolute inset-0 overflow-hidden z-20">
                                        {showLoading ? (
                                            <LoadingSkeletons.Base className="w-full h-full" />
                                        ) : (
                                            <>
                                                {/* Image slides with stable opacity transitions - no scale/transform */}
                                                {heroSlides.map((slide, index) => (
                                                    <div
                                                        key={slide.id || index}
                                                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                                            index === currentSlideIndex ? "opacity-100" : "opacity-0"
                                                        }`}
                                                    >
                                                        {slide.backgroundImage ? (
                                                            <img
                                                                src={slide.backgroundImage}
                                                                alt={slide.title}
                                                                className="w-full h-full object-cover"
                                                                loading="lazy"
                                                                // style={{
                                                                //     imageRendering: 'crisp-edges',
                                                                //     WebkitImageRendering: 'crisp-edges',
                                                                //     msImageRendering: 'crisp-edges'
                                                                // } as React.CSSProperties}
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg">
                                                                <div className="text-center space-y-4">
                                                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                                                                        <IVarseLogo className="w-8 h-8" />
                                                                    </div>
                                                                    <div className="text-xs text-gray-200 drop-shadow-lg">{slide.subtitle}</div>
                                                                    <div className="text-sm font-medium text-gray-300">
                                                                        {slide.title}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Social Links under hero slider image */}
                        <div className="flex justify-center md:justify-end items-center space-x-6 mt-6 text-gray-500 dark:text-gray-400">
                            {displaySocialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModernHero;