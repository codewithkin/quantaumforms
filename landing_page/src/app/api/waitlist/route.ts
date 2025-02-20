import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import WaitlistWelcomeEmail from '@/emails/WaitlistWelcome';

const resend = new Resend(process.env.RESEND_API_KEY);

// Input validation schema
const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the input
    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      );
    }

    try {
      // Send welcome email
      await resend.emails.send({
        from: 'QuantumForms <onboarding@aiseogen.com>',
        to: result.data.email,
        subject: 'Welcome to QuantumForms Waitlist! 🎉',
        react: WaitlistWelcomeEmail({ email: result.data.email }),
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't throw here - we still want to return success even if email fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
      email: result.data.email,
    });
  } catch (error) {
    console.error('Waitlist API error:', error);
    
    // If it's our known error, return it
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // For unknown errors, return a generic message
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
