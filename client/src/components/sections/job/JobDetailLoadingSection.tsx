import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const JobDetailLoadingSection: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Hero Section Loading */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-8xl">
                    <div className="max-w-4xl mx-auto text-center">
                        <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
                        <Skeleton className="h-6 w-full mx-auto mb-2" />
                        <Skeleton className="h-6 w-5/6 mx-auto mb-8" />
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Skeleton className="h-12 w-32" />
                            <Skeleton className="h-12 w-32" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Loading */}
            <div className="py-16">
                <div className="container mx-auto px-4 max-w-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div className="space-y-8">
                                {[1, 2, 3, 4].map((index) => (
                                    <Card key={index}>
                                        <CardContent className="p-6">
                                            <Skeleton className="h-8 w-1/2 mb-4" />
                                            <Skeleton className="h-4 w-full mb-2" />
                                            <Skeleton className="h-4 w-full mb-2" />
                                            <Skeleton className="h-4 w-3/4" />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <Card>
                                <CardContent className="p-6">
                                    <Skeleton className="h-8 w-1/2 mb-4" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-3/4 mb-6" />
                                    <Skeleton className="h-12 w-full" />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailLoadingSection;