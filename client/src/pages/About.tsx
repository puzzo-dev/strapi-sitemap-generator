import React from 'react';
import GradientButton from '@/components/ui/GradientButton';
import { 
  ArrowRight, Award, Users, Globe, Target,
  CircuitBoard, Cpu, Code, LayoutGrid,
  Database, Cloud, Shield, Sparkles
} from 'lucide-react';
import { usePageContent, useTeamMembers } from '@/hooks/useStrapiContent';
import { TeamMember } from '@/lib/types';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  staggerChildren,
  scaleUp,
  slideIn,
  gridItemAnimation,
  floatingShapeAnimation
} from '@/lib/animations';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  // Fetch page content from Strapi
  const { data: pageContent, isLoading: isPageLoading } = usePageContent('about');

  // Fetch team members from Strapi
  const { data: teamMembers, isLoading: isTeamLoading } = useTeamMembers();

  // Extract sections
  const heroSection = pageContent?.sections?.find(s => s.type === 'hero');
  const missionSection = pageContent?.sections?.find(s => s.type === 'custom' && s.title?.includes('Mission'));
  const featuresSection = pageContent?.sections?.find(s => s.type === 'features');
  const teamSection = pageContent?.sections?.find(s => s.type === 'team');
  const ctaSection = pageContent?.sections?.find(s => s.type === 'cta');

  // Function to ensure TeamMember type compatibility
  const normalizeTeamMember = (member: any): TeamMember => ({
    id: member.id,
    name: member.name,
    position: member.position,
    bio: member.bio || '',
    image: member.image,
    socialLinks: member.socialLinks
  });

  // Default team members if none are provided
  const defaultTeamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Samuel Johnson",
      position: "CEO & Founder",
      bio: "Leader and innovator",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Janet Lewis",
      position: "CTO",
      bio: "Technical expert",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "David Chen",
      position: "Lead Developer",
      bio: "Development expert",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Tunde Ogunle",
      position: "Design Director",
      bio: "Design leader",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Use either API team members or fallback data
  const displayTeamMembers = teamMembers?.length ? teamMembers.map(normalizeTeamMember) : defaultTeamMembers;

  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <motion.section
        ref={heroRef}
        initial="initial"
        animate={heroInView ? "animate" : "initial"}
        variants={staggerChildren()}
        className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section"
      >
        {/* Tech-inspired background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <motion.div
            variants={floatingShapeAnimation(0, 1)}
            className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40"
          />
          <motion.div
            variants={floatingShapeAnimation(0.5, 1.2)}
            className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30"
          />
          
          {/* Tech pattern */}
          <CircuitBoard className="absolute top-20 left-20 h-40 w-40 text-blue-200/20 dark:text-blue-800/10 transform -translate-x-1/4 -translate-y-1/4 animate-float" />
          <Cpu className="absolute bottom-20 right-20 h-32 w-32 text-indigo-200/20 dark:text-indigo-700/20 transform rotate-12 animate-pulse-slower" />
          <Code className="absolute top-32 right-32 h-24 w-24 text-cyan-200/20 dark:text-cyan-700/20 animate-pulse-light" />
          <LayoutGrid className="absolute bottom-32 left-32 h-28 w-28 text-purple-200/15 dark:text-purple-700/15 animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        
        {/* Existing content */}
        <motion.div variants={fadeInUp()} className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {isPageLoading ? (
              <>
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-pulse w-36 h-8"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 w-3/4 mx-auto animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full mx-auto animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6 mx-auto animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-4/6 mx-auto animate-pulse"></div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
                  {heroSection?.settings?.overline || 'About I-VARSE'}
                </div>

                <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  {heroSection?.title ? (
                    (() => {
                      const title = heroSection?.title || '';
                      const words = title.split(' ');
                      const highlightedWords = words.length >= 2 ? words.slice(-2).join(' ') : '';
                      const regularWords = words.length >= 2 ? words.slice(0, -2).join(' ') : title;

                      return (
                        <>
                          {regularWords}{' '}
                          <span className="gradient-text">
                            {highlightedWords}
                          </span>
                        </>
                      );
                    })()
                  ) : (
                    <>
                      Innovative Solutions <span className="gradient-text">for Digital Excellence</span>
                    </>
                  )}
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  {heroSection?.subtitle ||
                    'Founded with a vision to revolutionize digital solutions, I-VARSE has been at the forefront of technology innovation since its inception. We combine technical expertise with creative thinking to deliver exceptional results.'}
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={missionRef}
        initial="initial"
        animate={missionInView ? "animate" : "initial"}
        variants={staggerChildren()}
        className="content-section bg-white dark:bg-[#132f4c] relative overflow-hidden"
      >
        {/* Tech-inspired background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
          <Database className="absolute top-10 right-10 h-32 w-32 text-blue-400 dark:text-blue-600" />
          <Cloud className="absolute bottom-10 left-10 h-36 w-36 text-indigo-400 dark:text-indigo-600" />
          <Shield className="absolute top-1/2 right-1/4 h-24 w-24 text-cyan-400 dark:text-cyan-600" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {isPageLoading ? (
              <>
                <div className="relative h-[500px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="w-36 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-36 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  variants={slideIn('left')}
                  className="relative"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-xl border border-blue-100 dark:border-blue-800/50 h-[500px]">
                    <img
                      src={missionSection?.settings?.image ||
                        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                      alt="I-VARSE Team"
                      className="object-cover w-full h-full"
                    />

                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-700/50 z-0"></div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 border border-blue-200 dark:border-blue-700/50 rounded-lg rotate-12 z-0"></div>
                </motion.div>

                <motion.div
                  variants={slideIn('right')}
                  className="space-y-10"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300">
                      <Target className="h-4 w-4 mr-2" />
                      {missionSection?.settings?.missionLabel || 'Our Mission'}
                    </div>
                    <h2 className="heading-md text-gray-800 dark:text-white">
                      {missionSection?.settings?.missionTitle || 'Empowering Businesses Through Technology'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {missionSection?.settings?.missionText ||
                        'At I-VARSE, our mission is to empower businesses through innovative technology solutions that drive growth and efficiency. We strive to be the trusted partner that helps organizations navigate their digital transformation journey with confidence.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      <Globe className="h-4 w-4 mr-2" />
                      {missionSection?.settings?.visionLabel || 'Our Vision'}
                    </div>
                    <h2 className="heading-md text-gray-800 dark:text-white">
                      {missionSection?.settings?.visionTitle || 'Shaping the Digital Future'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {missionSection?.settings?.visionText ||
                        'We envision a world where every business, regardless of size, has access to cutting-edge technology that enhances their capabilities and expands their reach. We aim to be the catalysts for meaningful digital transformation across industries and borders.'}
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={valuesRef}
        initial="initial"
        animate={valuesInView ? "animate" : "initial"}
        variants={staggerChildren()}
        className="content-section bg-gray-50 dark:bg-[#0a1929] relative overflow-hidden"
      >
        {/* Tech-inspired background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
          <Sparkles className="absolute left-10 top-20 h-36 w-36 text-blue-400 dark:text-blue-600 animate-float" />
          <CircuitBoard className="absolute right-10 bottom-10 h-48 w-48 text-indigo-400 dark:text-indigo-600 animate-pulse-slower" />
          <Code className="absolute top-1/3 right-1/4 h-32 w-32 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
        </div>

        <div className="container-custom relative z-10">
          {isPageLoading ? (
            <>
              <div className="text-center mb-16">
                <div className="inline-block w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="card p-8">
                    <div className="h-14 w-14 rounded-xl bg-gray-200 dark:bg-gray-700 mb-6 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <motion.div
                variants={fadeInUp()}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                  <Award className="h-4 w-4 mr-2" />
                  {featuresSection?.settings?.label || 'Our Core Values'}
                </div>
                <h2 className="section-title">
                  {featuresSection?.title || 'What Drives Us'}
                </h2>
                <p className="section-subtitle">
                  {featuresSection?.subtitle || 'These principles guide our decisions and define who we are as a company.'}
                </p>
              </motion.div>

              <motion.div
                variants={staggerChildren(0.1)}
                className="grid grid-cols-1 md:grid-cols-3 gap-10"
              >
                {((featuresSection?.settings?.featured && featuresSection.settings.featured.length > 0) ?
                  featuresSection.settings.featured :
                  [
                    {
                      id: 1,
                      title: "Innovation",
                      description: "We constantly push boundaries and explore new technologies to deliver forward-thinking solutions that keep our clients ahead of the curve.",
                      icon: "lightning"
                    },
                    {
                      id: 2,
                      title: "Excellence",
                      description: "We are committed to delivering the highest quality in everything we do, with meticulous attention to detail and a passion for perfection.",
                      icon: "shield"
                    },
                    {
                      id: 3,
                      title: "Collaboration",
                      description: "We believe in the power of teamwork, both within our organization and with our clients, fostering relationships built on trust and mutual success.",
                      icon: "users"
                    }
                  ]
                ).map((value: any, index: number) => (
                  <motion.div
                    key={value.id || index}
                    variants={gridItemAnimation(index)}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="card p-8"
                  >
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${index === 0 ? 'from-blue-400 to-blue-600 shadow-blue-200 dark:shadow-blue-900/20' :
                      index === 1 ? 'from-indigo-400 to-indigo-600 shadow-indigo-200 dark:shadow-indigo-900/20' :
                        'from-cyan-400 to-cyan-600 shadow-cyan-200 dark:shadow-cyan-900/20'
                      } flex items-center justify-center text-white mb-6 shadow-lg`}>
                      {index === 0 ? (
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ) : index === 1 ? (
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      ) : (
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </motion.section>

      <motion.section
        ref={teamRef}
        initial="initial"
        animate={teamInView ? "animate" : "initial"}
        variants={staggerChildren()}
        className="content-section bg-white dark:bg-[#132f4c]"
      >
        <div className="container-custom">
          <motion.div
            variants={fadeInUp()}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Users className="h-4 w-4 mr-2" />
              {teamSection?.settings?.label || 'Our Team'}
            </div>
            <h2 className="section-title">
              {teamSection?.title || 'Meet the Experts'}
            </h2>
            <p className="section-subtitle">
              {teamSection?.subtitle ||
                'Our team of dedicated professionals combines expertise, creativity, and passion to deliver exceptional results.'}
            </p>
          </motion.div>

          {isTeamLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="card overflow-hidden">
                  <div className="h-72 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={staggerChildren(0.1)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {displayTeamMembers.slice(0, 4).map((member, index) => (
                <motion.div
                  key={member.id}
                  variants={scaleUp(0.95, 0.5, index * 0.1)}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="card overflow-hidden group"
                >
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
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-12 text-center">
            <GradientButton
              href={teamSection?.settings?.cta?.url || "/careers"}
              variant="outline"
              className='w-60 mx-auto'
              endIcon={<ArrowRight />}
            >
              {teamSection?.settings?.cta?.text || "Join Our Team"}
            </GradientButton>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ctaRef}
        initial="initial"
        animate={ctaInView ? "animate" : "initial"}
        variants={fadeInUp(30)}
        className="content-section bg-blue-50 dark:bg-[#0a1929] relative overflow-hidden"
      >
        {/* Tech-inspired background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
          <CircuitBoard className="absolute left-10 top-10 h-32 w-32 text-blue-400 dark:text-blue-600 animate-float" />
          <Sparkles className="absolute right-10 bottom-10 h-28 w-28 text-indigo-400 dark:text-indigo-600 animate-pulse-slower" />
          <Shield className="absolute top-1/2 right-1/3 h-24 w-24 text-cyan-400 dark:text-cyan-600 animate-pulse-light" />
        </div>

        <div className="container-custom relative z-10">
          {isPageLoading ? (
            <div className="card p-8 md:p-12 border-2 border-blue-100 dark:border-blue-800/30 text-center">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 w-3/4 mx-auto animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full mx-auto animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-5/6 mx-auto animate-pulse"></div>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="card p-8 md:p-12 border-2 border-blue-100 dark:border-blue-800/30 text-center">
              <h2 className="heading-lg text-gray-800 dark:text-white mb-6">
                {ctaSection?.title || 'Ready to Transform Your Business?'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                {ctaSection?.subtitle ||
                  "Partner with I-VARSE to unlock your digital potential. Let's create innovative solutions together that drive real business value."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GradientButton
                  href={ctaSection?.settings?.primaryCta?.url || "/contact"}
                  size="lg"
                  endIcon={<ArrowRight />}
                >
                  {ctaSection?.settings?.primaryCta?.text || "Get Started"}
                </GradientButton>
                <GradientButton
                  href={ctaSection?.settings?.secondaryCta?.url || "/services"}
                  variant="outline"
                  size="lg"
                >
                  {ctaSection?.settings?.secondaryCta?.text || "Explore Services"}
                </GradientButton>
              </div>
            </div>
          )}
        </div>
      </motion.section>
    </>
  );
};

export default About;