import { NextResponse } from 'next/server';
import { z } from 'zod';

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

    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock success (90% of the time) or failure (10% of the time)
    const shouldSucceed = Math.random() > 0.1;

    if (!shouldSucceed) {
      throw new Error('Failed to join waitlist');
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
