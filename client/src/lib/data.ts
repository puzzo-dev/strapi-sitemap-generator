import { ServiceProps, ProductProps, TestimonialProps } from './types';

export const services: ServiceProps[] = [
  {
    id: 1,
    title: "CLOUD INFRA MANAGEMENT",
    description: "Optimize your cloud infrastructure with our expert management services. We handle scaling, security, and performance tuning to ensure your applications run smoothly.",
    icon: "fa-cloud"
  },
  {
    id: 2,
    title: "MOBILE APP DEVELOPMENT",
    description: "Create stunning, high-performance mobile applications for iOS and Android. Our development team builds user-friendly apps that engage customers and drive business growth.",
    icon: "fa-mobile-alt"
  },
  {
    id: 3,
    title: "API PROGRAMMING & INTEGRATION",
    description: "Connect your systems and applications seamlessly with custom API development. We design, build, and integrate APIs that enable powerful data exchange and functionality.",
    icon: "fa-code"
  },
  {
    id: 4,
    title: "SEARCH ENGINE OPTIMIZATION",
    description: "Boost your online visibility and drive organic traffic with our comprehensive SEO services. We implement proven strategies to improve your search engine rankings.",
    icon: "fa-search"
  },
  {
    id: 5,
    title: "CONTENT WRITING",
    description: "Engage your audience with compelling, SEO-optimized content. Our professional writers create blog posts, website copy, and marketing materials that convert readers into customers.",
    icon: "fa-pen-fancy"
  }
];

export const products: ProductProps[] = [
  {
    id: 1,
    title: "Entry-E: Event Ticketing SaaS",
    description: "A complete event ticketing solution for event organizers",
    keyFeatures: [
      "Ticket Sales Management",
      "Events Dashboard",
      "Customizable Ticketing System",
      "Check-in & Attendance"
    ],
    benefits: [
      "Simplified Event Management",
      "Real-time Analytics",
      "Secure Payment Processing",
      "Multi-device Compatibility"
    ]
  },
  {
    id: 2,
    title: "Business in a Box",
    description: "Complete business management solution for SMEs",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    keyFeatures: [
      "Complete CRM for Business",
      "Inventory Management",
      "Financial Reporting",
      "Customer Support and Communication"
    ],
    benefits: [
      "Centralized Business Operations",
      "Enhanced Productivity",
      "Reduced Operational Costs",
      "Tailored Solutions for Small and Medium Business"
    ]
  }
];

export const testimonials: TestimonialProps[] = [
  {
    id: 1,
    name: "Mazi Godwin",
    content: "I-Varse has a professional group of IT specialists. I am grateful for the consultancy services they rendered me. I recommend them to anyone who plans to take their business to the future.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Jasper Paul",
    content: "My business model was in a slump. I didn't know what to do, and I kept losing money. Then I contacted I-Varse, and now my business is up and running. Thank you, I-Varse!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Chukwudi Obasi",
    content: "I-Varse has the best SEO content writing service. I have used them for more projects than I can count. Their team's blog writing work has increased my company's Google ranking by 60%.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
  }
];

export const clientLogos = [
  {
    name: "Google",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
  },
  {
    name: "Apple",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
  },
  {
    name: "Amazon",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
  },
  {
    name: "Microsoft",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  },
  {
    name: "Netflix",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
  }
];
