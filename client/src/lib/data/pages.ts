import { PageContent } from '@/lib/types/';
import { services } from './services';
import { products } from './products';
import { defaultTeamMembers } from './team';
import { testimonials } from './testimonials';
import { jobListings } from './jobs';
import { blogPosts, blogCategories } from './blog';
import { faqContent } from './faq';
import { benefits } from './benefits';
import { clients } from './clients';
import { heroSlides, defaultHeroProps } from './hero';
import { industries } from './industries';
import { caseStudies } from './case-studies';

// Extract hero content from heroSlides using prop drilling
const extractHeroContent = () => {
  const defaultSlide = heroSlides[0]; // Use first slide as default
  return {
    id: 1,
    type: "hero" as const,
    title: defaultSlide.title,
    subtitle: defaultSlide.subtitle,
    content: defaultSlide.subtitle, // Use subtitle as content
    backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
    settings: {
      primaryButton: defaultSlide.primaryButton,
      secondaryButton: defaultSlide.secondaryButton,
      backgroundImage: defaultSlide.backgroundImage,
      animation: {
        type: "fade" as const,
        duration: 0.5,
        delay: 0.1
      }
    }
  };
};

// Home Page Content
export const homePageContent: PageContent = {
  id: 1,
  slug: "home",
  title: "I-VARSE Technologies - Innovative Digital Solutions",
  description: "I-VARSE provides comprehensive tech solutions, specializing in web development, cloud infrastructure, mobile applications, and digital marketing. Our expert team crafts innovative solutions that propel businesses forward.",
  metaTitle: "I-VARSE Technologies - Innovative Digital Solutions",
  metaDescription: "I-VARSE provides comprehensive tech solutions, specializing in web development, cloud infrastructure, mobile applications, and digital marketing. Our expert team crafts innovative solutions that propel real results.",
  sections: [
    // Hero section using prop drilling from hero.ts
    extractHeroContent(),
    {
      id: 2,
      type: "services",
      title: "Our Services",
      subtitle: "Comprehensive digital solutions for modern businesses",
      content: "We provide a wide range of digital services to help your business grow and succeed in the digital economy.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      badge: "🛠️ Our Services",
      settings: {
        featured: services,
        layout: "grid",
        columns: 3,
        gap: "large",
        primaryButton: {
          title: "View All Services",
          href: "/services",
          variant: "default",
          children: "View All Services"
        },
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "products",
      title: "Our Products",
      subtitle: "Innovative digital solutions for modern businesses",
      content: "Discover our cutting-edge digital products designed to transform your business operations and drive growth.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "🚀 Our Products",
      settings: {
        featured: products,
        layout: "grid",
        columns: 2,
        gap: "large",
        maxDisplay: 2,
        primaryButton: {
          title: "View All Products",
          href: "/products",
          variant: "default",
          children: "View All Products"
        },
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "case-studies",
      title: "Featured Case Studies",
      subtitle: "Real results from real projects",
      content: "Discover how we've helped businesses transform their operations and achieve remarkable results through innovative technology solutions. Our case studies showcase the tangible impact of our work across various industries.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "📊 Case Studies",
      settings: {
        featured: caseStudies,
        layout: "grid",
        columns: 3,
        gap: "large",
        maxDisplay: 3,
        primaryButton: {
          title: "View All Case Studies",
          href: "/case-studies",
          variant: "default",
          children: "View All Case Studies"
        },
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 5,
      type: "clients",
      title: "Trusted by Industry Leaders",
      subtitle: "Partnering with innovative companies worldwide",
      content: "We're proud to work with leading companies across various industries, helping them achieve their digital transformation goals.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      badge: "🏢 Our Clients",
      settings: {
        featured: clients,
        layout: "grid",
        columns: 3,
        gap: "medium",
        logos: clients,
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 6,
      type: "about",
      title: "About I-VARSE Technologies",
      subtitle: "Your trusted partner in digital transformation",
      content: "Founded in 2018, I-VARSE Technologies has been at the forefront of digital innovation in Nigeria, providing cutting-edge technology solutions to businesses across various sectors.\n\nOur mission is to empower businesses through innovative technology solutions that drive growth and efficiency. We strive to be the trusted partner that helps organizations navigate their digital transformation journey.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "ℹ️ About Us",
      settings: {
        image: "/src/assets/images/IMG_2253.JPG",
        stats: [
          { value: "5+", label: "Years Experience" },
          { value: "100+", label: "Projects Completed" },
          { value: "50+", label: "Happy Clients" },
          { value: "24/7", label: "Support Available" }
        ],
        video: {
          title: "I-VARSE Technologies Introduction",
          description: "Learn more about our company and mission",
          thumbnail: "/src/assets/images/IMG_2254.JPG"
        },
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 7,
      type: "testimonials",
      title: "What Our Clients Say",
      subtitle: "Trusted by businesses across Nigeria",
      content: "Our clients trust us to deliver exceptional results. Here's what they have to say about working with I-VARSE Technologies.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      badge: "💬 Testimonials",
      settings: {
        featured: testimonials,
        layout: "carousel",
        testimonialCount: 3,
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 8,
      type: "blog",
      title: "Latest Insights",
      subtitle: "Stay updated with our latest articles and insights",
      content: "Explore our latest articles on technology trends, best practices, and industry insights.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "📝 Latest Insights",
      settings: {
        featured: blogPosts,
        layout: "grid",
        columns: 3,
        gap: "large",
        postsToShow: 3,
        primaryButton: {
          title: "View All Posts",
          href: "/blog",
          variant: "default",
          children: "View All Posts"
        },
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 9,
      type: "cta",
      title: "Ready to Transform Your Business?",
      subtitle: "Let's discuss how we can help you achieve your digital goals",
      content: "Contact our team today to learn more about our services and how we can help your business succeed in the digital age.",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
      textColor: "text-white",
      settings: {
        primaryButton: {
          title: "Get Started",
          href: "/contact",
          variant: "default",
          children: "Get Started"
        },
        secondaryButton: {
          title: "Learn More",
          href: "/services",
          variant: "outline",
          children: "Learn More"
        },
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Helper functions for accessing home page data with hero integration
export const homePageHelpers = {
  // Get hero section with prop drilling
  getHeroSection: () => extractHeroContent(),

  // Get hero section by slide index
  getHeroSectionBySlideIndex: (index: number) => {
    const slide = heroSlides[index];
    if (!slide) return extractHeroContent();

    return {
      id: 1,
      type: "hero" as const,
      title: slide.title,
      subtitle: slide.subtitle,
      content: slide.subtitle,
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        primaryButton: slide.primaryButton,
        secondaryButton: slide.secondaryButton,
        backgroundImage: slide.backgroundImage,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    };
  },

  // Get hero section by slide title
  getHeroSectionBySlideTitle: (titleKeyword: string) => {
    const slide = heroSlides.find(slide =>
      slide.title.toLowerCase().includes(titleKeyword.toLowerCase())
    );
    if (!slide) return extractHeroContent();

    return {
      id: 1,
      type: "hero" as const,
      title: slide.title,
      subtitle: slide.subtitle,
      content: slide.subtitle,
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        primaryButton: slide.primaryButton,
        secondaryButton: slide.secondaryButton,
        backgroundImage: slide.backgroundImage,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    };
  },

  // Get all hero slides for carousel
  getAllHeroSlides: () => heroSlides,

  // Get hero props for component usage
  getHeroProps: () => defaultHeroProps,

  // Get services section
  getServicesSection: () => homePageContent.sections.find(s => s.type === 'services'),

  // Get products section
  getProductsSection: () => homePageContent.sections.find(s => s.type === 'products'),

  // Get clients section
  getClientsSection: () => homePageContent.sections.find(s => s.type === 'clients'),

  // Get about section
  getAboutSection: () => homePageContent.sections.find(s => s.type === 'about'),

  // Get testimonials section
  getTestimonialsSection: () => homePageContent.sections.find(s => s.type === 'testimonials'),

  // Get CTA section
  getCTASection: () => homePageContent.sections.find(s => s.type === 'cta'),

  // Get section by type
  getSectionByType: (type: string) => homePageContent.sections.find(s => s.type === type),

  // Get section by ID
  getSectionById: (id: number) => homePageContent.sections.find(s => s.id === id),

  // Get total number of sections
  getTotalSections: () => homePageContent.sections.length,

  // Get sections with specific background
  getSectionsByBackground: (backgroundColor: string) => {
    return homePageContent.sections.filter(s => s.backgroundColor === backgroundColor);
  },

  // Get sections with animation
  getSectionsWithAnimation: () => {
    return homePageContent.sections.filter(s => s.settings?.animation);
  }
};

// About Page Content
export const aboutPageContent: PageContent = {
  id: 2,
  slug: "about",
  title: "About Us - I-VARSE Technologies",
  description: "Learn about I-VARSE Technologies, our mission, vision, and the team behind our innovative digital solutions.",
  metaTitle: "About Us - I-VARSE Technologies",
  metaDescription: "Learn about I-VARSE Technologies, our mission, vision, and the team behind our innovative digital solutions.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "About I-VARSE Technologies",
      subtitle: "Founded with a vision to revolutionize digital solutions, I-VARSE has been at the forefront of technology innovation since its inception. We combine technical expertise with creative thinking to deliver exceptional results.",
      content: "Founded with a vision to revolutionize digital solutions, I-VARSE has been at the forefront of technology innovation since its inception. We combine technical expertise with creative thinking to deliver exceptional results.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        overline: "About I-VARSE",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "custom",
      title: "Our Mission & Vision",
      subtitle: "Driving innovation through technology",
      content: "At I-VARSE, our mission is to empower businesses through innovative technology solutions that drive growth and efficiency. We strive to be the trusted partner that helps organizations navigate their digital transformation journey.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        missionLabel: "Our Mission",
        missionTitle: "Empowering Digital Transformation",
        missionText: "At I-VARSE, our mission is to empower businesses through innovative technology solutions that drive growth and efficiency. We strive to be the trusted partner that helps organizations navigate their digital transformation journey.",
        visionLabel: "Our Vision",
        visionTitle: "Leading Digital Innovation",
        visionText: "To be the leading digital innovation partner for businesses across Africa, known for delivering cutting-edge solutions that drive real business value and sustainable growth.",
        image: "/src/assets/images/IMG_2255.JPG",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "features",
      title: "Our Core Values",
      subtitle: "The principles that guide everything we do",
      content: "Our core values shape our culture and drive our commitment to excellence in everything we do.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        label: "Our Core Values",
        items: [
          {
            id: 1,
            title: "Innovation",
            description: "We constantly push boundaries and explore new technologies to deliver forward-thinking solutions that keep our clients ahead of the curve.",
            icon: "lightning"
          },
          {
            id: 2,
            title: "Excellence",
            description: "We are committed to delivering the highest quality in everything we do, with meticulous attention to detail and a passion for perfection.",
            icon: "shield"
          },
          {
            id: 3,
            title: "Collaboration",
            description: "We believe in the power of teamwork, both within our organization and with our clients, fostering relationships built on trust and mutual success.",
            icon: "users"
          }
        ],
        layout: "grid",
        columns: 3,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "team",
      title: "Meet Our Team",
      subtitle: "The experts behind our innovative solutions",
      content: "Our team of experienced professionals brings together diverse expertise to deliver exceptional results for our clients.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        label: "Our Team",
        teamMembers: defaultTeamMembers,
        layout: "grid",
        columns: 4,
        gap: "large",
        cta: {
          url: "/careers",
          text: "Join Our Team"
        },
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 5,
      type: "industries",
      title: "Industries We Serve",
      subtitle: "Comprehensive solutions across diverse sectors",
      content: "Our expertise spans across multiple industries, enabling us to provide tailored solutions that address industry-specific challenges and drive digital transformation. We understand the unique needs of each sector and deliver innovative technology solutions that help businesses thrive in the digital economy.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "🏭 Our Industries",
      settings: {
        featured: industries,
        layout: "grid",
        columns: 4,
        gap: "large",
        maxDisplay: 4,
        primaryButton: {
          title: "View All Industries",
          href: "/industries",
          variant: "default",
          children: "View All Industries"
        },
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 6,
      type: "cta",
      title: "Ready to Transform Your Business?",
      subtitle: "Let's discuss how we can help you achieve your digital goals",
      content: "Contact our team today to learn more about our services and how we can help your business succeed in the digital age.",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
      textColor: "text-white",
      settings: {
        primaryCta: {
          url: "/contact",
          text: "Get Started"
        },
        secondaryCta: {
          url: "/services",
          text: "Explore Services"
        },
        animation: {
          type: "fade",
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Services Page Content
export const servicesPageContent: PageContent = {
  id: 3,
  slug: "services",
  title: "Our Services - I-VARSE Technologies",
  description: "Expert solutions tailored to your business requirements. Our team delivers high-quality services designed to help you succeed in today's competitive market.",
  metaTitle: "Professional Services | Expert Digital Solutions",
  metaDescription: "Expert solutions tailored to your business requirements. Our team delivers high-quality services designed to help you succeed in today's competitive market.",
  sections: [
    {
      id: 1,
      type: "hero",
      badge: "🛠️ Professional Services",
      title: "Professional Services",
      subtitle: "Expert digital solutions tailored to your business needs",
      content: "We offer comprehensive digital services designed to help your business thrive in the modern marketplace. From web development to cloud infrastructure, we have the expertise to deliver results.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        primaryButton: {
          title: "Get a Quote",
          href: "/contact",
          variant: "default",
          children: "Get a Quote"
        },
        secondaryButton: {
          title: "View Our Work",
          href: "/portfolio",
          variant: "outline",
          children: "View Our Work"
        },
        backgroundImage: "/src/assets/images/IMG_2247.JPG",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "services",
      badge: "🎯 Our Service Offerings",
      title: "Our Service Offerings",
      subtitle: "Comprehensive digital solutions for modern businesses",
      content: "We provide a wide range of digital services to help your business grow and succeed in the digital economy.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        featured: services,
        layout: "grid",
        columns: 3,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "custom",
      title: "Our Process",
      badge: "⚙️ Our Process",
      subtitle: "How we deliver exceptional results",
      content: "Our proven process ensures that every project is delivered on time, within budget, and exceeds expectations.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        items: [
          {
            id: 1,
            title: "Discover",
            description: "We start by understanding your business goals, target audience, and specific requirements.",
            icon: "Search"
          },
          {
            id: 2,
            title: "Plan",
            description: "We develop a comprehensive strategy and project plan tailored to your needs.",
            icon: "Map"
          },
          {
            id: 3,
            title: "Develop",
            description: "Our expert team builds your solution using the latest technologies and best practices.",
            icon: "Code"
          },
          {
            id: 4,
            title: "Test",
            description: "We thoroughly test your solution to ensure it meets all requirements and performs flawlessly.",
            icon: "CheckCircle"
          },
          {
            id: 5,
            title: "Deploy",
            description: "We launch your solution and provide ongoing support to ensure continued success.",
            icon: "Rocket"
          }
        ],
        layout: "grid",
        columns: 5,
        gap: "medium",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "testimonials",
      title: "What Our Clients Say",
      subtitle: "Trusted by businesses across Nigeria",
      content: "Our clients trust us to deliver exceptional results. Here's what they have to say about working with I-VARSE Technologies.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      badge: "💬 Testimonials",
      settings: {
        featured: testimonials,
        layout: "carousel",
        testimonialCount: 3,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 5,
      type: "cta",
      title: "Ready to Transform Your Business?",
      subtitle: "Let's discuss how we can help you achieve your digital goals",
      content: "Contact our team today to learn more about our services and how we can help your business succeed in the digital age.",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
      textColor: "text-white",
      settings: {
        primaryButton: {
          title: "Get Started",
          href: "/contact",
          variant: "default",
          children: "Get Started"
        },
        secondaryButton: {
          title: "Learn More",
          href: "/about",
          variant: "outline",
          children: "Learn More"
        },
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Products Page Content
export const productsPageContent: PageContent = {
  id: 4,
  slug: "products",
  title: "Our Products - I-VARSE Technologies",
  description: "Innovative digital products designed to transform your business operations and drive growth.",
  metaTitle: "Digital Products | Innovative Solutions",
  metaDescription: "Innovative digital products designed to transform your business operations and drive growth.",
  sections: [
    {
      id: 1,
      type: "hero",
      badge: "🚀 Our Products",
      title: "Innovative Digital Products",
      subtitle: "Transform your business with our cutting-edge solutions",
      content: "We develop innovative digital products that help businesses streamline operations, improve efficiency, and drive growth.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        primaryButton: {
          title: "View Products",
          href: "/products",
          variant: "default",
          children: "View Products"
        },
        secondaryButton: {
          title: "Request Demo",
          href: "/contact",
          variant: "outline",
          children: "Request Demo"
        },
        backgroundImage: "/src/assets/images/IMG_2260.JPG",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "products",
      badge: "💡 Our Solutions",
      title: "Our Digital Solutions",
      subtitle: "Comprehensive products for modern businesses",
      content: "We offer a range of digital products designed to meet the diverse needs of modern businesses.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        featured: products,
        layout: "grid",
        columns: 3,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "custom",
      title: "Why Choose Our Products",
      badge: "✨ Benefits",
      subtitle: "Key advantages of our digital solutions",
      content: "Our products are designed with modern businesses in mind, offering scalability, security, and ease of use.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        items: [
          {
            id: 1,
            title: "Scalable",
            description: "Our products grow with your business, handling increased workloads and user demands.",
            icon: "TrendingUp"
          },
          {
            id: 2,
            title: "Secure",
            description: "Built with enterprise-grade security to protect your data and operations.",
            icon: "Shield"
          },
          {
            id: 3,
            title: "User-Friendly",
            description: "Intuitive interfaces designed for optimal user experience and productivity.",
            icon: "Users"
          },
          {
            id: 4,
            title: "Cloud-Native",
            description: "Built for the cloud with automatic updates and global accessibility.",
            icon: "Cloud"
          },
          {
            id: 5,
            title: "24/7 Support",
            description: "Round-the-clock technical support to ensure your operations run smoothly.",
            icon: "Headphones"
          },
          {
            id: 6,
            title: "Analytics",
            description: "Comprehensive analytics and reporting to track performance and insights.",
            icon: "BarChart"
          }
        ],
        layout: "grid",
        columns: 3,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "custom",
      title: "Technologies We Use",
      badge: "⚡ Tech Stack",
      subtitle: "Cutting-edge technologies powering our solutions",
      content: "We leverage the latest technologies and frameworks to build robust, scalable, and future-proof digital solutions.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        items: [
          {
            id: 1,
            title: "React & Next.js",
            description: "Modern frontend frameworks for building responsive web applications.",
            icon: "Code",
            color: "text-blue-600"
          },
          {
            id: 2,
            title: "Node.js & Express",
            description: "Scalable backend solutions with high performance and reliability.",
            icon: "Server",
            color: "text-green-600"
          },
          {
            id: 3,
            title: "Python & Django",
            description: "Powerful backend framework for complex business applications.",
            icon: "Database",
            color: "text-yellow-600"
          },
          {
            id: 4,
            title: "AWS & Azure",
            description: "Cloud infrastructure for global scalability and reliability.",
            icon: "Cloud",
            color: "text-orange-600"
          },
          {
            id: 5,
            title: "Docker & Kubernetes",
            description: "Containerization and orchestration for seamless deployment.",
            icon: "Box",
            color: "text-blue-500"
          },
          {
            id: 6,
            title: "MongoDB & PostgreSQL",
            description: "Flexible database solutions for various data requirements.",
            icon: "Database",
            color: "text-purple-600"
          }
        ],
        layout: "grid",
        columns: 3,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 5,
      type: "testimonials",
      title: "What Our Clients Say",
      subtitle: "Trusted by businesses across Nigeria",
      content: "Our clients trust us to deliver exceptional results. Here's what they have to say about working with I-VARSE Technologies.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "💬 Testimonials",
      settings: {
        featured: testimonials,
        layout: "carousel",
        testimonialCount: 3,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 6,
      type: "cta",
      title: "Ready to Get Started?",
      subtitle: "Transform your business with our innovative solutions",
      content: "Contact our team today to learn more about our products and how we can help your business succeed in the digital age.",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
      textColor: "text-white",
      settings: {
        primaryButton: {
          title: "Get Started",
          href: "/contact",
          variant: "default",
          children: "Get Started"
        },
        secondaryButton: {
          title: "Request Demo",
          href: "/contact?type=demo",
          variant: "outline",
          children: "Request Demo"
        },
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Team Page Content
export const teamPageContent: PageContent = {
  id: 5,
  slug: "team",
  title: "Our Team - I-VARSE Technologies",
  description: "Meet the talented team behind I-Varse Technologies. Our experts are dedicated to delivering innovative digital solutions.",
  metaTitle: "Our Team | Meet the Experts at I-Varse Technologies",
  metaDescription: "Meet the talented team behind I-Varse Technologies. Our experts are dedicated to delivering innovative digital solutions.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Meet Our Team",
      subtitle: "The experts behind our innovative solutions",
      content: "Our team of experienced professionals brings together diverse expertise to deliver exceptional results for our clients.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "team",
      title: "Our Team",
      subtitle: "Meet the dedicated professionals who make I-Varse Technologies a leader in digital innovation.",
      content: "Our team of experienced professionals brings together diverse expertise to deliver exceptional results for our clients.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        teamMembers: defaultTeamMembers,
        layout: "grid",
        columns: 4,
        gap: "large",
        cta: {
          url: "/careers",
          text: "Join Our Team"
        },
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "cta",
      title: "Join Our Team",
      subtitle: "Be part of our innovative team",
      content: "We're always looking for talented individuals to join our team. Explore our current opportunities.",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
      textColor: "text-white",
      settings: {
        primaryButton: {
          title: "View Careers",
          href: "/careers",
          variant: "default",
          children: "View Careers"
        },
        secondaryButton: {
          title: "Contact Us",
          href: "/contact",
          variant: "outline",
          children: "Contact Us"
        },
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Careers Page Content
export const careersPageContent: PageContent = {
  id: 6,
  slug: "careers",
  title: "Careers - Join I-VARSE Technologies",
  description: "Join our team of passionate innovators and help us create solutions that make a difference.",
  metaTitle: "Careers - Join I-VARSE Technologies",
  metaDescription: "Join our team of passionate innovators and help us create solutions that make a difference.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Join Our Team",
      subtitle: "Be part of something extraordinary",
      content: "At I-VARSE, we're more than just a technology company – we're a community of passionate innovators dedicated to creating solutions that make a difference.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "custom",
      title: "Why Join Us",
      subtitle: "What makes working at I-VARSE special",
      content: "At I-VARSE, we're more than just a technology company – we're a community of passionate innovators dedicated to creating solutions that make a difference. We believe in fostering a culture of creativity, collaboration, and continuous learning.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        items: benefits.getJobBenefits().map(benefit => ({
          ...benefit,
          id: benefit.id || 0
        })),
        layout: "grid",
        columns: 3,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "jobs",
      title: "Open Positions",
      subtitle: "Find your next opportunity",
      content: "Explore our current job openings and find the perfect role for your skills and career goals.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        featured: jobListings,
        layout: "list",
        maxDisplay: 6,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "cta",
      title: "Ready to Join Our Team?",
      subtitle: "Take the next step in your career journey",
      content: "Don't see the perfect role? We're always looking for talented individuals who are passionate about technology and innovation. Send us your resume and let's discuss how you can contribute to our mission of transforming businesses through innovative digital solutions.",
      backgroundColor: "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900",
      textColor: "text-white",
      settings: {
        badge: "👥 Join Our Team",
        primaryButton: {
          title: "View All Positions",
          href: "#open-positions",
          variant: "default",
          children: "View All Positions"
        },
        secondaryButton: {
          title: "Send Resume",
          href: "/contact?type=careers",
          variant: "outline",
          children: "Send Resume"
        },
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Contact Page Content
export const contactPageContent: PageContent = {
  id: 7,
  slug: "contact",
  title: "Contact Us - I-VARSE Technologies",
  description: "Get in touch with I-VARSE Technologies. We're here to help you transform your business with innovative digital solutions. Contact us today for a consultation.",
  metaTitle: "Contact Us - I-VARSE Technologies",
  metaDescription: "Get in touch with I-VARSE Technologies. We're here to help you transform your business with innovative digital solutions. Contact us today for a consultation.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Get in Touch",
      subtitle: "Let's discuss your project",
      content: "Ready to start your digital transformation journey? Contact us today to discuss your project and how we can help you achieve your goals.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        badge: "📞 Contact Us",
        buttonText: "Get Started",
        primaryButton: {
          title: "Get Started",
          href: "#contact-form",
          variant: "default",
          children: "Get Started"
        },
        secondaryButton: {
          title: "Learn More",
          href: "/services",
          variant: "outline",
          children: "Learn More"
        },
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "contact",
      title: "Contact Form",
      subtitle: "Send us a message",
      content: "Fill out the form below and we'll get back to you as soon as possible.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "testimonials",
      title: "What Our Clients Say",
      subtitle: "Trusted by businesses across Nigeria",
      content: "Our clients trust us to deliver exceptional results. Here's what they have to say about working with I-VARSE Technologies.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        featured: testimonials,
        layout: "carousel",
        testimonialCount: 3,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "faq",
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions",
      content: "Have questions about our services or process? Check out our FAQ section for quick answers.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        items: faqContent.items.slice(0, 4).map(faq => ({
          id: faq.id,
          title: faq.question,
          description: faq.answer
        })),
        layout: "list",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Blog Page Content
export const blogPageContent: PageContent = {
  id: 8,
  slug: "blog",
  title: "Blog - I-VARSE Technologies Insights",
  description: "Stay updated with the latest insights, trends, and best practices in technology and digital transformation.",
  metaTitle: "Blog - I-VARSE Technologies Insights",
  metaDescription: "Stay updated with the latest insights, trends, and best practices in technology and digital transformation.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Tech Insights",
      subtitle: "Latest insights and trends",
      content: "Stay updated with the latest insights, trends, and best practices in technology and digital transformation.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "blog",
      title: "Latest Articles",
      subtitle: "Insights and updates",
      content: "Explore our latest articles on technology trends, best practices, and industry insights.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        featured: blogPosts,
        categories: blogCategories,
        layout: "grid",
        columns: 3,
        gap: "large",
        postsToShow: 6,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "custom",
      title: "Categories",
      subtitle: "Browse by topic",
      content: "Find articles by category to discover content that matches your interests.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        categories: blogCategories,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "custom",
      title: "Popular Tags",
      subtitle: "Trending topics",
      content: "Explore articles by popular tags and trending topics in technology.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 5,
      type: "cta",
      title: "Stay Updated",
      subtitle: "Subscribe to our newsletter",
      content: "Get the latest insights and updates delivered directly to your inbox.",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
      textColor: "text-white",
      settings: {
        primaryButton: {
          title: "Subscribe Now",
          href: "/newsletter",
          variant: "default",
          children: "Subscribe Now"
        },
        secondaryButton: {
          title: "View All Posts",
          href: "/blog",
          variant: "outline",
          children: "View All Posts"
        },
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Service Detail Page Content
export const serviceDetailPageContent: PageContent = {
  id: 9,
  slug: "service-detail",
  title: "Service Details - I-VARSE Technologies",
  description: "Detailed information about our services and how we can help your business.",
  metaTitle: "Service Details - I-VARSE Technologies",
  metaDescription: "Detailed information about our services and how we can help your business.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Service Details",
      subtitle: "Comprehensive service information",
      content: "Learn more about our services and how we can help your business achieve its goals.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Product Detail Page Content
export const productDetailPageContent: PageContent = {
  id: 10,
  slug: "product-detail",
  title: "Product Details - I-VARSE Technologies",
  description: "Detailed information about our products and solutions.",
  metaTitle: "Product Details - I-VARSE Technologies",
  metaDescription: "Detailed information about our products and solutions.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Product Details",
      subtitle: "Comprehensive product information",
      content: "Learn more about our products and how they can help your business.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Job Detail Page Content
export const jobDetailPageContent: PageContent = {
  id: 11,
  slug: "job-detail",
  title: "Job Details - I-VARSE Technologies",
  description: "Detailed information about job opportunities at I-VARSE Technologies.",
  metaTitle: "Job Details - I-VARSE Technologies",
  metaDescription: "Detailed information about job opportunities at I-VARSE Technologies.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Job Details",
      subtitle: "Career opportunity information",
      content: "Learn more about this exciting career opportunity at I-VARSE Technologies.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Team Member Detail Page Content
export const teamMemberDetailPageContent: PageContent = {
  id: 12,
  slug: "team-member-detail",
  title: "Team Member - I-VARSE Technologies",
  description: "Learn more about our team members and their expertise.",
  metaTitle: "Team Member - I-VARSE Technologies",
  metaDescription: "Learn more about our team members and their expertise.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Meet Our Team Member",
      subtitle: "Dedicated professional driving innovation",
      content: "Learn more about this talented member of our team and their contributions to our success.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "👥 Team Member",
      settings: {
        teamMembers: defaultTeamMembers,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "custom",
      title: "Professional Bio",
      subtitle: "Expertise and experience",
      content: "Get to know our team member's background, expertise, and contributions to our organization.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        bioLabel: "Professional Background",
        skillsLabel: "Key Skills",
        experienceLabel: "Experience",
        educationLabel: "Education",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "custom",
      title: "Recent Projects",
      subtitle: "Notable achievements and contributions",
      content: "Explore the projects and initiatives this team member has led or contributed to.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        projectsLabel: "Featured Projects",
        projectCount: 3,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "custom",
      title: "Contact Information",
      subtitle: "Get in touch",
      content: "Connect with our team member directly for collaboration opportunities or questions.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        contactLabel: "Contact Details",
        socialLabel: "Social Profiles",
        availabilityLabel: "Availability",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 5,
      type: "custom",
      title: "Related Team Members",
      subtitle: "Collaborators and colleagues",
      content: "Meet other team members who work closely with this professional.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        relatedLabel: "Team Collaborations",
        teamMembers: defaultTeamMembers,
        maxDisplay: 3,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 6,
      type: "cta",
      title: "Ready to Work With Our Team?",
      subtitle: "Let's discuss how our experts can help you achieve your business goals",
      content: "Contact us today to discuss how our team can help you achieve your business goals and drive innovation in your organization.",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
      textColor: "text-white",
      settings: {
        teamMemberContent: {
          cta: {
            title: "Ready to Work With Our Team?",
            description: "Contact us today to discuss how our experts can help you achieve your business goals."
          }
        },
        primaryButton: {
          title: "Get in Touch",
          href: "/contact",
          variant: "default",
          children: "Get in Touch"
        },
        secondaryButton: {
          title: "Explore Our Services",
          href: "/services",
          variant: "outline",
          children: "Explore Our Services"
        },
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// FAQ Page Content
export const faqPageContent: PageContent = {
  id: 13,
  slug: faqContent.slug,
  title: faqContent.title,
  description: faqContent.description,
  metaTitle: faqContent.metaTitle,
  metaDescription: faqContent.metaDescription,
  sections: [
    {
      id: 1,
      type: "hero",
      title: faqContent.title,
      subtitle: "Find answers to common questions",
      content: faqContent.description,
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "custom",
      title: "FAQ Categories",
      subtitle: "Browse questions by category",
      content: faqContent.content || "Explore our comprehensive FAQ section organized by categories to quickly find the information you need.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        faqCategories: faqContent.categories,
        faqItems: faqContent.items,
        layout: "grid",
        columns: 1,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "contact",
      title: "Still Have Questions?",
      subtitle: "Get in touch with us",
      content: "Can't find what you're looking for? Our team is here to help. Contact us for personalized assistance.",
      backgroundColor: "bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Case Studies Page Content
export const caseStudiesPageContent: PageContent = {
  id: 14,
  slug: "case-studies",
  title: "Case Studies - I-VARSE Technologies",
  description: "Explore our success stories and see how we've helped businesses transform through innovative technology solutions.",
  metaTitle: "Case Studies - I-VARSE Technologies",
  metaDescription: "Explore our success stories and see how we've helped businesses transform through innovative technology solutions.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Success Stories That Drive Innovation",
      subtitle: "Discover how we've helped businesses transform their operations and achieve remarkable results through innovative technology solutions.",
      content: "Our case studies showcase real-world examples of how our technology solutions have delivered measurable results for businesses across various industries. From digital transformation projects to custom software development, each case study demonstrates our commitment to excellence and our ability to deliver solutions that drive real business value.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "📊 Case Studies",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "custom",
      title: "About I-Varse Technologies",
      subtitle: "Your trusted partner in digital transformation",
      content: "I-Varse Technologies is a leading technology company based in Nigeria, specializing in comprehensive digital solutions that drive business transformation and innovation. Founded in 2018, we have established ourselves as a trusted partner for businesses across various industries, delivering cutting-edge technology solutions that address real-world challenges.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        industryExpertise: [
          "Banking & Financial Services",
          "Healthcare & Telemedicine",
          "Retail & E-commerce",
          "Manufacturing & Logistics",
          "Education & E-learning",
          "Real Estate & Property Management"
        ],
        whyChooseUs: [
          {
            title: "Proven Track Record",
            description: "5+ years of successful project delivery across diverse industries"
          },
          {
            title: "Expert Team",
            description: "Skilled professionals with expertise in modern technologies and best practices"
          },
          {
            title: "Quality Assurance",
            description: "Rigorous testing and quality control processes ensure reliable solutions"
          },
          {
            title: "Security Focus",
            description: "Enterprise-grade security measures and compliance with industry standards"
          },
          {
            title: "Scalable Solutions",
            description: "Future-proof architectures that grow with your business needs"
          }
        ],
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "case-studies",
      title: "Featured Case Studies",
      subtitle: "Real results from real projects",
      content: "Explore our portfolio of successful projects and see the impact our solutions have made. Each case study represents a unique challenge, innovative solution, and measurable results that demonstrate our expertise in delivering technology solutions that drive business growth.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        featured: caseStudies,
        layout: "grid",
        columns: 3,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "testimonials",
      title: "What Our Clients Say",
      subtitle: "Trusted by businesses across Nigeria",
      content: "Our clients trust us to deliver exceptional results. Here's what they have to say about working with I-VARSE Technologies.",
      backgroundColor: "bg-blue-50 dark:bg-blue-900/20",
      badge: "💬 Testimonials",
      settings: {
        featured: testimonials,
        layout: "carousel",
        testimonialCount: 3,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 5,
      type: "cta",
      title: "Ready to Start Your Success Story?",
      subtitle: "Let's discuss how we can help transform your business with innovative technology solutions.",
      content: "Contact our team today to learn more about our services and how we can help your business succeed in the digital age.",
      backgroundColor: "bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};

// Industries Page Content
export const industriesPageContent: PageContent = {
  id: 15,
  slug: "industries",
  title: "Industries - I-VARSE Technologies",
  description: "Explore how our technology expertise empowers organizations across diverse industries to achieve their goals.",
  metaTitle: "Industries - I-VARSE Technologies",
  metaDescription: "Explore how our technology expertise empowers organizations across diverse industries to achieve their goals.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Industry Solutions for Every Sector",
      subtitle: "Explore how our technology expertise empowers organizations across diverse industries to achieve their goals.",
      content: "We deliver innovative technology solutions across diverse industries, helping businesses transform and grow.",
      backgroundColor: "bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "🏭 Industries",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "industries",
      title: "Industries We Serve",
      subtitle: "Sector-specific solutions",
      content: "We deliver innovative technology solutions across diverse industries, helping businesses transform and grow.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        featured: industries,
        layout: "grid",
        columns: 4,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "testimonials",
      title: "Industry Success Stories",
      subtitle: "Trusted by businesses across Nigeria",
      content: "Our clients trust us to deliver exceptional results. Here's what they have to say about working with I-VARSE Technologies.",
      backgroundColor: "bg-green-50 dark:bg-green-900/20",
      badge: "💬 Testimonials",
      settings: {
        featured: testimonials,
        layout: "carousel",
        testimonialCount: 3,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "cta",
      title: "Transform Your Industry with Technology",
      subtitle: "Ready to revolutionize your business? Let's discuss how our industry-specific solutions can drive your success.",
      content: "Contact our team today to learn more about our services and how we can help your business succeed in the digital age.",
      backgroundColor: "bg-gradient-to-r from-green-600 to-blue-600",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
};
