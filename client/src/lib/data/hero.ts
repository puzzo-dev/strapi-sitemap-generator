import {
  HeroSlide,
  HeroProps
} from '@/lib/types';

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Transform Your Digital Presence",
    subtitle: "We build innovative web and mobile solutions that drive business growth",
    primaryButton: {
      title: "Our Services",
      href: "/services",
      variant: "default",
      endIcon: "arrow-right",
      children: "Our Services"
    },
    secondaryButton: {
      title: "Contact Us",
      href: "/contact",
      variant: "outline",
      children: "Contact Us"
    },
    backgroundImage: "/src/assets/images/IMG_2247.JPG"
  },
  {
    id: 2,
    title: "Cloud Infrastructure Management",
    subtitle: "Optimize your cloud resources with our expert management services",
    primaryButton: {
      title: "Learn More",
      href: "/services/cloud-infrastructure",
      variant: "default",
      children: "Learn More"
    },
    secondaryButton: {
      title: "Get a Quote",
      href: "/contact",
      variant: "outline",
      children: "Get a Quote"
    },
    backgroundImage: "/src/assets/images/IMG_2260.JPG"
  },
  {
    id: 3,
    title: "Custom Mobile Applications",
    subtitle: "Create stunning, high-performance apps for iOS and Android",
    primaryButton: {
      title: "View Portfolio",
      href: "/portfolio",
      variant: "default",
      startIcon: "phone",
      children: "View Portfolio"
    },
    secondaryButton: {
      title: "Our Process",
      href: "/services/mobile-development",
      variant: "outline",
      children: "Our Process"
    },
    backgroundImage: "/src/assets/images/IMG_2256.JPG"
  },
  {
    id: 4,
    title: "Enterprise Solutions",
    subtitle: "Streamline your business operations with our comprehensive ERP solutions",
    primaryButton: {
      title: "Discover Solutions",
      href: "/services/erp-solutions",
      variant: "default",
      children: "Discover Solutions"
    },
    secondaryButton: {
      title: "Schedule Demo",
      href: "/contact?demo=erp",
      variant: "outline",
      children: "Schedule Demo"
    },
    backgroundImage: "/src/assets/images/IMG_2248.JPG"
  },
  {
    id: 5,
    title: "Api Engineering & Integration",
    subtitle: "Connect your systems seamlessly with custom API development",
    primaryButton: {
      title: "Our Approach",
      href: "/services/api-integration",
      variant: "default",
      startIcon: "code",
      children: "Our Approach"
    },
    secondaryButton: {
      title: "Talk to an Expert",
      href: "/contact",
      variant: "outline",
      children: "Talk to an Expert"
    },
    backgroundImage: "/src/assets/images/IMG_2257.JPG"
  }
];

// Extract default hero content from heroSlides using prop drilling
const getDefaultHeroContent = (): HeroSlide => {
  return heroSlides[0]; // Use the first slide as default
};

// Create comprehensive hero props using prop drilling
export const defaultHeroProps: HeroProps = {
  // Use prop drilling to get hero content from heroSlides
  heroContents: getDefaultHeroContent(),
  
  // Include all hero slides for carousel functionality
  heroSlides: heroSlides,

  badge: "🚀 Digital Innovation",
  
  // Required boolean properties
  isHeroLoading: false,
  isPageLoading: false,
  isServicesLoading: false,
  
  // Required number properties
  currentIndex: 0,
  
  // Required function properties (empty functions as placeholders)
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  
  // Required string properties
  companyLogo: "/src/assets/images/IMG_2247.JPG",
  
  // Optional properties
  translationKey: "hero-default"
};

// Helper functions for accessing hero data
export const heroHelpers = {
  // Get all hero slides
  getAllSlides: (): HeroSlide[] => heroSlides,
  
  // Get slide by ID
  getSlideById: (id: number): HeroSlide | undefined => {
    return heroSlides.find(slide => slide.id === id);
  },
  
  // Get slide by index
  getSlideByIndex: (index: number): HeroSlide | undefined => {
    return heroSlides[index];
  },
  
  // Get default slide
  getDefaultSlide: (): HeroSlide => getDefaultHeroContent(),
  
  // Get total number of slides
  getTotalSlides: (): number => heroSlides.length,
  
  // Get slides with specific criteria
  getSlidesByTitle: (titleKeyword: string): HeroSlide[] => {
    return heroSlides.filter(slide => 
      slide.title.toLowerCase().includes(titleKeyword.toLowerCase())
    );
  },
  
  // Get slides with specific button text
  getSlidesByButtonText: (buttonText: string): HeroSlide[] => {
    return heroSlides.filter(slide => 
      slide.primaryButton?.title?.toLowerCase().includes(buttonText.toLowerCase()) ||
      slide.secondaryButton?.title?.toLowerCase().includes(buttonText.toLowerCase())
    );
  }
};

// Export default for backward compatibility
export default defaultHeroProps;
