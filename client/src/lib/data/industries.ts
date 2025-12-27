import { IndustryProps } from '@/lib/types/content';

export const industries: IndustryProps[] = [
  {
    id: 1,
    name: 'Banking & Finance',
    slug: 'banking-finance',
    description: 'Reinventing financial services through intelligent digital transformation',
    content: `Financial institutions face unprecedented pressure to modernize legacy infrastructure, navigate evolving regulatory landscapes, defend against sophisticated threats, and deliver seamless digital experiences. The gap between customer expectations and operational reality continues to widen. We partner with banking leaders to architect cloud-native platforms that don't just digitize existing processes—they fundamentally reimagine how financial services are delivered. From AI-driven fraud prevention to blockchain-enabled settlement systems, we enable institutions to compete on innovation while maintaining absolute regulatory compliance and security resilience.`,
    icon: 'fa-university',
    image: '/src/assets/images/IMG_2257.JPG',
    challenges: [
      'Legacy infrastructure transformation',
      'Regulatory compliance automation',
      'Next-generation customer engagement',
      'Intelligent threat detection and prevention'
    ],
    solutions: [
      'Cloud-native core banking platforms',
      'AI-powered mobile banking ecosystems',
      'Blockchain-enabled transaction settlement',
      'Real-time fraud detection and prevention'
    ],
    caseStudies: [
      {
        id: 1,
        title: 'Financial Services Reinvented',
        description: 'Enterprise banking transformation delivering 40% efficiency gains'
      }
    ],
    technologies: ['React', 'Node.js', 'AWS', 'Blockchain', 'AI/ML'],
    featured: true
  },
  {
    id: 2,
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Transforming care delivery through intelligent health technology',
    icon: 'fa-heartbeat',
    image: '/src/assets/images/IMG_2258.JPG',
    content: `Healthcare organizations face the dual challenge of delivering superior patient outcomes while managing operational complexity, data fragmentation, and regulatory constraints. The shift from episodic care to continuous health management requires technology that adapts to this new paradigm. We architect integrated health platforms that unify patient data, enable virtual care at scale, and surface actionable clinical insights. From HIPAA-compliant EHR systems to AI-powered diagnostic support, we enable healthcare providers to deliver personalized, accessible, and evidence-based care while optimizing operational efficiency and clinical effectiveness.`,
    challenges: [
      'Unified patient data ecosystems',
      'Virtual care platforms at scale',
      'Predictive healthcare analytics',
      'Regulatory compliance and data security'
    ],
    solutions: [
      'Integrated Electronic Health Records (EHR)',
      'Telehealth and remote monitoring platforms',
      'Clinical intelligence and analytics dashboards',
      'HIPAA and GDPR-compliant architectures'
    ],
    caseStudies: [
      {
        id: 2,
        title: 'Healthcare Innovation at Scale',
        description: 'Integrated care platform achieving 95% patient satisfaction'
      }
    ],
    technologies: ['React Native', 'Python', 'PostgreSQL', 'HIPAA', 'HL7'],
    featured: true
  },
  {
    id: 3,
    name: 'Retail & E-commerce',
    slug: 'retail-ecommerce',
    description: 'Architecting seamless commerce experiences that drive growth',
    icon: 'fa-shopping-cart',
    image: '/src/assets/images/IMG_2259.JPG',
    content: `Retail organizations face relentless pressure to deliver personalized experiences across every touchpoint while managing inventory complexity, optimizing fulfillment, and maintaining profitability. The boundary between physical and digital commerce has dissolved. We architect omnichannel ecosystems that unify inventory, personalize customer journeys, and optimize every transaction. From intelligent merchandising platforms to predictive inventory management, we enable retailers to compete on experience, operate with precision, and scale sustainably in markets where customer expectations evolve faster than traditional systems can adapt.`,
    challenges: [
      'Unified omnichannel experiences',
      'Intelligent inventory optimization',
      'Hyper-personalized customer engagement',
      'Frictionless payment orchestration'
    ],
    solutions: [
      'Next-generation e-commerce platforms',
      'Predictive inventory management systems',
      'AI-powered customer intelligence platforms',
      'Multi-channel payment gateway integration'
    ],
    caseStudies: [
      {
        id: 3,
        title: 'Retail Ecosystem Reimagined',
        description: 'Omnichannel transformation driving 300% online revenue growth'
      }
    ],
    technologies: ['Next.js', 'Strapi', 'PostgreSQL', 'Redis', 'Stripe'],
    featured: true
  },
  {
    id: 4,
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Enabling Industry 4.0 through intelligent manufacturing systems',
    icon: 'fa-industry',
    image: '/src/assets/images/IMG_2260.JPG',
    content: `Manufacturing organizations face mounting pressure to optimize yield, reduce downtime, enhance quality, and respond dynamically to demand fluctuations—all while managing global supply chain complexity. The transition to Industry 4.0 isn't optional; it's existential. We architect IoT-enabled manufacturing ecosystems that connect every asset, surface real-time insights, and enable predictive decision-making. From edge computing for shop floor intelligence to AI-driven quality assurance, we empower manufacturers to operate with precision, adapt to disruption, and compete on both efficiency and innovation in increasingly volatile markets.`,
    challenges: [
      'End-to-end supply chain visibility',
      'Autonomous quality control systems',
      'Predictive asset maintenance',
      'Real-time production optimization'
    ],
    solutions: [
      'Industrial IoT sensor integration',
      'AI-powered predictive analytics',
      'Automated quality management systems',
      'Digital twin supply chain optimization'
    ],
    caseStudies: [
      {
        id: 4,
        title: 'Industry 4.0 Manufacturing Transformation',
        description: 'IoT-enabled smart manufacturing achieving 45% OEE improvement'
      }
    ],
    technologies: ['IoT', 'Python', 'Machine Learning', 'Cloud Computing', 'Edge Computing'],
    featured: true
  },
  {
    id: 5,
    name: 'Education',
    slug: 'education',
    description: 'Reimagining learning through adaptive educational technology',
    icon: 'fa-graduation-cap',
    image: '/src/assets/images/IMG_2261.JPG',
    content: `Educational institutions face the challenge of delivering personalized, accessible, and effective learning experiences while managing administrative complexity and demonstrating measurable outcomes. The shift from standardized instruction to adaptive learning requires platforms that understand individual learner needs. We architect intelligent learning ecosystems that adapt to each student, enable educators to teach more effectively, and surface insights that drive continuous improvement. From AI-powered adaptive learning to comprehensive learning analytics, we enable institutions to deliver education that's both scalable and deeply personalized.`,
    challenges: [
      'Adaptive learning platforms at scale',
      'Unified student data ecosystems',
      'Engaging content delivery systems',
      'Learning analytics and outcome measurement'
    ],
    solutions: [
      'AI-powered Learning Management Systems (LMS)',
      'Immersive virtual classroom environments',
      'Intelligent student information systems',
      'Predictive learning analytics platforms'
    ],
    caseStudies: [
      {
        id: 5,
        title: 'Education Transformation',
        description: 'Adaptive learning platform serving 50,000+ students'
      }
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AI/ML'],
    featured: true
  },
  {
    id: 6,
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Transforming property experiences through intelligent platforms',
    icon: 'fa-building',
    image: '/src/assets/images/IMG_2262.JPG',
    content: `Real estate organizations face pressure to deliver immersive property experiences, streamline complex transactions, and leverage data for strategic decision-making in rapidly shifting markets. Traditional property marketing and management approaches no longer meet buyer expectations or operational demands. We architect property technology platforms that enable virtual experiences at scale, automate transaction workflows, and surface market intelligence that drives competitive advantage. From 3D immersive tours to predictive market analytics, we enable real estate firms to compete on experience, operate with efficiency, and make data-informed investment decisions.`,
    challenges: [
      'Intelligent property portfolio management',
      'Immersive virtual property experiences',
      'Automated transaction workflows',
      'Predictive market intelligence'
    ],
    solutions: [
      'Cloud-native property management systems',
      'WebGL-powered 3D virtual tour platforms',
      'AI-enhanced real estate CRM',
      'Predictive market analysis and valuation tools'
    ],
    caseStudies: [
      {
        id: 6,
        title: 'PropTech Innovation',
        description: 'End-to-end property platform reducing transaction time by 60%'
      }
    ],
    technologies: ['Next.js', 'Three.js', 'PostgreSQL', 'Redis', 'Stripe'],
    featured: true
  },
  {
    id: 7,
    name: 'Transportation & Logistics',
    slug: 'transportation-logistics',
    description: 'Optimizing supply chains through intelligent logistics platforms',
    icon: 'fa-truck',
    image: '/src/assets/images/IMG_2263.JPG',
    content: `Logistics organizations face unprecedented complexity—managing global supply chains, optimizing fleet operations, and meeting escalating customer delivery expectations while controlling costs. Traditional routing and tracking approaches can't keep pace with modern demands. We architect intelligent logistics platforms that optimize every mile, predict disruptions before they impact delivery, and provide end-to-end visibility across the supply chain. From AI-powered route optimization to predictive maintenance, we enable logistics providers to operate with precision, adapt to volatility, and deliver service excellence at scale.`,
    challenges: [
      'Dynamic route optimization at scale',
      'Predictive fleet management',
      'Real-time supply chain visibility',
      'Last-mile delivery optimization'
    ],
    solutions: [
      'AI-powered fleet management systems',
      'Machine learning route optimization',
      'End-to-end supply chain tracking platforms',
      'Intelligent delivery orchestration'
    ],
    caseStudies: [
      {
        id: 7,
        title: 'Smart Logistics Transformation',
        description: 'IoT-powered fleet optimization reducing costs by 35%'
      }
    ],
    technologies: ['IoT', 'Python', 'Machine Learning', 'GPS', 'Cloud Computing'],
    featured: true
  },
  {
    id: 8,
    name: 'Energy & Utilities',
    slug: 'energy-utilities',
    description: 'Modernizing energy infrastructure through intelligent grid systems',
    icon: 'fa-bolt',
    image: '/src/assets/images/IMG_2247.JPG',
    content: `Energy and utility organizations face the dual challenge of maintaining reliable service while transitioning to sustainable energy sources, optimizing distribution efficiency, and managing aging infrastructure. The energy landscape is undergoing its most significant transformation in a century. We architect smart grid platforms that optimize energy distribution in real-time, predict equipment failures before they cause outages, and integrate renewable sources seamlessly. From IoT-enabled grid intelligence to AI-powered demand forecasting, we enable utilities to deliver reliable service, reduce operational costs, and accelerate the transition to sustainable energy—all while maintaining grid resilience.`,
    challenges: [
      'Intelligent grid management and optimization',
      'Real-time energy consumption analytics',
      'Predictive infrastructure maintenance',
      'Renewable energy integration at scale'
    ],
    solutions: [
      'AI-powered smart grid systems',
      'Real-time energy monitoring and analytics',
      'Predictive maintenance platforms',
      'Renewable energy management systems'
    ],
    caseStudies: [
      {
        id: 8,
        title: 'Smart Grid Modernization',
        description: 'IoT-based energy optimization reducing outages by 50%'
      }
    ],
    technologies: ['IoT', 'Python', 'Machine Learning', 'SCADA', 'Cloud Computing'],
    featured: true
  }
]; 