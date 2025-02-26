import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { prisma } from "../../../../../../prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the form data from the request
    const formData = await req.json();
    
    // Get the form ID from the params
    const { id } = params;

    // Get user agent info
    const userAgent = req.headers.get("user-agent") || "";
    const parser = new UAParser(userAgent);
    const deviceInfo = parser.getResult();

    // Get location info from headers (if available)
    const location = req.headers.get("x-vercel-ip-country") || null;

    // Create the response
    const response = await prisma.response.create({
      data: {
        formId: id,
        data: formData,
        timeTaken: null,
        deviceType: deviceInfo.device.type || 'desktop',
        browser: deviceInfo.browser.name || 'unknown',
        platform: deviceInfo.os.name || 'unknown',
        location,
        completed: true,
      },
    });

    // Get the form with settings and user info
    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        settings: true,
        user: true,
      },
    });

    // Create notification if enabled
    if (form?.settings?.notifyOnSubmission) {
      await prisma.notification.create({
        data: {
          userId: form.userId,
          success: true,
          message: `New response received for form: ${form.title}`,
        },
      });
    }

    return NextResponse.json({
      message: "Form submitted successfully",
      responseId: response.id,
    });

  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}

// Add a GET method to check if form is accepting responses
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        settings: true,
        responses: true,
      },
    });

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    // Check if form is public
    if (!form.settings?.isPublic) {
      return NextResponse.json(
        { error: "This form is private" },
        { status: 403 }
      );
    }

    // Check if multiple responses are allowed
    if (!form.settings?.allowMultipleResponses) {
      // Add logic to check if user has already submitted
    }

    return NextResponse.json({
      canSubmit: true,
      message: "Form is accepting responses",
    });

  } catch (error) {
    console.error("Error checking form status:", error);
    return NextResponse.json(
      { error: "Failed to check form status" },
      { status: 500 }
    );
  }
} 