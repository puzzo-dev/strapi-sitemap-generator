import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Cpu, Code, Database, Globe, LineChart, Smartphone, Cloud, ShieldCheck } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { useServices, useTestimonials, useSiteConfig, usePageContent } from '@/hooks/useStrapiContent';
import { services, testimonials, faqContent } from '@/lib/data';
import { ServiceProps, TestimonialProps } from '@/lib/types';
import MetaTags from '@/components/seo/MetaTags';
import { fadeInUp, staggerChildren } from '@/lib/animations';

const Services: React.FC = () => {
    const { t } = useTranslation();

    // Fetch data from Strapi with fallback to local data
    const { data: apiServices, isLoading: isServicesLoading, error: servicesError } = useServices();
    const { data: apiTestimonials, isLoading: isTestimonialsLoading, error: testimonialsError } = useTestimonials();
    const { data: siteConfig } = useSiteConfig();
    const { data: pageContent } = usePageContent('services');

    // Use the API data if available, otherwise fall back to local data
    const displayServices = apiServices?.length && !servicesError ? apiServices : services;
    const displayTestimonials = apiTestimonials?.length && !testimonialsError ? apiTestimonials : testimonials;

    // Get FAQ items from page content or fall back to local data
    const faqItems = pageContent?.sections?.find(section => section.type === 'faq')?.settings?.items ||
        faqContent.items.filter(item => item.categoryIds.includes(2)).slice(0, 4);

    return (
        <>
        {/* SEO metadata */ }
        < MetaTags


        title = { pageContent?.metaTitle || "Professional Services | I-Varse Technologies"
}
description = { pageContent?.metaDescription || "Expert tech solutions tailored to your business requirements. Our team delivers high-quality services designed to help you succeed in today's competitive market."}
keywords = { ['services', 'web development', 'mobile apps', 'cloud solutions', 'digital transformation']}
ogType = "website"
    />

    {/* Hero Section */ }
    < motion.section
initial = "initial"
animate = "animate"
variants = { staggerChildren(0.1) }
className = "relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section"
    >
    <div className="absolute inset-0 z-0 overflow-hidden" >
        {/* Animated gradient orbs */ }
        < div className = "absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
            <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />

                {/* Tech pattern elements */ }
                < div className = "hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12" > </div>
                    < div className = "hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full" > </div>
                        </div>

                        < div className = "container-custom relative z-10" >
                            <motion.div
            variants={ fadeInUp(20) }
className = "text-center max-w-4xl mx-auto"
    >
    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in" >
        <Cpu className="h-4 w-4 mr-2" />

            { pageContent?.sections?.[0]?.settings?.label || t('services.label') }
            </div>

            < h1 className = "heading-xl mb-6 animate-fade-in-up" style = {{ animationDelay: '0.2s' }}>

                <span className="gradient-text" >
                    { pageContent?.sections?.[0]?.settings?.titleHighlight || t('services.title.highlight') }
                    </span>{' '}
{ pageContent?.sections?.[0]?.settings?.titleRest || t('services.title.rest') }
</h1>

    < p className = "text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style = {{ animationDelay: '0.4s' }}>

        { pageContent?.sections?.[0]?.settings?.subtitle || t('services.subtitle') }
        </p>

        < div className = "flex flex-wrap justify-center gap-4 animate-fade-in-up" style = {{ animationDelay: '0.6s' }}>
            <GradientButton href="#services" size = "lg" >

                { pageContent?.sections?.[0]?.settings?.primaryButtonText || t('services.exploreButton') }
                </GradientButton>
                < GradientButton href = "/contact" variant = "outline" size = "lg" >

                    { pageContent?.sections?.[0]?.settings?.secondaryButtonText || t('services.consultButton') }
                    </GradientButton>
                    </div>
                    </motion.div>
                    </div>
                    </motion.section>

{/* Services Grid Section */ }
<section id="services" className = "py-24 bg-white dark:bg-[#132f4c]" >
    <div className="container-custom" >
        <div className="text-center mb-16" >
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4" >
                <Cpu className="h-4 w-4 mr-2" />

                    { pageContent?.sections?.[1]?.settings?.label || t('services.offerings.label') }
                    </div>

                    < h2 className = "section-title" >
                        { pageContent?.sections?.[1]?.title || t('services.offerings.title') }
                        </h2>
                        < p className = "section-subtitle" >

                            { pageContent?.sections?.[1]?.settings?.subtitle || t('services.offerings.subtitle') }
                            </p>
                            </div>

                            < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
                                {
                                    isServicesLoading?(
                                        // Loading skeleton for services
                                        Array(6).fill(0).map((_, index) => (
                                            <div key= { index } className = "bg-white dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800/30 animate-pulse" >
                                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 mb-6" > </div>
                                        < div className = "h-6 bg-blue-100 dark:bg-blue-800/50 rounded mb-3 w-3/4" > </div>
                                        < div className = "h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-full" > </div>
                                        < div className = "h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-5/6" > </div>
                                        < div className = "h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-6 w-4/6" > </div>
                                        < div className = "h-4 bg-blue-100 dark:bg-blue-800/50 rounded w-1/3" > </div>
                                        </div>
                                        ))
            ) : (
    displayServices.map(service => (
        <ServiceCard key= { service.id } service = { service } />
              ))
            )}
</div>
    </div>
    </section>

{/* Process Section */ }
<section className="py-24 bg-gradient-to-b from-white to-blue-50/60 dark:from-[#132f4c] dark:to-[#0a192f]" >
    <div className="container-custom" >
        <div className="text-center mb-16" >
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4" >
                <Code className="h-4 w-4 mr-2" />

                    { pageContent?.sections?.[2]?.settings?.label || t('services.process.label') }
                    </div>

                    < h2 className = "section-title" >
                        { pageContent?.sections?.[2]?.title || t('services.process.title') }
                        </h2>
                        < p className = "section-subtitle" >

                            { pageContent?.sections?.[2]?.settings?.subtitle || t('services.process.subtitle') }
                            </p>
                            </div>

                            < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" >
                                {/* Process steps - either from API or fallback to translations */ }
{
    (pageContent?.sections?.[2]?.settings?.steps || [1, 2, 3, 4]).map((step: any, index: number) => {
        const stepData = typeof step === 'object' ? step : null;
        const stepNumber = index + 1;
        const gradientColors = [
            'from-blue-400 to-blue-600',
            'from-indigo-400 to-indigo-600',
            'from-cyan-400 to-cyan-600',
            'from-purple-400 to-purple-600'
        ];

        return (
            <div key= { stepNumber } className = "bg-white dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50 relative group hover:shadow-md transition-all" >
                <div className={ `w-12 h-12 rounded-full bg-gradient-to-br ${gradientColors[index % 4]} flex items-center justify-center mb-6 text-white font-bold group-hover:scale-110 transition-transform` }>
                    { stepNumber }
                    </div>
                    < h3 className = "text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300" >
                        { stepData?.title || t(`services.process.steps.${['discovery', 'design', 'development', 'delivery'][index]}.title`)
    }
                  </h3>
        < p className = "text-gray-600 dark:text-gray-300" >
        { stepData?.description || t(`services.process.steps.${['discovery', 'design', 'development', 'delivery'][index]}.description`)}
</p>
    </div>
              );
            })}
</div>
    </div>
    </section>

{/* Testimonials Section */ }
<section className="py-24 bg-white dark:bg-[#132f4c]" >
    <div className="container-custom" >
        <div className="text-center mb-16" >
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4" >
                <Globe className="h-4 w-4 mr-2" />

                    { pageContent?.sections?.[3]?.settings?.label || t('services.testimonials.label') }
                    </div>

                    < h2 className = "section-title" >
                        { pageContent?.sections?.[3]?.title || t('services.testimonials.title') }
                        </h2>
                        < p className = "section-subtitle" >

                            { pageContent?.sections?.[3]?.settings?.subtitle || t('services.testimonials.subtitle') }
                            </p>
                            </div>

                            < div className = "grid grid-cols-1 md:grid-cols-3 gap-8" >
                                {
                                    isTestimonialsLoading?(
                                        // Loading skeleton for testimonials
                                        Array(3).fill(0).map((_, index) => (
                                            <div key= { index } className = "bg-white dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800/30 animate-pulse" >
                                            <div className="flex items-center mb-6" >
                                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/50 mr-4" > </div>
                                        < div >
                                        <div className="h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-24" > </div>
                                        < div className = "h-3 bg-blue-100 dark:bg-blue-800/50 rounded w-32" > </div>
                                        </div>
                                        </div>
                                        < div className = "h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-full" > </div>
                                        < div className = "h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-5/6" > </div>
                                        < div className = "h-4 bg-blue-100 dark:bg-blue-800/50 rounded mb-2 w-4/6" > </div>
                                        < div className = "flex mt-4" >
                                        {
                                            Array(5).fill(0).map((_, i) => (
                                                <div key= { i } className = "w-4 h-4 mr-1 rounded-full bg-blue-100 dark:bg-blue-800/50" > </div>
                                            ))}
</div>
    </div>
              ))
            ) : (
    displayTestimonials.slice(0, 3).map((testimonial: TestimonialProps) => (
        <TestimonialCard key= { testimonial.id } testimonial = { testimonial } />
              ))
            )}
</div>

    < div className = "text-center mt-12" >
        <GradientButton href="/contact" size = "lg" >
            { pageContent?.sections?.[3]?.settings?.buttonText || t('services.testimonials.contactButton') }
            </GradientButton>
            </div>
            </div>
            </section>

{/* CTA Section */ }
<section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#0a192f] dark:to-[#132f4c] relative overflow-hidden" >
    <div className="absolute inset-0 z-0 overflow-hidden" >
        {/* Animated gradient orbs */ }
        < div className = "absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-900/20 animate-pulse-slow" />
            <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-900/20 animate-pulse-slower" />
                </div>

                < div className = "container-custom relative z-10" >
                    <div className="bg-white/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-2xl p-12 border border-blue-100 dark:border-blue-800/30 max-w-4xl mx-auto text-center" >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900 dark:text-blue-100" >
                            { pageContent?.sections?.[4]?.title || t('services.cta.title') }
                            </h2>
                            < p className = "text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto" >
                                { pageContent?.sections?.[4]?.content || t('services.cta.subtitle') }
                                </p>
                                < div className = "flex flex-wrap justify-center gap-4" >
                                    <GradientButton href="/contact" size = "lg" >
                                        { pageContent?.sections?.[4]?.settings?.primaryButtonText || t('services.cta.primaryButton') }
                                        </GradientButton>
                                        < GradientButton href = "/about" variant = "outline" size = "lg" >
                                            { pageContent?.sections?.[4]?.settings?.secondaryButtonText || t('services.cta.secondaryButton') }
                                            </GradientButton>
                                            </div>
                                            </div>
                                            </div>
                                            </section>

{/* FAQ Section */ }
<section className="py-24 bg-white dark:bg-[#132f4c]" >
    <div className="container-custom" >
        <div className="text-center mb-16" >
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4" >
                <Database className="h-4 w-4 mr-2" />
                    { pageContent?.sections?.[5]?.settings?.label || t('services.faq.label') }
                    </div>
                    < h2 className = "section-title" >
                        { pageContent?.sections?.[5]?.title || t('services.faq.title') }
                        </h2>
                        < p className = "section-subtitle" >
                            { pageContent?.sections?.[5]?.content || t('services.faq.subtitle') }
                            </p>
                            </div>

                            < div className = "max-w-3xl mx-auto" >
                                {/* FAQ Items - either from API or fallback to local data */ }
{
    (faqItems || []).slice(0, 4).map((faq: { id: any; question: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; answer: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }, index: any) => (
        <div
                key= { faq.id || index }
                className = "mb-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30"
        >
        <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300" >
        { faq.question }
        </h3>
    < p className = "text-gray-600 dark:text-gray-300" >
    { faq.answer }
    </p>
    </div>
    ))
}

<div className="text-center mt-10" >
    <GradientButton href="/faq" variant = "outline" size = "lg" >
        { pageContent?.sections?.[5]?.settings?.buttonText || t('services.faq.viewAllButton') }
        </GradientButton>
        </div>
        </div>
        </div>
        </section>
        </>
  )
}

export default Services