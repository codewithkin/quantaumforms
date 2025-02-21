import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma"

// GET a particular form
export async function GET (req: NextRequest, {params}: {params: {shareableLink: string}}) {
    try {
        console.log("PARAMS: ", params.shareableLink);

        const shareableLink = params.shareableLink as string | undefined;

        // Get the form with the shareableLink from query params
        const form = await prisma.form.findUnique({
            where: {
                shareableLink
            }
        });

        console.log("PARTICULAR FORM: ", form);

        if(!form) {
            return NextResponse.json({
                message: "No form with that id"
            }, {status: 404});
        }

        return NextResponse.json(form);
    } catch (e) {
        console.log("An error occured while fetching a particular form: ", e);

        return NextResponse.json({
            message: "An error occured whle fetching form"
        }, {status: 500})
    }
}