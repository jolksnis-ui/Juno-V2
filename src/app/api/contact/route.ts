import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations';
import {
  generateContactEmailHtml,
  generateContactEmailSubject,
} from '@/lib/email-template';

/** Required environment variables for this route */
const REQUIRED_ENV_VARS = ['RESEND_API_KEY', 'CONTACT_EMAIL'] as const;

/** Validates that all required environment variables are set */
const validateEnvVars = (): { valid: boolean; missing: string[] } => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  return { valid: missing.length === 0, missing };
};

/**
 * POST /api/contact
 * Handles contact form submissions and sends email via Resend
 */
export async function POST(request: Request) {
  try {
    // Validate environment configuration
    const envCheck = validateEnvVars();
    if (!envCheck.valid) {
      console.error('Missing required env vars:', envCheck.missing);
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Parse and validate request body
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const formData = result.data;

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Juno Bank <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: formData.email,
      subject: generateContactEmailSubject(formData.name),
      html: generateContactEmailHtml(formData),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
