import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, CircuitBoard, Cpu } from 'lucide-react';
import { ModernHeroProps } from '@/lib/types';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/GradientButton';
import { ServiceProps } from '@/lib/types';

const ModernHero: React.FC<ModernHeroProps> = ({
    title = 'Top rated web dev company',
    subtitle = 'based in',
    location = 'Lagos, Nigeria',
    primaryButtonText = 'GET STARTED',
    primaryButtonUrl = '/services',
    secondaryButtonText,
    secondaryButtonUrl,
    isLoading = false,
    serviceSlides = [],
    serviceImages = [],
    serviceIcons = [],
    currentSlide = 0,
    companyLogo,
}) => {
    return (
        <section className="flex flex-col md:flex-row max-w-[85rem] justify-center md:justify-self-end overflow-hidden bg-transparent relative">
            {/* Left side */}
            <div className="flex flex-col justify-center px-3 sm:px-10 md:px-10 py-5 sm:py-10 md:w-1/2 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 dark:from-sidebar-primary/40 dark:via-sidebar-primary dark:to-sidebar-primary/80 border-x border-b relative z-20 rounded-bl-[10%] md:rounded-bl-[15%] drop-shadow-xl shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute -right-[10%] top-[10%] h-[30%] w-[30%] rounded-full bg-primary/40 blur-3xl dark:bg-primary/40"></div>
                    <div className="absolute left-0 bottom-1/3 h-[35%] w-[35%] rounded-full bg-secondary/20 blur-3xl dark:bg-secondary/40"></div>

                    {/* Tech pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="20" cy="20" r="1" className="text-primary fill-current animate-pulse-light" />
                            <circle cx="80" cy="30" r="1" className="text-accent fill-current animate-pulse-light" style={{ animationDelay: '0.5s' }} />
                            <circle cx="50" cy="70" r="1" className="text-secondary fill-current animate-pulse-light" style={{ animationDelay: '1s' }} />
                            <circle cx="30" cy="80" r="1" className="text-muted-foreground fill-current animate-pulse-light" style={{ animationDelay: '1.5s' }} />
                            <circle cx="70" cy="60" r="1" className="text-primary fill-current animate-pulse-light" style={{ animationDelay: '2s' }} />

                            <line x1="20" y1="20" x2="80" y2="30" className="text-primary stroke-current" strokeWidth="0.2" />
                            <line x1="80" y1="30" x2="50" y2="70" className="text-accent stroke-current" strokeWidth="0.2" />
                            <line x1="50" y1="70" x2="30" y2="80" className="text-secondary stroke-current" strokeWidth="0.2" />
                            <line x1="30" y1="80" x2="70" y2="60" className="text-muted-foreground stroke-current" strokeWidth="0.2" />
                            <line x1="70" y1="60" x2="20" y2="20" className="text-primary stroke-current" strokeWidth="0.2" />
                        </svg>
                    </div>
                </div>

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

                    <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <span className="gradient-text">
                            {title.split(' ').slice(0, 2).join(' ')}
                        </span>{' '}
                        {title.split(' ').slice(2).join(' ')}
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 lg:pr-10 mb-8 animate-fade-in-up leading-relaxed">
                        {subtitle}{' '}
                        {/* <span className="font-bold">{location}</span> */}
                    </p>

                    <div className="pt-4 flex flex-wrap gap-4">
                        <GradientButton
                            href={primaryButtonUrl}
                            size="lg"
                            endIcon={<ChevronRight />}
                            className="w-auto py-3 animate-snowfall z-10"
                        >
                            {primaryButtonText}
                        </GradientButton>

                        {secondaryButtonText && secondaryButtonUrl && (
                            <GradientButton
                                variant="outline"
                                size="lg"
                                href={secondaryButtonUrl}
                                className="w-auto py-3 z-10"
                            >
                                {secondaryButtonText}
                            </GradientButton>
                        )}
                    </div>
                </motion.div>

                {/* Bottom icons */}
                <div className="mt-auto flex items-center space-x-2 py-4 sm:space-x-6 text-muted-foreground text-lg sm:text-xl">
                    <a href="#" className="hover:text-foreground transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                </div>
            </div>

            {/* Right side (Image) */}
            <div className="md:w-1/2 w-full relative flex items-center justify-center bg-muted overflow-hidden">
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
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <Sparkles className="h-32 w-32 text-accent" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Service Slides Container */}
                {serviceImages && serviceImages.length > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <div className="relative w-full h-full">
                            {/* Main image with gradient overlay */}
                            <div className="absolute inset-0 z-10">
                                {serviceImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        <img
                                            src={image}
                                            alt={serviceSlides[index % serviceSlides.length]?.title || `Service ${index + 1}`}
                                            className="w-full h-full object-cover opacity-40 dark:opacity-30"
                                            style={{ aspectRatio: '4/3' }}
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
                            {serviceSlides && serviceSlides.length > 0 && serviceIcons && serviceIcons.length > 0 && (
                                <div className="absolute top-0 right-0 z-20 py-0.5 px-1 bg-black/30 backdrop-blur-sm rounded-bl-md inline-flex items-center">
                                    {serviceSlides.map((service, index) => (
                                        <div
                                            key={service.id || index}
                                            className={`transition-opacity duration-500 flex items-center ${index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                                        >
                                            <div className="flex items-center">
                                                <span className="flex items-center justify-center mr-1.5">{serviceIcons[index % serviceIcons.length]}</span>
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
                            <Cpu className="absolute bottom-6 right-6 h-12 w-12 text-indigo-300 dark:text-indigo-700 opacity-30 animate-float" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20 pointer-events-none"></div>
            </div>
        </section>
    );
};

export default ModernHero;
