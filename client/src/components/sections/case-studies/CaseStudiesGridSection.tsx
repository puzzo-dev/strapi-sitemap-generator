import React from 'react';
import { CaseStudyProps } from '@/lib/types/content';
import AppLink from '@/components/ui/AppLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CaseStudiesGridSectionProps {
  caseStudies: CaseStudyProps[];
  pageContent: any;
  isLoading?: boolean;
}

const CaseStudiesGridSection: React.FC<CaseStudiesGridSectionProps> = ({
  caseStudies = [],
  pageContent,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!caseStudies.length) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No case studies found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No case studies match the selected filter. Try selecting a different industry or view all case studies.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="px-6 py-3"
            >
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-10 text-center">
          {pageContent?.sections?.find((s: any) => s.type === 'case-studies')?.title || 'Featured Case Studies'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map(cs => (
            <Card key={cs.id} className="p-6 flex flex-col">
              <CardContent>
                <img src={cs.image} alt={cs.title} className="w-full h-40 object-cover rounded mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-100">{cs.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{cs.description}</p>
                <div className="flex-1" />
                <AppLink href={`/case-studies/${cs.slug}`} className="text-blue-600 dark:text-blue-300 hover:underline font-medium mt-4">
                  View Details
                </AppLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesGridSection; 