import { z } from 'zod';
import { VALIDATION_LIMITS } from './constants';

/** Phone number regex - allows international formats */
const PHONE_REGEX = /^\+?[\d\s\-()]+$/;

/** Common disposable/test email domains to block */
const BLOCKED_EMAIL_DOMAINS = [
  'test.com',
  'example.com',
  'mailinator.com',
  'tempmail.com',
  'throwaway.com',
];

/**
 * Enhanced email validation with stricter rules
 * Blocks obvious fake emails and disposable domains
 */
const enhancedEmailSchema = z
  .string()
  .email('Please enter a valid email address')
  .max(VALIDATION_LIMITS.emailMax, `Email must be less than ${VALIDATION_LIMITS.emailMax} characters`)
  .refine(
    (email) => {
      const domain = email.split('@')[1]?.toLowerCase();
      return !BLOCKED_EMAIL_DOMAINS.some((blocked) => domain?.endsWith(blocked));
    },
    'Please use a real email address'
  );

/** Honeypot field for bot protection - must be empty */
const honeypotSchema = z.string().max(0, 'Bot detected').optional();

/**
 * Contact form validation schema
 * Includes max lengths and format validation for security
 * Required: name, company, email, message. Optional: phone
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_LIMITS.nameMin, `Name must be at least ${VALIDATION_LIMITS.nameMin} characters`)
    .max(VALIDATION_LIMITS.nameMax, `Name must be less than ${VALIDATION_LIMITS.nameMax} characters`)
    .regex(/^[^\d]+$/, 'Name cannot contain numbers')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(VALIDATION_LIMITS.emailMax, `Email must be less than ${VALIDATION_LIMITS.emailMax} characters`),
  phone: z
    .string()
    .regex(PHONE_REGEX, 'Please enter a valid phone number')
    .max(VALIDATION_LIMITS.phoneMax, 'Phone number is too long')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .min(1, 'Company is required')
    .max(VALIDATION_LIMITS.nameMax, `Company name must be less than ${VALIDATION_LIMITS.nameMax} characters`),
  message: z
    .string()
    .min(VALIDATION_LIMITS.messageMin, `Message must be at least ${VALIDATION_LIMITS.messageMin} characters`)
    .max(VALIDATION_LIMITS.messageMax, `Message must be less than ${VALIDATION_LIMITS.messageMax} characters`),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(VALIDATION_LIMITS.emailMax, `Email must be less than ${VALIDATION_LIMITS.emailMax} characters`),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Open account enquiry form validation schema
 * Includes honeypot for bot protection and enhanced email validation
 */
export const openAccountSchema = z.object({
  fullName: z
    .string()
    .min(VALIDATION_LIMITS.nameMin, `Name must be at least ${VALIDATION_LIMITS.nameMin} characters`)
    .max(VALIDATION_LIMITS.nameMax, `Name must be less than ${VALIDATION_LIMITS.nameMax} characters`)
    .regex(/^[^\d]+$/, 'Name cannot contain numbers')
    .trim(),
  email: enhancedEmailSchema,
  estimatedTurnover: z
    .string()
    .min(1, 'Estimated turnover is required'),
  message: z
    .string()
    .min(VALIDATION_LIMITS.messageMin, `Message must be at least ${VALIDATION_LIMITS.messageMin} characters`)
    .max(VALIDATION_LIMITS.messageMax, `Message must be less than ${VALIDATION_LIMITS.messageMax} characters`),
  honeypot: honeypotSchema,
});

export type OpenAccountFormValues = z.infer<typeof openAccountSchema>;

/**
 * Forgot password form - email only
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(VALIDATION_LIMITS.emailMax, `Email must be less than ${VALIDATION_LIMITS.emailMax} characters`),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset password form - new password + confirmation
 */
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
