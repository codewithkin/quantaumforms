import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma"

// GET a particular form
export async function GET (req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const {id} = await params;

        if(!id) throw new Error("Shareable link not provided");

        // Get the form with the shareableLink from query params
        const form = await prisma.form.findUnique({
            where: {
                shareableLink: id
            }
        });

        if(!form) {
            console.log("FORM NOT FOUND")
            return NextResponse.json({
                message: "No form with that id"
            }, {status: 404});
        }

        console.log("FORM FOUND: ", form);
        return NextResponse.json(form);
    } catch (e) {
        console.log("An error occured while fetching a particular form: ", e);

        return NextResponse.json({
            message: "An error occured whle fetching form"
        }, {status: 500})
    }
}