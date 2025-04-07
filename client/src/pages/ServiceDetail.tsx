import React from 'react';
import { Link, useRoute } from 'wouter';
import { ArrowLeft, ArrowRight, Check, Target, Users, BarChart, Clock, Calendar } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { services } from '@/lib/data';
import { ServiceProps } from '@/lib/types';
import { useServiceById } from '@/hooks/useStrapiContent';

// Extended services data with additional details
const extendedServices: (ServiceProps & {
  fullDescription?: string;
  benefits?: string[];
  process?: { title: string; description: string }[];
  casestudies?: { title: string; description: string; result: string }[];
  faqs?: { question: string; answer: string }[];
})[] = [
  {
    ...services[0],
    fullDescription: `Our Cloud Infrastructure Management services provide comprehensive solutions for organizations looking to optimize their cloud resources, enhance security, and improve operational efficiency.

We handle every aspect of your cloud environment, from initial assessment and design to ongoing management and optimization. Our team of certified cloud experts ensures your infrastructure aligns with industry best practices while meeting your specific business requirements.

Whether you're looking to migrate to the cloud, optimize existing cloud resources, or implement a multi-cloud strategy, our services are designed to help you achieve maximum value from your cloud investments.`,
    benefits: [
      "Reduced operational costs through optimized resource allocation",
      "Enhanced security and compliance with industry standards",
      "Improved scalability to meet changing business demands",
      "24/7 monitoring and support for maximum uptime",
      "Streamlined operations through automation and standardization"
    ],
    process: [
      {
        title: "Assessment",
        description: "We begin with a thorough assessment of your current infrastructure, identifying opportunities for optimization and improvement."
      },
      {
        title: "Strategic Planning",
        description: "Based on our assessment, we develop a strategic roadmap tailored to your business needs and objectives."
      },
      {
        title: "Implementation",
        description: "Our experts implement the recommended changes, ensuring minimal disruption to your operations."
      },
      {
        title: "Continuous Optimization",
        description: "We continuously monitor and optimize your cloud environment to ensure optimal performance and cost-efficiency."
      }
    ],
    casestudies: [
      {
        title: "Financial Services Firm",
        description: "Implemented a secure cloud infrastructure that reduced operational costs by 35% while ensuring compliance with financial regulations.",
        result: "35% cost reduction, improved security posture, and enhanced compliance"
      },
      {
        title: "Healthcare Provider",
        description: "Designed and implemented a hybrid cloud solution that improved system availability and enhanced data protection.",
        result: "99.99% uptime, strengthened data security, and streamlined operations"
      }
    ],
    faqs: [
      {
        question: "How can cloud infrastructure management benefit my business?",
        answer: "Cloud infrastructure management can reduce costs, improve scalability, enhance security, and provide greater flexibility for your business operations. It allows you to focus on your core business while we handle the complexities of your IT infrastructure."
      },
      {
        question: "Do you support multi-cloud environments?",
        answer: "Yes, we have expertise in all major cloud platforms including AWS, Azure, and Google Cloud. We can help you implement a multi-cloud strategy that leverages the strengths of each platform while avoiding vendor lock-in."
      },
      {
        question: "How do you ensure security in the cloud?",
        answer: "We implement comprehensive security measures including identity and access management, encryption, network security, and continuous monitoring. We also ensure compliance with relevant industry standards and regulations."
      },
      {
        question: "Can you help with cloud migration?",
        answer: "Yes, we offer end-to-end cloud migration services, from assessment and planning to execution and post-migration optimization. We ensure a smooth transition with minimal disruption to your business."
      }
    ]
  },
  // Other services would follow the same pattern
  {
    ...services[1],
    fullDescription: `Our Mobile App Development services deliver cutting-edge mobile applications for iOS and Android platforms that engage users and drive business growth.

We specialize in creating intuitive, high-performance mobile applications that provide exceptional user experiences across devices. From concept to deployment, our team of expert developers works closely with you to bring your vision to life.

Whether you need a consumer-facing app or an enterprise solution, we leverage the latest technologies and best practices to deliver mobile applications that exceed expectations.`
  },
  {
    ...services[2],
    fullDescription: `Our API Programming & Integration services enable seamless connections between your systems and applications, facilitating efficient data exchange and functionality.

We design, build, and integrate APIs that power your digital ecosystem, allowing different software components to communicate effectively. Our team ensures reliable, secure, and scalable API solutions tailored to your specific requirements.

From RESTful APIs to GraphQL and webhook implementations, we provide comprehensive API services that enhance your business capabilities and create new opportunities for innovation.`
  }
];

const ServiceDetail: React.FC = () => {
  const [, params] = useRoute('/services/:id');
  const serviceId = params?.id ? parseInt(params.id, 10) : -1;
  
  // Get service from API using the hook
  const { data: apiService, isLoading } = useServiceById(serviceId);
  
  // Find extended service data to merge with API data
  const extendedServiceData = extendedServices.find(s => s.id === serviceId);
  
  // Combine API service data with extended data, or fall back to just the extended data
  const service = apiService 
    ? { 
        ...apiService, 
        ...extendedServiceData 
      } 
    : extendedServiceData;
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="content-section bg-white dark:bg-[#132f4c] min-h-screen">
        <div className="container-custom py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
            <div className="flex gap-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle not found case
  if (!service) {
    return (
      <div className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Service Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The service you're looking for doesn't exist or has been removed.</p>
            <Link href="/services">
              <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to Services</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Get other services
  const otherServices = services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          
          {/* Tech pattern elements */}
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>

        <div className="container-custom relative z-10">
          <Link href="/services">
            <a className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>All Services</span>
            </a>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                <Target className="h-4 w-4 mr-2" />
                Our Services
              </div>
              
              <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {service.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <GradientButton href="#benefits" endIcon={<ArrowRight />}>
                  Explore Benefits
                </GradientButton>
                <GradientButton href="/contact" variant="outline">
                  Get Started
                </GradientButton>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="relative h-96 w-96">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-64 w-64 rounded-full bg-blue-50 dark:bg-blue-900/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-blue-100 dark:border-blue-800/50 shadow-xl">
                    {/* Service icon or illustration would go here */}
                    <div className="text-6xl text-blue-500 dark:text-blue-400">
                      {/* Just using a placeholder icon here - would ideally be replaced with a proper illustration */}
                      <svg className="h-32 w-32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12C22 14.2091 20.2091 16 18 16C15.7909 16 14 14.2091 14 12C14 9.79086 15.7909 8 18 8C20.2091 8 22 9.79086 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 5C10 6.65685 8.65685 8 7 8C5.34315 8 4 6.65685 4 5C4 3.34315 5.34315 2 7 2C8.65685 2 10 3.34315 10 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 19C10 20.6569 8.65685 22 7 22C5.34315 22 4 20.6569 4 19C4 17.3431 5.34315 16 7 16C8.65685 16 10 17.3431 10 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-blue-100/50 dark:bg-blue-700/20 animate-pulse-slower"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-purple-100/50 dark:bg-purple-700/20 animate-pulse-slow"></div>
                <div className="absolute h-full w-full rounded-full border-2 border-dashed border-blue-200/50 dark:border-blue-700/20 animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Description */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300">
                {service.fullDescription?.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )) || (
                  <p>{service.description}</p>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Why Choose Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Expert team with proven track record</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Customized solutions for your needs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Transparent communication throughout</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Commitment to measurable results</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Ongoing support and optimization</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <GradientButton href="/contact" className="w-full justify-center">
                    Request a Consultation
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <BarChart className="h-4 w-4 mr-2" />
              Benefits
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">How You'll Benefit</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our {service.title.toLowerCase()} services are designed to deliver tangible business value and address your specific challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(service.benefits || [
              "Improved operational efficiency",
              "Cost optimization and reduced overhead",
              "Enhanced security and compliance",
              "Scalable solutions for business growth",
              "Competitive advantage in your market",
              "Expert support and maintenance"
            ]).map((benefit, index) => (
              <div key={index} className="card p-6 hover-lift">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{benefit.split(':')[0]}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.includes(':') ? benefit.split(':')[1].trim() : 'Leverage our expertise to achieve optimal results for your business.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      {service.process && (
        <section className="content-section bg-white dark:bg-[#132f4c]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                <Clock className="h-4 w-4 mr-2" />
                Our Process
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">How We Work</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our proven methodology ensures efficient delivery and exceptional results for every project.
              </p>
            </div>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-blue-100 dark:bg-blue-800/50 -translate-x-1/2"></div>
              
              <div className="space-y-16">
                {service.process.map((step, index) => (
                  <div key={index} className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:rtl' : ''}`}>
                    {/* Step number (always on the line) */}
                    <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-400 text-white items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    
                    <div className={`md:text-right ${index % 2 === 1 ? 'md:ltr' : ''}`}>
                      {/* Mobile step number */}
                      <div className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-400 text-white font-bold mb-3">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                    
                    <div className={`relative ${index % 2 === 1 ? 'md:ltr' : ''}`}>
                      <div className="p-6 h-full bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
                        {/* This would be an illustration or icon for each step */}
                        <div className="h-40 flex items-center justify-center text-blue-400 dark:text-blue-300">
                          <svg className="h-24 w-24 opacity-75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {index === 0 && (
                              <path d="M12 6V18M9 8V16M6 10V14M15 8V16M18 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                            {index === 1 && (
                              <path d="M21 7v10h-8v5l-5-2v-3h-6v-10h8v-5l5 2v3h6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                            {index === 2 && (
                              <path d="M12 4v16m-8-8h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                            {index === 3 && (
                              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      {service.casestudies && (
        <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                <Users className="h-4 w-4 mr-2" />
                Success Stories
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Case Studies</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See how we've helped organizations like yours achieve their goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.casestudies.map((casestudy, index) => (
                <div key={index} className="card p-6 md:p-8 hover-lift">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{casestudy.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{casestudy.description}</p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
                    <div className="font-medium text-gray-800 dark:text-white mb-1">Results:</div>
                    <div className="text-gray-600 dark:text-gray-300">{casestudy.result}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <GradientButton href="/case-studies">
                View All Case Studies
              </GradientButton>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && (
        <section className="content-section bg-white dark:bg-[#132f4c]">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                FAQs
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Get answers to common questions about our {service.title.toLowerCase()} services.
              </p>
            </div>
            
            <div className="space-y-6">
              {service.faqs.map((faq, index) => (
                <div key={index} className="card p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have more questions? We're here to help.
              </p>
              <GradientButton href="/contact">
                Contact Us
              </GradientButton>
            </div>
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              Explore More
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Other Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive range of services designed to help your business succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.map((otherService) => (
              <div key={otherService.id} className="card p-6 hover-lift group">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M9 8V16M6 10V14M15 8V16M18 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{otherService.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {otherService.description}
                </p>
                <Link href={`/services/${otherService.id}`}>
                  <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <GradientButton href="/services" variant="outline">
              View All Services
            </GradientButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="card p-8 md:p-12 gradient-bg shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-white/90 max-w-3xl mx-auto mb-8">
              Contact us today to discuss how our {service.title.toLowerCase()} services can help you achieve your business goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton href="/contact" variant="light" className="border border-white/20">
                Request a Consultation
              </GradientButton>
              <GradientButton href="/contact" variant="light" className="border border-white/20">
                Request Custom Quote
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;