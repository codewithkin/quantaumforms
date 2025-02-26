import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { shareableLink: string } },
) {
  try {
    const form = await prisma.form.findUnique({
      where: {
        shareableLink: params.shareableLink,
      },
      include: {
        fields: {
          include: {
            options: true,
          },
        },
        settings: true,
      },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json(
      { error: "Failed to fetch form" },
      { status: 500 },
    );
  }
}
