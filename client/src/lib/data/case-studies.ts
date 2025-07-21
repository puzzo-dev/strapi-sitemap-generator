import { CaseStudyProps } from '@/lib/types/case-studies';

export const caseStudies: CaseStudyProps[] = [
  {
    id: 1,
    title: "Digital Transformation for Banking Sector",
    slug: "banking-digital-transformation",
    description: "Complete digital transformation solution for a leading Nigerian bank",
    client: "First Bank Nigeria",
    industry: "Banking & Financial Services",
    duration: "12 months",
    teamSize: 15,
    technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL", "Redis"],
    challenge: "Modernize legacy banking systems and improve customer experience while ensuring regulatory compliance and security standards.",
    solution: "Developed a comprehensive digital banking platform with mobile app, real-time transaction processing, and advanced security features including biometric authentication and fraud detection.",
    results: [
      "40% increase in customer satisfaction",
      "60% reduction in transaction processing time",
      "25% increase in digital adoption",
      "99.9% system uptime achieved",
      "50% reduction in operational costs"
    ],
    image: "/src/assets/images/IMG_2257.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-01-15",
    content: "I-Varse Technologies successfully transformed First Bank Nigeria's digital infrastructure by implementing a modern, scalable banking platform. Our solution included mobile banking applications, real-time transaction processing, and advanced security features that met all regulatory requirements. The project demonstrated our expertise in financial technology and our ability to handle complex enterprise-level transformations.",
    testimonial: "I-Varse Technologies delivered an exceptional digital banking platform that exceeded our expectations. Their expertise in financial technology and commitment to security made them the perfect partner for our digital transformation journey.",
    testimonialAuthor: "John Adebayo",
    testimonialPosition: "CTO, First Bank Nigeria"
  },
  {
    id: 2,
    title: "E-commerce Platform for Retail Chain",
    slug: "retail-ecommerce-platform",
    description: "Scalable e-commerce solution for a major retail chain",
    client: "ShopRite Nigeria",
    industry: "Retail & E-commerce",
    duration: "8 months",
    teamSize: 12,
    technologies: ["Next.js", "Strapi", "PostgreSQL", "Redis", "AWS", "Stripe"],
    challenge: "Create a unified online shopping experience across multiple locations with integrated inventory management and seamless payment processing.",
    solution: "Built a multi-tenant e-commerce platform with inventory management, real-time stock updates, integrated payment gateways, and mobile-responsive design.",
    results: [
      "300% increase in online sales",
      "50% reduction in inventory management time",
      "Improved customer retention by 35%",
      "90% faster page load times",
      "Seamless integration with existing POS systems"
    ],
    image: "/src/assets/images/IMG_2259.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-02-20",
    content: "Our e-commerce solution for ShopRite Nigeria revolutionized their online presence by creating a unified platform that seamlessly integrated with their existing retail operations. The platform features advanced inventory management, real-time analytics, and a mobile-first design that provides an exceptional shopping experience across all devices.",
    testimonial: "The e-commerce platform developed by I-Varse Technologies has transformed our business. The seamless integration with our existing systems and the exceptional user experience have significantly boosted our online sales.",
    testimonialAuthor: "Sarah Johnson",
    testimonialPosition: "Digital Director, ShopRite Nigeria"
  },
  {
    id: 3,
    title: "Healthcare Management System",
    slug: "healthcare-management-system",
    description: "Comprehensive healthcare management solution for hospital network",
    client: "Lagos General Hospital Network",
    industry: "Healthcare & Telemedicine",
    duration: "10 months",
    teamSize: 18,
    technologies: ["React Native", "Python", "PostgreSQL", "HIPAA", "HL7", "AWS"],
    challenge: "Develop a unified healthcare management system to handle patient records, appointments, and administrative tasks while ensuring HIPAA compliance and data security.",
    solution: "Built a comprehensive healthcare management system with Electronic Health Records (EHR), appointment scheduling, telemedicine capabilities, and advanced reporting features.",
    results: [
      "40% improvement in operational efficiency",
      "95% patient satisfaction rate",
      "75% reduction in administrative errors",
      "30% cost savings in administrative overhead",
      "Enhanced patient care coordination"
    ],
    image: "/src/assets/images/IMG_2260.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-03-15",
    content: "I-Varse Technologies developed a state-of-the-art healthcare management system that modernized the Lagos General Hospital Network's operations. Our solution included secure patient data management, telemedicine capabilities, and comprehensive reporting tools that improved patient care and operational efficiency.",
    testimonial: "I-Varse Technologies delivered a healthcare management system that has revolutionized our hospital operations. The system's security, ease of use, and comprehensive features have significantly improved our patient care delivery.",
    testimonialAuthor: "Dr. Aisha Mohammed",
    testimonialPosition: "Medical Director, Lagos General Hospital"
  },
  {
    id: 4,
    title: "Manufacturing ERP Implementation",
    slug: "manufacturing-erp-implementation",
    description: "Complete ERP solution for manufacturing company",
    client: "Nigerian Steel Manufacturing Co.",
    industry: "Manufacturing & Logistics",
    duration: "14 months",
    teamSize: 20,
    technologies: ["React", "Node.js", "PostgreSQL", "IoT", "Machine Learning", "AWS"],
    challenge: "Implement a comprehensive ERP system to automate manufacturing processes, improve inventory management, and enhance production planning across multiple facilities.",
    solution: "Developed a comprehensive ERP system with IoT sensor integration, predictive analytics, quality management, and supply chain optimization features.",
    results: [
      "45% improvement in production efficiency",
      "98% inventory accuracy",
      "95% order fulfillment rate",
      "25% reduction in operational costs",
      "Real-time production monitoring"
    ],
    image: "/src/assets/images/IMG_2262.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-04-10",
    content: "Our ERP implementation for Nigerian Steel Manufacturing Co. transformed their manufacturing operations by introducing Industry 4.0 technologies. The system includes IoT sensor integration, predictive maintenance, and real-time production monitoring that has significantly improved efficiency and reduced costs.",
    testimonial: "The ERP system implemented by I-Varse Technologies has revolutionized our manufacturing operations. The real-time monitoring and predictive analytics have given us unprecedented control over our production processes.",
    testimonialAuthor: "Michael Okechukwu",
    testimonialPosition: "Operations Director, Nigerian Steel Manufacturing Co."
  },
  {
    id: 5,
    title: "Educational Institution Platform",
    slug: "educational-institution-platform",
    description: "Learning management system for educational institutions",
    client: "University of Lagos",
    industry: "Education & E-learning",
    duration: "9 months",
    teamSize: 14,
    technologies: ["React", "Node.js", "MongoDB", "WebRTC", "AI/ML", "AWS"],
    challenge: "Create a modern learning management system to support online education, student management, and administrative tasks for a large university.",
    solution: "Developed a comprehensive learning management system with virtual classrooms, student portals, administrative tools, and AI-powered learning analytics.",
    results: [
      "180% increase in student engagement",
      "60% improvement in administrative efficiency",
      "85% resource utilization",
      "35% reduction in operational costs",
      "Enhanced learning outcomes"
    ],
    image: "/src/assets/images/IMG_2247.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-05-20",
    content: "I-Varse Technologies created a cutting-edge learning management system for the University of Lagos that has transformed their educational delivery. The platform includes virtual classrooms, AI-powered learning analytics, and comprehensive administrative tools that have significantly improved student engagement and learning outcomes.",
    testimonial: "The learning management system developed by I-Varse Technologies has transformed our educational delivery. The platform's innovative features and user-friendly interface have significantly improved student engagement and learning outcomes.",
    testimonialAuthor: "Prof. Oluwaseun Adebayo",
    testimonialPosition: "Vice Chancellor, University of Lagos"
  },
  {
    id: 6,
    title: "Property Management System",
    slug: "property-management-system",
    description: "Comprehensive property management solution for real estate companies",
    client: "Lagos Property Group",
    industry: "Real Estate & Property Management",
    duration: "11 months",
    teamSize: 16,
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe", "Twilio"],
    challenge: "Develop a comprehensive property management system to handle tenant management, rent collection, maintenance requests, and property analytics for a large real estate portfolio.",
    solution: "Built a full-featured property management platform with tenant portals, automated rent collection, maintenance tracking, and comprehensive reporting and analytics.",
    results: [
      "50% reduction in administrative overhead",
      "95% tenant satisfaction rate",
      "40% faster rent collection",
      "75% improvement in maintenance response time",
      "Real-time property performance analytics"
    ],
    image: "/src/assets/images/IMG_2262.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-06-15",
    content: "I-Varse Technologies developed a comprehensive property management system for Lagos Property Group that streamlined their entire property management operations. The platform includes tenant self-service portals, automated rent collection, maintenance tracking, and advanced analytics that provide real-time insights into property performance.",
    testimonial: "The property management system from I-Varse Technologies has revolutionized how we manage our real estate portfolio. The automation and analytics have significantly improved our operational efficiency and tenant satisfaction.",
    testimonialAuthor: "Chioma Okonkwo",
    testimonialPosition: "CEO, Lagos Property Group"
  }
];

export const servicesCaseStudies: {
  title: string;
  description: string;
  metrics: { [key: string]: string };
  challenge: string;
  solution: string;
  results: string;
  image: string;
}[] = [
  {
    title: "E-commerce Platform Transformation",
    description: "Complete digital transformation for a leading retail chain",
    metrics: {
      "Revenue Increase": "150%",
      "User Engagement": "200%",
      "Load Time": "60% faster",
      "Mobile Conversion": "85%"
    },
    challenge: "A traditional retail chain needed to modernize their online presence and improve customer experience across all digital touchpoints.",
    solution: "We developed a comprehensive e-commerce platform with mobile-first design, integrated payment systems, and advanced analytics.",
    results: "The new platform resulted in significant revenue growth, improved customer satisfaction, and streamlined operations.",
    image: "/src/assets/images/IMG_2259.JPG"
  },
  {
    title: "Healthcare Management System",
    description: "Custom healthcare management solution for a hospital network",
    metrics: {
      "Efficiency Gain": "40%",
      "Patient Satisfaction": "95%",
      "Error Reduction": "75%",
      "Cost Savings": "30%"
    },
    challenge: "A hospital network needed a unified system to manage patient records, appointments, and administrative tasks efficiently.",
    solution: "We built a comprehensive healthcare management system with secure patient data handling, appointment scheduling, and reporting capabilities.",
    results: "The system improved operational efficiency, enhanced patient care, and reduced administrative overhead.",
    image: "/src/assets/images/IMG_2260.JPG"
  },
  {
    title: "Financial Services Platform",
    description: "Secure and scalable platform for a fintech startup",
    metrics: {
      "Transaction Volume": "500% increase",
      "Security Score": "99.9%",
      "User Growth": "300%",
      "Uptime": "99.99%"
    },
    challenge: "A fintech startup needed a secure, scalable platform to handle growing transaction volumes and regulatory requirements.",
    solution: "We developed a robust financial services platform with advanced security features, real-time processing, and compliance tools.",
    results: "The platform successfully handled exponential growth while maintaining security and compliance standards.",
    image: "/src/assets/images/IMG_2261.JPG"
  }
];

export const productsCaseStudies: {
  title: string;
  description: string;
  metrics: { [key: string]: string };
  challenge: string;
  solution: string;
  results: string;
  image: string;
}[] = [
  {
    title: "Manufacturing ERP Implementation",
    description: "Complete ERP solution for a manufacturing company",
    metrics: {
      "Production Efficiency": "45%",
      "Inventory Accuracy": "98%",
      "Order Fulfillment": "95%",
      "Cost Reduction": "25%"
    },
    challenge: "A manufacturing company struggled with manual processes, inventory management, and production planning across multiple facilities.",
    solution: "We implemented a comprehensive ERP system that automated processes, improved inventory tracking, and enhanced production planning.",
    results: "The ERP system streamlined operations, reduced costs, and improved overall business efficiency.",
    image: "/src/assets/images/IMG_2262.JPG"
  },
  {
    title: "Retail Management Suite",
    description: "Multi-store retail management solution",
    metrics: {
      "Sales Growth": "120%",
      "Inventory Turnover": "3x faster",
      "Customer Retention": "40%",
      "Operational Costs": "20% reduction"
    },
    challenge: "A retail chain needed a unified system to manage multiple stores, inventory, and customer relationships effectively.",
    solution: "We deployed a comprehensive retail management suite with POS integration, inventory management, and customer analytics.",
    results: "The solution improved sales performance, optimized inventory levels, and enhanced customer experience across all stores.",
    image: "/src/assets/images/IMG_2263.JPG"
  },
  {
    title: "Educational Institution Platform",
    description: "Learning management system for educational institutions",
    metrics: {
      "Student Engagement": "180%",
      "Administrative Efficiency": "60%",
      "Resource Utilization": "85%",
      "Cost Savings": "35%"
    },
    challenge: "An educational institution needed a modern platform to manage online learning, student records, and administrative tasks.",
    solution: "We developed a comprehensive learning management system with virtual classrooms, student portals, and administrative tools.",
    results: "The platform improved student engagement, streamlined administrative processes, and reduced operational costs.",
    image: "/src/assets/images/IMG_2247.JPG"
  }
];
