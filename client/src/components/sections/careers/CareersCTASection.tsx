import React from 'react';
import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

const CareersCTASection: React.FC = () => {
    return (
        <section className="content-section bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#0a1929] dark:to-[#091d3e]">
            <div className="container-custom">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="heading-lg mb-6 text-gray-800 dark:text-white">Ready to Join Our Team?</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Take the next step in your career and be part of a team that's shaping the future of technology.
                    </p>
                    <GradientButton href="#open-positions" size="lg" endIcon={<ArrowRight />}>
                        Explore Opportunities
                    </GradientButton>
                </div>
            </div>
        </section>
    );
};

export default CareersCTASection;