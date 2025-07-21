import React from 'react';
import { Link } from 'wouter';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageContent } from '@/lib/types/core';

interface RelatedJob {
    id: number;
    title: string;
    slug?: string;
    department: string;
    location: string;
    type: string;
    description: string;
}

interface JobRelatedSectionProps {
    currentJobSlug: string;
    relatedJobs: RelatedJob[];
    isLoading?: boolean;
    pageContent?: PageContent;
}

const JobRelatedSection: React.FC<JobRelatedSectionProps> = ({
    currentJobSlug,
    relatedJobs,
    isLoading = false,
    pageContent,
}) => {
    // Get related jobs content from page content settings
    const relatedSection = pageContent?.sections?.find(s => s.type === 'custom');
    const relatedContent = relatedSection?.settings?.jobContent?.related;
    
    // Filter out the current job and limit to 3 related jobs
    const filteredJobs = relatedJobs
        .filter(job => job.slug !== currentJobSlug)
        .slice(0, 3);

    if (isLoading) {
        return (
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="animate-pulse mb-12">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array(3).fill(0).map((_, index) => (
                                <Card key={index} className="animate-pulse">
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                            <div className="flex space-x-2">
                                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                                            </div>
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (filteredJobs.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">
                            {relatedContent?.title || "Related Positions"}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {relatedContent?.subtitle || "Explore other opportunities that might interest you."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {filteredJobs.map((job) => (
                            <Card key={job.id} className="group hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                                            <Briefcase className="h-3 w-3 mr-1" />
                                            {job.department}
                                        </div>
                                        <div className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {job.type}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                        {job.title}
                                    </h3>

                                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span className="text-sm">{job.location}</span>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                        {job.description}
                                    </p>

                                    <Link href={`/careers/${job.slug}`}>
                                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                                            {relatedContent?.viewDetails || "View Details"}
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/careers">
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                {relatedContent?.viewAll || "View All Positions"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobRelatedSection;