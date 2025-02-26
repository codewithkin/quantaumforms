import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    // Get the form with responses
    const form = await prisma.form.findUnique({
      where: { 
        id: params.id,
        userId, // Ensure user owns the form
      },
      include: {
        responses: true,
      },
    });

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    // Calculate total responses
    const totalResponses = form.responses.length;

    // Calculate completion rate
    const completedResponses = form.responses.filter(r => r.completed).length;
    const completionRate = totalResponses ? (completedResponses / totalResponses) * 100 : 0;

    // Calculate average time taken
    const avgTimeTaken = form.responses.reduce((acc, r) => acc + (r.timeTaken || 0), 0) / totalResponses || 0;

    // Calculate device distribution
    const deviceStats = form.responses.reduce((acc, r) => {
      const device = r.deviceType || 'unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate geographic distribution
    const locationStats = form.responses.reduce((acc, r) => {
      const location = r.location || 'unknown';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate response trends
    const responseTrends = form.responses
      .reduce((acc, r) => {
        const date = new Date(r.filledAt).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    // Convert trends to array format for charts
    const trendArray = Object.entries(responseTrends)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({
      totalResponses,
      completionRate,
      avgTimeTaken,
      deviceStats,
      locationStats,
      responseTrends: trendArray,
    });

  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
} 