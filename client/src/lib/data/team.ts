import {
  TeamMember,
} from '@/lib/types';

export const defaultTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Cloud Solutions Architect",
    translationKey: "sarah-johnson",
    bio: "Sarah is a passionate cloud solutions architect with over 10 years of experience in designing and implementing scalable cloud infrastructure. She specializes in AWS, Azure, and Google Cloud platforms, helping businesses optimize their cloud strategies and reduce operational costs.",
    role: "Senior Cloud Architect",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    slug: "sarah-johnson",
    description: "Leading cloud infrastructure design and implementation for enterprise clients",
    email: "sarah.johnson@ivarse.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "2020-03-15",
    socialLinks: [
      {
        id: 1,
        platform: "LinkedIn",
        translationKey: "linkedin",
        icon: "fa-linkedin",
        href: "https://linkedin.com/in/sarahjohnson",
        title: "LinkedIn Profile"
      },
      {
        id: 2,
        platform: "Twitter",
        translationKey: "twitter",
        icon: "fa-twitter",
        href: "https://twitter.com/sarahjohnson",
        title: "Twitter Profile"
      },
      {
        id: 3,
        platform: "GitHub",
        translationKey: "github",
        icon: "fa-github",
        href: "https://github.com/sarahjohnson",
        title: "GitHub Profile"
      }
    ],
    projects: {
      id: 1,
      title: "Recent Projects",
      content: "Led cloud migration for Fortune 500 company, reducing costs by 40%",
      items: [
        {
          id: 1,
          title: "Enterprise Cloud Migration",
          description: "Successfully migrated 200+ applications to AWS",
          subtitle: "2023"
        },
        {
          id: 2,
          title: "Multi-Cloud Strategy",
          description: "Designed hybrid cloud solution for healthcare provider",
          subtitle: "2022"
        }
      ]
    },
    relatedTeamMembers: {
      id: 1,
      title: "Team Collaborations",
      content: "Works closely with DevOps and Security teams",
      items: [
        {
          id: 2,
          title: "David Chen",
          description: "Mobile Development Lead",
          subtitle: "Cross-platform integration"
        },
        {
          id: 4,
          title: "Michael Anderson",
          description: "Cybersecurity Director",
          subtitle: "Security compliance"
        }
      ]
    },
    erpNextId: "EMP001",
    erpNextStatus: "active",
    erpNextDepartment: "Engineering"
  },
  {
    id: 2,
    name: "David Chen",
    position: "Mobile Development Lead",
    translationKey: "david-chen",
    bio: "David leads our mobile development team with expertise in iOS, Android, and cross-platform solutions. With 8 years of experience in mobile app development, he has successfully delivered over 50 applications across various industries.",
    role: "Senior Mobile Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    slug: "david-chen",
    description: "Expert in native and cross-platform mobile development",
    email: "david.chen@ivarse.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    joinDate: "2021-06-20",
    socialLinks: [
      {
        id: 4,
        platform: "LinkedIn",
        translationKey: "linkedin",
        icon: "fa-linkedin",
        href: "https://linkedin.com/in/davidchen",
        title: "LinkedIn Profile"
      },
      {
        id: 5,
        platform: "GitHub",
        translationKey: "github",
        icon: "fa-github",
        href: "https://github.com/davidchen",
        title: "GitHub Profile"
      },
      {
        id: 6,
        platform: "Medium",
        translationKey: "medium",
        icon: "fa-medium",
        href: "https://medium.com/@davidchen",
        title: "Medium Blog"
      }
    ],
    projects: {
      id: 2,
      title: "Mobile Projects",
      content: "Developed award-winning mobile applications for healthcare and finance",
      items: [
        {
          id: 3,
          title: "Healthcare Telemedicine App",
          description: "4.8-star rated app with 50,000+ downloads",
          subtitle: "2023"
        },
        {
          id: 4,
          title: "Financial Services App",
          description: "Secure mobile banking solution for regional bank",
          subtitle: "2022"
        }
      ]
    },
    relatedTeamMembers: {
      id: 2,
      title: "Development Team",
      content: "Collaborates with UI/UX and Backend teams",
      items: [
        {
          id: 1,
          title: "Sarah Johnson",
          description: "Cloud Solutions Architect",
          subtitle: "Backend integration"
        },
        {
          id: 3,
          title: "Emily Roberts",
          description: "AI Solutions Specialist",
          subtitle: "AI features integration"
        }
      ]
    },
    erpNextId: "EMP002",
    erpNextStatus: "active",
    erpNextDepartment: "Engineering"
  },
  {
    id: 3,
    name: "Emily Roberts",
    position: "AI Solutions Specialist",
    translationKey: "emily-roberts",
    bio: "Emily specializes in machine learning, natural language processing, and AI-driven solutions. She holds a PhD in Computer Science and has published numerous papers on AI applications in business.",
    role: "Senior AI Engineer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    slug: "emily-roberts",
    description: "Leading AI and machine learning initiatives for enterprise clients",
    email: "emily.roberts@ivarse.com",
    phone: "+1 (555) 345-6789",
    location: "Boston, MA",
    joinDate: "2022-01-10",
    socialLinks: [
      {
        id: 7,
        platform: "LinkedIn",
        translationKey: "linkedin",
        icon: "fa-linkedin",
        href: "https://linkedin.com/in/emilyroberts",
        title: "LinkedIn Profile"
      },
      {
        id: 8,
        platform: "ResearchGate",
        translationKey: "researchgate",
        icon: "fa-researchgate",
        href: "https://researchgate.net/profile/emily-roberts",
        title: "ResearchGate Profile"
      },
      {
        id: 9,
        platform: "GitHub",
        translationKey: "github",
        icon: "fa-github",
        href: "https://github.com/emilyroberts",
        title: "GitHub Profile"
      }
    ],
    projects: {
      id: 3,
      title: "AI Projects",
      content: "Developed AI solutions for healthcare, finance, and retail industries",
      items: [
        {
          id: 5,
          title: "Predictive Analytics Platform",
          description: "ML-powered forecasting for retail inventory management",
          subtitle: "2023"
        },
        {
          id: 6,
          title: "Natural Language Processing API",
          description: "Custom NLP solution for customer service automation",
          subtitle: "2022"
        }
      ]
    },
    relatedTeamMembers: {
      id: 3,
      title: "AI Team",
      content: "Leads AI initiatives across multiple departments",
      items: [
        {
          id: 2,
          title: "David Chen",
          description: "Mobile Development Lead",
          subtitle: "Mobile AI features"
        },
        {
          id: 1,
          title: "Sarah Johnson",
          description: "Cloud Solutions Architect",
          subtitle: "AI infrastructure"
        }
      ]
    },
    erpNextId: "EMP003",
    erpNextStatus: "active",
    erpNextDepartment: "Research & Development"
  },
  {
    id: 4,
    name: "Michael Anderson",
    position: "Cybersecurity Director",
    translationKey: "michael-anderson",
    bio: "Michael ensures our security infrastructure and compliance with industry standards. With 12 years of cybersecurity experience, he has implemented security frameworks for Fortune 500 companies and government agencies.",
    role: "Senior Security Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    slug: "michael-anderson",
    description: "Ensuring enterprise-grade security and compliance across all systems",
    email: "michael.anderson@ivarse.com",
    phone: "+1 (555) 456-7890",
    location: "Washington, DC",
    joinDate: "2019-09-05",
    socialLinks: [
      {
        id: 10,
        platform: "LinkedIn",
        translationKey: "linkedin",
        icon: "fa-linkedin",
        href: "https://linkedin.com/in/michaelanderson",
        title: "LinkedIn Profile"
      },
      {
        id: 11,
        platform: "Twitter",
        translationKey: "twitter",
        icon: "fa-twitter",
        href: "https://twitter.com/michaelanderson",
        title: "Twitter Profile"
      },
      {
        id: 12,
        platform: "Security Blog",
        translationKey: "security-blog",
        icon: "fa-shield-alt",
        href: "https://securityblog.michaelanderson.com",
        title: "Security Blog"
      }
    ],
    projects: {
      id: 4,
      title: "Security Projects",
      content: "Implemented comprehensive security frameworks for enterprise clients",
      items: [
        {
          id: 7,
          title: "Zero Trust Architecture",
          description: "Implemented zero trust security model for financial institution",
          subtitle: "2023"
        },
        {
          id: 8,
          title: "SOC 2 Compliance",
          description: "Achieved SOC 2 Type II certification for healthcare platform",
          subtitle: "2022"
        }
      ]
    },
    relatedTeamMembers: {
      id: 4,
      title: "Security Team",
      content: "Works across all departments to ensure security compliance",
      items: [
        {
          id: 1,
          title: "Sarah Johnson",
          description: "Cloud Solutions Architect",
          subtitle: "Cloud security"
        },
        {
          id: 3,
          title: "Emily Roberts",
          description: "AI Solutions Specialist",
          subtitle: "AI security"
        }
      ]
    },
    erpNextId: "EMP004",
    erpNextStatus: "active",
    erpNextDepartment: "Security"
  }
];
