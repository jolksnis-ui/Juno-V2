'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { FadeInView } from '@/components/ui/fade-in-view';
import { CheckIcon } from '@/components/ui/icons';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations';
import { FONT, CONTAINER_MAX_WIDTH, IMAGES } from '@/lib/constants';

/** Form submission states */
type SubmitState = 'idle' | 'submitting' | 'success' | 'error' | 'rate-limited';

interface ContactSectionProps {
  /** When true (Contact Us page), title is 64px on desktop; when false (embedded), 60px */
  isContactPage?: boolean;
}

/**
 * Contact section with background image header and contact form
 * Features rate limiting feedback and success/error states
 */
const ContactSection = ({ isContactPage = false }: ContactSectionProps = {}) => {
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

  /** Blocks number input in name field - only allows letters and common name characters */
  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumber = /^\d$/.test(e.key);
    const isModifier = e.metaKey || e.ctrlKey;

    if (isNumber && !isModifier) {
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
    <section className="relative overflow-hidden bg-juno-900">
      {/* Background frame: full back of contact form, gradient to footer (desktop: 880px; mobile/tablet: reduced height so 8px gap below form) */}
      <div className="pointer-events-none absolute left-0 top-0 w-full overflow-hidden min-h-[min(85vh,720px)] lg:min-h-0 lg:h-[880px]">
        <Image src={IMAGES.contactFormBg} alt="" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-black/30" />
        {/* Fade to juno-900 so footer passes smoothly */}
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-b from-transparent via-black/40 to-juno-900" />
      </div>

      {/* Form container – mobile/tablet: 12px (phone) / 24px (tablet) gap outside form; desktop: existing */}
      <div
        className={cn(
          'relative px-3 pb-2 md:px-6 lg:px-6 lg:pt-[200px] lg:pb-8',
          isContactPage ? 'pt-[116px]' : 'pt-16'
        )}
      >
        <FadeInView
          className="mx-auto w-full max-w-full rounded-md border border-juno-200 bg-juno-25 bg-[radial-gradient(circle,_rgba(24,24,27,0.04)_0.5px,_transparent_0.5px)] bg-center bg-repeat bg-[length:3px_3px] px-6 py-14 lg:max-w-[1392px] lg:p-0 lg:px-[72px] lg:py-20"
          style={{ maxWidth: CONTAINER_MAX_WIDTH }}
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
                {/* Header – tablet: max-w 696px, centered; desktop: two lines, left-aligned */}
                <div
                  className={cn(
                    'mb-16 flex w-full flex-col items-center justify-between gap-6 text-center md:mx-auto md:max-w-[600px] lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:text-left',
                    isContactPage && 'lg:h-[136px]'
                  )}
                >
                  <h2
                    className={cn(
                      'w-full leading-none text-juno-900 lg:max-w-[600px] lg:m-0 lg:h-[128px] lg:leading-[64px] lg:flex lg:flex-col lg:justify-center',
                      isContactPage ? 'text-[46px] leading-[50px] lg:text-[64px] lg:leading-[68px] lg:h-[136px]' : 'text-[44px] leading-[48px] lg:text-[60px] lg:leading-[64px]',
                      FONT.serif
                    )}
                  >
                    <span className="lg:hidden">Become a Juno Money client.</span>
                    <span className="hidden lg:inline">
                      Become a
                      <br />
                      Juno Money client.
                    </span>
                  </h2>
                  <p className="w-full text-base leading-normal text-juno-700 lg:max-w-[320px]">
                    Unlock a world of financial possibilities with us, open an
                    account today and start experiencing unparalleled banking
                    solutions tailored just for you.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col gap-8">
                  {/* Row 1: Name / Company – tablet: same row layout as desktop */}
                  <div className="flex flex-col gap-6 md:flex-row md:gap-0">
                    <div className="flex-1">
                      <Input
                        placeholder="Name*"
                        {...register('name')}
                        onKeyDown={handleNameKeyDown}
                        error={errors.name?.message}
                        disabled={submitState === 'submitting'}
                        aria-label="Your full name (required)"
                        aria-required="true"
                      />
                    </div>
                    <div className="hidden h-6 w-px bg-juno-400 md:block" aria-hidden="true" />
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

                  {/* Row 2: Email / Phone – tablet: same row layout as desktop */}
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
                    <div className="hidden h-6 w-px bg-juno-400 md:block" aria-hidden="true" />
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
                    <p className="mt-4 text-sm text-destructive" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  {submitState === 'rate-limited' && (
                    <p className="mt-4 text-sm text-destructive" role="alert">
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
                      className="w-full md:w-auto lg:w-auto"
                    />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeInView>
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
    <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-juno-100">
      <CheckIcon size={32} color="var(--juno-gray-900)" />
    </div>
    <h3 className={cn('text-3xl text-juno-900', FONT.serif)}>
      Message sent!
    </h3>
    <p className="mt-3 max-w-md text-base text-juno-700">
      Thank you for reaching out. Our team will get back to you within 24 hours.
    </p>
    <button
      onClick={onReset}
      className={cn(
        'mt-8 text-sm font-normal text-juno-900 underline underline-offset-4 transition-opacity hover:opacity-70',
        FONT.mono
      )}
      aria-label="Send another message"
    >
      Send another message
    </button>
  </motion.div>
);

export { ContactSection };
