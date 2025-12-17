import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface CaseStudiesFilterSectionProps {
  pageContent: any;
  caseStudies?: any[];
  isLoading?: boolean;
  onFilterChange?: (filters: any) => void;
  activeFilter?: string;
}

const CaseStudiesFilterSection: React.FC<CaseStudiesFilterSectionProps> = ({
  pageContent,
  caseStudies = [],
  isLoading = false,
  onFilterChange,
  activeFilter = 'all'
}) => {
  const { t } = useTranslation();

  // Get unique industries from case studies data
  const filters = useMemo(() => {
    // Extract unique industries from case studies
    const industries = new Set<string>();

    caseStudies.forEach((cs: any) => {
      if (cs.industry) {
        industries.add(cs.industry);
      }
    });

    // Create filter options from unique industries
    const filterOptions = Array.from(industries).map(industry => {
      const key = industry.toLowerCase().replace(/[^a-z]/g, '');
      return {
        key,
        label: industry
      };
    }).sort((a, b) => a.label.localeCompare(b.label));

    // Add "All Industries" option
    return [
      { key: 'all', label: 'All Industries' },
      ...filterOptions
    ];
  }, [caseStudies]);

  const handleFilterChange = (filterKey: string) => {
    onFilterChange?.({ industry: filterKey });
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-8xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-6"></div>
            <div className="flex gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-8xl">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          {t('caseStudies.filter.title', 'Filter by Industry')}
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${activeFilter === filter.key
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesFilterSection; 