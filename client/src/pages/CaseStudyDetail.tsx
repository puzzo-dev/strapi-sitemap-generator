import React, { useMemo } from 'react';
import { useLocation } from 'wouter';
import { caseStudies } from '@/lib/data/case-studies';
import { CaseStudyProps } from '@/lib/types/content';
import PageLayout from '@/components/layout/PageLayout';
import AppLink from '@/components/ui/AppLink';
import { ArrowLeft, Calendar, Users, Clock, CheckCircle } from 'lucide-react';

const CaseStudyDetail: React.FC = () => {
  const [, setLocation] = useLocation();

  // Get the slug from the URL
  const pathParts = window.location.pathname.split('/');
  const slug = pathParts[pathParts.length - 1];

  // Find the case study by slug
  const caseStudy = useMemo((): CaseStudyProps | null => {
    return caseStudies.find(cs => cs.slug === slug) || null;
  }, [slug]);

  // Redirect to 404 if case study not found
  React.useEffect(() => {
    if (!caseStudy) {
      setLocation('/not-found');
    }
  }, [caseStudy, setLocation]);

  if (!caseStudy) {
    return null;
  }

  // Generate structured data for the case study
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": caseStudy.title,
    "description": caseStudy.description,
    "author": {
      "@type": "Organization",
      "name": "I-Varse Technologies"
    },
    "publisher": {
      "@type": "Organization",
      "name": "I-Varse Technologies",
      "url": "https://itechnologies.ng"
    },
    "datePublished": caseStudy.publishedDate,
    "image": `https://itechnologies.ng${caseStudy.image}`,
    "mainEntity": {
      "@type": "Service",
      "name": caseStudy.title,
      "description": caseStudy.description,
      "provider": {
        "@type": "Organization",
        "name": "I-Varse Technologies"
      }
    }
  };

  return (
    <PageLayout
      title={`${caseStudy.title} - Case Study`}
      description={caseStudy.description}
      canonicalUrl={`https://itechnologies.ng/case-studies/${caseStudy.slug}`}
      ogImage={`https://itechnologies.ng${caseStudy.image}`}
      pageContent={caseStudy as any}
      isLoading={false}
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <AppLink
              href="/case-studies"
              className="inline-flex items-center text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Case Studies
            </AppLink>

            {/* Case Study Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                📊 Case Study
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {(() => {
                  const words = caseStudy.title.split(' ');
                  if (words.length >= 2) {
                    const firstPart = words.slice(0, 2).join(' ');
                    const secondPart = words.slice(2).join(' ');
                    return (
                      <>
                        <span className="gradient-text">{firstPart}</span>{' '}
                        <span className="text-blue-800 dark:text-blue-200">{secondPart}</span>
                      </>
                    );
                  }
                  return <span className="gradient-text">{caseStudy.title}</span>;
                })()}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {caseStudy.description}
              </p>
            </div>

            {/* Case Study Image */}
            <div className="mb-12">
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Project Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 md:mb-16">
              <div className="bg-white dark:bg-blue-900/30 rounded-lg p-6 lg:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2">
                  {caseStudy.client}
                </div>
                <div className="text-sm lg:text-base text-gray-600 dark:text-gray-300 font-medium">Client</div>
              </div>
              <div className="bg-white dark:bg-blue-900/30 rounded-lg p-6 lg:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2">
                  {caseStudy.industry}
                </div>
                <div className="text-sm lg:text-base text-gray-600 dark:text-gray-300 font-medium">Industry</div>
              </div>
              <div className="bg-white dark:bg-blue-900/30 rounded-lg p-6 lg:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2">
                  {caseStudy.duration}
                </div>
                <div className="text-sm lg:text-base text-gray-600 dark:text-gray-300 font-medium">Duration</div>
              </div>
              <div className="bg-white dark:bg-blue-900/30 rounded-lg p-6 lg:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2">
                  {caseStudy.teamSize}
                </div>
                <div className="text-sm lg:text-base text-gray-600 dark:text-gray-300 font-medium">Team Size</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0a192f]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Challenge */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-6">
                    The Challenge
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-6">
                    Our Solution
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-6">
                    Results & Impact
                  </h2>
                  <div className="space-y-4">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Content */}
                {caseStudy.content && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-6">
                      Project Details
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {caseStudy.content}
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Technologies Used */}
                <div className="bg-gray-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Status */}
                <div className="bg-gray-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4">
                    Project Status
                  </h3>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${caseStudy.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    <span className="text-gray-600 dark:text-gray-300">{caseStudy.status}</span>
                  </div>
                </div>

                {/* Published Date */}
                <div className="bg-gray-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4">
                    Published
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(caseStudy.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {caseStudy.testimonial && (
        <section className="py-16 md:py-24 bg-blue-50 dark:bg-blue-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-5xl mx-auto text-center">
              <div className="bg-white dark:bg-blue-900/30 rounded-lg p-8 md:p-12">
                <div className="text-4xl text-blue-300 dark:text-blue-400 mb-6">"</div>
                <blockquote className="text-xl text-gray-700 dark:text-gray-200 mb-6 italic">
                  {caseStudy.testimonial}
                </blockquote>
                <div className="text-blue-900 dark:text-blue-200 font-semibold">
                  {caseStudy.testimonialAuthor}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {caseStudy.testimonialPosition}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a192f] dark:to-[#132f4c]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how we can help transform your business with innovative technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppLink
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </AppLink>
            <AppLink
              href="/case-studies"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View More Case Studies
            </AppLink>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudyDetail; 