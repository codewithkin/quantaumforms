import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";

export async function GET (req: NextRequest) {
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
                userId: id
            },
            include: {
                responses: true
            }
        });

        // Get the total number of forms
        const totalForms = forms.length;

        // Get the total number of responses across all forms
        const totalResponses = forms.reduce((acc, form) => acc + form.responses.length, 0);

        // Get the average time taken to fill a form
        const avgTimeTaken = forms.reduce((acc, form) => {
            const timeTaken = form.responses.reduce((acc, response: any) => acc + response.timeTaken, 0);
            return acc + timeTaken / form.responses.length;
        }, 0);

        // Get the response trends (just all of the responses across all the forms)
        const responseTrends = forms.map(form => form.responses
            .map(response => response.data)
            .flat()
        ).flat();

        return NextResponse.json({
            totalForms,
            totalResponses
        })
    } catch (e) {
        console.log("An error occured while fetching analytics: ", e)
        return NextResponse.json({
            message: "An error occured while fetching analytics"
        })
    }
}