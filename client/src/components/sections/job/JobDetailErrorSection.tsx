import React from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PageContent } from '@/lib/types/core';

interface JobDetailErrorSectionProps {
    error?: any;
    pageContent?: PageContent;
}

const JobDetailErrorSection: React.FC<JobDetailErrorSectionProps> = ({ 
    error,
    pageContent 
}) => {
    const { t } = useTranslation();

    // Get error content from page content settings
    const errorContent = pageContent?.sections?.find(s => s.type === 'hero')?.settings?.jobContent?.hero;

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
                        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">
                            {errorContent?.notFoundTitle || "Job Not Found"}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            {errorContent?.notFoundDescription || "The requested job could not be found."}
                        </p>
                    </div>

                    <Alert variant="destructive" className="mb-8 max-w-md mx-auto">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            {error ? error.message : 'The requested job could not be found.'}
                        </AlertDescription>
                    </Alert>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/careers">
                            <Button variant="default" className="flex items-center">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Careers
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                            className="flex items-center"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailErrorSection;