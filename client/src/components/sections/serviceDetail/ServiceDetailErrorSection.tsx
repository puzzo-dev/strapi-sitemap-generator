import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { PageContent } from '@/lib/types/core';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceDetailErrorSectionProps {
  pageContent?: PageContent;
}

const ServiceDetailErrorSection: React.FC<ServiceDetailErrorSectionProps> = ({ 
  pageContent 
}) => {
  // Get error content from page content settings
  const errorSection = pageContent?.sections?.find(s => s.type === 'hero');
  const errorContent = errorSection?.settings?.serviceContent?.error?.notFound;

  // Default content if not available in pageContent
  const defaultContent = {
    title: "Service Not Found",
    description: "The service you're looking for doesn't exist or has been removed.",
    backButton: "Back to Services"
  };

  const content = errorContent || defaultContent;

  return (
    <div className="content-section bg-white dark:bg-[#132f4c]">
      <div className="container-custom max-w-7xl">
        <Card className="p-8 text-center">
          <CardContent>
            <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-4">
              {content.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {content.description}
            </p>
            <Link href="/services">
              <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>{content.backButton}</span>
              </a>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetailErrorSection;