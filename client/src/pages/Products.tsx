import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ui/ProductCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import GradientButton from '@/components/ui/GradientButton';
import { products, testimonials } from '@/lib/data';
import { ProductProps, TestimonialProps } from '@/lib/types';

const Products: React.FC = () => {
  const { data: apiProducts, isLoading: isProductsLoading } = useQuery<ProductProps[]>({
    queryKey: ['/api/products'],
    initialData: products,
  });

  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useQuery<TestimonialProps[]>({
    queryKey: ['/api/testimonials'],
    initialData: testimonials,
  });

  return (
    <>
      {/* Header Section */}
      <section className="bg-secondary py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Explore Our Products</h2>
            <p className="section-subtitle">
              We're focused on providing innovative solutions to elevate your business operations.
            </p>
            <div className="mt-8">
              <GradientButton href="/contact">
                Get Started
              </GradientButton>
            </div>
          </div>
          
          {/* Products Cards */}
          <div className="space-y-12">
            {isProductsLoading ? (
              // Loading skeleton for products
              Array(2).fill(0).map((_, index) => (
                <div key={index} className="bg-secondary-light rounded-xl overflow-hidden border border-gray-800 animate-pulse">
                  <div className="p-8">
                    <div className="h-8 bg-gray-700 rounded mb-4 w-1/3"></div>
                    <div className="aspect-video bg-gray-700 rounded-lg mb-8"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="h-6 bg-gray-700 rounded mb-4 w-1/2"></div>
                        <div className="space-y-2">
                          {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="flex items-start">
                              <div className="w-5 h-5 bg-gray-600 rounded-full mt-1 mr-2"></div>
                              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="h-6 bg-gray-700 rounded mb-4 w-1/2"></div>
                        <div className="space-y-2">
                          {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="flex items-start">
                              <div className="w-5 h-5 bg-gray-600 rounded-full mt-1 mr-2"></div>
                              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <div className="h-10 bg-gray-700 rounded w-1/5"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              apiProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary-light py-24">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">TESTIMONIALS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              // Loading skeleton for testimonials
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-secondary rounded-xl p-6 border border-gray-800 animate-pulse">
                  <div className="flex mb-4 space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-700 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-700 rounded mb-6 w-4/6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
              ))
            ) : (
              apiTestimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-8 gradient-bg rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">READ AMAZING ARTICLES</h3>
              <p className="text-white/90 mb-6">
                Stay updated with the latest trends in technology and business. Our blog features insightful articles to help you navigate the digital landscape.
              </p>
              <button className="px-6 py-3 rounded-lg bg-white text-primary-dark font-medium hover:bg-opacity-90 transition-opacity">
                Read More
              </button>
            </div>
            
            <div className="p-8 bg-secondary-light rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">CONTACT US</h3>
              <p className="text-gray-300 mb-6">
                Ready to take your business to the next level? Get in touch with our team of experts and discover how we can help you achieve your goals.
              </p>
              <GradientButton href="/contact">
                Get Started
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
