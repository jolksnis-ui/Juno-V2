import type { ContactFormValues } from '@/lib/validations';

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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #18181B; border-bottom: 2px solid #E4E4E7; padding-bottom: 12px;">
        New Contact Form Submission
      </h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #70707B; width: 120px;">Name:</td>
          <td style="padding: 8px 0; color: #18181B; font-weight: 500;">${sanitizeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #70707B;">Email:</td>
          <td style="padding: 8px 0; color: #18181B;">${sanitizeHtml(email)}</td>
        </tr>
        ${
          phone
            ? `<tr>
          <td style="padding: 8px 0; color: #70707B;">Phone:</td>
          <td style="padding: 8px 0; color: #18181B;">${sanitizeHtml(phone)}</td>
        </tr>`
            : ''
        }
        ${
          company
            ? `<tr>
          <td style="padding: 8px 0; color: #70707B;">Company:</td>
          <td style="padding: 8px 0; color: #18181B;">${sanitizeHtml(company)}</td>
        </tr>`
            : ''
        }
      </table>
      
      <div style="margin-top: 24px;">
        <p style="color: #70707B; margin-bottom: 8px;">Message:</p>
        <div style="background: #F4F4F5; padding: 16px; border-radius: 4px; color: #18181B; white-space: pre-wrap;">${sanitizeHtml(message)}</div>
      </div>
      
      <hr style="border: none; border-top: 1px solid #E4E4E7; margin-top: 32px;" />
      <p style="color: #A0A0AB; font-size: 12px; margin-top: 16px;">
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
