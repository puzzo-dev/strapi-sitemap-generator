import { PageContent } from '@/lib/types/';
import { caseStudies } from './case-studies';
import { testimonials } from './testimonials';

export const caseStudiesPageContent: PageContent = {
  id: 14,
  slug: "case-studies",
  title: "Case Studies - I-VARSE Technologies",
  description: "Explore our success stories and see how we've helped businesses transform through innovative technology solutions.",
  metaTitle: "Case Studies - I-VARSE Technologies",
  metaDescription: "Explore our success stories and see how we've helped businesses transform through innovative technology solutions.",
  sections: [
    {
      id: 1,
      type: "hero",
      title: "Success Stories That Drive Innovation",
      subtitle: "Discover how we've helped businesses transform their operations and achieve remarkable results through innovative technology solutions.",
      content: "Our case studies showcase real-world examples of how our technology solutions have delivered measurable results for businesses across various industries. From digital transformation projects to custom software development, each case study demonstrates our commitment to excellence and our ability to deliver solutions that drive real business value.",
      backgroundColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c]",
      badge: "📊 Case Studies",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 2,
      type: "custom",
      title: "About I-Varse Technologies",
      subtitle: "Your trusted partner in digital transformation",
      content: "I-Varse Technologies is a leading technology company based in Nigeria, specializing in comprehensive digital solutions that drive business transformation and innovation. Founded in 2018, we have established ourselves as a trusted partner for businesses across various industries, delivering cutting-edge technology solutions that address real-world challenges.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        industryExpertise: [
          "Banking & Financial Services",
          "Healthcare & Telemedicine",
          "Retail & E-commerce",
          "Manufacturing & Logistics",
          "Education & E-learning",
          "Real Estate & Property Management"
        ],
        whyChooseUs: [
          {
            title: "Proven Track Record",
            description: "5+ years of successful project delivery across diverse industries"
          },
          {
            title: "Expert Team",
            description: "Skilled professionals with expertise in modern technologies and best practices"
          },
          {
            title: "Quality Assurance",
            description: "Rigorous testing and quality control processes ensure reliable solutions"
          },
          {
            title: "Security Focus",
            description: "Enterprise-grade security measures and compliance with industry standards"
          },
          {
            title: "Scalable Solutions",
            description: "Future-proof architectures that grow with your business needs"
          }
        ],
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 3,
      type: "case-studies",
      title: "Featured Case Studies",
      subtitle: "Real results from real projects",
      content: "Explore our portfolio of successful projects and see the impact our solutions have made. Each case study represents a unique challenge, innovative solution, and measurable results that demonstrate our expertise in delivering technology solutions that drive business growth.",
      backgroundColor: "bg-white dark:bg-[#0a192f]",
      settings: {
        featured: caseStudies,
        layout: "grid",
        columns: 3,
        gap: "large",
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 4,
      type: "testimonials",
      title: "What Our Clients Say",
      subtitle: "Trusted by businesses across Nigeria",
      content: "Our clients trust us to deliver exceptional results. Here's what they have to say about working with I-VARSE Technologies.",
      backgroundColor: "bg-blue-50 dark:bg-blue-900/20",
      badge: "💬 Testimonials",
      settings: {
        featured: testimonials,
        layout: "carousel",
        testimonialCount: 3,
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    },
    {
      id: 5,
      type: "cta",
      title: "Ready to Start Your Success Story?",
      subtitle: "Let's discuss how we can help transform your business with innovative technology solutions.",
      content: "Contact our team today to learn more about our services and how we can help your business succeed in the digital age.",
      backgroundColor: "bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]",
      settings: {
        animation: {
          type: "fade" as const,
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  ]
}; 