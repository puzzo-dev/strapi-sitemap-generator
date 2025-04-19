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
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    url: "https://google.com"
  },
  {
    name: "Apple",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    url: "https://apple.com"
  },
  {
    name: "Amazon",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    url: "https://amazon.com"
  },
  {
    name: "Microsoft",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    url: "https://microsoft.com"
  },
  {
    name: "Netflix",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: "https://netflix.com"
  }
];

// Job listings data for Careers page
export const jobListings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description: "We're looking for an experienced Full Stack Developer to lead our development team in creating robust software solutions.",
    responsibilities: [
      "Design and implement scalable web applications",
      "Lead technical architecture decisions",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with product and design teams"
    ],
    requirements: [
      "5+ years of experience in full stack development",
      "Proficiency in React, Node.js, and modern JavaScript",
      "Experience with cloud infrastructure (AWS, Azure, or GCP)",
      "Strong problem-solving skills and attention to detail"
    ]
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Join our creative team as a UX/UI Designer to craft intuitive and engaging user experiences for our products.",
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Develop wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers to ensure design implementation"
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools like Figma or Adobe XD",
      "Strong portfolio demonstrating user-centered design projects",
      "Understanding of accessibility and responsive design principles"
    ]
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description: "We're seeking a DevOps Engineer to optimize our infrastructure and streamline our development workflows.",
    responsibilities: [
      "Build and maintain CI/CD pipelines",
      "Manage cloud infrastructure and containerization",
      "Implement monitoring and logging solutions",
      "Automate deployment processes and infrastructure"
    ],
    requirements: [
      "3+ years of experience in DevOps or related field",
      "Experience with container orchestration (Kubernetes)",
      "Knowledge of infrastructure as code (Terraform, CloudFormation)",
      "Familiarity with monitoring tools and log management systems"
    ]
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Help drive our digital marketing efforts to increase brand awareness and generate leads for our business.",
    responsibilities: [
      "Develop and implement digital marketing strategies",
      "Manage social media presence and content calendar",
      "Create and optimize ad campaigns across platforms",
      "Analyze marketing metrics and provide actionable insights"
    ],
    requirements: [
      "2+ years of experience in digital marketing",
      "Proficiency in SEO, SEM, and social media marketing",
      "Experience with marketing analytics tools",
      "Strong written and verbal communication skills"
    ]
  }
];

// Benefits data for Careers page
export const benefits = [
  {
    title: "Competitive Compensation",
    description: "We offer industry-leading salaries and comprehensive benefits packages.",
    icon: "PieChart"
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs for you and your family.",
    icon: "Heart"
  },
  {
    title: "Remote-Friendly",
    description: "Flexible work arrangements including remote and hybrid options.",
    icon: "Laptop"
  },
  {
    title: "Professional Growth",
    description: "Continuous learning opportunities, conferences, and career development.",
    icon: "Award"
  },
  {
    title: "Work-Life Balance",
    description: "Generous paid time off, parental leave, and flexible schedules.",
    icon: "Coffee"
  },
  {
    title: "Global Impact",
    description: "Work on projects that make a real difference for clients worldwide.",
    icon: "Globe"
  }
];

// Blog posts dummy data for when Strapi/ERPNext isn't available
export const blogPosts = [
  {
    name: "ai-revolution-in-business",
    title: "The AI Revolution in Modern Business",
    slug: "ai-revolution-in-business",
    blog_category: "Technology",
    blog_intro: "Discover the emerging technology trends that will shape our digital landscape in 2025 and beyond.",
    content: `<p>As we look toward 2025, several emerging technologies are poised to transform how we live and work. Artificial intelligence continues to evolve at a rapid pace, with generative AI becoming increasingly sophisticated in creating content, code, and design assets.</p>
    
    <p>Quantum computing is moving from theoretical to practical applications, with major breakthroughs in error correction and qubit stability. We're seeing early commercial applications in fields like materials science, cryptography, and complex system modeling.</p>
    
    <p>The metaverse is evolving beyond gaming into practical business applications, with virtual collaboration spaces becoming more immersive and integrated with our daily workflows.</p>
    
    <p>Sustainable technology is no longer optional, with carbon-aware computing and green IT practices becoming standard across the industry as organizations work to meet ambitious climate goals.</p>`,
    published_date: "2025-01-10T10:00:00Z",
    published: true,
    featured: true,
    meta_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    meta_title: "Technology Trends That Will Define 2025 | I-Varse Technologies",
    meta_description: "Explore the top technology trends for 2025 that will reshape industries and create new opportunities for innovation and growth.",
    author: "john.doe",
    authorDetails: {
      name: "john.doe",
      full_name: "John Doe",
      user_image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Technology futurist and innovation strategist with over 15 years in the tech industry."
    },
    readTime: 8,
    tags: ["AI", "Quantum Computing", "Metaverse", "Sustainable Tech", "Innovation"]
  },
  {
    name: "cybersecurity-best-practices",
    title: "Essential Cybersecurity Best Practices",
    slug: "cybersecurity-best-practices",
    blog_category: "Security",
    blog_intro: "Protect your organization with these essential cybersecurity practices that every modern business should implement.",
    content: `<p>In today's digital landscape, cybersecurity isn't just an IT concern—it's a business imperative. As cyber threats become more sophisticated, organizations must adopt comprehensive security strategies.</p>
    
    <p>Start with a zero-trust security model that verifies every user and device attempting to access your resources, regardless of their location. Implement multi-factor authentication across all systems to add an essential layer of protection beyond passwords.</p>
    
    <p>Regular security awareness training for all employees is crucial, as human error remains one of the primary vectors for successful attacks. Combine this with continuous vulnerability scanning and timely patch management to minimize your attack surface.</p>
    
    <p>Finally, develop and regularly test an incident response plan so your team knows exactly how to respond when (not if) a security incident occurs.</p>`,
    published_date: "2025-02-15T14:30:00Z",
    published: true,
    featured: true,
    meta_image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    meta_title: "Essential Cybersecurity Practices for Business Protection | I-Varse",
    meta_description: "Learn the critical cybersecurity measures every business needs to implement to protect against today's sophisticated digital threats.",
    author: "sarah.chen",
    authorDetails: {
      name: "sarah.chen",
      full_name: "Sarah Chen",
      user_image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Cybersecurity expert specializing in threat intelligence and organizational security posture assessment."
    },
    readTime: 6,
    tags: ["Cybersecurity", "Zero Trust", "Data Protection", "Risk Management"]
  },
  {
    name: "cloud-computing-trends",
    title: "Top Cloud Computing Trends for 2025",
    slug: "cloud-computing-trends",
    blog_category: "Cloud",
    blog_intro: "Implement these proven strategies to optimize your cloud costs without sacrificing performance or reliability.",
    content: `<p>Cloud computing offers tremendous flexibility and scalability, but costs can quickly spiral out of control without proper governance. Effective cloud cost optimization begins with visibility—you can't manage what you can't measure.</p>
    
    <p>Implement tagging strategies to attribute costs to specific teams, projects, and environments. Rightsizing resources is often the quickest win, as many organizations dramatically overprovision their cloud instances.</p>
    
    <p>Take advantage of reserved instances and savings plans for predictable workloads, while using spot instances for fault-tolerant, non-critical applications. Implement automated scaling policies that match your actual usage patterns.</p>
    
    <p>Don't overlook the importance of architectural optimization—sometimes, switching to serverless or containerized approaches can significantly reduce costs while improving performance.</p>`,
    published_date: "2025-03-05T09:15:00Z",
    published: true,
    featured: false,
    meta_image: "https://images.unsplash.com/photo-1535350356005-fd52b3b524fb",
    meta_title: "Cloud Cost Optimization: Practical Strategies | I-Varse",
    meta_description: "Discover practical, proven strategies to reduce cloud spending while maintaining performance and reliability for your applications.",
    author: "miguel.rivera",
    authorDetails: {
      name: "miguel.rivera",
      full_name: "Miguel Rivera",
      user_image: "https://randomuser.me/api/portraits/men/67.jpg",
      bio: "Cloud architect with expertise in multi-cloud environments and FinOps practices."
    },
    readTime: 7,
    tags: ["Cloud Computing", "Cost Optimization", "AWS", "Azure", "FinOps"]
  },
  {
    name: "ai-ethics",
    title: "Building Ethical AI Systems: Principles and Practices",
    slug: "ethical-ai-principles-practices",
    blog_category: "Artificial Intelligence",
    blog_intro: "Learn the key principles and practical approaches for developing AI systems that are ethical, fair, and transparent.",
    content: `<p>As artificial intelligence becomes increasingly embedded in critical systems, ensuring these systems operate ethically is paramount. Ethical AI development starts with diverse teams that can identify potential biases and unintended consequences.</p>
    
    <p>Transparency should be a core principle, with documentation of training data sources, limitations, and decision-making processes. Implement fairness metrics and regular bias assessments throughout the development lifecycle.</p>
    
    <p>Design AI systems with appropriate human oversight and intervention capabilities, especially for high-stakes applications. Privacy considerations must be built in from the ground up, not added as an afterthought.</p>
    
    <p>Finally, establish governance frameworks that include regular ethical reviews and impact assessments to ensure your AI systems continue to operate as intended as they evolve and learn.</p>`,
    published_date: "2025-04-12T11:45:00Z",
    published: true,
    featured: false,
    meta_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    meta_title: "Ethical AI Development: Principles and Best Practices | I-Varse",
    meta_description: "Explore the essential principles and practical approaches for building AI systems that are ethical, fair, and beneficial to society.",
    author: "aisha.johnson",
    authorDetails: {
      name: "aisha.johnson",
      full_name: "Aisha Johnson",
      user_image: "https://randomuser.me/api/portraits/women/22.jpg",
      bio: "AI ethics researcher and consultant working on responsible innovation frameworks."
    },
    readTime: 9,
    tags: ["AI Ethics", "Responsible AI", "Machine Learning", "Fairness", "Transparency"]
  },
  {
    name: "digital-transformation-guide",
    title: "Complete Guide to Digital Transformation",
    slug: "digital-transformation-guide",
    blog_category: "Business Strategy",
    blog_intro: "Move past the hype and discover what successful digital transformation actually requires for sustainable business evolution.",
    content: `<p>Digital transformation has become an overused term, but when done right, it represents a fundamental reimagining of how an organization delivers value. True transformation goes beyond simply digitizing existing processes.</p>
    
    <p>Successful digital transformation requires clear leadership vision and unwavering commitment from the executive team. It means cultivating a culture that embraces experimentation, continuous learning, and calculated risk-taking.</p>
    
    <p>Customer experience should be at the center of transformation efforts, with technology choices driven by how they enhance value for users. Legacy system modernization is often the biggest technical challenge, requiring thoughtful approaches to avoid disruption.</p>
    
    <p>Above all, remember that digital transformation is a journey, not a destination. Organizations must build the capability to continuously evolve as technologies and market conditions change.</p>`,
    published_date: "2025-05-20T13:00:00Z",
    published: true,
    featured: false,
    meta_image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    meta_title: "Digital Transformation: Beyond the Hype | I-Varse",
    meta_description: "Learn what successful digital transformation really entails and how to move past the buzzwords to create lasting business value.",
    author: "raj.patel",
    authorDetails: {
      name: "raj.patel",
      full_name: "Raj Patel",
      user_image: "https://randomuser.me/api/portraits/men/78.jpg",
      bio: "Digital strategy consultant who has led transformation initiatives across multiple industries."
    },
    readTime: 8,
    tags: ["Digital Transformation", "Innovation", "Change Management", "Business Strategy"]
  },
  {
    name: "devops-evolution",
    title: "The Evolution of DevOps: From Collaboration to Platform Engineering",
    slug: "devops-evolution-platform-engineering",
    blog_category: "DevOps",
    blog_intro: "Explore how DevOps is evolving from a collaborative approach to a platform engineering discipline and what this means for software delivery.",
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
    meta_description: "Discover how DevOps is evolving from a collaborative philosophy to platform engineering and what this means for software teams.",
    author: "emma.wilson",
    authorDetails: {
      name: "emma.wilson",
      full_name: "Emma Wilson",
      user_image: "https://randomuser.me/api/portraits/women/56.jpg",
      bio: "Platform engineering lead specializing in building internal developer platforms and self-service infrastructure."
    },
    readTime: 7,
    tags: ["DevOps", "Platform Engineering", "GitOps", "CI/CD", "Infrastructure as Code"]
  }
];

// Blog categories dummy data
export const blogCategories = [
  {
    name: "technology",
    title: "Technology",
    slug: "technology",
    description: "Latest news and insights about emerging technologies and digital innovation"
  },
  {
    name: "security",
    title: "Security",
    slug: "security",
    description: "Cybersecurity trends, best practices, and threat intelligence"
  },
  {
    name: "cloud",
    title: "Cloud",
    slug: "cloud",
    description: "Cloud computing strategies, architectures, and implementation guides"
  },
  {
    name: "artificial-intelligence",
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "AI research, applications, and impact on business and society"
  },
  {
    name: "business-strategy",
    title: "Business Strategy",
    slug: "business-strategy",
    description: "Strategic approaches to digital business transformation and innovation"
  },
  {
    name: "devops",
    title: "DevOps",
    slug: "devops",
    description: "DevOps culture, practices, tools, and platform engineering"
  }
];
