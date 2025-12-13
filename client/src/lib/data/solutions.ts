import {
  ProductProps,
} from '@/lib/types';

export const products: ProductProps[] = [
  {
    id: 1,
    title: "Entry-X: Event Ticketing SaaS",
    slug: "entry-x-event-ticketing-saas",
    translationKey: "entry-x-event-ticketing-saas",
    shortDescription: "A complete event ticketing solution for event organizers",
    description: "A complete event ticketing solution for event organizers",
    image: "/src/assets/images/IMG_2247.JPG",
    gallery: [
      {
        id: 1,
        image: "/src/assets/images/IMG_2247.JPG",
        title: "Entry-X Dashboard Overview",
        type: "screenshot",
        size: "large"
      },
      {
        id: 2,
        image: "/api/placeholder/400/300",
        title: "Ticket Sales Analytics",
        type: "feature",
        size: "medium"
      },
      {
        id: 3,
        image: "/api/placeholder/400/300",
        title: "Event Management Interface",
        type: "interface",
        size: "medium"
      },
      {
        id: 4,
        image: "/api/placeholder/600/400",
        title: "Mobile Check-in App",
        type: "demo",
        size: "large"
      },
      {
        id: 5,
        image: "/api/placeholder/400/300",
        title: "Payment Gateway Integration",
        type: "feature",
        size: "medium"
      },
      {
        id: 6,
        image: "/api/placeholder/400/300",
        title: "Real-time Reporting",
        type: "screenshot",
        size: "medium"
      }
    ],
    keyFeatures: [
      "Ticket Sales Management",
      "Events Dashboard",
      "Customizable Ticketing System",
      "Check-in & Attendance",
      "Real-time Analytics",
      "Mobile App Integration",
      "Payment Gateway Integration",
      "Email Marketing Tools",
      "Social Media Integration",
      "Multi-language Support"
    ],
    benefits: {
      id: 1,
      title: "Key Benefits",
      content: "Comprehensive benefits for event organizers and attendees",
      items: [
        {
          id: 1,
          title: "Simplified Event Management",
          description: "Streamline your event planning process with our intuitive dashboard and automated workflows"
        },
        {
          id: 2,
          title: "Real-time Analytics",
          description: "Track ticket sales, attendance, and revenue in real-time with comprehensive reporting"
        },
        {
          id: 3,
          title: "Secure Payment Processing",
          description: "Multiple payment gateways with PCI DSS compliance for secure transactions"
        },
        {
          id: 4,
          title: "Multi-device Compatibility",
          description: "Access your event management tools from any device with responsive design"
        },
        {
          id: 5,
          title: "Increased Revenue Opportunities",
          description: "Maximize your event revenue with dynamic pricing and promotional tools"
        },
        {
          id: 6,
          title: "Enhanced Attendee Experience",
          description: "Provide seamless check-in and engagement features for better attendee satisfaction"
        },
        {
          id: 7,
          title: "Reduced Administrative Overhead",
          description: "Automate repetitive tasks and reduce manual work with smart workflows"
        },
        {
          id: 8,
          title: "Professional Event Branding",
          description: "Customize your ticketing platform with your brand colors and logos"
        }
      ]
    },
    industries: {
      id: 2,
      title: "Target Industries",
      content: "Serving diverse industries with specialized event management needs",
      items: [
        {
          id: 1,
          title: "Event Management",
          description: "Professional event organizers and management companies"
        },
        {
          id: 2,
          title: "Entertainment",
          description: "Concert venues, theaters, and entertainment venues"
        },
        {
          id: 3,
          title: "Corporate Events",
          description: "Business conferences, seminars, and corporate gatherings"
        },
        {
          id: 4,
          title: "Sports & Recreation",
          description: "Sports events, tournaments, and recreational activities"
        },
        {
          id: 5,
          title: "Education",
          description: "Educational institutions and training organizations"
        },
        {
          id: 6,
          title: "Non-Profit",
          description: "Charity events, fundraisers, and community gatherings"
        }
      ]
    },
    casestudies: {
      id: 3,
      title: "Success Stories",
      content: "Real-world implementations and measurable results",
      items: [
        {
          id: 1,
          title: "Music Festival Success",
          description: "Helped a major music festival sell 50,000+ tickets and manage 3-day event logistics"
        },
        {
          id: 2,
          title: "Corporate Conference",
          description: "Streamlined corporate conference with 1,000+ attendees and complex session management"
        }
      ]
    },
    faqs: {
      id: 4,
      title: "Frequently Asked Questions",
      content: "Common questions about our event ticketing platform",
      items: [
        {
          id: 1,
          title: "How does the pricing work?",
          description: "We offer flexible pricing based on event size and features. Contact us for a custom quote."
        },
        {
          id: 2,
          title: "Can I integrate with my existing systems?",
          description: "Yes, we offer API integration with popular CRM, marketing, and payment systems."
        },
        {
          id: 3,
          title: "Do you provide customer support?",
          description: "Yes, we offer 24/7 customer support for all our clients."
        }
      ]
    },
    pricing: [
      {
        id: 1,
        name: "Starter",
        description: "Perfect for small events and startups",
        price: 29,
        period: "month",
        currency: "USD",
        features: [
          "Up to 1,000 tickets per month",
          "Basic event dashboard",
          "Email support",
          "Standard payment gateways",
          "Mobile check-in app"
        ],
        isRecommended: false
      },
      {
        id: 2,
        name: "Professional",
        description: "Ideal for growing event businesses",
        price: 79,
        period: "month",
        currency: "USD",
        features: [
          "Up to 10,000 tickets per month",
          "Advanced analytics",
          "Priority support",
          "Custom branding",
          "API access",
          "Multi-language support"
        ],
        isRecommended: true
      },
      {
        id: 3,
        name: "Enterprise",
        description: "For large-scale events and organizations",
        price: 199,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited tickets",
          "White-label solution",
          "Dedicated account manager",
          "Custom integrations",
          "Advanced security features",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.entry-x.com",
    downloadUrl: "https://entry-x.com/download",
    supportUrl: "https://support.entry-x.com",
    category: ["SaaS", "Event Management", "Ticketing"],
    tags: ["event-ticketing", "saas", "event-management", "ticketing-system", "analytics"],
    status: "Active"
  },
  {
    id: 2,
    title: "OpsCloud™: Enterprise ERP Platform",
    slug: "opscloud-enterprise-erp-platform",
    translationKey: "opscloud-enterprise-erp-platform",
    description: "OpsCloud™ is a comprehensive, cloud-based Enterprise Resource Planning (ERP) platform specifically engineered for small and medium enterprises across Africa. Built on a modern technology stack with modular architecture, OpsCloud™ provides businesses with a complete suite of integrated management tools including advanced accounting and financial management, sophisticated inventory and warehouse operations, manufacturing and production planning, customer relationship management (CRM), and robust e-commerce capabilities.\n\nDesigned with African businesses in mind, OpsCloud™ features seamless integration with popular local payment gateways including Opay, MoniePoint, and PayStack, ensuring smooth transaction processing for your customers. The platform's API-first architecture enables effortless integration with existing websites, mobile applications, and third-party business tools, making it the perfect solution for businesses looking to modernize their operations without disrupting their current workflows.\n\nWhat sets OpsCloud™ apart is its intelligent modular design that allows businesses to start with essential features and gradually expand their capabilities as they grow. Whether you're managing a fashion e-commerce store, running a manufacturing operation, operating an educational institution, or providing professional services, OpsCloud™ adapts to your specific industry requirements. The platform includes powerful business intelligence tools powered by Frappe Insights, providing real-time analytics, automated reporting, and AI-driven insights for data-driven decision making.\n\nBuilt on dedicated server infrastructure with a 99.9% uptime SLA, OpsCloud™ ensures your business operations never skip a beat. The platform supports multi-location management, multi-currency operations, and provides comprehensive workflow automation to streamline your business processes. With 24/7 support, comprehensive training programs, and a commitment to helping African SMEs compete on a global scale, OpsCloud™ is more than just software – it's your partner in business growth and digital transformation.",
    shortDescription: "Cloud-based, modular ERP platform designed for African SMEs with comprehensive accounting, inventory, CRM, and e-commerce capabilities. Features API integrations, local payment gateways, and AI-driven analytics.",
    image: "/src/assets/images/IMG_2248.JPG",
    gallery: [
      {
        id: 1,
        image: "/src/assets/images/IMG_2248.JPG",
        title: "OpsCloud ERP Dashboard",
        type: "screenshot",
        size: "large"
      },
      {
        id: 2,
        image: "/api/placeholder/400/300",
        title: "CRM Management Interface",
        type: "interface",
        size: "medium"
      },
      {
        id: 3,
        image: "/api/placeholder/400/300",
        title: "Inventory Tracking System",
        type: "feature",
        size: "medium"
      },
      {
        id: 4,
        image: "/api/placeholder/600/400",
        title: "Financial Reporting Suite",
        type: "demo",
        size: "large"
      },
      {
        id: 5,
        image: "/api/placeholder/400/300",
        title: "Workflow Automation",
        type: "feature",
        size: "medium"
      },
      {
        id: 6,
        image: "/api/placeholder/400/300",
        title: "Mobile Business App",
        type: "screenshot",
        size: "medium"
      }
    ],
    keyFeatures: [
      "Complete Accounting & Financial Management",
      "Advanced Inventory & Warehouse Management",
      "Manufacturing & Production Planning",
      "Customer Relationship Management (CRM)",
      "Built-in E-commerce Capabilities",
      "Business Intelligence & Analytics (Frappe Insights)",
      "Modular Design for Cost-Effective Implementation",
      "API Integrations for Website & App Connectivity",
      "Payment Gateway Integration (Opay, MoniePoint, PayStack)",
      "Multi-location & Multi-currency Support",
      "Automated Workflows & Process Management",
      "Real-time Reporting & Dashboard Analytics",
      "Mobile Access & Cloud-based Infrastructure",
      "Headless E-commerce Support",
      "AI-driven Pricing & Growth Analytics",
      "Dedicated Server Infrastructure with SaaS Dashboard"
    ],
    benefits: {
      id: 5,
      title: "Business Benefits",
      content: "Comprehensive benefits tailored for African SMEs and growing businesses",
      items: [
        {
          id: 9,
          title: "Affordable & Scalable Solutions",
          description: "Cost-effective modular design allows businesses to select only needed features and scale as they grow"
        },
        {
          id: 10,
          title: "Enhanced Operational Efficiency",
          description: "Streamline complex business processes with automation and real-time data integration"
        },
        {
          id: 11,
          title: "African Market Optimization",
          description: "Built specifically for African SMEs with local payment gateways, regulations, and business practices"
        },
        {
          id: 12,
          title: "Multi-channel Business Management",
          description: "Seamlessly manage online stores, physical locations, and mobile operations from one platform"
        },
        {
          id: 13,
          title: "Data-Driven Decision Making",
          description: "AI-powered analytics and business intelligence for pricing strategies and growth optimization"
        },
        {
          id: 14,
          title: "99.9% Uptime SLA",
          description: "Robust infrastructure with dedicated servers ensuring reliable business operations"
        },
        {
          id: 15,
          title: "Rapid Implementation",
          description: "Quick deployment with comprehensive training and ongoing support for immediate productivity"
        },
        {
          id: 16,
          title: "Future-Ready Technology",
          description: "Built on modern tech stack with API-first architecture for seamless integrations and growth"
        }
      ]
    },
    industries: {
      id: 6,
      title: "Target Industries",
      content: "Tailored solutions for diverse African SME industries with specific business requirements",
      items: [
        {
          id: 7,
          title: "E-commerce (Fashion & Food)",
          description: "Online stores with integrated inventory, payment processing, and API-driven website connectivity"
        },
        {
          id: 8,
          title: "Manufacturing & Couture",
          description: "Production planning, BOM management, custom orders, and shop floor management systems"
        },
        {
          id: 9,
          title: "Education & Online Learning",
          description: "Course management, student tracking, billing, and enrollment analytics for educational institutions"
        },
        {
          id: 10,
          title: "Automotive Repair Services",
          description: "Service orders, parts inventory tracking, customer appointments, and integrated invoicing"
        },
        {
          id: 11,
          title: "Real Estate Agencies",
          description: "Property listings management, client interactions, and comprehensive financial reporting"
        },
        {
          id: 12,
          title: "Spa, Barbers & Salons",
          description: "Appointment scheduling, product inventory, customer loyalty programs, and service management"
        },
        {
          id: 13,
          title: "Wholesale & Retail Vendors",
          description: "Supply chain optimization, bulk order processing, multi-location management, and sales analytics"
        },
        {
          id: 14,
          title: "Food Processing & Distribution",
          description: "Production workflows, quality control, inventory tracking, and distribution management"
        }
      ]
    },
    casestudies: {
      id: 7,
      title: "Success Stories",
      content: "Real-world implementations across African SMEs with measurable business improvements",
      items: [
        {
          id: 3,
          title: "Fashion E-commerce Transformation",
          description: "Helped a Nigerian fashion brand integrate online and offline operations, increasing sales by 45% with seamless inventory management"
        },
        {
          id: 4,
          title: "Manufacturing Optimization in Ghana",
          description: "Streamlined production workflows for a food processing company, improving efficiency by 35% and reducing waste by 20%"
        },
        {
          id: 5,
          title: "Educational Institution Digitization",
          description: "Modernized student management for a Kenya-based online learning platform serving 5,000+ students with automated billing"
        },
        {
          id: 6,
          title: "Multi-location Retail Success",
          description: "Unified operations for a South African salon chain across 12 locations, improving customer experience and reducing costs by 30%"
        }
      ]
    },
    faqs: {
      id: 8,
      title: "Frequently Asked Questions",
      content: "Common questions about OpsCloud™ ERP platform and implementation",
      items: [
        {
          id: 4,
          title: "How long does implementation take?",
          description: "Implementation typically takes 2-6 weeks depending on business complexity, modules selected, and customization needs. We provide dedicated support throughout."
        },
        {
          id: 5,
          title: "Can I start with specific modules and add more later?",
          description: "Yes! OpsCloud™'s modular design allows you to start with essential features and seamlessly add modules as your business grows."
        },
        {
          id: 6,
          title: "What payment gateways are supported for African markets?",
          description: "We support major African payment processors including Opay, MoniePoint, PayStack, and other local gateways for seamless transactions."
        },
        {
          id: 7,
          title: "Is my data secure and backed up?",
          description: "Yes, we use enterprise-grade security with dedicated servers, 99.9% uptime SLA, regular backups, and compliance with international data protection standards."
        },
        {
          id: 8,
          title: "Can OpsCloud™ integrate with my existing website or app?",
          description: "Absolutely! Our API-first architecture enables seamless integration with existing websites, mobile apps, and third-party business tools."
        },
        {
          id: 9,
          title: "Do you provide training and ongoing support?",
          description: "Yes, we provide comprehensive training, 24/7 support, and dedicated account management to ensure your team maximizes OpsCloud™'s potential."
        }
      ]
    },
    pricing: [
      {
        id: 4,
        name: "Starter",
        description: "Perfect for small businesses and startups",
        price: 29,
        period: "month",
        currency: "USD",
        features: [
          "Up to 3 users",
          "Basic Accounting Module",
          "Inventory Management",
          "Email Support",
          "Mobile Access",
          "Basic Reporting",
          "1 Location Support"
        ],
        isRecommended: false
      },
      {
        id: 5,
        name: "Professional",
        description: "Ideal for growing SMEs with multiple operations",
        price: 79,
        period: "month",
        currency: "USD",
        features: [
          "Up to 15 users",
          "Full ERP Modules (CRM, Manufacturing, E-commerce)",
          "Advanced Analytics & BI",
          "24/7 Support",
          "API Access & Integrations",
          "Multi-location Support",
          "Payment Gateway Integration",
          "Custom Workflows"
        ],
        isRecommended: true
      },
      {
        id: 6,
        name: "Enterprise",
        description: "For large organizations with complex requirements",
        price: 199,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited users",
          "All Modules + AI Analytics",
          "Dedicated Server Instance",
          "Custom Development",
          "White Label Options",
          "Advanced Security & Compliance",
          "Custom Integrations",
          "99.9% SLA Guarantee",
          "Dedicated Account Manager"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.opscloud.com",
    downloadUrl: "https://opscloud.com/download",
    supportUrl: "https://support.opscloud.com",
    category: ["ERP", "Business Management", "SaaS"],
    tags: ["erp", "business-management", "crm", "inventory", "analytics", "workflow"],
    status: "Active"
  },
  {
    id: 3,
    title: "SecureGate: Cybersecurity Suite",
    slug: "securegate-cybersecurity-suite",
    translationKey: "securegate-cybersecurity-suite",
    shortDescription: "Comprehensive cybersecurity solution for enterprise protection",
    description: "Comprehensive cybersecurity solution for enterprise protection",
    image: "/src/assets/images/IMG_2254.JPG",
    gallery: [
      {
        id: 1,
        image: "/src/assets/images/IMG_2254.JPG",
        title: "SecureGate Security Dashboard",
        type: "screenshot",
        size: "large"
      },
      {
        id: 2,
        image: "/api/placeholder/400/300",
        title: "Threat Detection Interface",
        type: "feature",
        size: "medium"
      },
      {
        id: 3,
        image: "/api/placeholder/400/300",
        title: "Network Security Monitor",
        type: "interface",
        size: "medium"
      },
      {
        id: 4,
        image: "/api/placeholder/600/400",
        title: "Incident Response Center",
        type: "demo",
        size: "large"
      },
      {
        id: 5,
        image: "/api/placeholder/400/300",
        title: "Compliance Reporting",
        type: "feature",
        size: "medium"
      },
      {
        id: 6,
        image: "/api/placeholder/400/300",
        title: "Endpoint Protection View",
        type: "screenshot",
        size: "medium"
      }
    ],
    keyFeatures: [
      "Endpoint Security",
      "Network Security",
      "Cloud Security",
      "Data Security",
      "Threat Detection",
      "Incident Response",
      "Compliance",
      "Multi-platform Support",
      "API Integration",
      "Real-time Analytics"
    ],
    benefits: {
      id: 20,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to secure their digital assets",
      items: [
        {
          id: 33,
          title: "Enhanced Security",
          description: "Provide enhanced security with enterprise-grade security features"
        },
        {
          id: 34,
          title: "Reduced Risk",
          description: "Reduce the risk of data breaches and cyber attacks"
        },
        {
          id: 35,
          title: "Compliance",
          description: "Ensure compliance with industry-specific regulations"
        },
        {
          id: 36,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive security"
        },
        {
          id: 37,
          title: "Increased Efficiency",
          description: "Maximize your security efficiency with dynamic pricing and promotional tools"
        },
        {
          id: 38,
          title: "Enhanced Threat Detection",
          description: "Improve threat detection and response with real-time analytics"
        },
        {
          id: 39,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your security systems can scale with you"
        },
        {
          id: 40,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        }
      ]
    },
    industries: {
      id: 15,
      title: "Target Industries",
      content: "Serving diverse industries with cybersecurity needs",
      items: [
        {
          id: 25,
          title: "Technology",
          description: "Tech companies and startups focused on cybersecurity"
        },
        {
          id: 26,
          title: "Manufacturing",
          description: "Production companies and factories looking to secure their operations"
        },
        {
          id: 27,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to secure patient data"
        },
        {
          id: 28,
          title: "Retail",
          description: "Retail businesses looking to secure their customer data"
        },
        {
          id: 29,
          title: "Financial Services",
          description: "Financial institutions looking to secure their transactions and data"
        },
        {
          id: 30,
          title: "Education",
          description: "Educational institutions looking to secure their student data"
        }
      ]
    },
    casestudies: {
      id: 21,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 12,
          title: "Endpoint Security",
          description: "Helped a 50-store retail chain secure their endpoints and reduce the risk of data breaches"
        },
        {
          id: 13,
          title: "Network Security",
          description: "Streamlined network security for a manufacturing company, improving security by 30%"
        },
        {
          id: 14,
          title: "Cloud Security",
          description: "Restored cloud security for a healthcare network after a major data breach"
        }
      ]
    },
    faqs: {
      id: 22,
      title: "Frequently Asked Questions",
      content: "Common questions about our cybersecurity platform",
      items: [
        {
          id: 15,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on business complexity and customization needs."
        },
        {
          id: 16,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular cybersecurity platforms."
        },
        {
          id: 17,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 18,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 13,
        name: "Starter",
        description: "Perfect for small businesses getting started",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 5 users",
          "Basic cybersecurity",
          "API access",
          "Mobile access",
          "Basic reporting"
        ],
        isRecommended: false
      },
      {
        id: 14,
        name: "Professional",
        description: "Ideal for growing businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 20 users",
          "Advanced cybersecurity",
          "Full API access",
          "24/7 support",
          "Advanced workflows",
          "Multi-location support"
        ],
        isRecommended: true
      },
      {
        id: 15,
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited users",
          "Custom cybersecurity solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.securegate.com",
    downloadUrl: "https://securegate.com/download",
    supportUrl: "https://support.securegate.com",
    category: ["Cybersecurity", "SaaS"],
    tags: ["cybersecurity", "saas", "endpoint-security", "network-security", "cloud-security"],
    status: "Active"
  },
  {
    id: 4,
    title: "AnalyticsPro: Business Intelligence Platform",
    slug: "analyticspro-business-intelligence-platform",
    translationKey: "analyticspro-business-intelligence-platform",
    description: "Advanced business intelligence and analytics platform",
    image: "/src/assets/images/IMG_2255.JPG",
    gallery: [
      {
        id: 1,
        image: "/src/assets/images/IMG_2255.JPG",
        title: "AnalyticsPro BI Dashboard",
        type: "screenshot",
        size: "large"
      },
      {
        id: 2,
        image: "/api/placeholder/400/300",
        title: "Data Visualization Tools",
        type: "feature",
        size: "medium"
      },
      {
        id: 3,
        image: "/api/placeholder/400/300",
        title: "Predictive Analytics Engine",
        type: "interface",
        size: "medium"
      },
      {
        id: 4,
        image: "/api/placeholder/600/400",
        title: "Machine Learning Models",
        type: "demo",
        size: "large"
      },
      {
        id: 5,
        image: "/api/placeholder/400/300",
        title: "Real-time Data Processing",
        type: "feature",
        size: "medium"
      },
      {
        id: 6,
        image: "/api/placeholder/400/300",
        title: "Business Intelligence Reports",
        type: "screenshot",
        size: "medium"
      }
    ],
    keyFeatures: [
      "Business Intelligence",
      "Data Analysis",
      "Data Visualization",
      "Real-time Analytics",
      "Predictive Analytics",
      "Machine Learning",
      "Natural Language Processing",
      "API Integration",
      "Multi-platform Support",
      "Scalability"
    ],
    benefits: {
      id: 21,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to leverage data for informed decision-making",
      items: [
        {
          id: 41,
          title: "Enhanced Decision Making",
          description: "Access to advanced analytics and insights for informed business decisions"
        },
        {
          id: 42,
          title: "Increased Efficiency",
          description: "Maximize your business efficiency with dynamic pricing and promotional tools"
        },
        {
          id: 43,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your analytics systems can scale with you"
        },
        {
          id: 44,
          title: "Improved Customer Experience",
          description: "Provide personalized experiences and improve customer satisfaction with data-driven features"
        },
        {
          id: 45,
          title: "Reduced Operational Costs",
          description: "Eliminate the need for manual data analysis and reduce IT overhead"
        },
        {
          id: 46,
          title: "Professional Data Branding",
          description: "Customize your analytics platform with your brand colors and logos"
        },
        {
          id: 47,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        },
        {
          id: 48,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive analytics"
        }
      ]
    },
    industries: {
      id: 16,
      title: "Target Industries",
      content: "Serving diverse industries with business intelligence and analytics needs",
      items: [
        {
          id: 31,
          title: "Technology",
          description: "Tech companies and startups focused on business intelligence and analytics"
        },
        {
          id: 32,
          title: "Manufacturing",
          description: "Production companies and factories looking to optimize their operations"
        },
        {
          id: 33,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to improve patient care"
        },
        {
          id: 34,
          title: "Retail",
          description: "Retail businesses looking to enhance their customer experience"
        },
        {
          id: 35,
          title: "Financial Services",
          description: "Financial institutions looking to leverage data for informed decision-making"
        },
        {
          id: 36,
          title: "Education",
          description: "Educational institutions looking to implement business intelligence and analytics"
        }
      ]
    },
    casestudies: {
      id: 22,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 15,
          title: "Data Analysis",
          description: "Helped a 50-store retail chain analyze data to improve customer experience"
        },
        {
          id: 16,
          title: "Predictive Analytics",
          description: "Streamlined operations for a manufacturing company, improving production by 30%"
        },
        {
          id: 17,
          title: "Data Visualization",
          description: "Restored data for a healthcare network after a major data breach"
        }
      ]
    },
    faqs: {
      id: 23,
      title: "Frequently Asked Questions",
      content: "Common questions about our business intelligence platform",
      items: [
        {
          id: 19,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on business complexity and customization needs."
        },
        {
          id: 20,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular business intelligence platforms."
        },
        {
          id: 21,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 22,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 16,
        name: "Starter",
        description: "Perfect for small businesses getting started",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 10 users",
          "Basic business intelligence",
          "API access",
          "Mobile access",
          "Basic reporting"
        ],
        isRecommended: false
      },
      {
        id: 17,
        name: "Professional",
        description: "Ideal for growing businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 50 users",
          "Advanced business intelligence",
          "Full API access",
          "24/7 support",
          "Advanced workflows",
          "Multi-location support"
        ],
        isRecommended: true
      },
      {
        id: 18,
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited users",
          "Custom business intelligence solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.analyticspro.com",
    downloadUrl: "https://analyticspro.com/download",
    supportUrl: "https://support.analyticspro.com",
    category: ["Business Intelligence", "SaaS"],
    tags: ["business-intelligence", "saas", "data-analysis", "data-visualization", "machine-learning"],
    status: "Active"
  },
  {
    id: 5,
    title: "MobileFlow: Mobile App Development Suite",
    slug: "mobileflow-mobile-app-development-suite",
    translationKey: "mobileflow-mobile-app-development-suite",
    description: "Complete mobile application development and deployment platform",
    image: "/src/assets/images/IMG_2256.JPG",
    gallery: [
      {
        id: 1,
        image: "/src/assets/images/IMG_2256.JPG",
        title: "MobileFlow Development Suite",
        type: "screenshot",
        size: "large"
      },
      {
        id: 2,
        image: "/api/placeholder/400/300",
        title: "Cross-Platform Builder",
        type: "interface",
        size: "medium"
      },
      {
        id: 3,
        image: "/api/placeholder/400/300",
        title: "App Performance Analytics",
        type: "feature",
        size: "medium"
      },
      {
        id: 4,
        image: "/api/placeholder/600/400",
        title: "Live App Preview",
        type: "demo",
        size: "large"
      },
      {
        id: 5,
        image: "/api/placeholder/400/300",
        title: "API Integration Hub",
        type: "feature",
        size: "medium"
      },
      {
        id: 6,
        image: "/api/placeholder/400/300",
        title: "Deployment Dashboard",
        type: "screenshot",
        size: "medium"
      }
    ],
    keyFeatures: [
      "Mobile App Development",
      "Cross-platform Compatibility",
      "Real-time Analytics",
      "API Integration",
      "Multi-platform Support",
      "Scalability",
      "Automated Workflows",
      "Security",
      "Compliance",
      "Real-time Analytics"
    ],
    benefits: {
      id: 22,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to develop and deploy mobile applications",
      items: [
        {
          id: 49,
          title: "Enhanced Mobile App Development",
          description: "Streamline your mobile app development process with our intuitive dashboard and automated workflows"
        },
        {
          id: 50,
          title: "Cross-platform Compatibility",
          description: "Develop mobile applications that work across multiple platforms and devices"
        },
        {
          id: 51,
          title: "Real-time Analytics",
          description: "Track mobile app usage, performance, and engagement in real-time with comprehensive reporting"
        },
        {
          id: 52,
          title: "API Integration",
          description: "Seamlessly integrate mobile applications with other systems and platforms"
        },
        {
          id: 53,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive mobile app development"
        },
        {
          id: 54,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your mobile app development systems can scale with you"
        },
        {
          id: 55,
          title: "Improved Mobile App Performance",
          description: "Improve mobile app performance and user experience with real-time analytics"
        },
        {
          id: 56,
          title: "Professional Mobile App Branding",
          description: "Customize your mobile app development platform with your brand colors and logos"
        },
        {
          id: 57,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        },
        {
          id: 58,
          title: "Security and Compliance",
          description: "Ensure security and compliance with enterprise-grade security features"
        }
      ]
    },
    industries: {
      id: 17,
      title: "Target Industries",
      content: "Serving diverse industries with mobile app development needs",
      items: [
        {
          id: 37,
          title: "Technology",
          description: "Tech companies and startups focused on mobile app development"
        },
        {
          id: 38,
          title: "Manufacturing",
          description: "Production companies and factories looking to automate their operations"
        },
        {
          id: 39,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to improve patient care"
        },
        {
          id: 40,
          title: "Retail",
          description: "Retail businesses looking to enhance their customer experience"
        },
        {
          id: 41,
          title: "Financial Services",
          description: "Financial institutions looking to develop mobile banking applications"
        },
        {
          id: 42,
          title: "Education",
          description: "Educational institutions looking to develop mobile learning applications"
        }
      ]
    },
    casestudies: {
      id: 23,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 18,
          title: "Mobile App Development",
          description: "Developed a mobile app for a retail chain, increasing customer engagement by 20%"
        },
        {
          id: 19,
          title: "Cross-platform Compatibility",
          description: "Developed a mobile app that works across multiple platforms"
        },
        {
          id: 20,
          title: "Real-time Analytics",
          description: "Streamlined operations for a manufacturing company, improving production by 30%"
        }
      ]
    },
    faqs: {
      id: 24,
      title: "Frequently Asked Questions",
      content: "Common questions about our mobile app development platform",
      items: [
        {
          id: 23,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on project complexity and customization needs."
        },
        {
          id: 24,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular mobile app development platforms."
        },
        {
          id: 25,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 26,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 19,
        name: "Starter",
        description: "Perfect for small mobile app projects",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 10 mobile apps",
          "Basic mobile app development",
          "API access",
          "Mobile access",
          "Basic reporting"
        ],
        isRecommended: false
      },
      {
        id: 20,
        name: "Professional",
        description: "Ideal for growing mobile app businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 50 mobile apps",
          "Advanced mobile app development",
          "Full API access",
          "24/7 support",
          "Advanced workflows",
          "Multi-location support"
        ],
        isRecommended: true
      },
      {
        id: 21,
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited mobile apps",
          "Custom mobile app development solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.mobileflow.com",
    downloadUrl: "https://mobileflow.com/download",
    supportUrl: "https://support.mobileflow.com",
    category: ["Mobile App Development", "SaaS"],
    tags: ["mobile-app-development", "saas", "cross-platform", "real-time-analytics", "automated-workflows"],
    status: "Active"
  },
  {
    id: 6,
    title: "API Gateway: Integration Platform",
    slug: "api-gateway-integration-platform",
    translationKey: "api-gateway-integration-platform",
    description: "Enterprise API gateway and integration management platform",
    image: "/src/assets/images/IMG_2257.JPG",
    keyFeatures: [
      "API Gateway",
      "Integration Management",
      "Real-time Analytics",
      "Automated Workflows",
      "Security",
      "Compliance",
      "Multi-platform Support",
      "Scalability",
      "API Integration",
      "Real-time Analytics"
    ],
    benefits: {
      id: 23,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to integrate and manage APIs",
      items: [
        {
          id: 59,
          title: "Enhanced API Integration",
          description: "Streamline your API integration process with our intuitive dashboard and automated workflows"
        },
        {
          id: 60,
          title: "Real-time Analytics",
          description: "Track API usage, performance, and engagement in real-time with comprehensive reporting"
        },
        {
          id: 61,
          title: "Automated Workflows",
          description: "Automate repetitive tasks and reduce manual work with smart workflows"
        },
        {
          id: 62,
          title: "Security",
          description: "Ensure security and compliance with enterprise-grade security features"
        },
        {
          id: 63,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive API integration"
        },
        {
          id: 64,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your API integration systems can scale with you"
        },
        {
          id: 65,
          title: "Improved API Performance",
          description: "Improve API performance and user experience with real-time analytics"
        },
        {
          id: 66,
          title: "Professional API Branding",
          description: "Customize your API integration platform with your brand colors and logos"
        },
        {
          id: 67,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        },
        {
          id: 68,
          title: "Compliance",
          description: "Ensure compliance with industry-specific regulations"
        }
      ]
    },
    industries: {
      id: 18,
      title: "Target Industries",
      content: "Serving diverse industries with API integration needs",
      items: [
        {
          id: 43,
          title: "Technology",
          description: "Tech companies and startups focused on API integration"
        },
        {
          id: 44,
          title: "Manufacturing",
          description: "Production companies and factories looking to automate their operations"
        },
        {
          id: 45,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to integrate APIs for patient care"
        },
        {
          id: 46,
          title: "Retail",
          description: "Retail businesses looking to integrate APIs for customer experience"
        },
        {
          id: 47,
          title: "Financial Services",
          description: "Financial institutions looking to integrate APIs for banking and financial services"
        },
        {
          id: 48,
          title: "Education",
          description: "Educational institutions looking to integrate APIs for learning"
        }
      ]
    },
    casestudies: {
      id: 24,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 21,
          title: "API Integration",
          description: "Streamlined API integration for a retail chain, increasing efficiency by 40%"
        },
        {
          id: 22,
          title: "API Gateway",
          description: "Developed a custom API gateway for a manufacturing company, improving production by 30%"
        },
        {
          id: 23,
          title: "API Integration",
          description: "Streamlined API integration for a healthcare network, improving patient care by 20%"
        }
      ]
    },
    faqs: {
      id: 25,
      title: "Frequently Asked Questions",
      content: "Common questions about our API integration platform",
      items: [
        {
          id: 27,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on project complexity and customization needs."
        },
        {
          id: 28,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular API integration platforms."
        },
        {
          id: 29,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 30,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 22,
        name: "Starter",
        description: "Perfect for small API projects",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 10 APIs",
          "Basic API integration",
          "API access",
          "Mobile access",
          "Basic reporting"
        ],
        isRecommended: false
      },
      {
        id: 23,
        name: "Professional",
        description: "Ideal for growing API businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 50 APIs",
          "Advanced API integration",
          "Full API access",
          "24/7 support",
          "Advanced workflows",
          "Multi-location support"
        ],
        isRecommended: true
      },
      {
        id: 24,
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited APIs",
          "Custom API integration solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.api-gateway.com",
    downloadUrl: "https://api-gateway.com/download",
    supportUrl: "https://support.api-gateway.com",
    category: ["API Integration", "SaaS"],
    tags: ["api-gateway", "saas", "api-integration", "real-time-analytics", "automated-workflows"],
    status: "Active"
  },
  {
    id: 7,
    title: "DevOps Hub: CI/CD Platform",
    slug: "devops-hub-cicd-platform",
    translationKey: "devops-hub-cicd-platform",
    description: "Comprehensive DevOps and continuous integration platform",
    image: "/src/assets/images/IMG_2258.JPG",
    keyFeatures: [
      "CI/CD Platform",
      "Real-time Analytics",
      "Automated Workflows",
      "Security",
      "Compliance",
      "Multi-platform Support",
      "Scalability",
      "API Integration",
      "Real-time Analytics"
    ],
    benefits: {
      id: 24,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to implement DevOps and CI/CD practices",
      items: [
        {
          id: 69,
          title: "Enhanced DevOps and CI/CD Practices",
          description: "Streamline your DevOps and CI/CD practices with our intuitive dashboard and automated workflows"
        },
        {
          id: 70,
          title: "Real-time Analytics",
          description: "Track DevOps and CI/CD usage, performance, and engagement in real-time with comprehensive reporting"
        },
        {
          id: 71,
          title: "Automated Workflows",
          description: "Automate repetitive tasks and reduce manual work with smart workflows"
        },
        {
          id: 72,
          title: "Security",
          description: "Ensure security and compliance with enterprise-grade security features"
        },
        {
          id: 73,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive DevOps and CI/CD practices"
        },
        {
          id: 74,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your DevOps and CI/CD systems can scale with you"
        },
        {
          id: 75,
          title: "Improved DevOps and CI/CD Performance",
          description: "Improve DevOps and CI/CD performance and user experience with real-time analytics"
        },
        {
          id: 76,
          title: "Professional DevOps Branding",
          description: "Customize your DevOps and CI/CD platform with your brand colors and logos"
        },
        {
          id: 77,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        },
        {
          id: 78,
          title: "Compliance",
          description: "Ensure compliance with industry-specific regulations"
        }
      ]
    },
    industries: {
      id: 19,
      title: "Target Industries",
      content: "Serving diverse industries with DevOps and CI/CD needs",
      items: [
        {
          id: 49,
          title: "Technology",
          description: "Tech companies and startups focused on DevOps and CI/CD"
        },
        {
          id: 50,
          title: "Manufacturing",
          description: "Production companies and factories looking to automate their operations"
        },
        {
          id: 51,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to implement DevOps for patient care"
        },
        {
          id: 52,
          title: "Retail",
          description: "Retail businesses looking to implement DevOps for customer experience"
        },
        {
          id: 53,
          title: "Financial Services",
          description: "Financial institutions looking to implement DevOps for banking and financial services"
        },
        {
          id: 54,
          title: "Education",
          description: "Educational institutions looking to implement DevOps for learning"
        }
      ]
    },
    casestudies: {
      id: 25,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 24,
          title: "DevOps and CI/CD Implementation",
          description: "Streamlined DevOps and CI/CD practices for a manufacturing company, improving production by 30%"
        },
        {
          id: 25,
          title: "DevOps and CI/CD Implementation",
          description: "Streamlined DevOps and CI/CD practices for a healthcare network, improving patient care by 20%"
        },
        {
          id: 26,
          title: "DevOps and CI/CD Implementation",
          description: "Streamlined DevOps and CI/CD practices for a retail chain, increasing efficiency by 40%"
        }
      ]
    },
    faqs: {
      id: 26,
      title: "Frequently Asked Questions",
      content: "Common questions about our DevOps and CI/CD platform",
      items: [
        {
          id: 31,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on project complexity and customization needs."
        },
        {
          id: 32,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular DevOps and CI/CD platforms."
        },
        {
          id: 33,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 34,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 25,
        name: "Starter",
        description: "Perfect for small DevOps projects",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 10 DevOps projects",
          "Basic DevOps and CI/CD",
          "API access",
          "Mobile access",
          "Basic reporting"
        ],
        isRecommended: false
      },
      {
        id: 26,
        name: "Professional",
        description: "Ideal for growing DevOps businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 50 DevOps projects",
          "Advanced DevOps and CI/CD",
          "Full API access",
          "24/7 support",
          "Advanced workflows",
          "Multi-location support"
        ],
        isRecommended: true
      },
      {
        id: 27,
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited DevOps projects",
          "Custom DevOps and CI/CD solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.devops-hub.com",
    downloadUrl: "https://devops-hub.com/download",
    supportUrl: "https://support.devops-hub.com",
    category: ["DevOps", "SaaS"],
    tags: ["devops", "saas", "cicd", "real-time-analytics", "automated-workflows"],
    status: "Active"
  },
  {
    id: 8,
    title: "DataVault: Data Management Platform",
    slug: "datavault-data-management-platform",
    translationKey: "datavault-data-management-platform",
    description: "Enterprise data management and governance platform",
    image: "/src/assets/images/IMG_2259.JPG",
    keyFeatures: [
      "Data Management",
      "Data Governance",
      "Data Migration",
      "Data Security",
      "Real-time Analytics",
      "Automated Workflows",
      "Multi-platform Support",
      "Scalability",
      "API Integration",
      "Real-time Analytics"
    ],
    benefits: {
      id: 25,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to manage their data efficiently",
      items: [
        {
          id: 79,
          title: "Enhanced Data Management",
          description: "Streamline your data management process with our intuitive dashboard and automated workflows"
        },
        {
          id: 80,
          title: "Real-time Analytics",
          description: "Track data usage, storage, and performance in real-time with comprehensive reporting"
        },
        {
          id: 81,
          title: "Data Migration",
          description: "Seamlessly migrate data between platforms and systems"
        },
        {
          id: 82,
          title: "Data Security",
          description: "Ensure data security with enterprise-grade security features"
        },
        {
          id: 83,
          title: "Data Governance",
          description: "Ensure compliance with industry-specific regulations"
        },
        {
          id: 84,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive data management"
        },
        {
          id: 85,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your data management systems can scale with you"
        },
        {
          id: 86,
          title: "Improved Data Efficiency",
          description: "Maximize your data efficiency with dynamic pricing and promotional tools"
        },
        {
          id: 87,
          title: "Professional Data Branding",
          description: "Customize your data management platform with your brand colors and logos"
        },
        {
          id: 88,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        }
      ]
    },
    industries: {
      id: 20,
      title: "Target Industries",
      content: "Serving diverse industries with data management and governance needs",
      items: [
        {
          id: 55,
          title: "Technology",
          description: "Tech companies and startups focused on data management and governance"
        },
        {
          id: 56,
          title: "Manufacturing",
          description: "Production companies and factories looking to optimize their data management"
        },
        {
          id: 57,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to secure patient data"
        },
        {
          id: 58,
          title: "Retail",
          description: "Retail businesses looking to secure customer data"
        },
        {
          id: 59,
          title: "Financial Services",
          description: "Financial institutions looking to secure transactions and data"
        },
        {
          id: 60,
          title: "Education",
          description: "Educational institutions looking to secure student data"
        }
      ]
    },
    casestudies: {
      id: 26,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 27,
          title: "Data Migration",
          description: "Migrated data from legacy systems to new platforms for a retail chain, increasing efficiency by 40%"
        },
        {
          id: 28,
          title: "Data Governance",
          description: "Streamlined data governance for a manufacturing company, improving data accuracy by 30%"
        },
        {
          id: 29,
          title: "Data Security",
          description: "Restored data for a healthcare network after a major data breach"
        }
      ]
    },
    faqs: {
      id: 27,
      title: "Frequently Asked Questions",
      content: "Common questions about our data management platform",
      items: [
        {
          id: 35,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on project complexity and customization needs."
        },
        {
          id: 36,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular data management platforms."
        },
        {
          id: 37,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 38,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 28,
        name: "Starter",
        description: "Perfect for small data projects",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 100 GB of data storage",
          "Basic data dashboard",
          "Email support",
          "Standard data migration tools",
          "Mobile access"
        ],
        isRecommended: false
      },
      {
        id: 29,
        name: "Professional",
        description: "Ideal for growing data businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 1 TB of data storage",
          "Advanced data analytics",
          "Priority support",
          "Custom branding",
          "API access",
          "Multi-language support"
        ],
        isRecommended: true
      },
      {
        id: 30,
        name: "Enterprise",
        description: "For large-scale data management and governance",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited data storage",
          "Custom data management solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.datavault.com",
    downloadUrl: "https://datavault.com/download",
    supportUrl: "https://support.datavault.com",
    category: ["Data Management", "SaaS"],
    tags: ["data-management", "saas", "data-governance", "data-migration", "data-security"],
    status: "Active"
  },
  {
    id: 9,
    title: "CloudManager: Infrastructure Management",
    slug: "cloudmanager-infrastructure-management",
    translationKey: "cloudmanager-infrastructure-management",
    description: "Multi-cloud infrastructure management and optimization platform",
    image: "/src/assets/images/IMG_2260.JPG",
    keyFeatures: [
      "Multi-cloud Infrastructure Management",
      "Real-time Analytics",
      "Automated Workflows",
      "Security",
      "Compliance",
      "Multi-platform Support",
      "Scalability",
      "API Integration",
      "Real-time Analytics"
    ],
    benefits: {
      id: 26,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to manage their infrastructure efficiently",
      items: [
        {
          id: 89,
          title: "Enhanced Multi-cloud Infrastructure Management",
          description: "Streamline your multi-cloud infrastructure management process with our intuitive dashboard and automated workflows"
        },
        {
          id: 90,
          title: "Real-time Analytics",
          description: "Track infrastructure usage, performance, and utilization in real-time with comprehensive reporting"
        },
        {
          id: 91,
          title: "Automated Workflows",
          description: "Automate repetitive tasks and reduce manual work with smart workflows"
        },
        {
          id: 92,
          title: "Security",
          description: "Ensure security and compliance with enterprise-grade security features"
        },
        {
          id: 93,
          title: "Compliance",
          description: "Ensure compliance with industry-specific regulations"
        },
        {
          id: 94,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive infrastructure management"
        },
        {
          id: 95,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your infrastructure management systems can scale with you"
        },
        {
          id: 96,
          title: "Improved Infrastructure Efficiency",
          description: "Maximize your infrastructure efficiency with dynamic pricing and promotional tools"
        },
        {
          id: 97,
          title: "Professional Infrastructure Branding",
          description: "Customize your infrastructure management platform with your brand colors and logos"
        },
        {
          id: 98,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        }
      ]
    },
    industries: {
      id: 21,
      title: "Target Industries",
      content: "Serving diverse industries with multi-cloud infrastructure management needs",
      items: [
        {
          id: 61,
          title: "Technology",
          description: "Tech companies and startups focused on multi-cloud infrastructure management"
        },
        {
          id: 62,
          title: "Manufacturing",
          description: "Production companies and factories looking to optimize their infrastructure"
        },
        {
          id: 63,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to optimize their infrastructure"
        },
        {
          id: 64,
          title: "Retail",
          description: "Retail businesses looking to optimize their infrastructure"
        },
        {
          id: 65,
          title: "Financial Services",
          description: "Financial institutions looking to optimize their infrastructure"
        },
        {
          id: 66,
          title: "Education",
          description: "Educational institutions looking to optimize their infrastructure"
        }
      ]
    },
    casestudies: {
      id: 27,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 30,
          title: "Multi-cloud Infrastructure Management",
          description: "Streamlined multi-cloud infrastructure management for a manufacturing company, improving efficiency by 40%"
        },
        {
          id: 31,
          title: "Multi-cloud Infrastructure Management",
          description: "Streamlined multi-cloud infrastructure management for a healthcare network, improving patient care by 20%"
        },
        {
          id: 32,
          title: "Multi-cloud Infrastructure Management",
          description: "Streamlined multi-cloud infrastructure management for a retail chain, improving customer experience by 20%"
        }
      ]
    },
    faqs: {
      id: 28,
      title: "Frequently Asked Questions",
      content: "Common questions about our multi-cloud infrastructure management platform",
      items: [
        {
          id: 39,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on project complexity and customization needs."
        },
        {
          id: 40,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular multi-cloud infrastructure management platforms."
        },
        {
          id: 41,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 42,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 31,
        name: "Starter",
        description: "Perfect for small infrastructure projects",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 10 infrastructure projects",
          "Basic multi-cloud infrastructure management",
          "API access",
          "Mobile access",
          "Basic reporting"
        ],
        isRecommended: false
      },
      {
        id: 32,
        name: "Professional",
        description: "Ideal for growing infrastructure businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 50 infrastructure projects",
          "Advanced multi-cloud infrastructure management",
          "Full API access",
          "24/7 support",
          "Advanced workflows",
          "Multi-location support"
        ],
        isRecommended: true
      },
      {
        id: 33,
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited infrastructure projects",
          "Custom multi-cloud infrastructure management solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.cloudmanager.com",
    downloadUrl: "https://cloudmanager.com/download",
    supportUrl: "https://support.cloudmanager.com",
    category: ["Infrastructure Management", "SaaS"],
    tags: ["infrastructure-management", "saas", "multi-cloud", "real-time-analytics", "automated-workflows"],
    status: "Active"
  },
  {
    id: 10,
    title: "SmartConnect: IoT Platform",
    slug: "smartconnect-iot-platform",
    translationKey: "smartconnect-iot-platform",
    description: "Internet of Things platform for connected device management",
    image: "/src/assets/images/IMG_2261.JPG",
    keyFeatures: [
      "IoT Platform",
      "Real-time Analytics",
      "Automated Workflows",
      "Security",
      "Compliance",
      "Multi-platform Support",
      "Scalability",
      "API Integration",
      "Real-time Analytics"
    ],
    benefits: {
      id: 27,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to manage their IoT devices efficiently",
      items: [
        {
          id: 99,
          title: "Enhanced IoT Platform",
          description: "Streamline your IoT platform management process with our intuitive dashboard and automated workflows"
        },
        {
          id: 100,
          title: "Real-time Analytics",
          description: "Track IoT device usage, performance, and utilization in real-time with comprehensive reporting"
        },
        {
          id: 101,
          title: "Automated Workflows",
          description: "Automate repetitive tasks and reduce manual work with smart workflows"
        },
        {
          id: 102,
          title: "Security",
          description: "Ensure security and compliance with enterprise-grade security features"
        },
        {
          id: 103,
          title: "Compliance",
          description: "Ensure compliance with industry-specific regulations"
        },
        {
          id: 104,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive IoT platform management"
        },
        {
          id: 105,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your IoT platform management systems can scale with you"
        },
        {
          id: 106,
          title: "Improved IoT Efficiency",
          description: "Maximize your IoT efficiency with dynamic pricing and promotional tools"
        },
        {
          id: 107,
          title: "Professional IoT Branding",
          description: "Customize your IoT platform management platform with your brand colors and logos"
        },
        {
          id: 108,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        }
      ]
    },
    industries: {
      id: 22,
      title: "Target Industries",
      content: "Serving diverse industries with IoT device management needs",
      items: [
        {
          id: 67,
          title: "Technology",
          description: "Tech companies and startups focused on IoT device management"
        },
        {
          id: 68,
          title: "Manufacturing",
          description: "Production companies and factories looking to automate their operations"
        },
        {
          id: 69,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to optimize patient care"
        },
        {
          id: 70,
          title: "Retail",
          description: "Retail businesses looking to optimize their customer experience"
        },
        {
          id: 71,
          title: "Financial Services",
          description: "Financial institutions looking to leverage IoT for banking and financial services"
        },
        {
          id: 72,
          title: "Education",
          description: "Educational institutions looking to implement IoT for learning"
        }
      ]
    },
    casestudies: {
      id: 28,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 33,
          title: "IoT Platform Management",
          description: "Streamlined IoT platform management for a manufacturing company, improving efficiency by 40%"
        },
        {
          id: 34,
          title: "IoT Platform Management",
          description: "Streamlined IoT platform management for a healthcare network, improving patient care by 20%"
        },
        {
          id: 35,
          title: "IoT Platform Management",
          description: "Streamlined IoT platform management for a retail chain, improving customer experience by 20%"
        }
      ]
    },
    faqs: {
      id: 29,
      title: "Frequently Asked Questions",
      content: "Common questions about our IoT platform management platform",
      items: [
        {
          id: 43,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on project complexity and customization needs."
        },
        {
          id: 44,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular IoT platform management platforms."
        },
        {
          id: 45,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 46,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 34,
        name: "Starter",
        description: "Perfect for small IoT projects",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 10 IoT devices",
          "Basic IoT platform management",
          "API access",
          "Mobile access",
          "Basic reporting"
        ],
        isRecommended: false
      },
      {
        id: 35,
        name: "Professional",
        description: "Ideal for growing IoT businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 50 IoT devices",
          "Advanced IoT platform management",
          "Full API access",
          "24/7 support",
          "Advanced workflows",
          "Multi-location support"
        ],
        isRecommended: true
      },
      {
        id: 36,
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited IoT devices",
          "Custom IoT platform management solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.smartconnect.com",
    downloadUrl: "https://smartconnect.com/download",
    supportUrl: "https://support.smartconnect.com",
    category: ["IoT", "SaaS"],
    tags: ["iot", "saas", "real-time-analytics", "automated-workflows", "multi-platform"],
    status: "Active"
  },
  {
    id: 11,
    title: "BlockChain: Distributed Ledger Platform",
    slug: "blockchain-distributed-ledger-platform",
    translationKey: "blockchain-distributed-ledger-platform",
    description: "Enterprise blockchain and distributed ledger technology platform",
    image: "/src/assets/images/IMG_2262.JPG",
    keyFeatures: [
      "Blockchain Platform",
      "Distributed Ledger Technology",
      "Real-time Analytics",
      "Automated Workflows",
      "Security",
      "Compliance",
      "Multi-platform Support",
      "Scalability",
      "API Integration",
      "Real-time Analytics"
    ],
    benefits: {
      id: 28,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to leverage blockchain technology",
      items: [
        {
          id: 109,
          title: "Enhanced Blockchain Platform",
          description: "Streamline your blockchain platform management process with our intuitive dashboard and automated workflows"
        },
        {
          id: 110,
          title: "Real-time Analytics",
          description: "Track blockchain usage, performance, and utilization in real-time with comprehensive reporting"
        },
        {
          id: 111,
          title: "Automated Workflows",
          description: "Automate repetitive tasks and reduce manual work with smart workflows"
        },
        {
          id: 112,
          title: "Security",
          description: "Ensure security and compliance with enterprise-grade security features"
        },
        {
          id: 113,
          title: "Compliance",
          description: "Ensure compliance with industry-specific regulations"
        },
        {
          id: 114,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive blockchain platform management"
        },
        {
          id: 115,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your blockchain platform management systems can scale with you"
        },
        {
          id: 116,
          title: "Improved Blockchain Efficiency",
          description: "Maximize your blockchain efficiency with dynamic pricing and promotional tools"
        },
        {
          id: 117,
          title: "Professional Blockchain Branding",
          description: "Customize your blockchain platform management platform with your brand colors and logos"
        },
        {
          id: 118,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        }
      ]
    },
    industries: {
      id: 23,
      title: "Target Industries",
      content: "Serving diverse industries with blockchain technology needs",
      items: [
        {
          id: 73,
          title: "Technology",
          description: "Tech companies and startups focused on blockchain technology"
        },
        {
          id: 74,
          title: "Manufacturing",
          description: "Production companies and factories looking to automate their operations"
        },
        {
          id: 75,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to secure patient data"
        },
        {
          id: 76,
          title: "Retail",
          description: "Retail businesses looking to secure customer data"
        },
        {
          id: 77,
          title: "Financial Services",
          description: "Financial institutions looking to leverage blockchain for banking and financial services"
        },
        {
          id: 78,
          title: "Education",
          description: "Educational institutions looking to implement blockchain for learning"
        }
      ]
    },
    casestudies: {
      id: 29,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 36,
          title: "Blockchain Platform Management",
          description: "Streamlined blockchain platform management for a manufacturing company, improving efficiency by 40%"
        },
        {
          id: 37,
          title: "Blockchain Platform Management",
          description: "Streamlined blockchain platform management for a healthcare network, improving patient care by 20%"
        },
        {
          id: 38,
          title: "Blockchain Platform Management",
          description: "Streamlined blockchain platform management for a retail chain, improving customer experience by 20%"
        }
      ]
    },
    faqs: {
      id: 30,
      title: "Frequently Asked Questions",
      content: "Common questions about our blockchain platform management platform",
      items: [
        {
          id: 47,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on project complexity and customization needs."
        },
        {
          id: 48,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular blockchain platform management platforms."
        },
        {
          id: 49,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 50,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 37,
        name: "Starter",
        description: "Perfect for small blockchain projects",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 10 blockchain projects",
          "Basic blockchain platform management",
          "API access",
          "Mobile access",
          "Basic reporting"
        ],
        isRecommended: false
      },
      {
        id: 38,
        name: "Professional",
        description: "Ideal for growing blockchain businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 50 blockchain projects",
          "Advanced blockchain platform management",
          "Full API access",
          "24/7 support",
          "Advanced workflows",
          "Multi-location support"
        ],
        isRecommended: true
      },
      {
        id: 39,
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited blockchain projects",
          "Custom blockchain platform management solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.blockchain.com",
    downloadUrl: "https://blockchain.com/download",
    supportUrl: "https://support.blockchain.com",
    category: ["Blockchain", "SaaS"],
    tags: ["blockchain", "saas", "distributed-ledger-technology", "real-time-analytics", "automated-workflows"],
    status: "Active"
  },
  {
    id: 12,
    title: "QuantumCore: Quantum Computing Platform",
    slug: "quantumcore-quantum-computing-platform",
    translationKey: "quantumcore-quantum-computing-platform",
    description: "Quantum computing platform for advanced computational tasks",
    image: "/src/assets/images/IMG_2263.JPG",
    keyFeatures: [
      "Quantum Computing Platform",
      "Real-time Analytics",
      "Automated Workflows",
      "Security",
      "Compliance",
      "Multi-platform Support",
      "Scalability",
      "API Integration",
      "Real-time Analytics"
    ],
    benefits: {
      id: 29,
      title: "Business Benefits",
      content: "Comprehensive benefits for businesses looking to leverage quantum computing technology",
      items: [
        {
          id: 119,
          title: "Enhanced Quantum Computing Platform",
          description: "Streamline your quantum computing platform management process with our intuitive dashboard and automated workflows"
        },
        {
          id: 120,
          title: "Real-time Analytics",
          description: "Track quantum computing usage, performance, and utilization in real-time with comprehensive reporting"
        },
        {
          id: 121,
          title: "Automated Workflows",
          description: "Automate repetitive tasks and reduce manual work with smart workflows"
        },
        {
          id: 122,
          title: "Security",
          description: "Ensure security and compliance with enterprise-grade security features"
        },
        {
          id: 123,
          title: "Compliance",
          description: "Ensure compliance with industry-specific regulations"
        },
        {
          id: 124,
          title: "Multi-platform Support",
          description: "Support a wide range of platforms and devices for comprehensive quantum computing platform management"
        },
        {
          id: 125,
          title: "Scalable Growth Support",
          description: "Grow your business with confidence knowing your quantum computing platform management systems can scale with you"
        },
        {
          id: 126,
          title: "Improved Quantum Computing Efficiency",
          description: "Maximize your quantum computing efficiency with dynamic pricing and promotional tools"
        },
        {
          id: 127,
          title: "Professional Quantum Computing Branding",
          description: "Customize your quantum computing platform management platform with your brand colors and logos"
        },
        {
          id: 128,
          title: "Streamlined Communication",
          description: "Improve team collaboration and communication with integrated tools"
        }
      ]
    },
    industries: {
      id: 24,
      title: "Target Industries",
      content: "Serving diverse industries with quantum computing technology needs",
      items: [
        {
          id: 79,
          title: "Technology",
          description: "Tech companies and startups focused on quantum computing technology"
        },
        {
          id: 80,
          title: "Manufacturing",
          description: "Production companies and factories looking to optimize their operations"
        },
        {
          id: 81,
          title: "Healthcare",
          description: "Medical practices and healthcare facilities looking to optimize patient care"
        },
        {
          id: 82,
          title: "Retail",
          description: "Retail businesses looking to optimize their customer experience"
        },
        {
          id: 83,
          title: "Financial Services",
          description: "Financial institutions looking to leverage quantum computing for banking and financial services"
        },
        {
          id: 84,
          title: "Education",
          description: "Educational institutions looking to implement quantum computing for learning"
        }
      ]
    },
    casestudies: {
      id: 30,
      title: "Success Stories",
      content: "Real-world implementations and measurable business improvements",
      items: [
        {
          id: 39,
          title: "Quantum Computing Platform Management",
          description: "Streamlined quantum computing platform management for a manufacturing company, improving efficiency by 40%"
        },
        {
          id: 40,
          title: "Quantum Computing Platform Management",
          description: "Streamlined quantum computing platform management for a healthcare network, improving patient care by 20%"
        },
        {
          id: 41,
          title: "Quantum Computing Platform Management",
          description: "Streamlined quantum computing platform management for a retail chain, improving customer experience by 20%"
        }
      ]
    },
    faqs: {
      id: 31,
      title: "Frequently Asked Questions",
      content: "Common questions about our quantum computing platform management platform",
      items: [
        {
          id: 51,
          title: "How long does implementation take?",
          description: "Implementation typically takes 4-8 weeks depending on project complexity and customization needs."
        },
        {
          id: 52,
          title: "Can I migrate from my existing system?",
          description: "Yes, we provide data migration services from most popular quantum computing platform management platforms."
        },
        {
          id: 53,
          title: "Is training included?",
          description: "Yes, we provide comprehensive training for your team and ongoing support."
        },
        {
          id: 54,
          title: "What about data security?",
          description: "We use enterprise-grade security with SOC 2 compliance and regular security audits."
        }
      ]
    },
    pricing: [
      {
        id: 40,
        name: "Starter",
        description: "Perfect for small quantum computing projects",
        price: 49,
        period: "month",
        currency: "USD",
        features: [
          "Up to 10 quantum computing projects",
          "Basic quantum computing platform management",
          "API access",
          "Mobile access",
          "Basic reporting"
        ],
        isRecommended: false
      },
      {
        id: 41,
        name: "Professional",
        description: "Ideal for growing quantum computing businesses",
        price: 99,
        period: "month",
        currency: "USD",
        features: [
          "Up to 50 quantum computing projects",
          "Advanced quantum computing platform management",
          "Full API access",
          "24/7 support",
          "Advanced workflows",
          "Multi-location support"
        ],
        isRecommended: true
      },
      {
        id: 42,
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: 249,
        period: "month",
        currency: "USD",
        features: [
          "Unlimited quantum computing projects",
          "Custom quantum computing platform management solutions",
          "Dedicated support",
          "White label options",
          "Advanced security",
          "Custom integrations",
          "SLA guarantee"
        ],
        isRecommended: false
      }
    ],
    demoUrl: "https://demo.quantumcore.com",
    downloadUrl: "https://quantumcore.com/download",
    supportUrl: "https://support.quantumcore.com",
    category: ["Quantum Computing", "SaaS"],
    tags: ["quantum-computing", "saas", "real-time-analytics", "automated-workflows", "multi-platform"],
    status: "Active"
  }
];
