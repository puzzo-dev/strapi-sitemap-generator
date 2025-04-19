import React, { useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import GradientButton from '@/components/ui/GradientButton';
import { products, testimonials } from '@/lib/data';
import { ProductProps, TestimonialProps } from '@/lib/types';
import { 
  fadeInUp, 
  staggerChildren, 
  scaleUp, 
  slideIn, 
  gridItemAnimation, 
  clipPathReveal,
  snowfallParticleAnimation,
  floatingShapeAnimation,
  textCharAnimation,
  glossyCardAnimation,
  shimmerEffect
} from '@/lib/animations';
import { useProducts, useTestimonials, usePageContent } from '@/hooks/useStrapiContent';
import { 
  ArrowRight, 
  Package, 
  Target, 
  PieChart, 
  ShieldCheck, 
  Award, 
  Cpu, 
  Check, 
  CircuitBoard,
  Code,
  Zap,
  Database
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/context/LanguageContext';
import useSeoHelpers from '@/hooks/useSeoHelpers';
import MetaTags from '@/components/seo/MetaTags';
import SemanticSection from '@/components/seo/SemanticSection';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/StructuredData';

// Import company logo
import IVarseLogo from '@assets/I-VARSELogo3@3x.png';
import ProductHeroImage from '@assets/Product.png';

const Products: React.FC = () => {
  const { data: apiProducts, isLoading: isProductsLoading } = useProducts();
  const { data: apiTestimonials, isLoading: isTestimonialsLoading } = useTestimonials();
  
  // Use the API data if available, otherwise fall back to local data
  const displayProducts = apiProducts?.length ? apiProducts : products;
  const displayTestimonials = apiTestimonials?.length ? apiTestimonials : testimonials;

  return (
    <>
      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <motion.div 
            variants={scaleUp(0.8, 1.5, 0.2)}
            className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40" 
          />
          <motion.div 
            variants={scaleUp(0.8, 1.8, 0.5)}
            className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30" 
          />
          
          {/* Tech pattern elements */}
          <motion.div 
            initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
            animate={{ 
              rotate: 12,
              scale: 1,
              opacity: 1,
              transition: { duration: 0.8, delay: 0.3 }
            }}
            className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.05, 0.95, 1],
              opacity: [0, 1, 0.8, 1],
              transition: { duration: 1.2, delay: 0.5 }
            }}
            className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"
          />
          
          {/* Snowfall particles */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => {
              // Precalculate random values to avoid React errors
              const randomLeft = (i * 6.67) % 100; // Distribute evenly across width
              const randomScale = 0.5 + ((i % 5) * 0.1); // 0.5 to 0.9
              const randomDuration = 8 + ((i % 5) * 1); // 8 to 12 seconds
              const randomDelay = (i % 5) * 1; // 0 to 4 seconds
              
              return (
                <motion.div
                  key={`snowfall-particle-${i}`}
                  className="absolute h-1 w-1 rounded-full bg-blue-500/50 dark:bg-blue-400/50"
                  initial={{ 
                    y: -20, 
                    opacity: 0,
                    scale: randomScale
                  }}
                  animate={{ 
                    y: '120%', 
                    opacity: [0, 0.8, 0.5, 0],
                    transition: { 
                      duration: randomDuration, 
                      delay: randomDelay,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  style={{
                    left: `${randomLeft}%`,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            variants={staggerChildren(0.1)}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              variants={fadeInUp(20, 0.6)}
              className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4"
            >
              <Package className="h-4 w-4 mr-2" />
              Our Products
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp(20, 0.7)}
              className="heading-xl mb-6"
            >
              <span className="gradient-text">Powerful Products</span> for<br />Your Business Success
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp(20, 0.7, 0.3)}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Unlock your business potential with our suite of powerful, innovative software solutions designed to streamline operations and drive growth.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp(20, 0.7, 0.5)}
              className="flex flex-wrap justify-center gap-4"
            >
              <GradientButton href="#products" size="lg" endIcon={<ArrowRight />}>
                Explore Products
              </GradientButton>
              <GradientButton href="/contact" variant="outline" size="lg">
                Request Demo
              </GradientButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Product Benefits Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="content-section bg-white dark:bg-[#132f4c]"
      >
        <div className="container-custom">
          <motion.div variants={fadeInUp()} className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Target className="h-4 w-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="section-title">Transformative Solutions for Modern Businesses</h2>
            <p className="section-subtitle">
              Our products are designed with your success in mind, combining powerful features with intuitive interfaces.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerChildren(0.1)}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={scaleUp(0.95, 0.6, 0)}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="card p-8"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20"
              >
                <ShieldCheck className="h-7 w-7" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our products incorporate advanced security features to protect your business data and maintain compliance with industry standards.
              </p>
            </motion.div>
            
            <motion.div 
              variants={scaleUp(0.95, 0.6, 0.1)}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="card p-8"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-200 dark:shadow-purple-900/20"
              >
                <Cpu className="h-7 w-7" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Cutting-Edge Technology</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Leveraging the latest advancements in cloud computing, AI, and machine learning to deliver superior performance and results.
              </p>
            </motion.div>
            
            <motion.div 
              variants={scaleUp(0.95, 0.6, 0.2)}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="card p-8"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-200 dark:shadow-cyan-900/20"
              >
                <PieChart className="h-7 w-7" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Scalable Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our products grow with your business, providing the flexibility to adapt to your evolving needs without compromising performance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Products Section */}
      <motion.section 
        id="products" 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="content-section bg-gray-50 dark:bg-[#0a1929]"
      >
        <div className="container-custom">
          <motion.div 
            variants={fadeInUp(20, 0.6)}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Package className="h-4 w-4 mr-2" />
              Featured Products
            </div>
            <h2 className="section-title">Our Software Products</h2>
            <p className="section-subtitle">
              Discover our range of innovative products designed to solve real business challenges and drive exceptional results.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerChildren(0.3)}
            className="space-y-16"
          >
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
                <motion.div 
                  key={product.id}
                  variants={fadeInUp(30, 0.7, index * 0.1)} 
                  className={index % 2 === 0 ? '' : 'bg-white dark:bg-[#132f4c] py-12 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16'}
                >
                  <ProductCard product={product} isReversed={index % 2 !== 0} />
                </motion.div>
              ))
            )}
          </motion.div>
          
          {/* Product Technologies Section */}
          <motion.div 
            variants={fadeInUp(30, 0.7, 0.3)}
            className="mt-24"
          >
            <motion.div 
              variants={fadeInUp(20, 0.6)}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                <CircuitBoard className="h-4 w-4 mr-2" />
                Technologies
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">Powered by Advanced Technologies</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our products are built using cutting-edge technologies to deliver powerful, scalable, and secure solutions.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.7, delay: 0.2 }
              }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Left column - Enterprise Hub Technologies */}
              <motion.div 
                className="card p-8 relative overflow-hidden group"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 opacity-50 z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-300">Enterprise Hub Technologies</h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Database className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Cloud-Native Architecture</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Built on Kubernetes for maximum scalability and resilience
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Code className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Microservices Architecture</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Independent services for improved reliability and faster innovation
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Zap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Real-Time Processing</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Event-driven architecture for instant data processing and updates
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Advanced Security</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          End-to-end encryption and OAuth2 authentication protocols
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Cpu className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <span className="font-medium block">AI Integration</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Machine learning models for predictive analytics and automation
                        </span>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <GradientButton href="/products/1" size="sm">
                      Learn More
                    </GradientButton>
                  </div>
                </div>
              </motion.div>
              
              {/* Right column - Analytics Suite Technologies */}
              <motion.div 
                className="card p-8 relative overflow-hidden group"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 opacity-50 z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-300">Analytics Suite Technologies</h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <PieChart className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Data Visualization Engine</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Interactive dashboards with customizable widgets and charts
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Database className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">BigData Processing</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Distributed processing for handling large datasets efficiently
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Target className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Predictive Analytics</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Statistical algorithms to forecast trends and future performance
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Code className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">API Ecosystem</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          RESTful and GraphQL APIs for seamless integration with other tools
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mt-0.5 mr-3">
                        <Award className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <span className="font-medium block">Data Governance</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Built-in compliance tools for GDPR, HIPAA, and other regulations
                        </span>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <GradientButton href="/products/2" size="sm">
                      Learn More
                    </GradientButton>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp(20, 0.6, 0.7)}
              className="mt-8 text-center"
            >
              <GradientButton href="/contact" size="lg" className="mx-auto" endIcon={<ArrowRight className="h-4 w-4 ml-1" />}>
                Request Custom Solution
              </GradientButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="content-section bg-white dark:bg-[#132f4c]"
      >
        <div className="container-custom">
          <motion.div 
            variants={fadeInUp(20, 0.6)}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Award className="h-4 w-4 mr-2" />
              Customer Success
            </div>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Don't just take our word for it. See what our clients have to say about our products and services.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerChildren(0.1)}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
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
              displayTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={scaleUp(0.95, 0.6, index * 0.1)}
                  className="h-full"
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <div className="h-full">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="content-section bg-blue-50 dark:bg-[#0a1929]"
      >
        <div className="container-custom">
          <motion.div 
            variants={scaleUp(0.95, 0.8)}
            className="card p-8 md:p-12 border-2 border-blue-100 dark:border-blue-800/30 text-center relative overflow-hidden"
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-blue-200/30 dark:bg-blue-500/10"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ 
                scale: 1,
                opacity: 0.5,
                transition: { duration: 1, delay: 0.2 }
              }}
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-purple-200/20 dark:bg-purple-500/10"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ 
                scale: 1,
                opacity: 0.5,
                transition: { duration: 1, delay: 0.4 }
              }}
              viewport={{ once: true }}
            />
          
            {/* CTA Content */}
            <motion.div className="relative z-10">
              <motion.h2 
                variants={fadeInUp(20, 0.7)}
                className="heading-lg text-gray-800 dark:text-white mb-6"
              >
                Ready to Transform Your Business?
              </motion.h2>
              <motion.p 
                variants={fadeInUp(20, 0.7, 0.1)}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
              >
                Our products are designed to help you achieve your business goals. Contact us today to learn how we can customize our products to meet your specific needs.
              </motion.p>
              <motion.div 
                variants={staggerChildren(0.1, 0.2)}
                className="flex flex-wrap justify-center gap-4"
              >
                <motion.div variants={fadeInUp(10, 0.5)}>
                  <GradientButton href="/contact" size="lg" endIcon={<ArrowRight />}>
                    Request a Demo
                  </GradientButton>
                </motion.div>
                <motion.div variants={fadeInUp(10, 0.5, 0.1)}>
                  <GradientButton href="/blog" variant="outline" size="lg">
                    Read Success Stories
                  </GradientButton>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Products;
