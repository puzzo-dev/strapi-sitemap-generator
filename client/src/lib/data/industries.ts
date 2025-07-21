import { IndustryProps } from '@/lib/types/content';

export const industries: IndustryProps[] = [
  {
    id: 1,
    name: 'Banking & Finance',
    slug: 'banking-finance',
    description: 'Digital transformation solutions for financial institutions',
    content: `Nigerian banking industries face challenges such as legacy system modernization, regulatory compliance, security threats, and the need for improved customer experience. Many banks struggle with outdated infrastructure, slow digital adoption, and increasing cyber risks. I-Varse Technologies helps Nigerian banks overcome these challenges by providing modern digital banking platforms, secure cloud solutions, AI-powered fraud detection, and seamless customer engagement tools. Our expertise enables banks to innovate, comply with regulations, and deliver superior digital experiences to their customers.`,
    icon: 'fa-university',
    image: '/src/assets/images/IMG_2257.JPG',
    challenges: [
      'Legacy system modernization',
      'Regulatory compliance',
      'Customer experience enhancement',
      'Security and fraud prevention'
    ],
    solutions: [
      'Digital banking platforms',
      'Mobile banking applications',
      'Blockchain integration',
      'AI-powered fraud detection'
    ],
    caseStudies: [
      {
        id: 1,
        title: 'Digital Banking Transformation',
        description: 'Complete digital transformation for First Bank Nigeria'
      }
    ],
    technologies: ['React', 'Node.js', 'AWS', 'Blockchain', 'AI/ML'],
    featured: true
  },
  {
    id: 2,
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Innovative healthcare technology solutions',
    icon: 'fa-heartbeat',
    image: '/src/assets/images/IMG_2258.JPG',
    content: `Nigerian healthcare institutions face significant challenges including inadequate patient data management, limited access to healthcare services in remote areas, and the need for better healthcare analytics. Many hospitals struggle with paper-based systems, inefficient patient care coordination, and lack of telemedicine capabilities. I-Varse Technologies addresses these challenges by developing comprehensive Electronic Health Records (EHR) systems, telemedicine platforms, and healthcare analytics solutions that improve patient care, streamline operations, and enhance healthcare accessibility across Nigeria.`,
    challenges: [
      'Patient data management',
      'Telemedicine platforms',
      'Healthcare analytics',
      'Compliance and security'
    ],
    solutions: [
      'Electronic Health Records (EHR)',
      'Telemedicine applications',
      'Healthcare analytics dashboards',
      'HIPAA-compliant systems'
    ],
    caseStudies: [
      {
        id: 2,
        title: 'Telemedicine Platform',
        description: 'Comprehensive telemedicine solution for healthcare providers'
      }
    ],
    technologies: ['React Native', 'Python', 'PostgreSQL', 'HIPAA', 'HL7'],
    featured: true
  },
  {
    id: 3,
    name: 'Retail & E-commerce',
    slug: 'retail-ecommerce',
    description: 'Digital commerce solutions for modern retail',
    icon: 'fa-shopping-cart',
    image: '/src/assets/images/IMG_2259.JPG',
    content: `Nigerian retail businesses face challenges in adapting to digital commerce, managing inventory across multiple channels, and providing personalized customer experiences. Many retailers struggle with limited online presence, inefficient inventory management, and poor customer relationship management. I-Varse Technologies helps Nigerian retailers transform their businesses by developing robust e-commerce platforms, integrated inventory management systems, and customer relationship management tools that enable omnichannel retail experiences and drive business growth in the digital economy.`,
    challenges: [
      'Omnichannel retail experience',
      'Inventory management',
      'Customer personalization',
      'Payment processing'
    ],
    solutions: [
      'E-commerce platforms',
      'Inventory management systems',
      'Customer relationship management',
      'Payment gateway integration'
    ],
    caseStudies: [
      {
        id: 3,
        title: 'E-commerce Platform',
        description: 'Scalable e-commerce solution for retail chains'
      }
    ],
    technologies: ['Next.js', 'Strapi', 'PostgreSQL', 'Redis', 'Stripe'],
    featured: true
  },
  {
    id: 4,
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Industry 4.0 solutions for manufacturing',
    icon: 'fa-industry',
    image: '/src/assets/images/IMG_2260.JPG',
    content: `Nigerian manufacturing companies face challenges in supply chain optimization, quality control automation, and production efficiency. Many manufacturers struggle with manual processes, poor supply chain visibility, and lack of predictive maintenance capabilities. I-Varse Technologies enables Nigerian manufacturers to embrace Industry 4.0 by implementing IoT sensor integration, predictive analytics, and quality management systems that optimize production processes, reduce costs, and improve product quality while enhancing supply chain visibility and operational efficiency.`,
    challenges: [
      'Supply chain optimization',
      'Quality control automation',
      'Predictive maintenance',
      'Production efficiency'
    ],
    solutions: [
      'IoT sensor integration',
      'Predictive analytics',
      'Quality management systems',
      'Supply chain optimization'
    ],
    caseStudies: [
      {
        id: 4,
        title: 'Smart Manufacturing',
        description: 'IoT-driven manufacturing optimization'
      }
    ],
    technologies: ['IoT', 'Python', 'Machine Learning', 'Cloud Computing', 'Edge Computing'],
    featured: true
  },
  {
    id: 5,
    name: 'Education',
    slug: 'education',
    description: 'Digital learning and educational technology solutions',
    icon: 'fa-graduation-cap',
    image: '/src/assets/images/IMG_2261.JPG',
    content: `Nigerian educational institutions face challenges in delivering quality education remotely, managing student data effectively, and providing personalized learning experiences. Many schools and universities struggle with limited digital infrastructure, poor content delivery systems, and inadequate assessment tools. I-Varse Technologies helps Nigerian educational institutions modernize their learning environments by developing comprehensive Learning Management Systems (LMS), virtual classroom platforms, and educational analytics tools that enhance teaching effectiveness, improve student engagement, and enable data-driven educational decision making.`,
    challenges: [
      'Remote learning platforms',
      'Student management systems',
      'Content delivery optimization',
      'Assessment and analytics'
    ],
    solutions: [
      'Learning Management Systems (LMS)',
      'Virtual classrooms',
      'Student information systems',
      'Educational analytics platforms'
    ],
    caseStudies: [
      {
        id: 5,
        title: 'Digital Learning Platform',
        description: 'Comprehensive LMS for universities and schools'
      }
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AI/ML'],
    featured: true
  },
  {
    id: 6,
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Property management and real estate technology solutions',
    icon: 'fa-building',
    image: '/src/assets/images/IMG_2262.JPG',
    content: `Nigerian real estate companies face challenges in property listing management, virtual property tours, and market analytics. Many real estate firms struggle with manual property management processes, limited online presence, and poor customer engagement tools. I-Varse Technologies helps Nigerian real estate companies digitize their operations by developing comprehensive property management systems, virtual tour platforms, and market analysis tools that streamline property transactions, enhance customer experiences, and provide valuable market insights for informed decision making.`,
    challenges: [
      'Property listing management',
      'Virtual property tours',
      'Transaction automation',
      'Market analytics'
    ],
    solutions: [
      'Property management systems',
      'Virtual tour platforms',
      'Real estate CRM',
      'Market analysis tools'
    ],
    caseStudies: [
      {
        id: 6,
        title: 'Property Management Platform',
        description: 'End-to-end property management solution'
      }
    ],
    technologies: ['Next.js', 'Three.js', 'PostgreSQL', 'Redis', 'Stripe'],
    featured: true
  },
  {
    id: 7,
    name: 'Transportation & Logistics',
    slug: 'transportation-logistics',
    description: 'Smart transportation and logistics solutions',
    icon: 'fa-truck',
    image: '/src/assets/images/IMG_2263.JPG',
    content: `Nigerian transportation and logistics companies face challenges in route optimization, fleet management, and supply chain tracking. Many logistics providers struggle with inefficient routing, poor fleet visibility, and limited real-time tracking capabilities. I-Varse Technologies helps Nigerian logistics companies optimize their operations by developing advanced fleet management systems, route optimization algorithms, and supply chain tracking solutions that reduce operational costs, improve delivery efficiency, and enhance customer satisfaction through better service delivery and real-time visibility.`,
    challenges: [
      'Route optimization',
      'Fleet management',
      'Supply chain tracking',
      'Last-mile delivery'
    ],
    solutions: [
      'Fleet management systems',
      'Route optimization algorithms',
      'Supply chain tracking',
      'Delivery management platforms'
    ],
    caseStudies: [
      {
        id: 7,
        title: 'Smart Fleet Management',
        description: 'IoT-powered fleet optimization system'
      }
    ],
    technologies: ['IoT', 'Python', 'Machine Learning', 'GPS', 'Cloud Computing'],
    featured: true
  },
  {
    id: 8,
    name: 'Energy & Utilities',
    slug: 'energy-utilities',
    description: 'Smart energy and utility management solutions',
    icon: 'fa-bolt',
    image: '/src/assets/images/IMG_2247.JPG',
    content: `Nigerian energy and utility companies face challenges in smart grid management, energy consumption monitoring, and renewable energy integration. Many utility providers struggle with outdated infrastructure, poor energy distribution efficiency, and limited renewable energy adoption. I-Varse Technologies helps Nigerian energy companies modernize their operations by implementing smart grid systems, energy monitoring platforms, and predictive maintenance tools that optimize energy distribution, reduce operational costs, and support the transition to renewable energy sources while improving service reliability and customer satisfaction.`,
    challenges: [
      'Smart grid management',
      'Energy consumption monitoring',
      'Predictive maintenance',
      'Renewable energy integration'
    ],
    solutions: [
      'Smart grid systems',
      'Energy monitoring platforms',
      'Predictive maintenance tools',
      'Renewable energy management'
    ],
    caseStudies: [
      {
        id: 8,
        title: 'Smart Grid Implementation',
        description: 'IoT-based energy grid optimization'
      }
    ],
    technologies: ['IoT', 'Python', 'Machine Learning', 'SCADA', 'Cloud Computing'],
    featured: true
  }
]; 