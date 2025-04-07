import React from 'react';
import ProductCard from '@/components/ui/ProductCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import GradientButton from '@/components/ui/GradientButton';
import { products, testimonials } from '@/lib/data';
import { ProductProps, TestimonialProps } from '@/lib/types';
import { useProducts, useTestimonials } from '@/hooks/useStrapiContent';
import { ArrowRight, Package, Target, PieChart, ShieldCheck, Award, Cpu, Check } from 'lucide-react';

const Products: React.FC = () => {
  const { data: apiProducts, isLoading: isProductsLoading } = useProducts();
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();
  
  // Use the API data if available, otherwise fall back to local data
  const displayProducts = apiProducts?.length ? apiProducts : products;
  const displayTestimonials = apiTestimonials?.length ? apiTestimonials : testimonials;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          
          {/* Tech pattern elements */}
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
              <Package className="h-4 w-4 mr-2" />
              Our Products
            </div>
            
            <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="gradient-text">Powerful Products</span> for<br />Your Business Success
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Unlock your business potential with our suite of powerful, innovative software solutions designed to streamline operations and drive growth.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <GradientButton href="#products" size="lg" endIcon={<ArrowRight />}>
                Explore Products
              </GradientButton>
              <GradientButton href="/contact" variant="outline" size="lg">
                Request Demo
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* Product Benefits Section */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Target className="h-4 w-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="section-title">Transformative Solutions for Modern Businesses</h2>
            <p className="section-subtitle">
              Our products are designed with your success in mind, combining powerful features with intuitive interfaces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 hover-lift">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our products incorporate advanced security features to protect your business data and maintain compliance with industry standards.
              </p>
            </div>
            
            <div className="card p-8 hover-lift">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-200 dark:shadow-purple-900/20">
                <Cpu className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Cutting-Edge Technology</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Leveraging the latest advancements in cloud computing, AI, and machine learning to deliver superior performance and results.
              </p>
            </div>
            
            <div className="card p-8 hover-lift">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-200 dark:shadow-cyan-900/20">
                <PieChart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Scalable Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our products grow with your business, providing the flexibility to adapt to your evolving needs without compromising performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section id="products" className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Package className="h-4 w-4 mr-2" />
              Featured Products
            </div>
            <h2 className="section-title">Our Software Solutions</h2>
            <p className="section-subtitle">
              Discover our range of innovative products designed to solve real business challenges and drive exceptional results.
            </p>
          </div>
          
          <div className="space-y-16">
            {isProductsLoading ? (
              // Loading skeleton for products
              Array(2).fill(0).map((_, index) => (
                <div key={index} className="card animate-pulse p-8">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
                      <div className="space-y-2">
                        {Array(4).fill(0).map((_, i) => (
                          <div key={i} className="flex items-start">
                            <div className="w-5 h-5 bg-gray-100 dark:bg-gray-600 rounded-full mt-1 mr-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
                      <div className="space-y-2">
                        {Array(4).fill(0).map((_, i) => (
                          <div key={i} className="flex items-start">
                            <div className="w-5 h-5 bg-gray-100 dark:bg-gray-600 rounded-full mt-1 mr-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
                  </div>
                </div>
              ))
            ) : (
              displayProducts.map((product, index) => (
                <div key={product.id} className={index % 2 === 0 ? '' : 'bg-white dark:bg-[#132f4c] py-12 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16'}>
                  <ProductCard product={product} isReversed={index % 2 !== 0} />
                </div>
              ))
            )}
          </div>
          
          {/* Product Comparison Table */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                <PieChart className="h-4 w-4 mr-2" />
                Product Comparison
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">Compare Our Solutions</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Find the perfect solution for your business needs. Compare our products to identify which features best align with your requirements.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-900/20">
                    <th className="border border-blue-100 dark:border-blue-800/30 p-4 text-left text-gray-800 dark:text-white">Features</th>
                    <th className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-blue-700 dark:text-blue-300 font-bold">Entry-E</th>
                    <th className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-blue-700 dark:text-blue-300 font-bold">Business in a Box</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 font-medium text-gray-800 dark:text-white">Core Functionality</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">Event Management</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">Business Operations</td>
                  </tr>
                  <tr className="bg-blue-50/50 dark:bg-blue-900/10">
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 font-medium text-gray-800 dark:text-white">Best For</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">Event Organizers</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">Small & Medium Businesses</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 font-medium text-gray-800 dark:text-white">Mobile Support</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </span>
                    </td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-blue-50/50 dark:bg-blue-900/10">
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 font-medium text-gray-800 dark:text-white">Analytics Dashboard</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </span>
                    </td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 font-medium text-gray-800 dark:text-white">Payment Processing</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </span>
                    </td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-blue-50/50 dark:bg-blue-900/10">
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 font-medium text-gray-800 dark:text-white">Inventory Management</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full">
                        <svg className="h-4 w-4 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </span>
                    </td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 font-medium text-gray-800 dark:text-white">CRM System</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">Basic</td>
                    <td className="border border-blue-100 dark:border-blue-800/30 p-4 text-center text-gray-600 dark:text-gray-300">Advanced</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <GradientButton href="/contact" size="lg" className="mx-auto" endIcon={<ArrowRight className="h-4 w-4 ml-1" />}>
                Request Custom Solution
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Award className="h-4 w-4 mr-2" />
              Customer Success
            </div>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Don't just take our word for it. See what our clients have to say about our products and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              // Loading skeleton for testimonials
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="card p-6 animate-pulse">
                  <div className="flex mb-4 space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-4/6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
              ))
            ) : (
              displayTestimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section bg-blue-50 dark:bg-[#0a1929]">
        <div className="container-custom">
          <div className="card p-8 md:p-12 border-2 border-blue-100 dark:border-blue-800/30 text-center">
            <h2 className="heading-lg text-gray-800 dark:text-white mb-6">Ready to Transform Your Business?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Our products are designed to help you achieve your business goals. Contact us today to learn how we can customize our solutions to meet your specific needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton href="/contact" size="lg" endIcon={<ArrowRight />}>
                Request a Demo
              </GradientButton>
              <GradientButton href="/blog" variant="outline" size="lg">
                Read Success Stories
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
