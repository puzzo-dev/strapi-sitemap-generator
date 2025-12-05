import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { errorContent } from '@/lib/data/';
import { Card, CardContent } from '@/components/ui/card';

const TeamMemberNotFoundSection: React.FC = () => {
    return (
        <div className="content-section bg-white dark:bg-[#132f4c]">
            <div className="container-custom max-w-7xl">
                <Card className="p-8 text-center">
                    <CardContent>
                        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-4">
                            {errorContent.title}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {errorContent.description}
                        </p>
                        <Link href="/team">
                            <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                <span>Back to Team</span>
                            </a>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TeamMemberNotFoundSection;