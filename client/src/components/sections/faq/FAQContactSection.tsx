import React from 'react';

const FAQContactSection: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                        Still have questions?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        If you couldn't find the answer to your question, our team is here
                        to help.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
                        >
                            Contact Us
                        </a>
                        <a
                            href="mailto:info@itechnologies.ng"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            Email Support
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQContactSection;