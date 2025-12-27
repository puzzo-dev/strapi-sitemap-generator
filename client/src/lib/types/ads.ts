import { LucideIcon } from 'lucide-react';

export interface AdSlide {
    id: string | number;
    title: string;
    subtitle: string;
    description: string;
    bgColor: string;
    icon: LucideIcon;
    cta: string;
    ctaUrl?: string;
    image?: string;
    priority?: number;
    startDate?: Date;
    endDate?: Date;
    targetAudience?: string[];
    clickTrackingId?: string;
}

export interface AdConfiguration {
    autoSlideInterval: number; // milliseconds
    showNavigation: boolean;
    showIndicators: boolean;
    maxAds?: number;
}

export interface DynamicAdsProps {
    ads: AdSlide[];
    config?: Partial<AdConfiguration>;
    onAdClick?: (ad: AdSlide) => void;
    onAdView?: (ad: AdSlide) => void;
}

export interface UseAdsOptions {
    position?: string;
    targetAudience?: string[];
    maxAds?: number;
    enabled?: boolean;
}
