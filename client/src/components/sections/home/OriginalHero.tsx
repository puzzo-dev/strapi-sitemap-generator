import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import GradientButton from "@/components/ui/GradientButton";
import { ServiceProps, OriginalHeroProps, PageSection } from "@/lib/types";
import { fadeInUp, scaleUp } from "@/lib/animations";
import { useLanguage } from "@/components/context/LanguageContext";
import {
    ChevronRight,
    Cpu,
    CircuitBoard,
    Code,
    LayoutGrid,
    Sparkles,
} from "lucide-react";
import { useDynamicHeroContent, useSiteConfig, useServices } from "@/hooks/useStrapiContent";
import { services as localServices, heroSlides as localHeroSlides } from "@/lib/data";

const OriginalHero: React.FC<Partial<OriginalHeroProps>> = ({
    currentIndex = 0,
    isPageLoading = false,
    handleMouseEnter = () => { },
    handleMouseLeave = () => { },
    heroContents: propHeroContents,
}) => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();

    // State for managing hero slide index
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Update the hook to properly get hero content
    const { data: apiHeroContents, isLoading: isHeroLoading } = useDynamicHeroContent();

    // Fetch site configuration for company logo
    const { data: siteConfig, isLoading: isSiteConfigLoading } = useSiteConfig();

    // Fetch services from Strapi
    const { data: apiServices, isLoading: isServicesLoading } = useServices();

    // Determine which services to display with fallback to local data
    const services = useMemo(() => {
        return apiServices && apiServices.length > 0 ? apiServices : localServices;
    }, [apiServices]);

    // Determine which hero slides to use with fallback to local data
    const heroContents = useMemo(() => {
        // First check if heroContents were passed as props
        if (propHeroContents && propHeroContents.length > 0) {
            return propHeroContents;
        }
        // Then check if we got them from the API
        return apiHeroContents && apiHeroContents.heroContents.length > 0 ? apiHeroContents : localHeroSlides;
    }, [apiHeroContents, propHeroContents]);

    // Set up auto-rotation for hero slides
    useEffect(() => {
        if (!heroContents || !Array.isArray(heroContents) || heroContents.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroContents.length);
        }, 7000); // Change slide every 7 seconds

        return () => clearInterval(interval);
    }, [heroContents, isPaused]);

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

    // Fix how we extract the current hero content
    const heroContent = Array.isArray(heroContents) ? heroContents[currentHeroIndex] || {} : {};

    // Use heroContent for title and subtitle
    const displayTitle = heroContent.title || 'Innovative Digital Solutions for Modern Businesses';
    const displaySubtitle = heroContent.subtitle || 'Elevate your business with our cutting-edge digital solutions.';

    // Get button info from heroContent
    const primaryBtnText = heroContent.primaryButton?.text || 'GET STARTED';
    const primaryBtnUrl = heroContent.primaryButton?.url || '/services';
    const secondaryBtnText = heroContent.secondaryButton?.text || 'LEARN MORE';
    const secondaryBtnUrl = heroContent.secondaryButton?.url || '/#about';

    // Use isPageLoading or isHeroLoading as fallback for isLoading
    const showLoading = isPageLoading || isHeroLoading || isSiteConfigLoading;

    // Get company logo from site config
    const companyLogo = siteConfig?.logoLight || '/assets/I-VARSELogo3@3x.png';
    // Extract data from heroContents if available
    return (
        <motion.section
            initial="initial"
            animate="animate"
            className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-12 md:pt-18 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section"
        >
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

                {/* Rest of the background elements remain unchanged */}
                {/* ... */}
            </div>

            <div className="container-custom relative z-20 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative">
                    {/* Mobile Header (Shows above the slider on mobile) */}
                    <div className="block lg:hidden w-full mb-4">
                        {showLoading ? (
                            <div className="space-y-3">
                                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                            </div>
                        ) : (
                            <>
                                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                                    <Cpu className="h-4 w-4 mr-2" />
                                    Digital Innovation
                                </div>
                                <h1
                                    className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 relative z-10 animate-fade-in-up"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    <span className="gradient-text">{displayTitle.split(' ').slice(0, 2).join(' ')}</span>{" "}
                                    {displayTitle.split(' ').slice(2).join(' ')}
                                </h1>
                            </>
                        )}
                    </div>

                    {/* Left column - Content (Shows second on mobile, first on desktop) */}
                    <div className="order-2 lg:order-1 z-10 relative">
                        <div className="space-y-6 md:space-y-8">
                            {/* Desktop-only heading - hidden on mobile */}
                            <div className="hidden lg:block">
                                {showLoading ? (
                                    <div className="space-y-3">
                                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                                            <Cpu className="h-4 w-4 mr-2" />
                                            Digital Innovation
                                        </div>
                                        <h1
                                            className="heading-xl text-5xl md:text-6xl font-black mb-6 animate-fade-in-up"
                                            style={{ animationDelay: "0.2s" }}
                                        >
                                            <span className="gradient-text">{displayTitle.split(' ').slice(0, 2).join(' ')}</span>{" "}
                                            {displayTitle.split(' ').slice(2).join(' ')}
                                        </h1>
                                    </>
                                )}
                            </div>

                            {/* Always visible subtitle */}
                            {showLoading ? (
                                <div className="space-y-3">
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                                </div>
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
                                >
                                    {primaryBtnText}
                                </GradientButton>
                                <GradientButton
                                    href={secondaryBtnUrl}
                                    variant="outline"
                                    size="lg"
                                    className="w-auto py-3 z-10"
                                >
                                    {secondaryBtnText}
                                </GradientButton>
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

                                    {/* Service Slides Container - Original Design */}
                                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                        {isServicesLoading ? (
                                            // Loading state
                                            <div className="flex items-center justify-center h-full">
                                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-full">
                                                {/* Main image with gradient overlay */}
                                                <div className="absolute inset-0 z-10">
                                                    {services.map((service, index) => (
                                                        <div
                                                            key={service.id || index}
                                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                                }`}
                                                        >
                                                            <img
                                                                src={(service.image || '')}
                                                                alt={service.title}
                                                                className="w-full h-full object-cover opacity-40 dark:opacity-30"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-blue-900/20 dark:from-blue-900/50 dark:to-indigo-900/40"></div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Company logo */}
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10 dark:opacity-20">
                                                    <img
                                                        src={companyLogo}
                                                        alt="I-VARSE Technologies"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                {/* Current service overlay content - super tiny in top right */}
                                                <div className="absolute top-0 right-0 z-20 py-0.5 px-1 bg-black/30 backdrop-blur-sm rounded-bl-md inline-flex items-center">
                                                    {services.map((service, index) => (
                                                        <div
                                                            key={service.id || index}
                                                            className={`transition-opacity duration-500 flex items-center ${index === currentIndex
                                                                ? "opacity-100"
                                                                : "opacity-0 absolute inset-0"
                                                                }`}
                                                        >
                                                            <div className="flex items-center">
                                                                <span className="flex items-center justify-center mr-1.5">
                                                                    <div className="h-4 w-4 bg-current rounded-full"></div>
                                                                </span>
                                                                <h3 className="text-[11px] font-medium text-white whitespace-nowrap">
                                                                    {service.title}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    ))}
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

                    {/* Mobile-only content - Shows third on mobile, after the slideshow */}
                    <div className="w-full block md:hidden lg:hidden order-3 mt-16 mb-12 space-y-8 mobile-space-y staggered-fade-in">
                        {isPageLoading ? (
                            <div className="space-y-3">
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                            </div>
                        ) : (
                            <p
                                className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up"
                                style={{ animationDelay: "0.4s" }}
                            >
                                {displaySubtitle}
                            </p>
                        )}

                        <div className="pt-6 flex flex-col gap-5 w-full">
                            <GradientButton
                                href={primaryBtnUrl}
                                size="lg"
                                endIcon={<ChevronRight />}
                                className="w-full py-5 justify-center animate-snowfall text-lg"
                                fullWidth
                            >
                                {primaryBtnText}
                            </GradientButton>
                            <GradientButton
                                href={secondaryBtnUrl}
                                variant="outline"
                                size="lg"
                                className="w-full py-5 justify-center text-lg"
                                fullWidth
                            >
                                {secondaryBtnText}
                            </GradientButton>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default OriginalHero;