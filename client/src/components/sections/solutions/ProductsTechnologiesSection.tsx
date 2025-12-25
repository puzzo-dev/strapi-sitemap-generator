import React from 'react';
import { motion } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import { fadeInUp } from '@/lib/animations';
import {
  Server,
  Database,
  Code2,
  Cloud,
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  GitBranch,
  Container,
  Lock,
  Layers
} from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { useTranslation } from 'react-i18next';
import { uiLabels } from '@/lib/data';

interface ProductsTechnologiesSectionProps {
  pageContent?: PageContent | null;
  isLoading?: boolean;
}

const ProductsTechnologiesSection: React.FC<ProductsTechnologiesSectionProps> = ({
  pageContent,
  isLoading = false
}) => {
  const { t } = useTranslation();

  const techCategories = [
    {
      category: 'Frontend',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite']
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      technologies: ['Node.js', 'Python', 'GraphQL', 'REST APIs', 'Microservices']
    },
    {
      category: 'Database',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Firebase']
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
    },
    {
      category: 'Mobile',
      icon: Smartphone,
      color: 'from-indigo-500 to-purple-500',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Progressive Web Apps']
    },
    {
      category: 'Security',
      icon: ShieldCheck,
      color: 'from-red-500 to-rose-500',
      technologies: ['OAuth2', 'JWT', 'SSL/TLS', 'Encryption', 'GDPR Compliance']
    }
  ];

  return (
    <section className="content-section bg-white dark:bg-[#0f1f2e]">
      <div className="container-custom max-w-8xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            ⚡ Powered By
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cutting-Edge Technology Stack
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We leverage modern technologies and best practices to build scalable, secure, and high-performance solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {techCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Core Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-3xl p-8 md:p-12 border border-blue-100 dark:border-blue-800/30"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Core Architecture Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Layers, title: 'Scalable Architecture', desc: 'Built to grow with your business' },
              { icon: Zap, title: 'High Performance', desc: 'Optimized for speed and efficiency' },
              { icon: Lock, title: 'Enterprise Security', desc: 'Bank-grade data protection' },
              { icon: Globe, title: 'Global Reach', desc: 'Multi-region deployment ready' }
            ].map((capability, idx) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md mb-4">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {capability.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {capability.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsTechnologiesSection;