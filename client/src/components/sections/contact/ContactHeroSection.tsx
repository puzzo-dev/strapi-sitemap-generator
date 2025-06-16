import React from 'react';
import GradientButton from '@/components/ui/GradientButton';
import ContactForm from '@/components/ui/ContactForm';
import BookingForm from '@/components/ui/BookingForm';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { Button } from '@/components/ui/button';
import { useSiteConfig } from '@/hooks/useStrapiContent';

interface ContactHeroSectionProps {
    heroSection: any;
    isPageLoading: boolean;
    formType: 'contact' | 'booking';
    setFormType: (type: 'contact' | 'booking') => void;
}

const ContactHeroSection: React.FC<ContactHeroSectionProps> = ({
    heroSection,
    isPageLoading,
    formType,
    setFormType,
}) => {
    const { data: siteConfig } = useSiteConfig();

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section">
            <BackgroundDecoration variant="default" />

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-1/2">
                        {isPageLoading ? (
                            <div className="loading-skeleton" aria-busy="true" aria-label="Loading content">
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full animate-pulse"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-5/6 animate-pulse"></div>
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                                <div className="aspect-[16/9] max-w-lg mt-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        ) : (
                            <>
                                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
                                    <span className="h-4 w-4 mr-2" aria-hidden="true">✉️</span>
                                    <span>Contact Us</span>
                                </div>

                                <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    <span className="gradient-text">Get in touch</span> with<br />our team
                                </h1>

                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up max-w-lg" style={{ animationDelay: '0.4s' }}>
                                    {heroSection?.subtitle}
                                </p>

                                <a href="#contact-form" className="inline-block animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                    <GradientButton size="lg">
                                        {heroSection?.settings?.buttonText || 'Get Started'}
                                        <span className="ml-2" aria-hidden="true">→</span>
                                    </GradientButton>
                                </a>

                                <figure className="aspect-[16/9] max-w-lg mt-12">
                                    <img
                                        src={heroSection?.settings?.image}
                                        alt="Business professionals discussing"
                                        className="rounded-lg object-cover w-full h-full"
                                    />
                                </figure>
                            </>
                        )}
                    </div>

                    <div className="w-full lg:w-1/2">
                        <div className="mb-6 flex space-x-4" role="tablist" aria-label="Contact form options">
                            <Button
                                variant={formType === 'contact' ? 'default' : 'outline'}
                                className={formType === 'contact' ? 'gradient-bg' : ''}
                                onClick={() => setFormType('contact')}
                                role="tab"
                                aria-selected={formType === 'contact'}
                                aria-controls="contact-form-panel"
                                id="contact-tab"
                            >
                                Contact Us
                            </Button>
                            <Button
                                variant={formType === 'booking' ? 'default' : 'outline'}
                                className={formType === 'booking' ? 'gradient-bg' : ''}
                                onClick={() => setFormType('booking')}
                                role="tab"
                                aria-selected={formType === 'booking'}
                                aria-controls="booking-form-panel"
                                id="booking-tab"
                            >
                                Book Appointment
                            </Button>
                        </div>

                        <div id="contact-form">
                            <div
                                role="tabpanel"
                                id="contact-form-panel"
                                aria-labelledby="contact-tab"
                                hidden={formType !== 'contact'}
                            >
                                {formType === 'contact' && <ContactForm />}
                            </div>
                            <div
                                role="tabpanel"
                                id="booking-form-panel"
                                aria-labelledby="booking-tab"
                                hidden={formType !== 'booking'}
                            >
                                {formType === 'booking' && <BookingForm />}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <article className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                                <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Address</h2>
                                <address className="text-gray-700 dark:text-gray-300 not-italic">
                                    {siteConfig?.contactAddress}
                                </address>
                                <div className="mt-4 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    {/* Map would go here - this would be implemented with a real mapping solution */}
                                    <div className="h-full w-full flex items-center justify-center text-gray-500">
                                        <span>Map Location</span>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                                <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Contact Info</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4" aria-hidden="true">
                                            <span className="fas fa-phone-alt text-blue-600 dark:text-blue-400"></span>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">Phone</p>
                                            <a href={`tel:${siteConfig?.contactPhone}`} className="text-gray-900 dark:text-white">
                                                {siteConfig?.contactPhone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4" aria-hidden="true">
                                            <span className="fas fa-envelope text-blue-600 dark:text-blue-400"></span>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
                                            <a href={`mailto:${siteConfig?.contactEmail}`} className="text-gray-900 dark:text-white">
                                                {siteConfig?.contactEmail}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <a href="#" className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors" aria-label="Twitter">
                                            <span className="fab fa-twitter text-blue-600 dark:text-blue-400" aria-hidden="true"></span>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors" aria-label="Facebook">
                                            <span className="fab fa-facebook-f text-blue-600 dark:text-blue-400" aria-hidden="true"></span>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors" aria-label="LinkedIn">
                                            <span className="fab fa-linkedin-in text-blue-600 dark:text-blue-400" aria-hidden="true"></span>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactHeroSection;