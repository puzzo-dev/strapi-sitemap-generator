import type { BlogPost } from '@/lib/types';

export const generateDummyBlogPost = (slug: string): BlogPost => {
  const currentDate = new Date();
  const daysAgo = Math.floor(Math.random() * 4) + 2;
  const publishDate = new Date(currentDate.setDate(currentDate.getDate() - daysAgo));

  // Generate different content based on slug
  const contentMap: Record<string, { category: string; intro: string; content: string; tags: string[] }> = {
    'ai-revolution-in-business': {
      category: 'Artificial Intelligence',
      intro: 'Explore how artificial intelligence is transforming business operations and creating new opportunities for growth and innovation.',
      content: `
        <h2>The AI Revolution</h2>
        <p>Artificial Intelligence is no longer a futuristic concept—it's here, and it's transforming how businesses operate across every industry.</p>
        
        <h2>Key Applications</h2>
        <p>From customer service chatbots to predictive analytics, AI is being integrated into various business processes to improve efficiency and decision-making.</p>
        
        <h2>Implementation Strategies</h2>
        <p>Successful AI adoption requires careful planning, proper data infrastructure, and a clear understanding of business objectives.</p>
        
        <h2>Future Outlook</h2>
        <p>As AI technology continues to evolve, businesses that embrace these innovations will gain significant competitive advantages.</p>
      `,
      tags: ['artificial intelligence', 'machine learning', 'business transformation', 'automation']
    },
    'cloud-computing-trends': {
      category: 'Cloud Computing',
      intro: 'Discover the latest trends in cloud computing and how they are shaping the future of digital infrastructure.',
      content: `
        <h2>Cloud Computing Evolution</h2>
        <p>Cloud computing has evolved from a cost-saving measure to a strategic enabler of digital transformation and innovation.</p>
        
        <h2>Current Trends</h2>
        <p>Multi-cloud strategies, edge computing, and serverless architectures are defining the current cloud landscape.</p>
        
        <h2>Security Considerations</h2>
        <p>As cloud adoption increases, organizations must prioritize security and compliance in their cloud strategies.</p>
        
        <h2>Best Practices</h2>
        <p>Implementing cloud solutions requires careful planning, proper governance, and continuous optimization.</p>
      `,
      tags: ['cloud computing', 'digital transformation', 'infrastructure', 'scalability']
    },
    'cybersecurity-best-practices': {
      category: 'Cybersecurity',
      intro: 'Learn essential cybersecurity best practices to protect your organization from evolving digital threats.',
      content: `
        <h2>The Cybersecurity Landscape</h2>
        <p>As digital threats become more sophisticated, organizations must adopt comprehensive cybersecurity strategies.</p>
        
        <h2>Essential Practices</h2>
        <p>Multi-factor authentication, regular security audits, and employee training are fundamental to a strong security posture.</p>
        
        <h2>Threat Detection</h2>
        <p>Advanced threat detection systems and incident response plans are crucial for minimizing security breaches.</p>
        
        <h2>Compliance and Governance</h2>
        <p>Maintaining compliance with industry regulations while ensuring robust security governance is essential for business continuity.</p>
      `,
      tags: ['cybersecurity', 'data protection', 'compliance', 'risk management']
    }
  };

  const postData = contentMap[slug] || {
    category: 'Technology',
    intro: 'This post explores important concepts and latest developments in the technology landscape, providing valuable insights for businesses and professionals.',
    content: `
      <h2>Introduction</h2>
      <p>In today's rapidly evolving technological landscape, staying informed about the latest trends and developments is crucial for businesses and professionals alike.</p>
      
      <h2>Key Concepts</h2>
      <p>Understanding the fundamentals is essential for making informed decisions about technology adoption and implementation.</p>
      
      <h2>Practical Applications</h2>
      <p>Let's explore how these concepts can be applied in real-world business scenarios.</p>
      
      <h2>Conclusion</h2>
      <p>By staying informed about the latest developments and implementing strategic solutions, organizations can unlock new opportunities for growth and innovation.</p>
    `,
    tags: ['technology', 'innovation', 'digital transformation']
  };

  return {
    name: slug,
    slug: slug,
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    published: true,
    featured: Math.random() > 0.7, // 30% chance of being featured
    blogCategory: postData.category,
    blogCategories: [{
      id: 1,
      name: postData.category,
      title: postData.category,
      slug: postData.category.toLowerCase().replace(/\s+/g, '-'),
      description: ''
    }],
    blogIntro: postData.intro,
    content: postData.content,
    publishedAt: publishDate.toISOString(),
    readTime: Math.floor(Math.random() * 10) + 5,
    tags: postData.tags,
    metaImage: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?auto=format&fit=crop&q=80&w=1470`,
    authorDetails: {
      fullName: "I-VARSE Technical Team",
      bio: "Our technical team consists of experienced professionals specializing in cutting-edge technology solutions and digital transformation strategies.",
      userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    }
  };
};

