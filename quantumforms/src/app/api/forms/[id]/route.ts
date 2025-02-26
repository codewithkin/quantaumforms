import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import { auth } from "@/auth";

// GET a particular form
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const {id} = await params;

    const form = await prisma.form.findUnique({
      where: { 
        id,
        userId, // Ensure user owns the form
      },
      include: {
        fields: {
          include: {
            options: true
          }
        },
        settings: true
      }
    });

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json(
      { error: "Failed to fetch form" },
      { status: 500 }
    );
  }
}

// UPDATE a particular form
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const xycd = await req.json();

    // Get the data from the request body
    const { type, label, placeholder, required, options } = xycd;

    console.log("FIELDS: ", xycd);

    const existingForm = await prisma.form.findUnique({
      where: {
        shareableLink: id,
      },
      include: {
        fields: true,
        settings: true,
      },
    });

    const formId = existingForm?.id;

    if (!existingForm) throw new Error("This form does not exist");

    const newField = await prisma.field.create({
      data: {
        formId: formId || "",
        type,
        placeholder,
        label,
        required,
      },
    });

    // Create new options
    let newOptions: { id: string; value: string; fieldId: string }[] | [] = [];

    if (options && options.length > 0) {
      await prisma.option.createMany({
        data: options.map((option: string) => ({
          value: option,
          fieldId: newField.id, // Temporarily set fieldId to undefined
        })),
      });

      if (newOptions.length > 0) {
        // Fetch the created options
        newOptions = await prisma.option.findMany({
          where: {
            value: { in: options.map((o: { value: string }) => o.value) }, // Assuming `value` is unique
          },
        });
      }
    }

    // Update the field's options
    await prisma.field.update({
      where: {
        id: newField.id,
      },
      data: {
        options: {
          connect: newOptions.map((option) => ({ id: option.id })),
        },
      },
    });

    // Update the form
    const updatedForm = await prisma.form.update({
      where: {
        shareableLink: id,
      },
      data: {
        // Ensure fields is an array with the correct connect structure
        fields: {
          connect:
            existingForm.fields.length > 0
              ? [
                  { id: newField.id },
                  ...existingForm.fields.map((field) => ({ id: field.id })),
                ]
              : [{ id: newField.id }],
        },
      },
      include: {
        fields: {
          include: {
            options: true,
          },
        },
      },
    });

    console.log("Updated form: ", updatedForm);

    return NextResponse.json(updatedForm, { status: 201 });
  } catch (e) {
    console.log(
      "An error occured inside /api/forms/[id]/route.ts under PUT",
      e,
    );

    return NextResponse.json(
      {
        messgae: "Updating form failed",
      },
      { status: 500 },
    );
  }
}

// DELETE a particular form
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

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

    const deletedForm = await prisma.form.delete({
      where: {
        shareableLink: id,
      },
      include: {
        fields: true,
        settings: true,
      },
    });

    return NextResponse.json(deletedForm, { status: 200 });
  } catch (e) {
    console.log("An error occured while deleting a particular form: ", e);

    return NextResponse.json(
      {
        message: "An error occured whle deleting form",
      },
      { status: 500 },
    );
  }
}
