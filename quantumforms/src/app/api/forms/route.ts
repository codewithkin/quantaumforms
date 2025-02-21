import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";
import { v4 } from "uuid";
import { auth } from "@/auth";

// 🟢 CREATE a new form (POST /api/forms)
export async function POST(req: Request) {
    try {
        const { title, description } = await req.json();

        // Get the currently logged in user's email
        const session = await auth();

        const email = session?.user?.email;

        if(!email) throw new Error("Email not found")

        // Get the current user's full data
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const id = user?.id;

        if(!id) throw new Error("ID not found");
 
        // Validate input
        if (!title || title.trim() === "") {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        // Create form in the database
        const newForm = await prisma.form.create({
            data: {
                title,
                user: {
                    connect: {
                        id
                    }
                },
                description: description || "", // Default to empty string if not provided
                fields: { create: [] }, // Explicitly set to undefined instead of an empty array
                shareableLink: v4()
            },
        });

        return NextResponse.json(newForm, { status: 201 });
    } catch (error) {
        console.error("Error creating form:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// 🟡 GET all forms (GET /api/forms)
export async function GET() {
    try {
        const forms = await prisma.form.findMany({
            orderBy: { createdAt: "desc" }, // Latest forms first
        });

        return NextResponse.json(forms, { status: 200 });
    } catch (error) {
        console.error("Error fetching forms:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
