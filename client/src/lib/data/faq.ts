import {
  FAQPageContent,
  FAQItem,
  FAQCategory
} from '@/lib/types';
import { products } from './solutions';
import { services } from './services';

// Extract FAQ items from products using prop drilling
const extractProductFAQs = (): FAQItem[] => {
  const productFAQs: FAQItem[] = [];
  let faqId = 1;

  products.forEach((product) => {
    if (product.faqs?.items) {
      product.faqs.items.forEach((item) => {
        productFAQs.push({
          id: faqId++,
          question: item.title || '',
          answer: item.description || '',
          categoryIds: [3], // Products category
          translationKey: `${product.slug || 'product'}-faq-${item.id}`
        });
      });
    }
  });

  return productFAQs;
};

// Extract FAQ items from services using prop drilling
const extractServiceFAQs = (): FAQItem[] => {
  const serviceFAQs: FAQItem[] = [];
  let faqId = 100; // Start from 100 to avoid conflicts

  services.forEach((service) => {
    if (service.faqs?.items) {
      service.faqs.items.forEach((item) => {
        serviceFAQs.push({
          id: faqId++,
          question: item.title || '',
          answer: item.description || '',
          categoryIds: [2], // Services category
          translationKey: `${service.slug || 'service'}-faq-${item.id}`
        });
      });
    }
  });

  return serviceFAQs;
};

// Generic FAQs about I-Varse Technologies
const genericFAQs: FAQItem[] = [
  {
    id: 200,
    question: "What defines I-VARSE Technologies?",
    answer: "I-VARSE Technologies is an innovation partner specializing in enterprise digital transformation. We architect intelligent solutions—from cloud-native platforms to AI-powered applications—that don't just modernize operations, but fundamentally transform how organizations compete, deliver value, and scale for sustainable growth.",
    categoryIds: [1],
    translationKey: "general-company-intro"
  },
  {
    id: 201,
    question: "Where does I-VARSE operate?",
    answer: "While headquartered at 4 Adana Street, Off Tejuosho Rd, Surulere, Lagos, Nigeria, we serve clients globally with a remote-first approach. Our delivery model combines local market expertise with international best practices, enabling us to deliver world-class solutions regardless of geography.",
    categoryIds: [1],
    translationKey: "general-location"
  },
  {
    id: 202,
    question: "Which industries benefit most from your expertise?",
    answer: "We partner with forward-thinking organizations across financial services, healthcare, manufacturing, retail, technology, and public sector. Our industry-specific accelerators and domain expertise enable rapid deployment of solutions that address sector-unique challenges while incorporating cross-industry innovation.",
    categoryIds: [1],
    translationKey: "general-industries"
  },
  {
    id: 203,
    question: "What distinguishes your service approach?",
    answer: "We deliver comprehensive transformation capabilities spanning cloud architecture, AI/ML engineering, enterprise platforms, mobile experiences, and intelligent automation. Our approach emphasizes measurable business outcomes over technology for technology's sake—every solution is engineered to deliver strategic advantage, not just operational efficiency.",
    categoryIds: [2],
    translationKey: "services-overview"
  },
  {
    id: 204,
    question: "How do you approach custom solution development?",
    answer: "Our methodology begins with deep business context—understanding your strategic objectives, competitive landscape, and user needs. We then architect solutions that solve today's challenges while anticipating tomorrow's opportunities. Expect collaborative partnership, iterative delivery, and platforms engineered for evolution, not obsolescence.",
    categoryIds: [2],
    translationKey: "services-custom-development"
  },
  {
    id: 205,
    question: "What does enterprise transformation look like with I-VARSE?",
    answer: "True transformation transcends technology adoption—it's organizational reinvention. We guide you through strategic planning, change management, technology modernization, and capability building. The result: organizations that don't just implement new systems, but fundamentally improve how they create value, make decisions, and respond to market dynamics.",
    categoryIds: [2],
    translationKey: "services-digital-transformation"
  },
  {
    id: 206,
    question: "How do you select technology stacks for projects?",
    answer: "Technology selection is a strategic decision driven by your specific context—scalability requirements, team capabilities, integration needs, and long-term roadmap. We maintain deep expertise across React, Node.js, Python, cloud platforms (AWS, Azure, GCP), and emerging technologies, but never force-fit solutions. The right technology serves your business objectives, not our preferences.",
    categoryIds: [2],
    translationKey: "services-tech-stacks"
  },
  {
    id: 207,
    question: "What enterprise solutions power your portfolio?",
    answer: "Our solution portfolio spans intelligent ERP systems (OpsCloud™), AI-powered CRM platforms, next-generation e-commerce ecosystems, adaptive learning management systems, and bespoke business applications. Each solution is architected for scale, designed for performance, and engineered to deliver measurable competitive advantage—not just operational improvement, but fundamental transformation.",
    categoryIds: [3],
    translationKey: "products-overview"
  },
  {
    id: 208,
    question: "How do your solutions adapt to unique business contexts?",
    answer: "Absolute adaptability is foundational to our approach. Every solution is designed with extensibility at its core—configurable business logic, composable integrations with existing enterprise systems, and adaptive interfaces that reflect your brand identity and user workflows. We don't believe in one-size-fits-all; we architect platforms that evolve with your organization's unique requirements and strategic direction.",
    categoryIds: [3],
    translationKey: "products-customization"
  },
  {
    id: 209,
    question: "How do you enable organizational capability?",
    answer: "Capability enablement is integral to solution adoption. We deliver role-specific training programs—from end-user proficiency to administrator mastery to executive dashboards—complemented by change management support and continuous enablement resources. Technology implementation succeeds when people are empowered; we ensure your teams don't just use our solutions, they leverage them for strategic advantage.",
    categoryIds: [3],
    translationKey: "products-training"
  },
  {
    id: 210,
    question: "What defines your delivery methodology?",
    answer: "Our methodology prioritizes business context before technology. We begin with strategic discovery—understanding competitive dynamics, user behaviors, organizational capabilities, and success metrics. This informs human-centered design, agile engineering, continuous quality validation, and phased deployment with risk mitigation. Transparency is non-negotiable: you'll have real-time visibility into progress, decisions, and outcomes throughout the journey.",
    categoryIds: [4],
    translationKey: "process-approach"
  },
  {
    id: 211,
    question: "What determines delivery timelines?",
    answer: "Delivery velocity depends on transformation complexity, integration depth, and organizational readiness. A strategic digital presence might launch in 4-6 weeks; an enterprise-grade platform transformation could span several quarters. We balance speed with quality—rapid deployment without compromising resilience. During discovery, we'll provide precise timeline projections aligned with your business objectives and risk tolerance.",
    categoryIds: [4],
    translationKey: "process-timeline"
  },
  {
    id: 212,
    question: "How do you ensure continuous solution evolution?",
    answer: "Launch is a milestone, not a destination. We offer tiered support partnerships—from proactive monitoring and performance optimization to strategic enhancements and capability expansion. Your digital ecosystem must evolve with market dynamics, user expectations, and competitive pressures. Our managed services ensure your solutions remain performant, secure, and strategically relevant long after initial deployment.",
    categoryIds: [4],
    translationKey: "process-support"
  },
  {
    id: 213,
    question: "How do you orchestrate collaborative delivery?",
    answer: "We operate as an extension of your team, not an external vendor. Agile ceremonies provide rhythm—sprint planning, daily stand-ups, retrospectives—while adaptive communication channels (Slack, Microsoft Teams, or your platform of choice) ensure continuous alignment. You'll have a dedicated delivery lead who serves as your strategic partner, translating business needs into technical execution and ensuring organizational change readiness.",
    categoryIds: [4],
    translationKey: "process-communication"
  },
  {
    id: 214,
    question: "What engagement models drive mutual value?",
    answer: "We offer flexible commercial frameworks aligned with your strategic context: fixed-scope engagements for defined initiatives, time-and-materials for exploratory innovation, retainer partnerships for continuous evolution, and outcome-based models tied to measurable business results. The optimal structure depends on transformation complexity, risk profile, and your organizational appetite for collaborative investment.",
    categoryIds: [5],
    translationKey: "pricing-structure"
  },
  {
    id: 215,
    question: "How is investment structured throughout delivery?",
    answer: "Partnership begins with mutual commitment—typically 30-50% initial investment to mobilize resources and commence discovery. Subsequent payments align with validated milestones or delivery phases, balancing your cash flow management with our resource allocation. For enterprise transformations, we structure phased investments tied to capability delivery and business value realization.",
    categoryIds: [5],
    translationKey: "pricing-deposit"
  },
  {
    id: 216,
    question: "How do you facilitate global commerce?",
    answer: "We support diverse payment mechanisms to accommodate your financial operations: international wire transfers, corporate credit cards, and secure digital payment platforms. For multinational engagements, we offer multi-currency invoicing and comply with local fiscal requirements, ensuring seamless commercial operations regardless of geographic complexity.",
    categoryIds: [5],
    translationKey: "pricing-payment-methods"
  },
  {
    id: 217,
    question: "How do you deliver across global markets?",
    answer: "Our delivery model is inherently global—we've architected solutions for organizations spanning Europe, Asia-Pacific, Americas, and Africa. Time zone diversity becomes an asset through follow-the-sun delivery cadences. Remote collaboration isn't a constraint; it's our operating model, leveraging enterprise-grade tools and asynchronous communication frameworks to ensure seamless partnership regardless of geography.",
    categoryIds: [1],
    translationKey: "general-international"
  },
  {
    id: 218,
    question: "How do you ensure engineering excellence?",
    answer: "Quality is embedded in every layer of our delivery fabric—peer code reviews, automated test suites with comprehensive coverage, continuous integration pipelines, performance profiling, security scanning, and user acceptance validation. We operate under a zero-defect mindset: nothing reaches production without passing through multiple quality gates. Excellence isn't inspected in; it's engineered from inception.",
    categoryIds: [4],
    translationKey: "process-quality-assurance"
  },
  {
    id: 219,
    question: "How do you modernize legacy technology estates?",
    answer: "We specialize in technical debt remediation and legacy system evolution—from critical bug resolution and performance tuning to strategic modernization and capability expansion. Whether you need stabilization, optimization, or transformation of existing systems, we assess technical health, prioritize interventions by business impact, and execute incremental improvements that deliver measurable ROI without disrupting operations.",
    categoryIds: [2],
    translationKey: "services-maintenance"
  },
  {
    id: 220,
    question: "What managed infrastructure capabilities do you offer?",
    answer: "We provide end-to-end managed infrastructure services—cloud-native hosting on AWS/Azure/GCP, automated infrastructure provisioning, 24/7 performance monitoring, disaster recovery orchestration, and defense-in-depth security. Your infrastructure becomes our responsibility, allowing your teams to focus on innovation while we ensure resilience, scalability, and compliance across your technology estate.",
    categoryIds: [2],
    translationKey: "services-hosting"
  }
];

// Create comprehensive FAQ content object
export const faqContent: FAQPageContent = {
  title: "Frequently Asked Questions",
  slug: "faq",
  description: "Find answers to common questions about I-Varse Technologies' services, processes, and solutions.",
  metaTitle: "Frequently Asked Questions - I-VARSE Technologies",
  metaDescription: "Find answers to common questions about our services, processes, and solutions. Get help and support for all your I-VARSE Technologies inquiries.",
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
      name: "products",
      title: "Products & Software",
      description: "Information about our software products and solutions",
    },
    {
      id: 4,
      name: "process",
      title: "Working Process",
      description: "How we approach projects and collaborate with clients",
    },
    {
      id: 5,
      name: "pricing",
      title: "Pricing & Payments",
      description: "Information about our pricing models and payment terms",
    },
  ],
  items: [
    ...extractProductFAQs(),
    ...extractServiceFAQs(),
    ...genericFAQs
  ],
  content: "Comprehensive FAQ section covering all aspects of I-Varse Technologies services and products."
};

// Export FAQ items for easy access
export const faqItems: FAQItem[] = faqContent.items;

// Helper methods for accessing FAQs
export const faqHelpers = {
  // Get all FAQs
  getAll: (): FAQItem[] => faqContent.items,

  // Get FAQs by category
  getByCategory: (categoryId: number): FAQItem[] => {
    return faqContent.items.filter(faq => faq.categoryIds?.includes(categoryId));
  },

  // Get FAQs by category name
  getByCategoryName: (categoryName: string): FAQItem[] => {
    const category = faqContent.categories.find(cat => cat.name === categoryName);
    if (!category) return [];
    return faqHelpers.getByCategory(category.id);
  },

  // Get product FAQs
  getProductFAQs: (): FAQItem[] => faqHelpers.getByCategory(3),

  // Get service FAQs
  getServiceFAQs: (): FAQItem[] => faqHelpers.getByCategory(2),

  // Get general FAQs
  getGeneralFAQs: (): FAQItem[] => faqHelpers.getByCategory(1),

  // Search FAQs
  search: (query: string): FAQItem[] => {
    const lowerQuery = query.toLowerCase();
    return faqContent.items.filter(faq =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery)
    );
  },

  // Get FAQ by ID
  getById: (id: number): FAQItem | undefined => {
    return faqContent.items.find(faq => faq.id === id);
  },

  // Get categories
  getCategories: (): FAQCategory[] => faqContent.categories,

  // Get category by ID
  getCategoryById: (id: number): FAQCategory | undefined => {
    return faqContent.categories.find(cat => cat.id === id);
  }
};

// Export default for backward compatibility
export default faqContent;
