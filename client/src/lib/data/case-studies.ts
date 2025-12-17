import { CaseStudyProps } from '@/lib/types/case-studies';

export const caseStudies: CaseStudyProps[] = [
  {
    id: 1,
    title: "Financial Services Reinvented",
    slug: "banking-digital-transformation",
    description: "Complete platform modernization delivering operational excellence at scale",
    client: "First Bank Nigeria",
    industry: "Banking & Financial Services",
    duration: "12 months",
    teamSize: 15,
    technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL", "Redis"],
    challenge: "Transform legacy infrastructure into a cloud-native platform capable of handling millions of transactions daily while meeting stringent regulatory requirements and elevating customer experience to match digital-first competitors.",
    solution: "Architected a comprehensive digital banking ecosystem featuring microservices architecture, real-time transaction processing, AI-powered fraud detection, biometric authentication, and omnichannel customer engagement—all while maintaining zero-downtime migration from legacy systems.",
    results: [
      "40% increase in customer satisfaction scores",
      "60% reduction in transaction processing time",
      "Digital adoption increased from 35% to 60% of customer base",
      "99.99% system availability achieved",
      "50% reduction in operational costs through intelligent automation"
    ],
    image: "/src/assets/images/IMG_2257.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-01-15",
    content: "This transformation journey exemplifies how strategic technology modernization can redefine an institution's competitive position. By replacing decades-old infrastructure with cloud-native architecture, we enabled First Bank Nigeria to operate with the agility of a fintech startup while maintaining the trust and stability expected of a banking leader. The platform now processes transactions in milliseconds, adapts to demand dynamically, and provides insights that drive strategic decision-making at every organizational level.",
    testimonial: "I-VARSE Technologies delivered more than technology—they delivered transformation. Their deep understanding of financial services, combined with technical excellence, made them the ideal partner for our journey toward becoming a truly digital-first institution.",
    testimonialAuthor: "John Adebayo",
    testimonialPosition: "CTO, First Bank Nigeria"
  },
  {
    id: 2,
    title: "Retail Ecosystem Reimagined",
    slug: "retail-ecommerce-platform",
    description: "Unified commerce platform connecting physical and digital retail",
    client: "ShopRite Nigeria",
    industry: "Retail & E-commerce",
    duration: "8 months",
    teamSize: 12,
    technologies: ["Next.js", "Strapi", "PostgreSQL", "Redis", "AWS", "Stripe"],
    challenge: "Create a seamless omnichannel experience that unifies 50+ physical locations with digital commerce while enabling real-time inventory visibility, personalized customer experiences, and friction-free fulfillment across all channels.",
    solution: "Engineered a headless commerce platform with intelligent inventory orchestration, AI-driven product recommendations, seamless payment integration, progressive web app architecture, and real-time analytics—creating a single source of truth across all customer touchpoints.",
    results: [
      "300% increase in online revenue within 6 months",
      "50% reduction in inventory carrying costs through predictive stocking",
      "35% improvement in customer lifetime value",
      "90% faster page performance vs. legacy platform",
      "98% order accuracy through automated fulfillment"
    ],
    image: "/src/assets/images/IMG_2259.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-02-20",
    content: "This engagement redefined what unified commerce means for multi-location retailers. By connecting inventory, orders, and customer data in real-time across every channel, we eliminated the traditional boundaries between online and offline retail. Customers can now research online, purchase in-store, or order for delivery—all while enjoying consistent pricing, availability, and service. The platform's headless architecture ensures ShopRite can evolve their customer experience independently of backend systems, accelerating innovation velocity.",
    testimonial: "The commerce platform I-VARSE Technologies delivered doesn't just process transactions—it creates experiences. The seamless integration across channels and the performance gains have fundamentally changed how we compete in digital retail.",
    testimonialAuthor: "Sarah Johnson",
    testimonialPosition: "Digital Director, ShopRite Nigeria"
  },
  {
    id: 3,
    title: "Healthcare Innovation at Scale",
    slug: "healthcare-management-system",
    description: "Integrated care platform transforming patient outcomes",
    client: "Lagos General Hospital Network",
    industry: "Healthcare & Telemedicine",
    duration: "10 months",
    teamSize: 18,
    technologies: ["React Native", "Python", "PostgreSQL", "HIPAA", "HL7", "AWS"],
    challenge: "Modernize fragmented clinical systems into a unified platform that improves care coordination, enables telemedicine at scale, reduces administrative burden, and maintains absolute compliance with healthcare regulations.",
    solution: "Developed a comprehensive care management ecosystem featuring interoperable EHR, intelligent appointment scheduling, secure telemedicine infrastructure, clinical decision support, and advanced analytics—all architected for HIPAA compliance and seamless HL7/FHIR integration.",
    results: [
      "40% improvement in operational efficiency through workflow automation",
      "95% patient satisfaction scores",
      "75% reduction in medical record errors",
      "30% decrease in administrative overhead costs",
      "50% increase in care coordination effectiveness"
    ],
    image: "/src/assets/images/IMG_2260.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-03-15",
    content: "This transformation demonstrates how technology can elevate healthcare delivery from transactional to truly patient-centered. By unifying clinical, administrative, and communication systems, we enabled care teams to focus on patients rather than paperwork. The platform's telemedicine capabilities expanded access to care beyond hospital walls, while clinical decision support tools help providers deliver evidence-based treatment. Most importantly, the system's interoperability ensures patient data follows patients seamlessly across providers and care settings.",
    testimonial: "I-VARSE Technologies delivered a healthcare platform that doesn't just manage data—it enables better care. The system's ease of use combined with robust security has transformed how our network operates and serves patients.",
    testimonialAuthor: "Dr. Aisha Mohammed",
    testimonialPosition: "Medical Director, Lagos General Hospital"
  },
  {
    id: 4,
    title: "Industry 4.0 Manufacturing Transformation",
    slug: "manufacturing-erp-implementation",
    description: "Intelligent manufacturing platform driving operational excellence",
    client: "Nigerian Steel Manufacturing Co.",
    industry: "Manufacturing & Logistics",
    duration: "14 months",
    teamSize: 20,
    technologies: ["React", "Node.js", "PostgreSQL", "IoT", "Machine Learning", "AWS"],
    challenge: "Transform traditional manufacturing operations into an intelligent, connected enterprise capable of predictive maintenance, real-time optimization, and demand-driven production across multiple facilities.",
    solution: "Architected a comprehensive Industry 4.0 platform integrating IoT sensors, machine learning models for predictive analytics, digital twin simulation, quality management, supply chain optimization, and real-time production monitoring—creating a fully connected manufacturing ecosystem.",
    results: [
      "45% improvement in overall equipment effectiveness",
      "98% inventory accuracy through real-time tracking",
      "95% on-time delivery rate",
      "25% reduction in operational costs via predictive maintenance",
      "30% decrease in unplanned downtime"
    ],
    image: "/src/assets/images/IMG_2262.JPG",
    status: "Completed",
    featured: true,
    publishedDate: "2024-04-10",
    content: "This engagement exemplifies the transformative potential of Industry 4.0 technologies. By connecting machines, materials, and people through a unified intelligent platform, we enabled Nigerian Steel Manufacturing to transition from reactive to predictive operations. IoT sensors provide real-time visibility into every production process, while machine learning models anticipate equipment failures before they occur. The result: a manufacturing operation that continuously optimizes itself, adapts to changing demands, and operates with unprecedented efficiency.",
    testimonial: "The platform I-VARSE Technologies delivered has fundamentally changed how we manufacture. Real-time visibility and predictive analytics give us control we never thought possible. This is manufacturing for the 21st century.",
    testimonialAuthor: "Michael Okechukwu",
    testimonialPosition: "Operations Director, Nigerian Steel Manufacturing Co."
  },
  {
    id: 5,
    title: "Educational Innovation Platform",
    slug: "educational-institution-platform",
    description: "Comprehensive learning ecosystem enabling digital education at scale",
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
