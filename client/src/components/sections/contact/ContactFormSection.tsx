import React from 'react';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/ui/ContactForm';
import BookingForm from '@/components/ui/BookingForm';
import { SiteConfig } from '@/lib/types/core';

interface ContactFormSectionProps {
    formType: 'contact' | 'booking';
    setFormType: (type: 'contact' | 'booking') => void;
    siteConfig: SiteConfig;
    isLoading: boolean;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({
    formType,
    setFormType,
    siteConfig,
    isLoading,
}) => {
    return (
        <section id="contact-form" className="content-section bg-white dark:bg-[#132f4c] py-16">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Form Section */}
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

                        <div>
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
                    </div>

                    {/* Contact Information Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-1 md:grid-row-2 gap-6 mt-16">
                            <article className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                                <h2 className="text-lg font-medium mb-4 text-blue-900 dark:text-blue-200">Address</h2>
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
                                <h2 className="text-lg font-medium mb-4 text-blue-900 dark:text-blue-200">Contact Info</h2>
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

export default ContactFormSection; 