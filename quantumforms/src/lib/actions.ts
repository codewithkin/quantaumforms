"use server";

import { prisma } from "../../prisma";

export async function updateFormBranding(formData: FormData) {
  // Update the form's branding (primary and secondary color, logo)
  // Get the primary and secondary color from the formData]
  const primaryColor = formData.get("primaryColor") as string;
  const secondaryColor = formData.get("secondaryColor") as string;

  // Get the form's logo
  const logo = formData.get("logo") as string;

  const shareableLink = formData.get("shareableLink") as string;

  if (logo) {
    return await prisma.form.update({
      where: {
        shareableLink,
      },
      data: {
        primaryColor,
        secondaryColor,
        logo,
      },
    });
  }

  await prisma.form.update({
    where: {
      shareableLink,
    },
    data: {
      primaryColor,
      secondaryColor,
    },
  });

  return true;
}
