import React from 'react';
import { Link, useRoute } from 'wouter';
import { ArrowLeft, ArrowRight, Check, Package, Shield, Zap, HeartPulse, BarChart } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { products } from '@/lib/data';
import { ProductProps } from '@/lib/types';
import { useProductById } from '@/hooks/useStrapiContent';

// Extended products data with additional details
const extendedProducts: (ProductProps & {
  fullDescription?: string;
  features?: { icon: React.ReactNode; title: string; description: string }[];
  demoURL?: string;
  pricing?: { plan: string; price: string; billingCycle: string; features: string[] }[];
})[] = [
  {
    id: 1,
    title: 'Entry-E',
    description: 'A comprehensive event management platform for organizers.',
    keyFeatures: [
      'Attendee registration and management',
      'QR code-based ticket and attendance tracking',
      'Custom event landing pages',
      'Analytics and reporting dashboard'
    ],
    benefits: [
      'Save time with automated attendee management',
      'Increase turnout with professional event pages',
      'Make data-driven decisions with real-time analytics',
      'Enhance attendee experience with mobile tickets'
    ],
    image: '/assets/product-1.jpg',
    fullDescription: 'Entry-E is our comprehensive event management platform designed specifically for event organizers and planners. The platform streamlines every aspect of your event management process, from registration to post-event analysis.\n\nWith Entry-E, you can create beautiful, customized landing pages for your events that reflect your brand identity. The intuitive drag-and-drop editor makes it easy to design professional-looking pages without any coding knowledge.\n\nThe attendee management system allows you to handle registrations, send automated confirmations, and track attendance with our QR code-based system. The mobile app allows your staff to check in attendees quickly and efficiently, reducing wait times and improving the attendee experience.\n\nOur real-time analytics dashboard gives you instant insights into ticket sales, attendee demographics, and engagement metrics. This information helps you make data-driven decisions to optimize your current event and plan better for future ones.',
    features: [
      {
        icon: <Shield className="h-6 w-6 text-blue-500" />,
        title: 'Secure Payments',
        description: 'Integrated payment processing with bank-level security ensures your attendees\' information is always protected.'
      },
      {
        icon: <Zap className="h-6 w-6 text-purple-500" />,
        title: 'Real-time Updates',
        description: 'Event details, registrations, and analytics update in real-time, giving you the most current information.'
      },
      {
        icon: <HeartPulse className="h-6 w-6 text-red-500" />,
        title: 'Attendee Engagement',
        description: 'Interactive features like live polls, Q&A sessions, and feedback forms keep your attendees engaged throughout the event.'
      },
      {
        icon: <BarChart className="h-6 w-6 text-green-500" />,
        title: 'Comprehensive Analytics',
        description: 'Detailed reports on ticket sales, attendance rates, and engagement metrics help you measure the success of your events.'
      }
    ],
    demoURL: 'https://demo.entrye.ivarse.com',
    pricing: [
      {
        plan: 'Starter',
        price: '$99',
        billingCycle: 'per month',
        features: [
          'Up to 500 attendees per event',
          'Basic analytics',
          'Email support',
          'Standard event templates'
        ]
      },
      {
        plan: 'Professional',
        price: '$249',
        billingCycle: 'per month',
        features: [
          'Up to 2,000 attendees per event',
          'Advanced analytics',
          'Priority email and chat support',
          'Premium event templates',
          'Custom branding options'
        ]
      },
      {
        plan: 'Enterprise',
        price: 'Custom',
        billingCycle: 'pricing',
        features: [
          'Unlimited attendees',
          'Comprehensive analytics with data export',
          'Dedicated account manager',
          'Custom feature development',
          'API access for integrations',
          'White-labeling options'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Business in a Box',
    description: 'An all-in-one business management suite for SMEs.',
    keyFeatures: [
      'Inventory management and tracking',
      'CRM with customer history and insights',
      'Invoice generation and payment processing',
      'Team management with tasks and schedules'
    ],
    benefits: [
      'Centralize all business operations in one place',
      'Reduce administrative overhead with automation',
      'Improve customer relationships with detailed insights',
      'Streamline inventory and reduce waste'
    ],
    image: '/assets/product-2.jpg',
    fullDescription: 'Business in a Box is our comprehensive solution designed specifically for small and medium-sized enterprises that need to manage multiple aspects of their operations efficiently.\n\nThis all-in-one platform combines inventory management, customer relationship management, financial tools, and team coordination features into a single, intuitive interface. By centralizing these critical business functions, Business in a Box eliminates the need for multiple software subscriptions and reduces the complexity of managing your business operations.\n\nThe inventory management module allows you to track stock levels, set reorder points, and generate purchase orders automatically. The system provides real-time visibility into your inventory across multiple locations, helping you optimize stock levels and reduce carrying costs.\n\nThe built-in CRM system maintains detailed customer profiles, interaction histories, and purchase behaviors, enabling your team to provide personalized service and targeted marketing campaigns. The analytics dashboard gives you actionable insights into customer segments, buying patterns, and retention rates.\n\nFor financial management, Business in a Box offers professional invoice generation, payment processing, expense tracking, and basic financial reporting. You can automate recurring invoices, send payment reminders, and reconcile accounts to keep your cash flow healthy.\n\nThe team management module helps coordinate your staff with task assignments, scheduling, and performance tracking. Team members can collaborate on projects, share documents, and report their progress through the platform.',
    features: [
      {
        icon: <Shield className="h-6 w-6 text-blue-500" />,
        title: 'Data Security',
        description: 'Enterprise-grade security measures protect your business and customer data with regular backups and encryption.'
      },
      {
        icon: <Zap className="h-6 w-6 text-purple-500" />,
        title: 'Automation Workflows',
        description: 'Create custom automation rules to handle routine tasks like inventory reordering, customer follow-ups, and payment reminders.'
      },
      {
        icon: <HeartPulse className="h-6 w-6 text-red-500" />,
        title: 'Customer Insights',
        description: 'Analyze customer behavior patterns and preferences to improve your products, services, and marketing strategies.'
      },
      {
        icon: <BarChart className="h-6 w-6 text-green-500" />,
        title: 'Financial Reporting',
        description: 'Generate comprehensive financial reports including cash flow statements, profit and loss analyses, and sales forecasts.'
      }
    ],
    demoURL: 'https://demo.businessbox.ivarse.com',
    pricing: [
      {
        plan: 'Essential',
        price: '$149',
        billingCycle: 'per month',
        features: [
          'Up to 5 users',
          'Basic inventory management',
          'Simple CRM features',
          'Standard invoicing tools',
          'Email support'
        ]
      },
      {
        plan: 'Business',
        price: '$299',
        billingCycle: 'per month',
        features: [
          'Up to 15 users',
          'Advanced inventory with forecasting',
          'Full CRM suite with analytics',
          'Complete financial tools',
          'Priority support',
          'API access for basic integrations'
        ]
      },
      {
        plan: 'Enterprise',
        price: '$499',
        billingCycle: 'per month',
        features: [
          'Unlimited users',
          'Multi-location inventory management',
          'Advanced CRM with automation',
          'Comprehensive financial suite',
          'Dedicated account manager',
          'Custom integrations and development'
        ]
      }
    ]
  }
];

const ProductDetail: React.FC = () => {
  const [, params] = useRoute('/products/:id');
  const productId = params?.id ? parseInt(params.id, 10) : -1;
  
  // Get product from API using the hook
  const { data: apiProduct, isLoading } = useProductById(productId);
  
  // Find extended product data to merge with API data
  const extendedProductData = extendedProducts.find(p => p.id === productId);
  
  // Combine API product data with extended data, or fall back to just the extended data
  const product = apiProduct 
    ? { 
        ...apiProduct, 
        ...extendedProductData 
      } 
    : extendedProductData;
  
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
  if (!product) {
    return (
      <div className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Product Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/products">
              <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to Products</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Get other products
  const otherProducts = products.filter(p => p.id !== product.id).slice(0, 3);
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:py-24 border-b border-blue-100 dark:border-blue-900/40">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          
          {/* Tech pattern elements */}
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <Link href="/products">
              <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium mb-4 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to Products</span>
              </a>
            </Link>
            
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Package className="h-4 w-4 mr-2" />
              Software Product
            </div>
            
            <h1 className="heading-lg text-gray-800 dark:text-white mb-6">{product.title}</h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mb-8">
              {product.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton href="/contact" size="lg" endIcon={<ArrowRight />}>
                Request Demo
              </GradientButton>
              {product.demoURL && (
                <GradientButton href={product.demoURL} variant="outline" size="lg">
                  Live Demo
                </GradientButton>
              )}
            </div>
          </div>
          
          {product.image && (
            <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-auto object-cover rounded-xl border border-blue-100 dark:border-blue-800/30"
              />
            </div>
          )}
        </div>
      </section>
      
      {/* Main Product Description */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300">
                {product.fullDescription?.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )) || (
                  <p>{product.description}</p>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <span className="ml-3 text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30">
                          <Check className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                      <span className="ml-3 text-gray-600 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      {product.features && (
        <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                <Zap className="h-4 w-4 mr-2" />
                Key Capabilities
              </div>
              <h2 className="section-title">Powerful Features</h2>
              <p className="section-subtitle">
                Our software provides everything you need to streamline operations and boost performance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.features.map((feature, index) => (
                <div key={index} className="card p-6 hover-lift">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Pricing Section */}
      {product.pricing && (
        <section className="content-section bg-white dark:bg-[#132f4c]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                <BarChart className="h-4 w-4 mr-2" />
                Pricing Options
              </div>
              <h2 className="section-title">Flexible Plans for Every Need</h2>
              <p className="section-subtitle">
                Choose the right plan for your business size and requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.pricing.map((plan, index) => (
                <div 
                  key={index} 
                  className={`card p-6 border-2 ${index === 1 ? 'border-blue-500 dark:border-blue-400 shadow-lg' : 'border-blue-100 dark:border-blue-800/30'}`}
                >
                  {index === 1 && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold uppercase py-1 px-3 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{plan.plan}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-gray-800 dark:text-white">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">{plan.billingCycle}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <span className="ml-3 text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <GradientButton 
                    href="/contact" 
                    className="w-full justify-center"
                    size="sm"
                    variant={index === 1 ? 'default' : 'outline'}
                  >
                    Get Started
                  </GradientButton>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Related Products */}
      <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Package className="h-4 w-4 mr-2" />
              More Options
            </div>
            <h2 className="section-title">Related Solutions</h2>
            <p className="section-subtitle">
              Explore our other solutions that might be a better fit for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProducts.map(product => (
              <div key={product.id} className="card p-6 hover-lift">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
                <Link href={`/products/${product.id}`}>
                  <a className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="card p-8 md:p-12 gradient-bg shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-white/90 max-w-3xl mx-auto mb-8">
              Contact us today to discuss how {product.title} can help you achieve your business goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton href="/contact" variant="light" size="sm" className="border border-white/20">
                Request a Demonstration
              </GradientButton>
              <GradientButton href="/contact" variant="light" size="sm" className="border border-white/20">
                Get Custom Pricing
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;