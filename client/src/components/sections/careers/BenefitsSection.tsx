import React from 'react';
import { Award, Loader } from 'lucide-react';
import { useCareersPageState } from '@/hooks/useCareersPageState';
import { getBenefitIcon } from '@/lib/benefitUtils';

const BenefitsSection: React.FC = () => {
  const { benefits: displayBenefits, isBenefitsLoading } = useCareersPageState();

  return (
    <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            <Award className="h-4 w-4 mr-2" />
            Employee Benefits
          </div>
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">
            We believe in taking care of our team members with comprehensive benefits and perks.
          </p>
        </div>

        {isBenefitsLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBenefits.map((benefit, index) => (
              <div key={index} className="card p-8 hover-lift">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                  {getBenefitIcon(benefit.icon)}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BenefitsSection;