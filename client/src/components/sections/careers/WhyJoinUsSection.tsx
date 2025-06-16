import React from 'react';
import { Users, Award, Laptop, Heart } from 'lucide-react';

const WhyJoinUsSection: React.FC = () => {
    return (
        <section className="content-section bg-white dark:bg-[#132f4c]">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                            <Users className="h-4 w-4 mr-2" />
                            Why Join Us
                        </div>
                        <h2 className="heading-lg mb-6 text-gray-800 dark:text-white">
                            Be Part of Something <span className="gradient-text">Extraordinary</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            At I-VARSE, we're more than just a technology company – we're a community of passionate innovators dedicated to creating solutions that make a difference. We believe in fostering a culture of creativity, collaboration, and continuous growth.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Our team members enjoy a supportive environment where their ideas are valued, their skills are nurtured, and their contributions are recognized. We're committed to diversity and inclusion, creating a workplace where everyone feels welcome and empowered to do their best work.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center shadow-md">
                                    <Award className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Excellence</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Committed to the highest standards in everything we do.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center shadow-md">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Collaboration</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Working together to achieve remarkable results.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-cyan-400 to-cyan-600 text-white flex items-center justify-center shadow-md">
                                    <Laptop className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Innovation</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Constantly pushing boundaries and exploring new ideas.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center shadow-md">
                                    <Heart className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Integrity</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Honest and ethical in all our interactions.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-xl overflow-hidden shadow-xl border border-blue-100 dark:border-blue-800/50 h-[500px]">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                alt="I-VARSE Team at Work"
                                className="object-cover w-full h-full"
                            />

                            {/* Tech corner elements */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                        </div>

                        {/* Background tech elements */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-700/50 z-0"></div>
                        <div className="absolute -top-6 -right-6 w-24 h-24 border border-blue-200 dark:border-blue-700/50 rounded-lg rotate-12 z-0"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyJoinUsSection;