import React from 'react';
import { Briefcase, MapPin, Clock, ChevronRight, ArrowRight, Loader } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { useCareersPageState } from '@/hooks/useCareersPageState';

const OpenPositionsSection: React.FC = () => {
  const { jobListings: displayJobListings, isJobsLoading } = useCareersPageState();

  return (
    <section id="open-positions" className="content-section bg-white dark:bg-[#132f4c]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            <Briefcase className="h-4 w-4 mr-2" />
            Current Opportunities
          </div>
          <h2 className="section-title">Open Positions</h2>
          <p className="section-subtitle">
            Explore our current job openings and find the perfect role to match your skills and ambitions.
          </p>
        </div>
        
        {isJobsLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {displayJobListings.map(job => (
              <div key={job.id} className="card p-6 md:p-8 hover-lift">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Briefcase className="h-4 w-4 mr-1.5" />
                        {job.department}
                      </div>
                      <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        {job.location}
                      </div>
                      <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-1.5" />
                        {job.type}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {job.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white mb-2">Responsibilities:</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((item, i) => (
                            <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                              <ChevronRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white mb-2">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((item, i) => (
                            <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                              <ChevronRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:ml-6 flex-shrink-0">
                    <GradientButton href={`/careers/${job.id}`} endIcon={<ArrowRight />}>
                      Apply Now
                    </GradientButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-100 dark:border-blue-800/30">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Don't See the Right Fit?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. If you don't see a position that matches your skills but are interested in working with us, send us your resume!
          </p>
          <GradientButton href="/contact" variant="outline">
            Submit General Application
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default OpenPositionsSection;