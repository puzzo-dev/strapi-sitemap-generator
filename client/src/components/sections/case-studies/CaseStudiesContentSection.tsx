import React from 'react';

interface CaseStudiesContentSectionProps {
  pageContent?: any;
  isLoading?: boolean;
}

const CaseStudiesContentSection: React.FC<CaseStudiesContentSectionProps> = ({
  pageContent,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-[#0a192f]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-blue-100 dark:bg-blue-800/50 rounded mb-8"></div>
              <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6"></div>
              <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6"></div>
              <div className="h-8 bg-blue-100 dark:bg-blue-800/50 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get content section from page content
  const contentSection = pageContent?.sections?.find((s: any) => s.type === 'content');
  
  if (!contentSection) {
    return null;
  }

  const { title, content, settings } = contentSection;
  const industryExpertise = settings?.industryExpertise || [];
  const whyChooseUs = settings?.whyChooseUs || [];

  return (
    <section className="py-16 bg-white dark:bg-[#0a192f]">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-blue-900 dark:text-blue-200 mb-8">
            {title || 'About I-Varse Technologies'}
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {content || 'I-Varse Technologies is a leading technology company based in Nigeria, specializing in comprehensive digital solutions that drive business transformation and innovation. Founded in 2018, we have established ourselves as a trusted partner for businesses across various industries, delivering cutting-edge technology solutions that address real-world challenges.'}
            </p>

            {industryExpertise.length > 0 && (
              <>
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">
                  Industry Expertise
                </h3>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  We have successfully delivered solutions across diverse industries, including:
                </p>

                <ul className="grid md:grid-cols-2 gap-4 mb-8">
                  {industryExpertise.map((industry: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {industry}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {whyChooseUs.length > 0 && (
              <>
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">
                  Why Choose I-Varse Technologies?
                </h3>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
                  <ul className="space-y-3">
                    {whyChooseUs.map((item: any, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>{item.title}:</strong> {item.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesContentSection; 