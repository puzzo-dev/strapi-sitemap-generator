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
      <div className="bg-gradient-to-br from-primary/95 via-primary to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-white/20 rounded w-32"></div>
            <div className="h-12 bg-white/20 rounded w-3/4"></div>
            <div className="h-6 bg-white/20 rounded w-1/2"></div>
            <div className="h-4 bg-white/20 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/95 via-primary to-blue-700 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <Link href="/careers">
          <div className="inline-flex items-center text-white/90 hover:text-white mb-10 group/back transition-colors">
            <ArrowLeft className="mr-2 group-hover/back:-translate-x-1 transition-transform" />
            <span className="font-medium">{jobContent?.hero?.backButton || "Back to Careers"}</span>
          </div>
        </Link>

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren(0.1)}
          className="max-w-4xl"
        >
          {submitted && (
            <motion.div
              variants={fadeInUp(20, 0.7)}
              className="bg-green-100 border border-green-300 text-green-800 p-4 mb-8 rounded-lg"
            >
              <div className="flex gap-2 items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-lg">Application Submitted!</h3>
              </div>
              <p>Thank you for your interest in the {job.title} position. Our team will review your application and contact you soon.</p>
            </motion.div>
          )}

          <motion.div variants={fadeInUp(20, 0.7)} className="flex items-center gap-2 mb-2">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/20 px-3 py-1 text-sm font-medium text-white border-white/20">
              <span className="text-lg mr-2">💼</span>
              {job.department}
            </div>
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/20 px-3 py-1 text-sm font-medium text-white border-white/20">
              <span className="text-lg mr-2">⏰</span>
              {job.type}
            </div>
          </motion.div>

          <motion.h1 variants={fadeInUp(20, 0.7)} className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            {job.title}
          </motion.h1>

          <motion.div variants={fadeInUp(20, 0.7, 0.1)} className="flex items-center text-lg mb-6">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{job.location}</span>
          </motion.div>

          <motion.p variants={fadeInUp(20, 0.7, 0.2)} className="text-xl opacity-90">
            {job.description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetailHeroSection;