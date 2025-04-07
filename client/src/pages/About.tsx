import React from 'react';
import GradientButton from '@/components/ui/GradientButton';
import { ArrowRight, Award, Users, Globe, Target } from 'lucide-react';

const About: React.FC = () => {
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
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              About I-VARSE
            </div>
            
            <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Innovative Solutions <span className="gradient-text">for Digital Excellence</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Founded with a vision to revolutionize digital solutions, I-VARSE has been at the forefront of technology innovation since its inception. We combine technical expertise with creative thinking to deliver exceptional results.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-blue-100 dark:border-blue-800/50 h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="I-VARSE Team" 
                  className="object-cover w-full h-full"
                />
                
                {/* Tech corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
              </div>
              
              {/* Background tech elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-700/50 z-0"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 border border-blue-200 dark:border-blue-700/50 rounded-lg rotate-12 z-0"></div>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300">
                  <Target className="h-4 w-4 mr-2" />
                  Our Mission
                </div>
                <h2 className="heading-md text-gray-800 dark:text-white">Empowering Businesses Through Technology</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  At I-VARSE, our mission is to empower businesses through innovative technology solutions that drive growth and efficiency. We strive to be the trusted partner that helps organizations navigate their digital transformation journey with confidence.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  <Globe className="h-4 w-4 mr-2" />
                  Our Vision
                </div>
                <h2 className="heading-md text-gray-800 dark:text-white">Shaping the Digital Future</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We envision a world where every business, regardless of size, has access to cutting-edge technology that enhances their capabilities and expands their reach. We aim to be the catalysts for meaningful digital transformation across industries and borders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Award className="h-4 w-4 mr-2" />
              Our Core Values
            </div>
            <h2 className="section-title">What Drives Us</h2>
            <p className="section-subtitle">
              These principles guide our decisions and define who we are as a company.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="card p-8 hover-lift">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We constantly push boundaries and explore new technologies to deliver forward-thinking solutions that keep our clients ahead of the curve.
              </p>
            </div>
            
            <div className="card p-8 hover-lift">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We are committed to delivering the highest quality in everything we do, with meticulous attention to detail and a passion for perfection.
              </p>
            </div>
            
            <div className="card p-8 hover-lift">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-200 dark:shadow-cyan-900/20">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in the power of teamwork, both within our organization and with our clients, fostering relationships built on trust and mutual success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Users className="h-4 w-4 mr-2" />
              Our Team
            </div>
            <h2 className="section-title">Meet the Experts</h2>
            <p className="section-subtitle">
              Our team of dedicated professionals combines expertise, creativity, and passion to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Samuel Johnson",
                position: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Janet Lewis",
                position: "CTO",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "David Chen",
                position: "Lead Developer",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Tunde Ogunle",
                position: "Design Director",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="card overflow-hidden hover-lift group">
                <div className="h-72 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <GradientButton href="/careers" variant="outline" endIcon={<ArrowRight />}>
              Join Our Team
            </GradientButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section bg-blue-50 dark:bg-[#0a1929]">
        <div className="container-custom">
          <div className="card p-8 md:p-12 border-2 border-blue-100 dark:border-blue-800/30 text-center">
            <h2 className="heading-lg text-gray-800 dark:text-white mb-6">Ready to Transform Your Business?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Partner with I-VARSE to unlock your digital potential. Let's create innovative solutions together that drive real business value.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton href="/contact" size="lg" endIcon={<ArrowRight />}>
                Get Started
              </GradientButton>
              <GradientButton href="/services" variant="outline" size="lg">
                Explore Services
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;