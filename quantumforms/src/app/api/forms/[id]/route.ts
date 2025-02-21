import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";

// GET a particular form
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    if (!id) throw new Error("Shareable link not provided");

    // Get the form with the shareableLink from query params
    const form = await prisma.form.findUnique({
      where: {
        shareableLink: id,
      },
    });

    if (!form) {
      console.log("FORM NOT FOUND");
      return NextResponse.json({
        message: "No form with that id",
      });
    }

    console.log("FORM FOUND: ", form);
    return NextResponse.json(form);
  } catch (e) {
    console.log("An error occured while fetching a particular form: ", e);

    return NextResponse.json(
      {
        message: "An error occured whle fetching form",
      },
      { status: 500 },
    );
  }
}

// UPDATE a particular form
export async function PATCH(req: NextRequest, {params} : {params: {id: string}}) {
  try {
    const {id} = await params;

    // Get the data from the request body
    const {
      title,
      description,
      settings,
      fields,
    } = await req.json;

    const existingForm = await prisma.form.findUnique({
      where: {
        shareableLink: id
      },
      include: {
        fields,
        settings
      }
    });

    if(!existingForm) throw new Error("This form does not exist");

    // Update the form
    const updatedForm = await prisma.form.update({
      where: {
        shareableLink: id
      },
      data: {
        title: title || existingForm.title,
        description: description || existingForm.description,
        fields: fields ? {...fields, ...existingForm.fields} : existingForm.fields,
        settings: settings ? {...existingForm.settings, ...settings} : existingForm.settings
      }
    })

    return NextResponse.json(
      updatedForm,
      {status: 201}
    )
  } catch (e) {
    console.log("An error occured inside /api/forms/[id]/route.ts under PATCH");

    return NextResponse.json({
      messgae: "Updating form failed"
    }, {status: 500})
  }
}