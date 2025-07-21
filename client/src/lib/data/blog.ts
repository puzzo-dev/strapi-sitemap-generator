import {
  BlogPost,
  BlogCategory,
} from '@/lib/types/';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    name: "ai-revolution-in-business",
    title: "The AI Revolution in Modern Business",
    slug: "ai-revolution-in-business",
    blogCategories: [{
      id: 1,
      name: "Technology",
      slug: "technology",
      description: "Latest technology trends and innovations",
      title: "Technology"
    }],
    blogIntro:
      "Discover the emerging technology trends that will shape our digital landscape in 2025 and beyond.",
    content: `<p>As we look toward 2025, several emerging technologies are poised to transform how we live and work. Artificial intelligence continues to evolve at a rapid pace, with generative AI becoming increasingly sophisticated in creating content, code, and design assets.</p>
    
    <p>Quantum computing is moving from theoretical to practical applications, with major breakthroughs in error correction and qubit stability. We're seeing early commercial applications in fields like materials science, cryptography, and complex system modeling.</p>
    
    <p>The metaverse is evolving beyond gaming into practical business applications, with virtual collaboration spaces becoming more immersive and integrated with our daily workflows.</p>
    
    <p>Sustainable technology is no longer optional, with carbon-aware computing and green IT practices becoming standard across the industry as organizations work to meet ambitious climate goals.</p>`,
    publishedAt: "2025-01-10T10:00:00Z",
    published: true,
    featured: true,
    metaImage: "/src/assets/images/IMG_2253.JPG",
    metaTitle:
      "Technology Trends That Will Define 2025 | I-Varse Technologies",
    metaDescription:
      "Explore the top technology trends for 2025 that will reshape industries and create new opportunities for innovation and growth.",
    author: "john.doe",
    authorDetails: {
      fullName: "John Doe",
      userImage: "/src/assets/images/IMG_2254.JPG",
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
    id: 2,
    name: "cybersecurity-best-practices",
    title: "Essential Cybersecurity Best Practices",
    slug: "cybersecurity-best-practices",
    blogCategories: [{
      id: 2,
      name: "Security",
      slug: "security",
      description: "Cybersecurity best practices and insights",
      title: "Security"
    }],
    blogIntro:
      "Protect your organization with these essential cybersecurity practices that every modern business should implement.",
    content: `<p>In today's digital landscape, cybersecurity isn't just an IT concern—it's a business imperative. As cyber threats become more sophisticated, organizations must adopt comprehensive security strategies.</p>
    
    <p>Start with a zero-trust security model that verifies every user and device attempting to access your resources, regardless of their location. Implement multi-factor authentication across all systems to add an essential layer of protection beyond passwords.</p>
    
    <p>Regular security awareness training for all employees is crucial, as human error remains one of the primary vectors for successful attacks. Combine this with continuous vulnerability scanning and timely patch management to minimize your attack surface.</p>
    
    <p>Finally, develop and regularly test an incident response plan so your team knows exactly how to respond when (not if) a security incident occurs.</p>`,
    publishedAt: "2025-02-15T14:30:00Z",
    published: true,
    featured: true,
    metaImage: "/src/assets/images/IMG_2255.JPG",
    metaTitle:
      "Essential Cybersecurity Practices for Business Protection | I-Varse",
    metaDescription:
      "Learn the critical cybersecurity measures every business needs to implement to protect against today's sophisticated digital threats.",
    author: "sarah.chen",
    authorDetails: {
      fullName: "Sarah Chen",
      userImage: "/src/assets/images/IMG_2256.JPG",
      bio: "Cybersecurity expert specializing in threat intelligence and organizational security posture assessment.",
    },
    readTime: 6,
    tags: ["Cybersecurity", "Zero Trust", "Data Protection", "Risk Management"],
  },
  {
    id: 3,
    name: "cloud-computing-trends",
    title: "Top Cloud Computing Trends for 2025",
    slug: "cloud-computing-trends",
    blogCategories: [{
      id: 3,
      name: "Cloud",
      slug: "cloud",
      description: "Cloud computing strategies and solutions",
      title: "Cloud"
    }],
    blogIntro:
      "Implement these proven strategies to optimize your cloud costs without sacrificing performance or reliability.",
    content: `<p>Cloud computing offers tremendous flexibility and scalability, but costs can quickly spiral out of control without proper governance. Effective cloud cost optimization begins with visibility—you can't manage what you can't measure.</p>
    
    <p>Implement tagging strategies to attribute costs to specific teams, projects, and environments. Rightsizing resources is often the quickest win, as many organizations dramatically overprovision their cloud instances.</p>
    
    <p>Take advantage of reserved instances and savings plans for predictable workloads, while using spot instances for fault-tolerant, non-critical applications. Implement automated scaling policies that match your actual usage patterns.</p>
    
    <p>Don't overlook the importance of architectural optimization—sometimes, switching to serverless or containerized approaches can significantly reduce costs while improving performance.</p>`,
    publishedAt: "2025-03-05T09:15:00Z",
    published: true,
    featured: false,
    metaImage: "/src/assets/images/IMG_2257.JPG",
    metaTitle: "Cloud Cost Optimization: Practical Strategies | I-Varse",
    metaDescription:
      "Discover practical, proven strategies to reduce cloud spending while maintaining performance and reliability for your applications.",
    author: "miguel.rivera",
    authorDetails: {
      fullName: "Miguel Rivera",
      userImage: "/src/assets/images/IMG_2258.JPG",
      bio: "Cloud architect with expertise in multi-cloud environments and FinOps practices.",
    },
    readTime: 7,
    tags: ["Cloud Computing", "Cost Optimization", "AWS", "Azure", "FinOps"],
  }
];

// Extract unique categories from blog posts
export const blogCategories: BlogCategory[] = Array.from(
  new Map(
    blogPosts.flatMap(post => post.blogCategories).map(category => [category.id, category])
  ).values()
);