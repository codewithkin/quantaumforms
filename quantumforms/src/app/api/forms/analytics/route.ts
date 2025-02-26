import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";

export async function GET(req: NextRequest) {
  try {
    // Get the user's id
    const session = await auth();

    const user = session?.user;

    const id = user?.id;

    // Make sure the user's id exists
    if (!id) {
      throw new Error("User id is missing");
    }

    // Get the user's forms
    const forms = await prisma.form.findMany({
      where: {
        userId: id,
      },
      include: {
        responses: true,
        settings: true,
      },
    });

    // Add 10 dummy responses to each form with a random date (for the dummy response) for testing purposes
    // forms.forEach(async (form) => {
    //     for (let i = 0; i < 10; i++) {
    //         await prisma.response.create({
    //             data: {
    //                 formId: form.id,
    //                 data: {
    //                     "name": "John Doe",
    //                     "email": "jknk",
    //                     "phone": "1234567890",
    //                     "message": "Hello World",
    //                 },
    //                 filledAt: new Date(),
    //                 timeTaken: Math.floor(Math.random() * 1000),
    //             },
    //         });
    //     }
    // });

    // Get the total number of forms
    const totalForms = forms.length;

    // Get the total number of responses across all forms
    const totalResponses = forms.reduce(
      (acc, form) => acc + form.responses.length,
      0,
    );

    // Calculate completion rate
    const completedResponses = forms.reduce(
      (acc, form) => acc + form.responses.filter(r => r.completed).length,
      0
    );
    const completionRate = totalResponses ? (completedResponses / totalResponses) * 100 : 0;

    // Calculate device breakdown
    const deviceStats = forms.reduce((acc, form) => {
      form.responses.forEach(response => {
        if (response.deviceType) {
          acc[response.deviceType] = (acc[response.deviceType] || 0) + 1;
        }
      });
      return acc;
    }, {} as Record<string, number>);

    // Calculate average time taken
    const avgTimeTaken = Math.round(forms.reduce((acc, form) => {
      const formAvg = form.responses.reduce(
        (sum, response) => sum + (response.timeTaken || 0),
        0
      ) / (form.responses.length || 1);
      return acc + formAvg;
    }, 0) / (forms.length || 1));

    // Get response trends with more details
    const responseTrends = forms
      .flatMap(form => form.responses)
      .map(response => ({
        filledAt: response.filledAt,
        timeTaken: response.timeTaken,
        longestField: response.longestField,
        deviceType: response.deviceType,
        completed: response.completed,
      }))
      .sort((a, b) => a.filledAt.getTime() - b.filledAt.getTime());

    // Calculate public vs private forms
    const publicForms = forms.filter(form => form.settings?.isPublic).length;
    const privateForms = totalForms - publicForms;

    return NextResponse.json({
      totalForms,
      totalResponses,
      completionRate,
      avgTimeTaken,
      deviceStats,
      responseTrends,
      publicPrivateStats: {
        public: publicForms,
        private: privateForms,
      },
      recentActivity: responseTrends.slice(-5),
    });
  } catch (e) {
    console.error("An error occurred while fetching analytics: ", e);
    return NextResponse.json({
      message: "An error occurred while fetching analytics",
    }, { status: 500 });
  }
}
