import { z } from 'zod';

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
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[^\d]+$/, 'Name cannot contain numbers')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters'),
  phone: z
    .string()
    .regex(PHONE_REGEX, 'Please enter a valid phone number')
    .max(30, 'Phone number is too long')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .min(1, 'Company is required')
    .max(100, 'Company name must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
