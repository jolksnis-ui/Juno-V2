import type { ContactFormValues } from '@/lib/validations';
import { EMAIL_COLORS, MAX_WIDTHS } from './constants';

/**
 * Sanitizes user input to prevent XSS in HTML emails
 * Escapes HTML special characters
 */
const sanitizeHtml = (str: string): string =>
  str.replace(/[<>&"']/g, (char) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char] || char;
  });

/**
 * Generates HTML email content for contact form submissions
 * All user inputs are sanitized to prevent XSS
 */
export const generateContactEmailHtml = (data: ContactFormValues): string => {
  const { name, email, phone, company, message } = data;

  return `
    <div style="font-family: Arial, sans-serif; max-width: ${MAX_WIDTHS.email}; margin: 0 auto;">
      <h2 style="color: ${EMAIL_COLORS.text}; border-bottom: 2px solid ${EMAIL_COLORS.border}; padding-bottom: 12px;">
        New Contact Form Submission
      </h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px 0; color: ${EMAIL_COLORS.textSecondary}; width: 120px;">Name:</td>
          <td style="padding: 8px 0; color: ${EMAIL_COLORS.text}; font-weight: 500;">${sanitizeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: ${EMAIL_COLORS.textSecondary};">Email:</td>
          <td style="padding: 8px 0; color: ${EMAIL_COLORS.text};">${sanitizeHtml(email)}</td>
        </tr>
        ${
          phone
            ? `<tr>
          <td style="padding: 8px 0; color: ${EMAIL_COLORS.textSecondary};">Phone:</td>
          <td style="padding: 8px 0; color: ${EMAIL_COLORS.text};">${sanitizeHtml(phone)}</td>
        </tr>`
            : ''
        }
        ${
          company
            ? `<tr>
          <td style="padding: 8px 0; color: ${EMAIL_COLORS.textSecondary};">Company:</td>
          <td style="padding: 8px 0; color: ${EMAIL_COLORS.text};">${sanitizeHtml(company)}</td>
        </tr>`
            : ''
        }
      </table>
      
      <div style="margin-top: 24px;">
        <p style="color: ${EMAIL_COLORS.textSecondary}; margin-bottom: 8px;">Message:</p>
        <div style="background: ${EMAIL_COLORS.background}; padding: 16px; border-radius: 4px; color: ${EMAIL_COLORS.text}; white-space: pre-wrap;">${sanitizeHtml(message)}</div>
      </div>
      
      <hr style="border: none; border-top: 1px solid ${EMAIL_COLORS.border}; margin-top: 32px;" />
      <p style="color: ${EMAIL_COLORS.footer}; font-size: 12px; margin-top: 16px;">
        This email was sent from the Juno Bank contact form.
      </p>
    </div>
  `.trim();
};

/**
 * Generates the email subject line
 */
export const generateContactEmailSubject = (name: string): string =>
  `New Contact Form Submission from ${name}`;
