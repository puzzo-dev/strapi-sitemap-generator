import {
  HeroSlide,
  HeroProps
} from '@/lib/types';

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Reinvent What's Possible",
    subtitle: "We partner with organizations to architect intelligent solutions that transform operations, accelerate growth, and deliver measurable business outcomes",
    primaryButton: {
      title: "Explore Our Services",
      href: "/services",
      variant: "default",
      endIcon: "arrow-right",
      children: "Explore Our Services"
    },
    secondaryButton: {
      title: "Start a Conversation",
      href: "/contact",
      variant: "outline",
      children: "Start a Conversation"
    },
    backgroundImage: "/src/assets/images/IMG_2247.JPG"
  },
  {
    id: 2,
    title: "Cloud-First Architecture That Scales",
    subtitle: "Transform infrastructure complexity into strategic advantage with cloud solutions engineered for performance, security, and business agility",
    primaryButton: {
      title: "Discover Cloud Excellence",
      href: "/services/cloud-infrastructure-management",
      variant: "default",
      children: "Discover Cloud Excellence"
    },
    secondaryButton: {
      title: "Consult Our Experts",
      href: "/contact",
      variant: "outline",
      children: "Consult Our Experts"
    },
    backgroundImage: "/src/assets/images/IMG_2260.JPG"
  },
  {
    id: 3,
    title: "Experiences That Drive Engagement",
    subtitle: "Craft exceptional mobile experiences powered by cutting-edge technology, designed to captivate users and deliver tangible business value",
    primaryButton: {
      title: "Explore Success Stories",
      href: "/portfolio",
      variant: "default",
      startIcon: "phone",
      children: "Explore Success Stories"
    },
    secondaryButton: {
      title: "Our Innovation Process",
      href: "/services/custom-applications-development",
      variant: "outline",
      children: "Our Innovation Process"
    },
    backgroundImage: "/src/assets/images/IMG_2256.JPG"
  },
  {
    id: 4,
    title: "Enterprise Transformation at Scale",
    subtitle: "Modernize operations with intelligent enterprise platforms that integrate seamlessly, adapt continuously, and unlock Industry 4.0 capabilities",
    primaryButton: {
      title: "Explore Enterprise Solutions",
      href: "/services/custom-erp-solutions",
      variant: "default",
      children: "Explore Enterprise Solutions"
    },
    secondaryButton: {
      title: "Request Consultation",
      href: "/contact?demo=erp",
      variant: "outline",
      children: "Request Consultation"
    },
    backgroundImage: "/src/assets/images/IMG_2248.JPG"
  },
  {
    id: 5,
    title: "Intelligent Automation for Tomorrow",
    subtitle: "Harness the power of private AI to automate workflows, enhance decision-making, and unlock unprecedented operational efficiency",
    primaryButton: {
      title: "Explore NeuralCore AI",
      href: "/services/neuralcore-private-ai-cloud",
      variant: "default",
      startIcon: "code",
      children: "Explore NeuralCore AI"
    },
    secondaryButton: {
      title: "Connect With Specialists",
      href: "/contact",
      variant: "outline",
      children: "Connect With Specialists"
    },
    backgroundImage: "/src/assets/images/IMG_2257.JPG"
  }
];

// Extract default hero content from heroSlides using prop drilling
const getDefaultHeroContent = (): HeroSlide => {
  return heroSlides[0]; // Use the first slide as default
};

// Hero stats configuration
export const heroStats = [
  { value: "500+", label: "Solutions Delivered" },
  { value: "10+", label: "Industries Transformed" },
  { value: "99.9%", label: "Service Excellence" }
];

// Hero features configuration
export const heroFeatures = [
  { icon: "Brain", label: "AI & Automation" },
  { icon: "Smartphone", label: "Digital Experiences" },
  { icon: "Building2", label: "Enterprise Platforms" },
  { icon: "Lock", label: "Security & Compliance" }
];

// Create comprehensive hero props using prop drilling
export const defaultHeroProps: HeroProps = {
  // Use prop drilling to get hero content from heroSlides
  heroContents: getDefaultHeroContent(),

  // Include all hero slides for carousel functionality
  heroSlides: heroSlides,

  badge: "🚀 Innovation at Scale",
  title: "Reinvent What's Possible",
  subtitle: "We partner with organizations to architect intelligent solutions that transform operations, accelerate growth, and deliver measurable business outcomes",
  buttonText: "Begin Your Journey",

  // Required boolean properties
  isHeroLoading: false,
  isPageLoading: false,
  isServicesLoading: false,

  // Required number properties
  currentIndex: 0,

  // Required function properties (empty functions as placeholders)
  handleMouseEnter: () => { },
  handleMouseLeave: () => { },

  // Required string properties
  companyLogo: "/src/assets/images/IMG_2247.JPG",

  // Optional properties
  translationKey: "hero-default",

  // Dynamic content
  stats: heroStats,
  features: heroFeatures
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
