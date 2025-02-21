import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma"

// GET a particular form
export async function GET ({params}: {params: {id: string}}) {
    try {
        // Get the form id
        const id = params.id;

        // Get the form with the id from query params
        const form = await prisma.form.findUnique({
            where: {
                id
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