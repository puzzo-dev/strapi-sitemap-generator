import React, { useMemo } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import {
    HeroProps,
    ServiceProps,
    HeroSlide,
    SocialLink,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import GradientButton from "@/components/ui/GradientButton";
import {
    useSiteConfig,
    useServices,
    useSocialLinks,
    useHeroContent
} from "@/hooks/useStrapiContent";
import { services as localServices, socialLinks } from "@/lib/data";
import { fadeInUp, scaleUp } from "@/lib/animations";

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

const ModernHero: React.FC<Partial<HeroProps>> = ({
    currentIndex = 0,
    handleMouseEnter = () => { },
    handleMouseLeave = () => { },
}) => {
    // Fetch dynamic hero content from Strapi
    const { data: heroProps, isLoading: isHeroLoading } = useHeroContent();

    // Fetch site configuration for company logo
    const { data: siteConfig, isLoading: isSiteConfigLoading } = useSiteConfig();

    // Fetch services from Strapi
    const { data: apiServices, isLoading: isServicesLoading } = useServices();

    // Fetch social links
    const { data: socialLinks, isLoading: isSocialLinksLoading } = useSocialLinks();

    // Determine which services to display with fallback to local data
    const services = useMemo(() => {
        return apiServices && apiServices.length > 0 ? apiServices : localServices;
    }, [apiServices]);

    // Extract hero content with fallback values
    const heroContent = useMemo(() => {
        if (!heroProps?.heroContents) {
            return {
                title: "Innovative Digital Solutions for Modern Businesses",
                subtitle:
                    "Elevate your business with our cutting-edge digital solutions.",
                primaryButton: {
                    text: "GET STARTED",
                    url: "/services",
                },
                secondaryButton: {
                    text: "LEARN MORE",
                    url: "/#about",
                },
            } as HeroSlide;
        }

        return heroProps.heroContents;
    }, [heroProps?.heroContents]);

    // Then use heroContent directly without the "?" optional chaining
    const displayTitle = heroContent.title;
    const displaySubtitle = heroContent.subtitle;
    const primaryBtnText = heroContent.primaryButton?.text || "GET STARTED";
    const primaryBtnUrl = heroContent.primaryButton?.url || "/services";
    const secondaryBtnText = heroContent.secondaryButton?.text || "LEARN MORE";
    const secondaryBtnUrl = heroContent.secondaryButton?.url || "/#about";

    // Use isLoading states to determine if we should show loading UI
    const showLoading = isHeroLoading || isSiteConfigLoading;

    // Get company logo from site config
    const companyLogo = siteConfig?.logoLight || "/assets/I-VARSELogo3@3x.png";

    return (
        <>          {/* Tech-inspired background elements - Enhanced with more icons */}
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
                            <CircuitBoard className="h-64 w-64 text-blue-800" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20, rotate: 0 }}
                        animate={{
                            opacity: 0.3,
                            y: 0,
                            rotate: -12,
                            transition: {
                                duration: 0.8,
                                delay: 0.5
                            }
                        }}
                        className="absolute left-10 bottom-10"
                    >
                        <motion.div
                            animate={{
                                y: [0, 10, 0, -15, 0],
                                rotate: [-12, -9, -14, -10, -12],
                                transition: {
                                    repeat: Infinity,
                                    duration: 12,
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
            <section className="flex flex-col md:flex-row container-custom justify-center md:justify-self-end overflow-hidden bg-transparent relative">
                {/* Left side */}
                <div className="flex flex-col justify-center px-3 sm:px-10 md:px-10 py-12 sm:py-10 md:w-1/2 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 dark:from-sidebar-primary/40 dark:via-sidebar-primary dark:to-sidebar-primary/80 border-x border-b relative z-20 rounded-bl-[10%] md:rounded-bl-[15%] drop-shadow-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                        <div className="absolute -right-[10%] top-[10%] h-[30%] w-[30%] rounded-full bg-primary/40 blur-3xl dark:bg-primary/40"></div>
                        <div className="absolute left-0 bottom-1/3 h-[35%] w-[35%] rounded-full bg-secondary/20 blur-3xl dark:bg-secondary/40"></div>

                        {/* Tech pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="1"
                                    className="text-primary fill-current animate-pulse-light"
                                />
                                <circle
                                    cx="80"
                                    cy="30"
                                    r="1"
                                    className="text-accent fill-current animate-pulse-light"
                                    style={{ animationDelay: "0.5s" }}
                                />
                                <circle
                                    cx="50"
                                    cy="70"
                                    r="1"
                                    className="text-secondary fill-current animate-pulse-light"
                                    style={{ animationDelay: "1s" }}
                                />
                                <circle
                                    cx="30"
                                    cy="80"
                                    r="1"
                                    className="text-muted-foreground fill-current animate-pulse-light"
                                    style={{ animationDelay: "1.5s" }}
                                />
                                <circle
                                    cx="70"
                                    cy="60"
                                    r="1"
                                    className="text-primary fill-current animate-pulse-light"
                                    style={{ animationDelay: "2s" }}
                                />

                                <line
                                    x1="20"
                                    y1="20"
                                    x2="80"
                                    y2="30"
                                    className="text-primary stroke-current"
                                    strokeWidth="0.2"
                                />
                                <line
                                    x1="80"
                                    y1="30"
                                    x2="50"
                                    y2="70"
                                    className="text-accent stroke-current"
                                    strokeWidth="0.2"
                                />
                                <line
                                    x1="50"
                                    y1="70"
                                    x2="30"
                                    y2="80"
                                    className="text-secondary stroke-current"
                                    strokeWidth="0.2"
                                />
                                <line
                                    x1="30"
                                    y1="80"
                                    x2="70"
                                    y2="60"
                                    className="text-muted-foreground stroke-current"
                                    strokeWidth="0.2"
                                />
                                <line
                                    x1="70"
                                    y1="60"
                                    x2="20"
                                    y2="20"
                                    className="text-primary stroke-current"
                                    strokeWidth="0.2"
                                />
                            </svg>
                        </div>
                    </div>

                    {showLoading ? (
                        // Loading placeholders
                        <div className="space-y-3">
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse mt-4"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                        </div>
                    ) : (
                        // Your existing content here
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10"
                        >
                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                                <Cpu className="h-4 w-4 mr-2" />
                                Digital Innovation
                            </div>

                            <h1
                                className="text-4xl md:text-5xl font-black leading-tight tracking-tight py-6 mb-4 relative z-10 animate-fade-in-up"
                                style={{ animationDelay: "0.2s" }}
                            >
                                <span className="gradient-text">
                                    {displayTitle.split(" ").slice(0, 2).join(" ")}
                                </span>{" "}
                                {displayTitle.split(" ").slice(2).join(" ")}
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-300 lg:pr-10 mb-8 animate-fade-in-up leading-relaxed">
                                {displaySubtitle}
                            </p>

                            <div className="pt-4 flex flex-wrap gap-4">
                                <GradientButton
                                    href={primaryBtnUrl}
                                    size="lg"
                                    endIcon={<ChevronRight />}
                                    className="w-auto py-3 animate-snowfall z-10"
                                    target={
                                        heroContent.primaryButton?.openInNewTab ? "_blank" : undefined
                                    }
                                    rel={
                                        heroContent.primaryButton?.isExternal
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                >
                                    {primaryBtnText}
                                </GradientButton>

                                {secondaryBtnText && secondaryBtnUrl && (
                                    <GradientButton
                                        variant="outline"
                                        size="lg"
                                        href={secondaryBtnUrl}
                                        className="w-auto py-3 z-10"
                                        target={
                                            heroContent.secondaryButton?.openInNewTab
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            heroContent.secondaryButton?.isExternal
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                    >
                                        {secondaryBtnText}
                                    </GradientButton>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Bottom icons */}
                    <div className="mt-auto flex items-center space-x-2 py-4 sm:space-x-6 text-muted-foreground text-lg sm:text-xl">
                        {isSocialLinksLoading ? (
                            // Loading placeholders for social links
                            <>
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                ))}
                            </>
                        ) : socialLinks && socialLinks.length > 0 ? (
                            // Render actual social links
                            socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
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
                            ))
                        ) : (
                            // Fallback to default social icons if no data
                            <>
                                <a href="#" className="hover:text-foreground transition-colors cursor-pointer">
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
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-foreground transition-colors cursor-pointer">
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
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-foreground transition-colors cursor-pointer">
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
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-foreground transition-colors cursor-pointer">
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
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect x="2" y="9" width="4" height="12"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                </a>
                            </>
                        )}
                    </div>
                </div>
                {/* Right side (Image) */}
                <div className="md:w-1/2 w-full relative flex items-center justify-center bg-muted overflow-hidden border-x border-b z-20 rounded-br-[10%] md:rounded-br-[15%] drop-shadow-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-card dark:from-sidebar dark:via-background dark:to-card opacity-50"></div>

                    {/* Tech-inspired background elements */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.2, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute right-1/4 top-1/4"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 0.98, 1.02, 1],
                                    opacity: [0.2, 0.3, 0.2, 0.25, 0.2],
                                    transition: {
                                        repeat: Infinity,
                                        duration: 5,
                                        ease: "easeInOut",
                                    },
                                }}
                            >
                                <Sparkles className="h-32 w-32 text-accent" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Service Slides Container */}
                    {isServicesLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                        </div>
                    ) : services && services.length > 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                            <div
                                className="relative w-full h-full"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Main image with gradient overlay */}
                                <div className="absolute inset-0 z-10">
                                    {services.map((service, index) => (
                                        <div
                                            key={service.id || index}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                                                }`}
                                        >
                                            <img
                                                src={service.image || ""}
                                                alt={service.title}
                                                className="w-full h-full object-cover opacity-40 dark:opacity-30"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-blue-900/20 dark:from-blue-900/50 dark:to-indigo-900/40"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Company logo */}
                                {companyLogo && (
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-64 opacity-10 dark:opacity-20">
                                        <img
                                            src={companyLogo}
                                            alt="Company Logo"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}

                                {/* Current service overlay content - super tiny in top right */}
                                {services && services.length > 0 && (
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
                                                        {service.icon ? (
                                                            <span className="h-4 w-4 flex items-center justify-center text-white">
                                                                {renderServiceIcon(service.icon)}
                                                            </span>
                                                        ) : (
                                                            <div className="h-4 w-4 bg-current rounded-full"></div>
                                                        )}
                                                    </span>
                                                    <p className="text-xs font-medium text-white whitespace-nowrap">
                                                        {service.title}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Animated tech elements */}
                                <CircuitBoard className="absolute top-6 left-6 h-12 w-12 text-blue-300 dark:text-blue-700 opacity-30 animate-float" />
                                <Cpu
                                    className="absolute bottom-6 right-6 h-12 w-12 text-indigo-300 dark:text-indigo-700 opacity-30 animate-float"
                                    style={{ animationDelay: "1s" }}
                                />
                            </div>
                        </div>
                    ) : null}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20 pointer-events-none"></div>
                </div>
            </section>
        </>
    );
};

export default ModernHero;