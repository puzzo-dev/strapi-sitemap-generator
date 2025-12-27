import { Star, Zap, Shield, Cloud, Database, Smartphone, Globe, Lock, Cpu, BarChart3 } from 'lucide-react';
import { AdSlide } from '@/lib/types/ads';

// Create placeholder image data URLs for development
const createPlaceholderImage = (text: string, bgColor: string = '#3B82F6'): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    if (ctx) {
        // Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 400, 200);

        // Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, 200, 110);
    }

    return canvas.toDataURL('image/jpeg', 0.8);
};

// Fallback placeholder images (can be replaced with actual images)
const placeholderImages = {
    erp: "data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%233B82F6'/%3E%3Ctext x='200' y='110' text-anchor='middle' fill='white' font-size='24' font-weight='bold'%3EERP Dashboard%3C/text%3E%3C/svg%3E",
    cloud: "data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%2316A34A'/%3E%3Ctext x='200' y='110' text-anchor='middle' fill='white' font-size='24' font-weight='bold'%3ECloud Services%3C/text%3E%3C/svg%3E",
    development: "data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%239333EA'/%3E%3Ctext x='200' y='110' text-anchor='middle' fill='white' font-size='20' font-weight='bold'%3ECustom Development%3C/text%3E%3C/svg%3E",
    promo: "data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%23EA580C'/%3E%3Ctext x='200' y='110' text-anchor='middle' fill='white' font-size='24' font-weight='bold'%3ESpecial Offer%3C/text%3E%3C/svg%3E",
    healthcare: "data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%230D9488'/%3E%3Ctext x='200' y='110' text-anchor='middle' fill='white' font-size='24' font-weight='bold'%3EHealthcare IT%3C/text%3E%3C/svg%3E",
    fintech: "data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%23059669'/%3E%3Ctext x='200' y='110' text-anchor='middle' fill='white' font-size='24' font-weight='bold'%3EFinTech Solutions%3C/text%3E%3C/svg%3E",
    metrics: "data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%23D97706'/%3E%3Ctext x='200' y='110' text-anchor='middle' fill='white' font-size='24' font-weight='bold'%3ESuccess Metrics%3C/text%3E%3C/svg%3E"
};

// Default blog sidebar ads
export const blogSidebarAds: AdSlide[] = [
    {
        id: 'erp-001',
        title: "ERP Solutions",
        subtitle: "Streamline Your Operations",
        description: "Complete business management with ERPNext",
        bgColor: "from-blue-600 to-blue-800",
        icon: Star,
        image: placeholderImages.erp,
        cta: "Learn More",
        ctaUrl: "/services/custom-erp-solutions",
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
        icon: Shield,
        image: placeholderImages.cloud,
        cta: "Get Started",
        ctaUrl: "/services/cloud-infrastructure-management",
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
        image: placeholderImages.development,
        cta: "Request Quote",
        ctaUrl: "/contact?service=custom-development",
        priority: 3,
        targetAudience: ['business-owners', 'product-managers'],
        clickTrackingId: 'sidebar-custom-banner'
    }
];

// Campaign ads (time-sensitive)
export const campaignAds: AdSlide[] = [
    {
        id: 'holiday-2024',
        title: "Year-End Special",
        subtitle: "50% Off Consultation",
        description: "Limited time offer until Dec 31st",
        bgColor: "from-orange-600 to-red-600",
        icon: Star,
        image: placeholderImages.promo,
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
            image: placeholderImages.healthcare,
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
            image: placeholderImages.fintech,
            cta: "Explore",
            ctaUrl: "/industries/fintech",
            clickTrackingId: 'sidebar-fintech-banner'
        }
    ]
};

// Performance-based ads
export const performanceAds: AdSlide[] = [
    {
        id: 'high-converting-001',
        title: "Popular Choice",
        subtitle: "Most Requested Service",
        description: "Join 500+ satisfied clients",
        bgColor: "from-amber-600 to-amber-800",
        icon: BarChart3,
        image: placeholderImages.metrics,
        cta: "See Why",
        ctaUrl: "/case-studies",
        priority: 1,
        clickTrackingId: 'sidebar-popular-service'
    }
];

// Default export for easy access
export default {
    blogSidebarAds,
    campaignAds,
    industrySpecificAds,
    performanceAds
};