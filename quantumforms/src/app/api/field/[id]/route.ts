import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";

// DELETE a particular field
export async function DELETE (req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const { id } = await params;

        // Get the field id
        const searchParams = req.nextUrl.searchParams; // Get fieldId from query params

        const fieldId = searchParams.get("fieldId");

        if (!fieldId) {
            throw new Error("Field ID is required");
        }
        // Find the form with the shareableLink equal to the id
        const form = await prisma.form.findUnique({
            where: {
                shareableLink: id
            }
        })

        if(!form) {
            throw new Error("Form not found !");
        }

        // Delete the field
        const deletedField = await prisma.field.delete({
            where: {
                id: fieldId
            }
        })

        console.log("Successfully deleted field: ", deletedField);

        return NextResponse.json(deletedField, {status: 200});
    } catch (e) {
        console.log("An error occured while deleting field: ", e);

        return NextResponse.json({
            message: "An error occured while deleting field",
        }, {status: 500});
    }
}