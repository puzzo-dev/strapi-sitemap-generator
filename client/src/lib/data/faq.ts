import {
  FAQPageContent,
  FAQItem,
  FAQCategory
} from '@/lib/types';
import { products } from './products';
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
    question: "What is I-Varse Technologies?",
    answer: "I-Varse Technologies is a leading digital innovation company providing premium web development, mobile app development, cloud infrastructure management, and IT consulting services for businesses looking to transform their digital presence.",
    categoryIds: [1],
    translationKey: "general-company-intro"
  },
  {
    id: 201,
    question: "Where is I-Varse Technologies located?",
    answer: "Our headquarters is located at 4 Adana Street, Off Tejuosho Rd, Surulere, Lagos, Nigeria. We also work with clients remotely across the globe.",
    categoryIds: [1],
    translationKey: "general-location"
  },
  {
    id: 202,
    question: "What industries do you serve?",
    answer: "We work with clients across various industries including finance, healthcare, education, retail, manufacturing, and technology. Our solutions are customized to meet the specific needs of each industry.",
    categoryIds: [1],
    translationKey: "general-industries"
  },
  {
    id: 203,
    question: "What services does I-Varse provide?",
    answer: "I-Varse provides a comprehensive range of digital services including web development, mobile app development, cloud infrastructure management, API Engineering & integration, SEO optimization, ERP solutions, and content writing.",
    categoryIds: [2],
    translationKey: "services-overview"
  },
  {
    id: 204,
    question: "Do you offer custom software development?",
    answer: "Yes, we specialize in custom software development tailored to your specific business requirements. We work closely with you to understand your needs and develop solutions that address your unique challenges.",
    categoryIds: [2],
    translationKey: "services-custom-development"
  },
  {
    id: 205,
    question: "Can you help with digital transformation for my business?",
    answer: "Absolutely. We offer comprehensive digital transformation services to help businesses modernize their operations, improve efficiency, and enhance customer experiences through technology.",
    categoryIds: [2],
    translationKey: "services-digital-transformation"
  },
  {
    id: 206,
    question: "What technology stacks do you work with?",
    answer: "We work with a wide range of technologies including React, Angular, Vue.js, Node.js, Python, PHP, .NET, AWS, Azure, Google Cloud, and more. We select the most appropriate technologies based on your project requirements.",
    categoryIds: [2],
    translationKey: "services-tech-stacks"
  },
  {
    id: 207,
    question: "What software products do you offer?",
    answer: "We offer a range of software products including ERP systems, CRM solutions, e-commerce platforms, learning management systems, and custom business applications designed to streamline operations.",
    categoryIds: [3],
    translationKey: "products-overview"
  },
  {
    id: 208,
    question: "Are your products customizable?",
    answer: "Yes, all our products are highly customizable to meet your specific business requirements. We can modify features, integrate with existing systems, and adapt the user interface to match your branding.",
    categoryIds: [3],
    translationKey: "products-customization"
  },
  {
    id: 209,
    question: "Do you provide training for your products?",
    answer: "Yes, we provide comprehensive training for all our products. This includes user training, administrator training, and ongoing support to ensure your team can effectively use the software.",
    categoryIds: [3],
    translationKey: "products-training"
  },
  {
    id: 210,
    question: "How do you approach new projects?",
    answer: "Our approach begins with a thorough discovery phase to understand your business goals, target audience, and requirements. We then move through design, development, testing, and deployment phases, with regular client communication throughout the process.",
    categoryIds: [4],
    translationKey: "process-approach"
  },
  {
    id: 211,
    question: "How long does it take to complete a project?",
    answer: "Project timelines vary depending on scope and complexity. A typical website might take 4-6 weeks, while more complex applications could take several months. We'll provide a detailed timeline during our initial consultation.",
    categoryIds: [4],
    translationKey: "process-timeline"
  },
  {
    id: 212,
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes, we offer various support and maintenance packages to ensure your digital products continue to perform optimally after launch. Our team is always available to address any issues or implement updates.",
    categoryIds: [4],
    translationKey: "process-support"
  },
  {
    id: 213,
    question: "How do you handle project management and communication?",
    answer: "We use agile project management methodologies and provide regular updates through your preferred communication channels. You'll have a dedicated project manager as your main point of contact throughout the project.",
    categoryIds: [4],
    translationKey: "process-communication"
  },
  {
    id: 214,
    question: "How do you structure your pricing?",
    answer: "We offer flexible pricing models including fixed-price projects, time and materials, and retainer arrangements. The most appropriate model depends on your project scope, timeline, and budget constraints.",
    categoryIds: [5],
    translationKey: "pricing-structure"
  },
  {
    id: 215,
    question: "Do you require a deposit before starting work?",
    answer: "Yes, we typically require a 30-50% deposit before beginning work, with the remainder paid at agreed milestones or upon project completion, depending on the project size and duration.",
    categoryIds: [5],
    translationKey: "pricing-deposit"
  },
  {
    id: 216,
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, credit cards, and digital payment methods. For international clients, we can work with secure international payment options.",
    categoryIds: [5],
    translationKey: "pricing-payment-methods"
  },
  {
    id: 217,
    question: "Do you work with international clients?",
    answer: "Yes, we work with clients globally and have experience serving international markets. We can accommodate different time zones and provide remote collaboration tools for seamless communication.",
    categoryIds: [1],
    translationKey: "general-international"
  },
  {
    id: 218,
    question: "What is your quality assurance process?",
    answer: "We follow rigorous quality assurance processes including code reviews, automated testing, manual testing, and user acceptance testing. We ensure all deliverables meet our high standards before deployment.",
    categoryIds: [4],
    translationKey: "process-quality-assurance"
  },
  {
    id: 219,
    question: "Can you help with existing system maintenance?",
    answer: "Yes, we provide maintenance and support services for existing systems. We can help with updates, bug fixes, performance optimization, and feature enhancements for your current applications.",
    categoryIds: [2],
    translationKey: "services-maintenance"
  },
  {
    id: 220,
    question: "Do you provide hosting and infrastructure services?",
    answer: "Yes, we offer comprehensive hosting and infrastructure management services including cloud hosting, server management, monitoring, backup solutions, and security services.",
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
    return faqContent.items.filter(faq => faq.categoryIds.includes(categoryId));
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
