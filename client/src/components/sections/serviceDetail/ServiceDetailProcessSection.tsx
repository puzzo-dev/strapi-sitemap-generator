import React from 'react';
import { Clock } from 'lucide-react';
import { ServiceProps } from '@/lib/types/content';

interface ServiceDetailProcessSectionProps {
  service: ServiceProps & {
    process?: { title: string; description: string }[];
  };
}

const ServiceDetailProcessSection: React.FC<ServiceDetailProcessSectionProps> = ({ service }) => {
  if (!service.process) return null;

  return (
    <section className="content-section bg-white dark:bg-[#132f4c]">
      <div className="container-custom max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            ⏰ Process
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">How We Work</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our proven methodology for delivering results.
            </p>
          </div>
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
                          <path d="M12 6V18M9 8V16M6 10V14M15 8V16M18 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                        {index === 1 && (
                          <path d="M21 7v10h-8v5l-5-2v-3h-6v-10h8v-5l5 2v3h6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                        {index === 2 && (
                          <path d="M12 4v16m-8-8h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                        {index === 3 && (
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  );
};

export default ServiceDetailProcessSection;