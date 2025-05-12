import {
  HeroSlide,
  ServiceProps,
  ProductProps,
  TestimonialProps,
  FooterProps,
  FAQPageContent,
  PolicyPageLayoutProps,
  PageContent,
  SocialLink,
  ClientLogo,
  NavItem,
  HeroProps
} from "./types";


export const navItems: NavItem[] = [
  {
    id: 1,
    label: "Home",
    url: { url: "/" },
    order: 1,
  },
  {
    id: 2,
    label: "Services",
    url: { url: "/services" },
    order: 2,
  },
  {
    id: 3,
    label: "About",
    url: { url: "/about" },
    order: 3,
  },
  {
    id: 4,
    label: "Careers",
    url: { url: "/careers" },
    order: 4,
  },
  {
    id: 5,
    label: "Contact",
    url: { url: "/contact" },
    order: 5,
  },
];

// Hero slides data for the homepage
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Transform Your Digital Presence",
    subtitle: "We build innovative web and mobile solutions that drive business growth",
    primaryButton: {
      text: "Our Services",
      url: "/services",
      variant: "primary",
      icon: "arrow-right",
      iconPosition: "right"
    },
    secondaryButton: {
      text: "Contact Us",
      url: "/contact",
      variant: "outline",
    },
    backgroundImage: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Cloud Infrastructure Management",
    subtitle: "Optimize your cloud resources with our expert management services",
    primaryButton: {
      text: "Learn More",
      url: "/services/cloud-infrastructure",
      variant: "primary",
    },
    secondaryButton: {
      text: "Get a Quote",
      url: "/contact",
      variant: "outline",
    },
    backgroundImage: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Custom Mobile Applications",
    subtitle: "Create stunning, high-performance apps for iOS and Android",
    primaryButton: {
      text: "View Portfolio",
      url: "/portfolio",
      variant: "primary",
      icon: "phone",
      iconPosition: "left"
    },
    secondaryButton: {
      text: "Our Process",
      url: "/services/mobile-development",
      variant: "outline",
    },
    backgroundImage: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Enterprise Solutions",
    subtitle: "Streamline your business operations with our comprehensive ERP solutions",
    primaryButton: {
      text: "Discover Solutions",
      url: "/services/erp-solutions",
      variant: "primary",
    },
    secondaryButton: {
      text: "Schedule Demo",
      url: "/contact?demo=erp",
      variant: "outline",
    },
    backgroundImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "API Programming & Integration",
    subtitle: "Connect your systems seamlessly with custom API development",
    primaryButton: {
      text: "Our Approach",
      url: "/services/api-integration",
      variant: "primary",
      icon: "code",
      iconPosition: "left"
    },
    secondaryButton: {
      text: "Talk to an Expert",
      url: "/contact",
      variant: "outline",
    },
    backgroundImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
];

export const socialLinks: SocialLink[] = [
  {
    id: 1,
    platform: "Facebook",
    icon: "fa-facebook-f",
    url: "https://facebook.com/ivarse",
  },
  {
    id: 2,
    platform: "Twitter",
    icon: "fa-twitter",
    url: "https://twitter.com/ivarse",
  },
  {
    id: 3,
    platform: "LinkedIn",
    icon: "fa-linkedin-in",
    url: "https://linkedin.com/company/ivarse",
  },
  {
    id: 4,
    platform: "Instagram",
    icon: "fa-instagram",
    url: "https://instagram.com/ivarse",
  },
];

export const services: ServiceProps[] = [
  {
    id: 1,
    title: "CLOUD INFRA MANAGEMENT",
    description:
      "Optimize your cloud infrastructure with our expert management services. We handle scaling, security, and performance tuning to ensure your applications run smoothly.",
    icon: "fa-cloud",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "MOBILE APP DEVELOPMENT",
    description:
      "Create stunning, high-performance mobile applications for iOS and Android. Our development team builds user-friendly apps that engage customers and drive business growth.",
    icon: "fa-mobile-alt",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "API PROGRAMMING & INTEGRATION",
    description:
      "Connect your systems and applications seamlessly with custom API development. We design, build, and integrate APIs that enable powerful data exchange and functionality.",
    icon: "fa-code",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "SEARCH ENGINE OPTIMIZATION",
    description:
      "Boost your online visibility and drive organic traffic with our comprehensive SEO services. We implement proven strategies to improve your search engine rankings.",
    icon: "fa-search",
    image: "https://images.unsplash.com/photo-1677442135131-4668bd807267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "ERP SOLUTIONS",
    description:
      "Streamline your business operations with our comprehensive ERP solutions. We implement customized enterprise resource planning systems that integrate all aspects of your business for improved efficiency and productivity.",
    icon: "fa-cogs",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "CONTENT WRITING",
    description:
      "Engage your audience with compelling, SEO-optimized content. Our professional writers create blog posts, website copy, and marketing materials that convert readers into customers.",
    icon: "fa-pen-fancy",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
];

export const products: ProductProps[] = [
  {
    id: 1,
    title: "Entry-X: Event Ticketing SaaS",
    description: "A complete event ticketing solution for event organizers",
    keyFeatures: [
      "Ticket Sales Management",
      "Events Dashboard",
      "Customizable Ticketing System",
      "Check-in & Attendance",
    ],
    benefits: [
      "Simplified Event Management",
      "Real-time Analytics",
      "Secure Payment Processing",
      "Multi-device Compatibility",
    ],
  },
  {
    id: 2,
    title: "Business in a Box",
    description: "Complete business management solution for SMEs",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    keyFeatures: [
      "Complete CRM for Business",
      "Inventory Management",
      "Financial Reporting",
      "Customer Support and Communication",
    ],
    benefits: [
      "Centralized Business Operations",
      "Enhanced Productivity",
      "Reduced Operational Costs",
      "Tailored Solutions for Small and Medium Business",
    ],
  },
];

// Add this to the existing data.ts file
export const defaultHeroProps: HeroProps = {
  heroContents: heroSlides, // Using the existing heroSlides array from data.ts
  currentHeroIndex: 0,
  isHeroLoading: false,
  isPageLoading: false,
  services: services, // Using the existing services array from data.ts
  products: products, // Using the existing products array from data.ts
  currentIndex: 0,
  isServicesLoading: false,
  handleMouseEnter: () => { }, // Default empty function
  handleMouseLeave: () => { }, // Default empty function
  companyLogo: '/assets/I-VARSELogo3@3x.png', // Default logo path
};

export const testimonials: TestimonialProps[] = [
  {
    id: 1,
    name: "Mazi Godwin",
    content:
      "I-Varse has a professional group of IT specialists. I am grateful for the consultancy services they rendered me. I recommend them to anyone who plans to take their business to the future.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Jasper Paul",
    content:
      "My business model was in a slump. I didn't know what to do, and I kept losing money. Then I contacted I-Varse, and now my business is up and running. Thank you, I-Varse!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Chukwudi Obasi",
    content:
      "I-Varse has the best SEO content writing service. I have used them for more projects than I can count. Their team's blog writing work has increased my company's Google ranking by 60%.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  },
];

export const clientLogos: ClientLogo[] = [
  {
    name: "Google",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    url: { url: "https://google.com" },
  },
  {
    name: "Apple",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    url: { url: "https://apple.com" },
  },
  {
    name: "Amazon",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    url: { url: "https://amazon.com" },
  },
  {
    name: "Microsoft",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    url: { url: "https://microsoft.com" },
  },
  {
    name: "Netflix",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: { url: "https://netflix.com" },
  },
];

// Job listings data for Careers page
export const jobListings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "We're looking for an experienced Full Stack Developer to lead our development team in creating robust software solutions.",
    responsibilities: [
      "Design and implement scalable web applications",
      "Lead technical architecture decisions",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with product and design teams",
    ],
    requirements: [
      "5+ years of experience in full stack development",
      "Proficiency in React, Node.js, and modern JavaScript",
      "Experience with cloud infrastructure (AWS, Azure, or GCP)",
      "Strong problem-solving skills and attention to detail",
    ],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Join our creative team as a UX/UI Designer to craft intuitive and engaging user experiences for our products.",
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Develop wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers to ensure design implementation",
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools like Figma or Adobe XD",
      "Strong portfolio demonstrating user-centered design projects",
      "Understanding of accessibility and responsive design principles",
    ],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "We're seeking a DevOps Engineer to optimize our infrastructure and streamline our development workflows.",
    responsibilities: [
      "Build and maintain CI/CD pipelines",
      "Manage cloud infrastructure and containerization",
      "Implement monitoring and logging solutions",
      "Automate deployment processes and infrastructure",
    ],
    requirements: [
      "3+ years of experience in DevOps or related field",
      "Experience with container orchestration (Kubernetes)",
      "Knowledge of infrastructure as code (Terraform, CloudFormation)",
      "Familiarity with monitoring tools and log management systems",
    ],
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Help drive our digital marketing efforts to increase brand awareness and generate leads for our business.",
    responsibilities: [
      "Develop and implement digital marketing strategies",
      "Manage social media presence and content calendar",
      "Create and optimize ad campaigns across platforms",
      "Analyze marketing metrics and provide actionable insights",
    ],
    requirements: [
      "2+ years of experience in digital marketing",
      "Proficiency in SEO, SEM, and social media marketing",
      "Experience with marketing analytics tools",
      "Strong written and verbal communication skills",
    ],
  },
];

// Benefits data for Careers page
export const benefits = [
  {
    title: "Competitive Compensation",
    description:
      "We offer industry-leading salaries and comprehensive benefits packages.",
    icon: "PieChart",
  },
  {
    title: "Health & Wellness",
    description:
      "Comprehensive health insurance and wellness programs for you and your family.",
    icon: "Heart",
  },
  {
    title: "Remote-Friendly",
    description:
      "Flexible work arrangements including remote and hybrid options.",
    icon: "Laptop",
  },
  {
    title: "Professional Growth",
    description:
      "Continuous learning opportunities, conferences, and career development.",
    icon: "Award",
  },
  {
    title: "Work-Life Balance",
    description:
      "Generous paid time off, parental leave, and flexible schedules.",
    icon: "Coffee",
  },
  {
    title: "Global Impact",
    description:
      "Work on projects that make a real difference for clients worldwide.",
    icon: "Globe",
  },
];

// Blog posts dummy data for when Strapi/ERPNext isn't available
export const blogPosts = [
  {
    name: "ai-revolution-in-business",
    title: "The AI Revolution in Modern Business",
    slug: "ai-revolution-in-business",
    blog_category: "Technology",
    blog_intro:
      "Discover the emerging technology trends that will shape our digital landscape in 2025 and beyond.",
    content: `<p>As we look toward 2025, several emerging technologies are poised to transform how we live and work. Artificial intelligence continues to evolve at a rapid pace, with generative AI becoming increasingly sophisticated in creating content, code, and design assets.</p>
    
    <p>Quantum computing is moving from theoretical to practical applications, with major breakthroughs in error correction and qubit stability. We're seeing early commercial applications in fields like materials science, cryptography, and complex system modeling.</p>
    
    <p>The metaverse is evolving beyond gaming into practical business applications, with virtual collaboration spaces becoming more immersive and integrated with our daily workflows.</p>
    
    <p>Sustainable technology is no longer optional, with carbon-aware computing and green IT practices becoming standard across the industry as organizations work to meet ambitious climate goals.</p>`,
    published_date: "2025-01-10T10:00:00Z",
    published: true,
    featured: true,
    meta_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    meta_title:
      "Technology Trends That Will Define 2025 | I-Varse Technologies",
    meta_description:
      "Explore the top technology trends for 2025 that will reshape industries and create new opportunities for innovation and growth.",
    author: "john.doe",
    authorDetails: {
      name: "john.doe",
      full_name: "John Doe",
      user_image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Technology futurist and innovation strategist with over 15 years in the tech industry.",
    },
    readTime: 8,
    tags: [
      "AI",
      "Quantum Computing",
      "Metaverse",
      "Sustainable Tech",
      "Innovation",
    ],
  },
  {
    name: "cybersecurity-best-practices",
    title: "Essential Cybersecurity Best Practices",
    slug: "cybersecurity-best-practices",
    blog_category: "Security",
    blog_intro:
      "Protect your organization with these essential cybersecurity practices that every modern business should implement.",
    content: `<p>In today's digital landscape, cybersecurity isn't just an IT concern—it's a business imperative. As cyber threats become more sophisticated, organizations must adopt comprehensive security strategies.</p>
    
    <p>Start with a zero-trust security model that verifies every user and device attempting to access your resources, regardless of their location. Implement multi-factor authentication across all systems to add an essential layer of protection beyond passwords.</p>
    
    <p>Regular security awareness training for all employees is crucial, as human error remains one of the primary vectors for successful attacks. Combine this with continuous vulnerability scanning and timely patch management to minimize your attack surface.</p>
    
    <p>Finally, develop and regularly test an incident response plan so your team knows exactly how to respond when (not if) a security incident occurs.</p>`,
    published_date: "2025-02-15T14:30:00Z",
    published: true,
    featured: true,
    meta_image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    meta_title:
      "Essential Cybersecurity Practices for Business Protection | I-Varse",
    meta_description:
      "Learn the critical cybersecurity measures every business needs to implement to protect against today's sophisticated digital threats.",
    author: "sarah.chen",
    authorDetails: {
      name: "sarah.chen",
      full_name: "Sarah Chen",
      user_image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Cybersecurity expert specializing in threat intelligence and organizational security posture assessment.",
    },
    readTime: 6,
    tags: ["Cybersecurity", "Zero Trust", "Data Protection", "Risk Management"],
  },
  {
    name: "cloud-computing-trends",
    title: "Top Cloud Computing Trends for 2025",
    slug: "cloud-computing-trends",
    blog_category: "Cloud",
    blog_intro:
      "Implement these proven strategies to optimize your cloud costs without sacrificing performance or reliability.",
    content: `<p>Cloud computing offers tremendous flexibility and scalability, but costs can quickly spiral out of control without proper governance. Effective cloud cost optimization begins with visibility—you can't manage what you can't measure.</p>
    
    <p>Implement tagging strategies to attribute costs to specific teams, projects, and environments. Rightsizing resources is often the quickest win, as many organizations dramatically overprovision their cloud instances.</p>
    
    <p>Take advantage of reserved instances and savings plans for predictable workloads, while using spot instances for fault-tolerant, non-critical applications. Implement automated scaling policies that match your actual usage patterns.</p>
    
    <p>Don't overlook the importance of architectural optimization—sometimes, switching to serverless or containerized approaches can significantly reduce costs while improving performance.</p>`,
    published_date: "2025-03-05T09:15:00Z",
    published: true,
    featured: false,
    meta_image: "https://images.unsplash.com/photo-1535350356005-fd52b3b524fb",
    meta_title: "Cloud Cost Optimization: Practical Strategies | I-Varse",
    meta_description:
      "Discover practical, proven strategies to reduce cloud spending while maintaining performance and reliability for your applications.",
    author: "miguel.rivera",
    authorDetails: {
      name: "miguel.rivera",
      full_name: "Miguel Rivera",
      user_image: "https://randomuser.me/api/portraits/men/67.jpg",
      bio: "Cloud architect with expertise in multi-cloud environments and FinOps practices.",
    },
    readTime: 7,
    tags: ["Cloud Computing", "Cost Optimization", "AWS", "Azure", "FinOps"],
  },
  {
    name: "ai-ethics",
    title: "Building Ethical AI Systems: Principles and Practices",
    slug: "ethical-ai-principles-practices",
    blog_category: "Artificial Intelligence",
    blog_intro:
      "Learn the key principles and practical approaches for developing AI systems that are ethical, fair, and transparent.",
    content: `<p>As artificial intelligence becomes increasingly embedded in critical systems, ensuring these systems operate ethically is paramount. Ethical AI development starts with diverse teams that can identify potential biases and unintended consequences.</p>
    
    <p>Transparency should be a core principle, with documentation of training data sources, limitations, and decision-making processes. Implement fairness metrics and regular bias assessments throughout the development lifecycle.</p>
    
    <p>Design AI systems with appropriate human oversight and intervention capabilities, especially for high-stakes applications. Privacy considerations must be built in from the ground up, not added as an afterthought.</p>
    
    <p>Finally, establish governance frameworks that include regular ethical reviews and impact assessments to ensure your AI systems continue to operate as intended as they evolve and learn.</p>`,
    published_date: "2025-04-12T11:45:00Z",
    published: true,
    featured: false,
    meta_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    meta_title:
      "Ethical AI Development: Principles and Best Practices | I-Varse",
    meta_description:
      "Explore the essential principles and practical approaches for building AI systems that are ethical, fair, and beneficial to society.",
    author: "aisha.johnson",
    authorDetails: {
      name: "aisha.johnson",
      full_name: "Aisha Johnson",
      user_image: "https://randomuser.me/api/portraits/women/22.jpg",
      bio: "AI ethics researcher and consultant working on responsible innovation frameworks.",
    },
    readTime: 9,
    tags: [
      "AI Ethics",
      "Responsible AI",
      "Machine Learning",
      "Fairness",
      "Transparency",
    ],
  },
  {
    name: "digital-transformation-guide",
    title: "Complete Guide to Digital Transformation",
    slug: "digital-transformation-guide",
    blog_category: "Business Strategy",
    blog_intro:
      "Move past the hype and discover what successful digital transformation actually requires for sustainable business evolution.",
    content: `<p>Digital transformation has become an overused term, but when done right, it represents a fundamental reimagining of how an organization delivers value. True transformation goes beyond simply digitizing existing processes.</p>
    
    <p>Successful digital transformation requires clear leadership vision and unwavering commitment from the executive team. It means cultivating a culture that embraces experimentation, continuous learning, and calculated risk-taking.</p>
    
    <p>Customer experience should be at the center of transformation efforts, with technology choices driven by how they enhance value for users. Legacy system modernization is often the biggest technical challenge, requiring thoughtful approaches to avoid disruption.</p>
    
    <p>Above all, remember that digital transformation is a journey, not a destination. Organizations must build the capability to continuously evolve as technologies and market conditions change.</p>`,
    published_date: "2025-05-20T13:00:00Z",
    published: true,
    featured: false,
    meta_image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    meta_title: "Digital Transformation: Beyond the Hype | I-Varse",
    meta_description:
      "Learn what successful digital transformation really entails and how to move past the buzzwords to create lasting business value.",
    author: "raj.patel",
    authorDetails: {
      name: "raj.patel",
      full_name: "Raj Patel",
      user_image: "https://randomuser.me/api/portraits/men/78.jpg",
      bio: "Digital strategy consultant who has led transformation initiatives across multiple industries.",
    },
    readTime: 8,
    tags: [
      "Digital Transformation",
      "Innovation",
      "Change Management",
      "Business Strategy",
    ],
  },
  {
    name: "devops-evolution",
    title:
      "The Evolution of DevOps: From Collaboration to Platform Engineering",
    slug: "devops-evolution-platform-engineering",
    blog_category: "DevOps",
    blog_intro:
      "Explore how DevOps is evolving from a collaborative approach to a platform engineering discipline and what this means for software delivery.",
    content: `<p>DevOps began as a cultural movement emphasizing collaboration between development and operations teams. Today, it's evolving into platform engineering—a discipline focused on building self-service infrastructure platforms that abstract away complexity.</p>
    
    <p>Modern DevOps teams are moving beyond simply automating deployment pipelines to creating internal developer platforms that provide consistent, secure environments across the application lifecycle.</p>
    
    <p>Observability has become central to the DevOps practice, with teams implementing robust monitoring, logging, and tracing solutions that provide context-rich insights into system behavior.</p>
    
    <p>GitOps approaches are standardizing how infrastructure and applications are deployed and managed, with declarative configurations stored in version control as the single source of truth.</p>
    
    <p>As DevOps continues to mature, we're seeing increased specialization with roles like reliability engineers, platform engineers, and DevSecOps practitioners emerging to address specific aspects of the software delivery lifecycle.</p>`,
    published_date: "2025-06-08T15:20:00Z",
    published: true,
    featured: false,
    meta_image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    meta_title: "DevOps Evolution: The Rise of Platform Engineering | I-Varse",
    meta_description:
      "Discover how DevOps is evolving from a collaborative philosophy to platform engineering and what this means for software teams.",
    author: "emma.wilson",
    authorDetails: {
      name: "emma.wilson",
      full_name: "Emma Wilson",
      user_image: "https://randomuser.me/api/portraits/women/56.jpg",
      bio: "Platform engineering lead specializing in building internal developer platforms and self-service infrastructure.",
    },
    readTime: 7,
    tags: [
      "DevOps",
      "Platform Engineering",
      "GitOps",
      "CI/CD",
      "Infrastructure as Code",
    ],
  },
];

// Blog categories dummy data
export const blogCategories = [
  {
    name: "technology",
    title: "Technology",
    slug: "technology",
    description:
      "Latest news and insights about emerging technologies and digital innovation",
  },
  {
    name: "security",
    title: "Security",
    slug: "security",
    description:
      "Cybersecurity trends, best practices, and threat intelligence",
  },
  {
    name: "cloud",
    title: "Cloud",
    slug: "cloud",
    description:
      "Cloud computing strategies, architectures, and implementation guides",
  },
  {
    name: "artificial-intelligence",
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description:
      "AI research, applications, and impact on business and society",
  },
  {
    name: "business-strategy",
    title: "Business Strategy",
    slug: "business-strategy",
    description:
      "Strategic approaches to digital business transformation and innovation",
  },
  {
    name: "devops",
    title: "DevOps",
    slug: "devops",
    description: "DevOps culture, practices, tools, and platform engineering",
  },
];
// Add this to the existing data

export const footerData: FooterProps = {
  companyDescription:
    "Leading digital innovation company providing premium web development and IT consulting services for businesses looking to transform their digital presence.",
  contactAddress: "4 Adana Street, Off Tejuosho Rd, Surulere, Lagos, Nigeria",
  contactPhone: "+234 123 456 7890",
  contactEmail: "contact@itechnologies.ng",
  socialLinks: [
    { id: 1, platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
    {
      id: 2,
      platform: "LinkedIn",
      url: "https://linkedin.com",
      icon: "linkedin",
    },
    {
      id: 3,
      platform: "Facebook",
      url: "https://facebook.com",
      icon: "facebook",
    },
    {
      id: 4,
      platform: "Instagram",
      url: "https://instagram.com",
      icon: "instagram",
    },
  ],
  columns: [
    {
      id: 1,
      title: "Company",
      links: [
        { label: "About Us", url: "/about" },
        { label: "Services", url: "/services" },
        { label: "Products", url: "/products" },
        { label: "Insights", url: "/blog" },
        { label: "Careers", url: "/careers" },
        { label: "Contact", url: "/contact" },
        { label: "Our Team", url: "/about#team" },
        { label: "FAQ", url: "/faq" },
        { label: "Insights Pages", url: "/blog" },
      ],
    },
    {
      id: 2,
      title: "Services",
      links: [
        { label: "Web Development", url: "/services/web-development" },
        {
          label: "Mobile App Development",
          url: "/services/mobile-development",
        },
        {
          label: "Cloud Infrastructure",
          url: "/services/cloud-infrastructure",
        },
        { label: "IT Consulting", url: "/services/consulting" },
        { label: "Digital Marketing", url: "/services/digital-marketing" },
        { label: "UI/UX Design", url: "/services/ui-ux-design" },
        { label: "AI Solutions", url: "/services/ai-solutions" },
        { label: "ERP Integration", url: "/services/erp-integration" },
        { label: "View All Services", url: "/services" },
      ],
    },
  ],
  legalLinks: [
    { label: "Terms of Service", url: "/terms" },
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Cookie Policy", url: "/cookies" },
    { label: "Accessibility", url: "/accessibility" },
    { label: "Sitemap", url: "/sitemap" },
  ],
  companyName: "I-VARSE Technologies",
};

export const termsContent: PolicyPageLayoutProps = {
  title: "Terms of Service",
  slug: "terms",
  description:
    "Read the terms and conditions governing the use of I-Varse Technologies' website and services.",
  content: `
    <h2>1. Acceptance of Terms</h2>
    <p>
      By accessing and using the I-Varse Technologies website and services, you acknowledge that you have read,
      understood, and agree to be bound by these Terms of Service. These terms constitute a legal agreement
      between you and I-Varse Technologies.
    </p>

    <h2>2. Description of Services</h2>
    <p>
      I-Varse Technologies provides various digital services including but not limited to web development,
      mobile application development, cloud infrastructure management, API programming & integration,
      SEO optimization, and content writing. The specific details, deliverables, and timelines of these
      services will be outlined in individual agreements or statements of work.
    </p>

    <h2>3. User Conduct</h2>
    <p>
      When using our website and services, you agree to:
    </p>
    <ul>
      <li>Comply with all applicable laws and regulations</li>
      <li>Respect the intellectual property rights of I-Varse Technologies and third parties</li>
      <li>Provide accurate and complete information when submitting forms or communicating with us</li>
      <li>Not use our services for any illegal or unauthorized purpose</li>
      <li>Not attempt to compromise the security or integrity of our systems</li>
    </ul>

    <h2>4. Intellectual Property</h2>
    <p>
      All content on the I-Varse Technologies website, including text, graphics, logos, icons, images, audio,
      and software, is the property of I-Varse Technologies or its content suppliers and is protected by
      international copyright laws. The compilation of content on this website is the exclusive property
      of I-Varse Technologies and is protected by international copyright laws.
    </p>

    <h2>5. Privacy Policy</h2>
    <p>
      Our Privacy Policy, which outlines how we collect, use, and protect your personal information,
      is incorporated into these Terms of Service. By using our services, you also agree to the terms
      of our Privacy Policy.
    </p>

    <h2>6. Limitation of Liability</h2>
    <p>
      To the maximum extent permitted by law, I-Varse Technologies shall not be liable for any indirect,
      incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
      incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses,
      resulting from your access to or use of or inability to access or use the services.
    </p>

    <h2>7. Modifications to Terms</h2>
    <p>
      I-Varse Technologies reserves the right to modify these Terms of Service at any time. We will provide
      notice of significant changes by posting a prominent notice on our website. Your continued use of our
      services after such modifications constitutes your acceptance of the revised terms.
    </p>

    <h2>8. Governing Law</h2>
    <p>
      These Terms of Service shall be governed by and construed in accordance with the laws of Nigeria,
      without regard to its conflict of law provisions.
    </p>

    <h2>9. Contact Information</h2>
    <p>
      If you have any questions about these Terms of Service, please contact us at:
    </p>
    <address>
      I-Varse Technologies<br />
      4 Adana Street, Off Tejuosho Rd,<br />
      Surulere, Lagos, Nigeria<br />
      Email: info@itechnologies.ng<br />
      Phone: +234 123 456 7890
    </address>

    <p><strong>Last Updated:</strong> April 2023</p>
  `,
};

export const privacyContent: PolicyPageLayoutProps = {
  title: "Privacy Policy",
  slug: "privacy",
  description:
    "Learn how I-Varse Technologies collects, uses, and protects your personal information.",
  content: `
    <h2>Introduction</h2>
    <p>
      At I-Varse Technologies, we respect your privacy and are committed to protecting the personal information
      you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
      when you visit our website or use our services.
    </p>

    <h2>Information We Collect</h2>
    <p>We may collect the following types of information:</p>

    <h3>Personal Information</h3>
    <ul>
      <li>Name, email address, phone number, and other contact details</li>
      <li>Company information if you're representing a business</li>
      <li>Information you provide when filling out forms on our website</li>
      <li>Records of correspondence if you contact us</li>
    </ul>

    <h3>Non-Personal Information</h3>
    <ul>
      <li>Browser type and version</li>
      <li>Operating system</li>
      <li>IP address</li>
      <li>Referring website</li>
      <li>Pages visited on our website</li>
      <li>Time and date of your visit</li>
    </ul>

    <h2>How We Use Your Information</h2>
    <p>We may use the information we collect for various purposes, including:</p>
    <ul>
      <li>Providing, maintaining, and improving our services</li>
      <li>Responding to your inquiries and fulfilling your requests</li>
      <li>Sending administrative information, such as updates or changes to our services</li>
      <li>Personalizing your experience on our website</li>
      <li>Conducting data analysis and research to improve our services</li>
      <li>Protecting our rights and preventing fraud</li>
      <li>Complying with legal obligations</li>
    </ul>

    <h2>Cookies and Tracking Technologies</h2>
    <p>
      We use cookies and similar tracking technologies to collect information about your browsing activities.
      Cookies are small text files stored on your device that help us provide a better user experience.
      You can generally set your browser to refuse cookies or alert you when cookies are being sent.
      Please note that disabling cookies may affect some features of our website.
    </p>

    <h2>Data Sharing and Disclosure</h2>
    <p>We may share your information in the following circumstances:</p>
    <ul>
      <li>With service providers who perform services on our behalf</li>
      <li>When required by law or to protect our rights</li>
      <li>In connection with a business transfer, such as a merger or acquisition</li>
      <li>With your consent or at your direction</li>
    </ul>

    <h2>Data Security</h2>
    <p>
      We implement appropriate technical and organizational measures to protect your personal information
      against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
      over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
    </p>

    <h2>International Data Transfers</h2>
    <p>
      Your information may be transferred to and processed in countries other than the country in which you reside.
      These countries may have data protection laws that differ from your country. By using our services,
      you consent to the transfer of your information to countries outside your country of residence.
    </p>

    <h2>Your Rights</h2>
    <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
    <ul>
      <li>The right to access your personal information</li>
      <li>The right to rectify inaccurate information</li>
      <li>The right to erasure of your information</li>
      <li>The right to restrict processing of your information</li>
      <li>The right to data portability</li>
      <li>The right to object to processing of your information</li>
    </ul>

    <h2>Children's Privacy</h2>
    <p>
      Our services are not directed to individuals under the age of 18, and we do not knowingly collect
      personal information from children. If we learn that we have collected personal information from a child,
      we will take steps to delete that information as quickly as possible.
    </p>

    <h2>Changes to This Privacy Policy</h2>
    <p>
      We may update this Privacy Policy from time to time. We will notify you of any changes by posting
      the new Privacy Policy on this page and updating the "Last Updated" date.
    </p>

    <h2>Contact Us</h2>
    <p>
      If you have any questions about this Privacy Policy, please contact us at:
    </p>
    <address>
      I-Varse Technologies<br />
      4 Adana Street, Off Tejuosho Rd,<br />
      Surulere, Lagos, Nigeria<br />
      Email: privacy@itechnologies.ng<br />
      Phone: +234 123 456 7890
    </address>

    <p><strong>Last Updated:</strong> April 2023</p>
  `,
};

export const cookiesContent: PolicyPageLayoutProps = {
  title: "Cookie Policy",
  slug: "cookies",
  description:
    "Information about how I-Varse Technologies uses cookies and similar technologies on our website.",
  content: `
    <h2>What Are Cookies?</h2>
    <p>
      Cookies are small text files that are placed on your device when you visit a website.
      They are widely used to make websites work more efficiently and provide information to
      the website owners. Cookies can be "persistent" cookies that remain on your device until
      they expire or are deleted, or "session" cookies that are deleted when you close your browser.
    </p>

    <h2>How We Use Cookies</h2>
    <p>
      I-Varse Technologies uses cookies for various purposes, including:
    </p>
    <ul>
      <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be turned off in our systems. They are usually only set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms.</li>
      <li><strong>Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.</li>
      <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
      <li><strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.</li>
    </ul>

    <h2>Specific Cookies We Use</h2>
    <table class="w-full border-collapse border border-gray-300 dark:border-gray-700 mb-6">
      <thead>
        <tr class="bg-gray-100 dark:bg-gray-800">
          <th class="border border-gray-300 dark:border-gray-700 p-2 text-left">Cookie Name</th>
          <th class="border border-gray-300 dark:border-gray-700 p-2 text-left">Purpose</th>
          <th class="border border-gray-300 dark:border-gray-700 p-2 text-left">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-gray-300 dark:border-gray-700 p-2">_ga</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">Used by Google Analytics to distinguish users</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">2 years</td>
        </tr>
        <tr>
          <td class="border border-gray-300 dark:border-gray-700 p-2">_gid</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">Used by Google Analytics to distinguish users</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">24 hours</td>
        </tr>
        <tr>
          <td class="border border-gray-300 dark:border-gray-700 p-2">_gat</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">Used by Google Analytics to throttle request rate</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">1 minute</td>
        </tr>
        <tr>
          <td class="border border-gray-300 dark:border-gray-700 p-2">ivarse_session</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">Used to maintain your session on our website</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">Session</td>
        </tr>
        <tr>
          <td class="border border-gray-300 dark:border-gray-700 p-2">theme_preference</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">Used to remember your light/dark mode preference</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">1 year</td>
        </tr>
        <tr>
          <td class="border border-gray-300 dark:border-gray-700 p-2">language_preference</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">Used to remember your language preference</td>
          <td class="border border-gray-300 dark:border-gray-700 p-2">1 year</td>
        </tr>
      </tbody>
    </table>

    <h2>Third-Party Cookies</h2>
    <p>
      In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and deliver advertisements on and through the website. Some common third-party services we may use include:
    </p>
    <ul>
      <li>Google Analytics</li>
      <li>Google AdSense</li>
      <li>Facebook Pixel</li>
      <li>LinkedIn Insight Tag</li>
      <li>HubSpot</li>
    </ul>

    <h2>Managing Cookies</h2>
    <p>
      Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
    </p>

    <h3>How to manage cookies in your browser:</h3>
    <ul>
      <li><strong>Google Chrome:</strong> Settings > Privacy and security > Cookies and other site data</li>
      <li><strong>Microsoft Edge:</strong> Settings > Cookies and site permissions > Cookies and site data</li>
      <li><strong>Safari:</strong> Preferences > Privacy > Cookies and website data</li>
      <li><strong>Firefox:</strong> Options > Privacy & Security > Cookies and Site Data</li>
    </ul>

    <h2>Changes to This Cookie Policy</h2>
    <p>
      We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
    </p>

    <h2>Contact Us</h2>
    <p>
      If you have any questions about our Cookie Policy, please contact us at:
    </p>
    <address>
      I-Varse Technologies<br />
      4 Adana Street, Off Tejuosho Rd,<br />
      Surulere, Lagos, Nigeria<br />
      Email: privacy@itechnologies.ng<br />
      Phone: +234 123 456 7890
    </address>

    <p><strong>Last Updated:</strong> April 2023</p>
  `,
};

export const accessibilityContent: PolicyPageLayoutProps = {
  title: "Accessibility Statement",
  slug: "accessibility",
  description:
    "Learn about I-Varse Technologies' commitment to making our website accessible to all users.",
  content: `
    <h2>Our Commitment to Accessibility</h2>
    <p>
      I-Varse Technologies is committed to ensuring digital accessibility for people with disabilities.
      We are continuously improving the user experience for everyone and applying the relevant accessibility
      standards to achieve this.
    </p>

    <h2>Conformance Status</h2>
    <p>
      The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to
      improve accessibility for people with disabilities. It defines three levels of conformance: Level A,
      Level AA, and Level AAA.
    </p>
    <p>
      The I-Varse Technologies website is partially conformant with WCAG 2.1 level AA. Partially conformant
      means that some parts of the content do not fully conform to the accessibility standard.
    </p>

    <h2>Accessibility Features</h2>
    <p>
      The I-Varse Technologies website includes the following accessibility features:
    </p>
    <ul>
      <li>Semantic HTML structure with appropriate headings and landmarks for screen reader navigation</li>
      <li>Keyboard accessibility for all interactive elements</li>
      <li>Sufficient color contrast for text and interface components</li>
      <li>Text resizing without loss of content or functionality</li>
      <li>Alternative text for images</li>
      <li>Dark mode for reduced eye strain and improved readability</li>
      <li>Focus indicators for keyboard navigation</li>
      <li>Skip to content link</li>
      <li>ARIA attributes where appropriate</li>
    </ul>

    <h2>Accessibility Limitations</h2>
    <p>
      Despite our best efforts, there may be some aspects of our website that are not fully accessible:
    </p>
    <ul>
      <li>Some older content may not yet be fully accessible</li>
      <li>Some third-party content or functionality may not be fully accessible</li>
      <li>Some interactive elements may not be fully accessible via keyboard navigation</li>
    </ul>

    <h2>Feedback and Contact Information</h2>
    <p>
      We welcome your feedback on the accessibility of the I-Varse Technologies website. Please let us know if you encounter any accessibility barriers:
    </p>
    <ul>
      <li>Email: accessibility@itechnologies.ng</li>
      <li>Phone: +234 123 456 7890</li>
      <li>Postal Address: 4 Adana Street, Off Tejuosho Rd, Surulere, Lagos, Nigeria</li>
    </ul>
    <p>
      We try to respond to feedback within 3 business days.
    </p>

    <h2>Assessment Approach</h2>
    <p>
      I-Varse Technologies has assessed the accessibility of its website by the following approaches:
    </p>
    <ul>
      <li>Self-evaluation using automated testing tools</li>
      <li>Manual testing with assistive technologies</li>
      <li>Testing with users with disabilities</li>
    </ul>

    <h2>Technical Specifications</h2>
    <p>
      Accessibility of the I-Varse Technologies website relies on the following technologies:
    </p>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
      <li>WAI-ARIA</li>
      <li>SVG</li>
    </ul>
    <p>
      These technologies are relied upon for conformance with the accessibility standards used.
    </p>

    <h2>Browser and Assistive Technology Compatibility</h2>
    <p>
      The I-Varse Technologies website is designed to be compatible with the following assistive technologies:
    </p>
    <ul>
      <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
      <li>Zoom and magnification software</li>
      <li>Speech recognition software</li>
      <li>Keyboard-only navigation</li>
    </ul>
    <p>
      The website is designed to be compatible with the following browsers:
    </p>
    <ul>
      <li>Google Chrome (latest 2 versions)</li>
      <li>Mozilla Firefox (latest 2 versions)</li>
      <li>Apple Safari (latest 2 versions)</li>
      <li>Microsoft Edge (latest 2 versions)</li>
    </ul>

    <h2>Measures to Support Accessibility</h2>
    <p>
      I-Varse Technologies takes the following measures to ensure accessibility of its website:
    </p>
    <ul>
      <li>Include accessibility as part of our mission statement</li>
      <li>Include accessibility throughout our internal policies</li>
      <li>Integrate accessibility into our procurement practices</li>
      <li>Provide accessibility training for our staff</li>
      <li>Assign clear accessibility goals and responsibilities</li>
      <li>Employ formal accessibility quality assurance methods</li>
    </ul>

    <h2>Legal Compliance</h2>
    <p>
      This statement was created on April 8, 2023, using the W3C Accessibility Statement Generator Tool.
    </p>
  `,
};
// Add this to the existing data.ts file
export const sitemapContent: PageContent = {
  id: 1, // Added the required id property
  title: "Sitemap",
  slug: "sitemap",
  description:
    "A complete guide to all the pages and resources available on our website.",
  metaTitle: "Sitemap | I-Varse Technologies",
  metaDescription:
    "Navigate through all pages and resources available on the I-Varse Technologies website.",
  sections: [
    {
      id: 1,
      type: "links",
      title: "Main Pages",
      items: [
        {
          title: "Home",
          path: "/",
          description: "Main landing page with overview of our services",
        },
        {
          title: "About",
          path: "/about",
          description: "Learn about I-Varse Technologies, our mission and team",
        },
        {
          title: "Services",
          path: "/services",
          description: "Explore our range of technology services",
        },
        {
          title: "Products",
          path: "/products",
          description: "View our product offerings and solutions",
        },
        {
          title: "Contact",
          path: "/contact",
          description: "Get in touch with our team",
        },
        {
          title: "Blog",
          path: "/blog",
          description: "Read our latest articles and insights",
        },
      ],
    },
    {
      id: 2,
      type: "links",
      title: "Services",
      items: [
        {
          title: "Web Development",
          path: "/services/web-development",
          description: "Custom website and web application development",
        },
        {
          title: "Mobile App Development",
          path: "/services/mobile-development",
          description: "Native and cross-platform mobile applications",
        },
        {
          title: "Cloud Solutions",
          path: "/services/cloud-solutions",
          description: "Cloud infrastructure and management services",
        },
        {
          title: "API Programming & Integration",
          path: "/services/api-integration",
          description: "Connect your systems with third-party services",
        },
        {
          title: "Digital Marketing",
          path: "/services/digital-marketing",
          description: "SEO, content marketing, and growth strategies",
        },
        {
          title: "UI/UX Design",
          path: "/services/ui-ux-design",
          description: "User-centered design for digital products",
        },
      ],
    },
    {
      id: 3,
      type: "links",
      title: "Legal & Policies",
      items: [
        {
          title: "Terms of Service",
          path: "/terms",
          description: "Terms and conditions for using our services",
        },
        {
          title: "Privacy Policy",
          path: "/privacy",
          description: "How we collect and protect your data",
        },
        {
          title: "Cookie Policy",
          path: "/cookies",
          description: "Information about cookies used on our site",
        },
        {
          title: "Accessibility",
          path: "/accessibility",
          description: "Our commitment to web accessibility",
        },
      ],
    },
    {
      id: 4,
      type: "links",
      title: "Support & Resources",
      items: [
        {
          title: "FAQ",
          path: "/faq",
          description: "Frequently asked questions about our services",
        },
        {
          title: "Careers",
          path: "/careers",
          description: "Job opportunities at I-Varse Technologies",
        },
        {
          title: "Documentation",
          path: "/docs",
          description: "Technical documentation for our services",
        },
        {
          title: "Support",
          path: "/support",
          description: "Get help with our products and services",
        },
      ],
    },
  ],
};
// FAQ data
export const faqContent: FAQPageContent = {
  id: 5,
  title: "Frequently Asked Questions",
  slug: "faq",
  description: "Find answers to common questions about I-Varse Technologies' services, processes, and solutions.",
  categories: [
    {
      id: 1,
      name: "general",
      title: "General Questions",
      description: "Basic information about I-Varse Technologies and our services",
    },
    {
      id: 2,
      name: "services",
      title: "Services & Solutions",
      description: "Information about our specific service offerings",
    },
    {
      id: 3,
      name: "process",
      title: "Working Process",
      description: "How we approach projects and collaborate with clients",
    },
    {
      id: 4,
      name: "pricing",
      title: "Pricing & Payments",
      description: "Information about our pricing models and payment terms",
    },
  ],
  items: [
    {
      id: 1,
      question: "What is I-Varse Technologies?",
      answer: "I-Varse Technologies is a leading digital innovation company providing premium web development, mobile app development, cloud infrastructure management, and IT consulting services for businesses looking to transform their digital presence.",
      categoryIds: [1, 2, 3, 4],
    },
    {
      id: 2,
      question: "Where is I-Varse Technologies located?",
      answer: "Our headquarters is located at 4 Adana Street, Off Tejuosho Rd, Surulere, Lagos, Nigeria. We also work with clients remotely across the globe.",
      categoryIds: [1],
    },
    {
      id: 3,
      question: "What industries do you serve?",
      answer: "We work with clients across various industries including finance, healthcare, education, retail, manufacturing, and technology. Our solutions are customized to meet the specific needs of each industry.",
      categoryIds: [1],
    },
    {
      id: 4,
      question: "What services does I-Varse provide?",
      answer: "I-Varse provides a comprehensive range of digital services including web development, mobile app development, cloud infrastructure management, API programming & integration, SEO optimization, ERP solutions, and content writing.",
      categoryIds: [2],
    },
    {
      id: 5,
      question: "Do you offer custom software development?",
      answer: "Yes, we specialize in custom software development tailored to your specific business requirements. We work closely with you to understand your needs and develop solutions that address your unique challenges.",
      categoryIds: [2],
    },
    {
      id: 6,
      question: "Can you help with digital transformation for my business?",
      answer: "Absolutely. We offer comprehensive digital transformation services to help businesses modernize their operations, improve efficiency, and enhance customer experiences through technology.",
      categoryIds: [2],
    },
    {
      id: 7,
      question: "What technology stacks do you work with?",
      answer: "We work with a wide range of technologies including React, Angular, Vue.js, Node.js, Python, PHP, .NET, AWS, Azure, Google Cloud, and more. We select the most appropriate technologies based on your project requirements.",
      categoryIds: [2],
    },
    {
      id: 8,
      question: "How do you approach new projects?",
      answer: "Our approach begins with a thorough discovery phase to understand your business goals, target audience, and requirements. We then move through design, development, testing, and deployment phases, with regular client communication throughout the process.",
      categoryIds: [3],
    },
    {
      id: 9,
      question: "How long does it take to complete a project?",
      answer: "Project timelines vary depending on scope and complexity. A typical website might take 4-6 weeks, while more complex applications could take several months. We'll provide a detailed timeline during our initial consultation.",
      categoryIds: [3],
    },
    {
      id: 10,
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer various support and maintenance packages to ensure your digital products continue to perform optimally after launch. Our team is always available to address any issues or implement updates.",
      categoryIds: [3],
    },
    {
      id: 11,
      question: "How do you handle project management and communication?",
      answer: "We use agile project management methodologies and provide regular updates through your preferred communication channels. You'll have a dedicated project manager as your main point of contact throughout the project.",
      categoryIds: [3],
    },
    {
      id: 12,
      question: "How do you structure your pricing?",
      answer: "We offer flexible pricing models including fixed-price projects, time and materials, and retainer arrangements. The most appropriate model depends on your project scope, timeline, and budget constraints.",
      categoryIds: [4],
    },
    {
      id: 13,
      question: "Do you require a deposit before starting work?",
      answer: "Yes, we typically require a 30-50% deposit before beginning work, with the remainder paid at agreed milestones or upon project completion, depending on the project size and duration.",
      categoryIds: [4],
    },
    {
      id: 14,
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, credit cards, and digital payment methods. For international clients, we can work with secure international payment options.",
      categoryIds: [4],
    },
  ],
  metaTitle: "",
  metaDescription: "",
  sections: []
};

export const contactPageContent: PageContent = {
  id: 1,
  title: "Contact Us",
  slug: "contact",
  description:
    "Get in touch with our team to discuss your project or inquire about our services.",
  metaTitle: "Contact Us | Get in Touch with Our Team",
  metaDescription:
    "Contact our team to discuss your project or inquire about our services. We're here to help you achieve your business objectives.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Get in touch with our team",
      subtitle:
        "Let's connect and discuss how we can help you achieve your business objectives.",
      settings: {
        buttonText: "Get Started",
        image:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: 2,
      type: "testimonials",
      title: "TESTIMONIALS",
      subtitle:
        "See what our clients have to say about their experience working with us.",
      items: testimonials,
    },
    {
      id: 3,
      type: "custom",
      title: "Frequently Asked Questions",
      subtitle:
        "Find answers to common questions about our services and how we can help your business.",
      items: faqContent.items
        .filter(
          (item) => item.categoryIds.includes(2) // Filter items from the "services" category (id: 2)
        )
        .slice(0, 3), // Take only the first 3 items
    },
  ],
};
