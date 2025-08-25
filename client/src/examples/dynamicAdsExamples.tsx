// Dynamic Ads Examples for Blog Sidebar

import { Star, Zap, Shield, Cloud, Database, Smartphone, Globe, Lock, Cpu, BarChart3 } from 'lucide-react';
import { AdSlide } from '@/lib/types/ads';

export const sampleAdSlides: AdSlide[] = [
    {
        id: 'erp-001',
        title: "ERP Solutions",
        subtitle: "Streamline Your Operations",
        description: "Complete business management with ERPNext",
        bgColor: "from-blue-600 to-blue-800",
        icon: Star,
        cta: "Learn More",
        ctaUrl: "/services/erp-solutions",
        priority: 1,
        targetAudience: ['business-owners', 'managers'],
        clickTrackingId: 'sidebar-erp-banner'
    },
    {
        id: 'cloud-002',
        title: "Cloud Services",
        subtitle: "Scale with Confidence",
        description: "Secure, reliable cloud infrastructure",
        bgColor: "from-green-600 to-green-800",
        icon: Cloud,
        cta: "Get Started",
        ctaUrl: "/services/cloud-services",
        priority: 2,
        targetAudience: ['developers', 'startups'],
        clickTrackingId: 'sidebar-cloud-banner'
    },
    {
        id: 'custom-003',
        title: "Custom Development",
        subtitle: "Built for Your Business",
        description: "Tailored software solutions",
        bgColor: "from-purple-600 to-purple-800",
        icon: Zap,
        cta: "Request Quote",
        ctaUrl: "/contact?service=custom-development",
        priority: 3,
        targetAudience: ['business-owners', 'product-managers'],
        clickTrackingId: 'sidebar-custom-banner'
    },
    {
        id: 'security-004',
        title: "Cybersecurity",
        subtitle: "Protect Your Assets",
        description: "Advanced security solutions",
        bgColor: "from-red-600 to-red-800",
        icon: Shield,
        cta: "Secure Now",
        ctaUrl: "/services/cybersecurity",
        priority: 4,
        targetAudience: ['security-managers', 'it-professionals'],
        clickTrackingId: 'sidebar-security-banner'
    },
    {
        id: 'mobile-005',
        title: "Mobile Apps",
        subtitle: "Reach More Customers",
        description: "iOS & Android development",
        bgColor: "from-indigo-600 to-indigo-800",
        icon: Smartphone,
        cta: "Build App",
        ctaUrl: "/services/mobile-development",
        priority: 5,
        targetAudience: ['entrepreneurs', 'marketers'],
        clickTrackingId: 'sidebar-mobile-banner'
    }
];

// Seasonal/Campaign-specific ads
export const campaignAds: AdSlide[] = [
    {
        id: 'holiday-2024',
        title: "Year-End Special",
        subtitle: "50% Off Consultation",
        description: "Limited time offer until Dec 31st",
        bgColor: "from-orange-600 to-red-600",
        icon: Star,
        cta: "Claim Offer",
        ctaUrl: "/contact?promo=year-end-2024",
        priority: 1,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-31'),
        clickTrackingId: 'sidebar-holiday-promo'
    }
];

// Industry-specific ads
export const industrySpecificAds: Record<string, AdSlide[]> = {
    healthcare: [
        {
            id: 'healthcare-001',
            title: "Healthcare IT",
            subtitle: "HIPAA Compliant Solutions",
            description: "Secure patient management systems",
            bgColor: "from-teal-600 to-teal-800",
            icon: Shield,
            cta: "Learn More",
            ctaUrl: "/industries/healthcare",
            clickTrackingId: 'sidebar-healthcare-banner'
        }
    ],
    fintech: [
        {
            id: 'fintech-001',
            title: "FinTech Solutions",
            subtitle: "Secure Financial Apps",
            description: "Banking & payment platforms",
            bgColor: "from-emerald-600 to-emerald-800",
            icon: Lock,
            cta: "Explore",
            ctaUrl: "/industries/fintech",
            clickTrackingId: 'sidebar-fintech-banner'
        }
    ]
};

// Location-specific ads
export const locationSpecificAds: Record<string, AdSlide[]> = {
    nigeria: [
        {
            id: 'nigeria-001',
            title: "Nigeria Digital",
            subtitle: "Leading Tech Innovation",
            description: "Empowering Nigerian businesses",
            bgColor: "from-green-700 to-green-900",
            icon: Globe,
            cta: "Join Us",
            ctaUrl: "/about?region=nigeria",
            clickTrackingId: 'sidebar-nigeria-banner'
        }
    ]
};

// Performance-based ads (based on user behavior)
export const performanceAds: AdSlide[] = [
    {
        id: 'high-converting-001',
        title: "Popular Choice",
        subtitle: "Most Requested Service",
        description: "Join 500+ satisfied clients",
        bgColor: "from-amber-600 to-amber-800",
        icon: BarChart3,
        cta: "See Why",
        ctaUrl: "/case-studies",
        priority: 1,
        clickTrackingId: 'sidebar-popular-service'
    }
];

export default {
    sampleAdSlides,
    campaignAds,
    industrySpecificAds,
    locationSpecificAds,
    performanceAds
};
