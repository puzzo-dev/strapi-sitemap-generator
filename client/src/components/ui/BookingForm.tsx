import React from 'react';
import { BookingFormProps } from "@/lib/types";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitAppointmentBooking } from '@/lib/erpnext';
import { useUIText } from '@/hooks/useContent';
import { UI_TEXT_FALLBACKS } from '@/lib/fallbacks';

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  date: z.string().min(1, { message: 'Please select a date' }),
  time: z.string().min(1, { message: 'Please select a time' }),
  topic: z.string().min(2, { message: 'Please specify a topic for the meeting' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;



const BookingForm: React.FC<BookingFormProps> = ({ className }) => {
  const { toast } = useToast();
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      topic: '',
      message: '',
    },
  });

  const bookingMutation = useMutation({
    mutationFn: submitAppointmentBooking,
    onSuccess: () => {
      toast({
        title: UI_TEXT_FALLBACKS.forms.messages.success,
        description: "Your appointment has been scheduled. We'll get back to you with a confirmation shortly.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: UI_TEXT_FALLBACKS.forms.messages.error,
        description: error instanceof Error ? error.message : "There was a problem scheduling your appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: BookingFormData) {
    bookingMutation.mutate(data);
  }

  return (
    <div className={`bg-secondary-dark rounded-xl p-8 border border-gray-800 ${className}`}>
      <h3 className="text-xl font-semibold mb-6">{UI_TEXT_FALLBACKS.buttons.bookAppointment.toUpperCase()}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.fullName} *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={UI_TEXT_FALLBACKS.forms.placeholders.fullName}
                      {...field}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.email} *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={UI_TEXT_FALLBACKS.forms.placeholders.email}
                      type="email"
                      {...field}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.phone} *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={UI_TEXT_FALLBACKS.forms.placeholders.phone}
                      type="tel"
                      {...field}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.topic} *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={UI_TEXT_FALLBACKS.forms.placeholders.topic}
                      {...field}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.date} *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="date"
                        {...field}
                        className="w-full px-4 py-3 pr-12 rounded-lg bg-secondary border border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.time} *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="time"
                        {...field}
                        className="w-full px-4 py-3 pr-12 rounded-lg bg-secondary border border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-300">{UI_TEXT_FALLBACKS.forms.labels.message} *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about what you'd like to discuss"
                    rows={4}
                    {...field}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full gradient-bg px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            disabled={bookingMutation.isPending}
          >
            {bookingMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {UI_TEXT_FALLBACKS.buttons.booking}
              </span>
            ) : (
              UI_TEXT_FALLBACKS.buttons.bookAppointment
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;