import React from 'react';
import {
  ChevronRight,
  Layers,
  Award,
  Building,
  DollarSign
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface JobDetailContentSectionProps {
  job: any;
  isLoading: boolean;
  pageContent?: import('@/lib/types/core').PageContent;
}

const JobDetailContentSection: React.FC<JobDetailContentSectionProps> = ({
  job,
  isLoading,
  pageContent,
}) => {
  if (isLoading) {
    return (
      <div className="lg:col-span-2">
        <div className="space-y-8">
          {Array(4).fill(0).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-6 md:p-8">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <div className="space-y-3">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center text-primary">
            <Layers className="mr-2 h-5 w-5" />
            Responsibilities
          </h2>
          <Separator className="mb-4" />
          <ul className="space-y-3">
            {job.responsibilities?.map((item: string, i: number) => (
              <li key={i} className="flex items-start">
                <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center text-primary">
            <Award className="mr-2 h-5 w-5" />
            Requirements
          </h2>
          <Separator className="mb-4" />
          <ul className="space-y-3">
            {job.requirements?.map((item: string, i: number) => (
              <li key={i} className="flex items-start">
                <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {job.qualifications && (
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center text-primary">
              <Building className="mr-2 h-5 w-5" />
              Qualifications
            </h2>
            <Separator className="mb-4" />
            <ul className="space-y-3">
              {job.qualifications?.map((item: string, i: number) => (
                <li key={i} className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {job.benefits && (
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center text-primary">
              <DollarSign className="mr-2 h-5 w-5" />
              Benefits
            </h2>
            <Separator className="mb-4" />
            <ul className="space-y-3">
              {job.benefits?.map((item: string, i: number) => (
                <li key={i} className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobDetailContentSection;