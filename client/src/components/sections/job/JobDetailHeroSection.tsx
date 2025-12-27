import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  MapPin,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { PageContent } from '@/lib/types/core';

interface JobDetailHeroSectionProps {
  job: any;
  submitted: boolean;
  isLoading: boolean;
  pageContent?: PageContent;
}

const JobDetailHeroSection: React.FC<JobDetailHeroSectionProps> = ({
  job,
  submitted,
  isLoading,
  pageContent,
}) => {
  // Get job content from page content settings
  const jobContent = pageContent?.sections?.find(s => s.type === 'hero')?.settings?.jobContent;

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-[#0a192f] dark:to-[#132f4c] border-b border-blue-100/50 dark:border-blue-900/30">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-8xl">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-[#0a192f] dark:to-[#132f4c] border-b border-blue-100/50 dark:border-blue-900/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-900/30 animate-pulse-slow" />
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-900/20 animate-pulse-slower" />
        <div className="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-indigo-200/20 blur-2xl dark:bg-indigo-900/20 animate-pulse" />
        <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200/50 dark:border-blue-800/30 rounded-lg rotate-12 shadow-lg"></div>
        <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200/50 dark:border-blue-800/30 rounded-full shadow-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-8xl relative z-10">
        <div className="max-w-6xl w-full mx-auto">
          <Link href="/careers">
            <div className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-10 group/back transition-all duration-300">
              <ArrowLeft className="mr-2 group-hover/back:-translate-x-1 transition-transform" />
              <span className="font-medium">{jobContent?.hero?.backButton || "Back to Careers"}</span>
            </div>
          </Link>

          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren(0.1)}
            className="w-full"
          >
            {submitted && (
              <motion.div
                variants={fadeInUp(20, 0.7)}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-200 p-4 mb-8 rounded-lg backdrop-blur-sm"
              >
                <div className="flex gap-2 items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="font-bold text-lg">Application Submitted!</h3>
                </div>
                <p>Thank you for your interest in the {job.title} position. Our team will review your application and contact you soon.</p>
              </motion.div>
            )}

            <motion.div variants={fadeInUp(20, 0.7)} className="flex items-center gap-2 mb-2">
              <div className="inline-flex items-center rounded-full border border-blue-200/60 dark:border-blue-800/60 bg-blue-50/80 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-sm">
                💼 {job.department}
              </div>
              <div className="inline-flex items-center rounded-full border border-blue-200/60 dark:border-blue-800/60 bg-blue-50/80 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-sm">
                ⏰ {job.type}
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUp(20, 0.7)} className="heading-xl mb-6">
              {(() => {
                const words = job.title.split(' ');
                if (words.length >= 2) {
                  const firstPart = words.slice(0, 2).join(' ');
                  const secondPart = words.slice(2).join(' ');
                  return (
                    <>
                      <span className="text-blue-800 dark:text-blue-200">{firstPart}</span>{' '}
                      <span className="gradient-text">{secondPart}</span>
                    </>
                  );
                }
                return <span className="gradient-text">{job.title}</span>;
              })()}
            </motion.h1>

            <motion.div variants={fadeInUp(20, 0.7, 0.1)} className="flex items-center text-lg mb-6 text-blue-700 dark:text-blue-200">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{job.location}</span>
            </motion.div>

            <motion.p variants={fadeInUp(20, 0.7, 0.2)} className="text-xl text-blue-600 dark:text-blue-300 leading-relaxed">
              {job.description}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailHeroSection;