import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { errorContent } from '@/lib/data/';
import { Card, CardContent } from '@/components/ui/card';

const TeamMemberLoadingSection: React.FC = () => {
    return (
        <>
            {/* Hero Loading Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 border-b border-blue-100 dark:border-blue-900/40">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
                    <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
                </div>

                <div className="container-custom relative z-10">
                    <Link href="/team">
                        <a className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            <span>Back to Team</span>
                        </a>
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-4 lg:col-span-3">
                            <div className="relative w-48 h-48 md:w-full md:h-auto aspect-square mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white dark:border-[#132f4c] shadow-xl animate-pulse">
                                <div className="w-full h-full bg-blue-100 dark:bg-blue-800/50"></div>
                            </div>
                        </div>

                        <div className="md:col-span-8 lg:col-span-9 text-center md:text-left">
                            <div className="h-10 bg-blue-100 dark:bg-blue-800/50 rounded mb-4 w-3/4 animate-pulse"></div>
                            <div className="h-6 bg-blue-100 dark:bg-blue-800/50 rounded mb-6 w-1/2 animate-pulse"></div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                                {Array(4).fill(0).map((_, index) => (
                                    <div key={index} className="h-6 bg-blue-100 dark:bg-blue-800/50 rounded-full w-20 animate-pulse"></div>
                                ))}
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                {Array(3).fill(0).map((_, index) => (
                                    <div key={index} className="w-10 h-10 bg-blue-100 dark:bg-blue-800/50 rounded-full animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Loading Section */}
            <section className="content-section bg-white dark:bg-[#132f4c]">
                <div className="container-custom max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                            <Card className="p-6 md:p-8 mb-8 animate-pulse">
                                <CardContent>
                                    <div className="h-8 bg-blue-100 dark:bg-blue-800/50 rounded mb-4 w-1/3"></div>
                                    <div className="space-y-3">
                                        <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-full"></div>
                                        <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-5/6"></div>
                                        <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-4/6"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-4">
                            <Card className="p-6 md:p-8 animate-pulse">
                                <CardContent>
                                    <div className="h-6 bg-blue-100 dark:bg-blue-800/50 rounded mb-4 w-1/2"></div>
                                    <div className="space-y-4">
                                        {Array(4).fill(0).map((_, index) => (
                                            <div key={index} className="flex items-start">
                                                <div className="w-5 h-5 bg-blue-100 dark:bg-blue-800/50 rounded mr-3 mt-1"></div>
                                                <div className="flex-1">
                                                    <div className="h-3 bg-blue-100 dark:bg-blue-800/50 rounded mb-1 w-1/3"></div>
                                                    <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-2/3"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamMemberLoadingSection;