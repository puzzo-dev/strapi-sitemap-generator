import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdSlide, DynamicAdsProps, AdConfiguration } from '@/lib/types/ads';
import { adManager } from '@/lib/services/adManager';

const defaultConfig: AdConfiguration = {
    autoSlideInterval: 4000,
    showNavigation: true,
    showIndicators: true,
    maxAds: 5
};

const DynamicAdCarousel: React.FC<DynamicAdsProps> = ({
    ads,
    config = {},
    onAdClick,
    onAdView
}) => {
    const finalConfig = { ...defaultConfig, ...config };
    const [currentSlide, setCurrentSlide] = useState(0);
    const [displayAds, setDisplayAds] = useState<AdSlide[]>([]);

    // Process ads based on configuration
    useEffect(() => {
        let processedAds = ads;

        // Limit number of ads
        if (finalConfig.maxAds && processedAds.length > finalConfig.maxAds) {
            processedAds = processedAds
                .sort((a, b) => (a.priority || 999) - (b.priority || 999))
                .slice(0, finalConfig.maxAds);
        }

        setDisplayAds(processedAds);

        // Reset current slide if it's out of bounds
        if (currentSlide >= processedAds.length && processedAds.length > 0) {
            setCurrentSlide(0);
        }
    }, [ads, finalConfig.maxAds, currentSlide]);

    // Auto-slide functionality
    useEffect(() => {
        if (displayAds.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % displayAds.length);
        }, finalConfig.autoSlideInterval);

        return () => clearInterval(timer);
    }, [displayAds.length, finalConfig.autoSlideInterval]);

    // Track ad views
    useEffect(() => {
        if (displayAds[currentSlide]) {
            const currentAd = displayAds[currentSlide];
            onAdView?.(currentAd);
            adManager.trackAdView(currentAd);
        }
    }, [currentSlide, displayAds, onAdView]);

    // Navigation functions
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % displayAds.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + displayAds.length) % displayAds.length);
    };

    const handleAdClick = (ad: AdSlide) => {
        onAdClick?.(ad);
        adManager.trackAdClick(ad);

        // Navigate to URL if provided
        if (ad.ctaUrl) {
            window.open(ad.ctaUrl, '_blank');
        }
    };

    if (!displayAds.length) {
        return null;
    }

    const currentAd = displayAds[currentSlide];

    return (
        <Card className="shadow-md overflow-hidden border-2 border-blue-200 dark:border-blue-700">
            <CardContent className="p-0">
                {/* Sliding Banner */}
                <div className="relative h-40 overflow-hidden">
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${currentAd.bgColor} transition-all duration-500 ease-in-out cursor-pointer`}
                        onClick={() => handleAdClick(currentAd)}
                    >
                        {/* Background Image if provided */}
                        {currentAd.image && (
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-20"
                                style={{ backgroundImage: `url(${currentAd.image})` }}
                            />
                        )}

                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 border border-white rounded-full"></div>
                            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-4 h-full flex flex-col justify-center text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <currentAd.icon className="h-6 w-6" />
                                <h3 className="font-bold text-lg">{currentAd.title}</h3>
                            </div>
                            <p className="text-sm font-medium mb-1">{currentAd.subtitle}</p>
                            <p className="text-xs opacity-90">{currentAd.description}</p>
                        </div>

                        {/* Navigation Arrows */}
                        {finalConfig.showNavigation && displayAds.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevSlide();
                                    }}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    <ChevronLeft className="h-3 w-3 text-white" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextSlide();
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    <ChevronRight className="h-3 w-3 text-white" />
                                </button>
                            </>
                        )}

                        {/* Slide Indicators */}
                        {finalConfig.showIndicators && displayAds.length > 1 && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {displayAds.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentSlide(index);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-2">
                            I-Varse Technologies
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                            Transform your business with cutting-edge solutions
                        </p>
                    </div>

                    <Button
                        onClick={() => handleAdClick(currentAd)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {currentAd.cta}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default DynamicAdCarousel;
