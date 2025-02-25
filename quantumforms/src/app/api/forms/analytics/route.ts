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
        responses: {
            take: 10
        },
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

    // Get the average time taken to fill a form
    const avgTimeTaken = forms.reduce((acc, form) => {
      const timeTaken = form.responses.reduce(
        (acc, response: any) => acc + response.timeTaken,
        0,
      );
      return acc + timeTaken / form.responses.length;
    }, 0);

    // Get the response trends (just all of the responses across all the forms)
    const responseTrends = forms
      .filter((form) => form.responses.length > 0)
      .map((form) => form.responses.map((response) => response).flat())
      .flat();

    return NextResponse.json({
      totalForms,
      totalResponses,
      responseTrends,
      avgTimeTaken
    });
  } catch (e) {
    console.log("An error occured while fetching analytics: ", e);
    return NextResponse.json({
      message: "An error occured while fetching analytics",
    });
  }
}
