import { z } from 'zod';
import { VALIDATION_LIMITS } from './constants';

/** Phone number regex - allows international formats */
const PHONE_REGEX = /^\+?[\d\s\-()]+$/;

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
