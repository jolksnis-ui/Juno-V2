'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations';

/** Form submission states */
type SubmitState = 'idle' | 'submitting' | 'success' | 'error' | 'rate-limited';

/**
 * Contact section with background image header and contact form
 * Features rate limiting feedback and success/error states
 */
const ContactSection = () => {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [retryAfter, setRetryAfter] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  /** Blocks letter input in phone field - only allows digits, spaces, dashes, parentheses, plus */
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    const isAllowedChar = /^[\d\s\-+()]$/.test(e.key);
    const isModifier = e.metaKey || e.ctrlKey;

    if (!allowedKeys.includes(e.key) && !isAllowedChar && !isModifier) {
      e.preventDefault();
    }
  };

  /** Handle form submission with API call */
  const handleFormSubmit = async (data: ContactFormValues) => {
    setSubmitState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 429) {
        setSubmitState('rate-limited');
        setRetryAfter(result.retryAfter || 60);
        return;
      }

      if (!response.ok || !result.success) {
        setSubmitState('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  /** Reset form to initial state */
  const handleReset = () => {
    setSubmitState('idle');
    setErrorMessage('');
    reset();
  };

  return (
    <section className="relative">
      {/* Background image header */}
      <div className="relative h-[280px] w-full overflow-hidden">
        <Image
          src="/images/corporate-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Form container */}
      <div className="relative -mt-40 px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto max-w-[1392px] rounded-md border border-[#E4E4E7] bg-[#FCFCFC] px-[72px] py-20"
        >
          <AnimatePresence mode="wait">
            {submitState === 'success' ? (
              <SuccessMessage onReset={handleReset} />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <h2 className="w-[600px] font-[family-name:var(--font-fraunces)] text-4xl leading-none text-[#18181B] md:text-5xl lg:text-[60px]">
                    Become a
                    <br />
                    Juno Money client.
                  </h2>
                  <p className="w-[320px] text-base leading-normal text-[#3F3F46]">
                    Unlock a world of financial possibilities with us, open an
                    account today and start experiencing unparalleled banking
                    solutions tailored just for you.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col gap-8">
                  {/* Row 1: Name / Company */}
                  <div className="flex flex-col gap-6 md:flex-row md:gap-0">
                    <div className="flex-1">
                      <Input
                        placeholder="Name*"
                        {...register('name')}
                        error={errors.name?.message}
                        disabled={submitState === 'submitting'}
                        aria-label="Your full name (required)"
                        aria-required="true"
                      />
                    </div>
                    <div className="hidden h-6 w-px bg-[#A0A0AB] md:block" aria-hidden="true" />
                    <div className="flex-1">
                      <Input
                        placeholder="Company*"
                        {...register('company')}
                        error={errors.company?.message}
                        disabled={submitState === 'submitting'}
                        aria-label="Company name (required)"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email / Phone */}
                  <div className="flex flex-col gap-6 md:flex-row md:gap-0">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="Email*"
                        {...register('email')}
                        error={errors.email?.message}
                        disabled={submitState === 'submitting'}
                        aria-label="Email address (required)"
                        aria-required="true"
                      />
                    </div>
                    <div className="hidden h-6 w-px bg-[#A0A0AB] md:block" aria-hidden="true" />
                    <div className="flex-1">
                      <Input
                        type="tel"
                        placeholder="Phone"
                        {...register('phone')}
                        onKeyDown={handlePhoneKeyDown}
                        error={errors.phone?.message}
                        disabled={submitState === 'submitting'}
                        aria-label="Phone number (optional)"
                      />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <Textarea
                      placeholder="Message*"
                      {...register('message')}
                      error={errors.message?.message}
                      disabled={submitState === 'submitting'}
                      aria-label="Your message (required)"
                      aria-required="true"
                    />
                  </div>

                  {/* Error / Rate limit messages */}
                  {submitState === 'error' && (
                    <p className="mt-4 text-sm text-[#EF4444]" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  {submitState === 'rate-limited' && (
                    <p className="mt-4 text-sm text-[#EF4444]" role="alert">
                      Too many requests. Please try again in {retryAfter} minutes.
                    </p>
                  )}

                  {/* Submit button */}
                  <div className="flex justify-center pt-2">
                    <GetStartedButton
                      type="submit"
                      variant="dark"
                      label="Get in touch"
                      isLoading={submitState === 'submitting'}
                      disabled={!isValid || submitState === 'rate-limited'}
                    />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
ContactSection.displayName = 'ContactSection';

/** Success message displayed after form submission */
const SuccessMessage = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    key="success"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center py-12 text-center"
  >
    <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-[#F4F4F5]">
      <CheckIcon />
    </div>
    <h3 className="font-[family-name:var(--font-fraunces)] text-3xl text-[#18181B]">
      Message sent!
    </h3>
    <p className="mt-3 max-w-md text-base text-[#3F3F46]">
      Thank you for reaching out. Our team will get back to you within 24 hours.
    </p>
    <button
      onClick={onReset}
      className="mt-8 text-sm font-medium text-[#18181B] underline underline-offset-4 transition-opacity hover:opacity-70"
      aria-label="Send another message"
    >
      Send another message
    </button>
  </motion.div>
);

/** Checkmark icon for success state */
const CheckIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#18181B"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export { ContactSection };
