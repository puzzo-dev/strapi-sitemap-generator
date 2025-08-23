import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Building2, Phone, MessageSquare, Calendar, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { getThemeColors } from '@/lib/utils/theme-helpers';
import { submitDemoRequest } from '@/lib/strapi';

const demoRequestSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  message: z.string().optional(),
  productInterest: z.string().min(1, 'Please specify product interest')
});

type DemoRequestFormData = z.infer<typeof demoRequestSchema>;

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
  productId?: number;
}

const companySizeOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1000 employees' },
  { value: '1000+', label: '1000+ employees' }
];

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({
  isOpen,
  onClose,
  productTitle = 'Our Product',
  productId
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      productInterest: productTitle
    }
  });

  const onSubmit = async (data: DemoRequestFormData) => {
    setIsSubmitting(true);
    try {
      await submitDemoRequest({
        ...data,
        productId,
        source: 'Product Gallery Demo Request'
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        reset();
      }, 2000);
    } catch (error) {
      console.error('Demo request submission failed:', error);
      // Handle error - could show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      reset();
      setSubmitSuccess(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl",
                getThemeColors('background', 'default')
              )}
            >
              {/* Success State */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-green-50 dark:bg-green-900/20 rounded-2xl z-10"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                      Demo Request Submitted!
                    </h3>
                    <p className="text-green-600 dark:text-green-400">
                      We'll contact you within 24 hours to schedule your demo.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Header */}
              <div className="relative p-6 pb-0">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="pr-12">
                  <h2 className="text-2xl font-bold mb-2">
                    Request a Demo
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get a personalized demo of <span className="font-semibold text-blue-600 dark:text-blue-400">{productTitle}</span> and see how it can transform your business.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      <User className="w-4 h-4 inline mr-1" />
                      First Name *
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      className={cn(
                        "w-full px-3 py-2 rounded-lg border transition-colors text-sm",
                        "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600",
                        errors.firstName && "border-red-500 focus:ring-red-500"
                      )}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name *
                    </label>
                    <input
                      {...register('lastName')}
                      type="text"
                      className={cn(
                        "w-full px-3 py-2 rounded-lg border transition-colors text-sm",
                        "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600",
                        errors.lastName && "border-red-500 focus:ring-red-500"
                      )}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Business Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border transition-colors text-sm",
                      "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600",
                      errors.email && "border-red-500 focus:ring-red-500"
                    )}
                    placeholder="john.doe@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    Company *
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border transition-colors text-sm",
                      "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600",
                      errors.company && "border-red-500 focus:ring-red-500"
                    )}
                    placeholder="Acme Corp"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Tell us about your needs (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    rows={2}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border transition-colors resize-none text-sm",
                      "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    )}
                    placeholder="Brief description of your requirements..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Request Demo'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DemoRequestModal;
