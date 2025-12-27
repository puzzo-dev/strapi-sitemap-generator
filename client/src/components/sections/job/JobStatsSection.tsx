import React from 'react';
import { Users, Clock, Award, TrendingUp } from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { ExtendedJobListing } from '@/lib/types/content';

interface JobStatsSectionProps {
  job?: ExtendedJobListing;
  className?: string;
  pageContent?: PageContent;
  isLoading?: boolean;
}

const JobStatsSection: React.FC<JobStatsSectionProps> = ({
  job,
  className = '',
  pageContent,
  isLoading = false
}) => {
  // Get stats content from page content settings
  const statsContent = pageContent?.sections?.find(s => s.type === 'custom')?.settings;

  // Use job's team details if available, otherwise use default stats
  const teamDetails = job?.teamDetails;

  const stats = [
    {
      name: 'Team Members',
      value: teamDetails?.teamMembers ? `${teamDetails.teamMembers}+` : '50+',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      description: teamDetails?.teamMembers ? 'In this team' : 'Talented professionals'
    },
    {
      name: 'Avg. Response Time',
      value: '48h',
      icon: Clock,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      description: 'Application review'
    },
    {
      name: 'Employee Satisfaction',
      value: '95%',
      icon: Award,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      description: 'Happy team members'
    },
    {
      name: 'Growth Rate',
      value: '200%',
      icon: TrendingUp,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      description: 'Year over year'
    }
  ];

  return (
    <section className={`py-16 bg-white dark:bg-gray-900 ${className}`}>
      <div className="container mx-auto px-4 max-w-8xl">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">
              {statsContent?.jobContent?.sections?.stats || "Job Statistics"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Key insights about this position and our company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-4`}>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {stat.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobStatsSection;