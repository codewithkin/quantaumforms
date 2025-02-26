"use server";

import { prisma } from "../../prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

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

export async function updateFormSettings(formData: FormData) {
  try {
    const formId = formData.get('formId') as string;
    const settings = {
      isPublic: formData.get('isPublic') === 'true',
      allowMultipleResponses: formData.get('allowMultipleResponses') === 'true',
      showProgress: formData.get('showProgress') === 'true',
      theme: formData.get('theme') as string,
      submitMessage: formData.get('submitMessage') as string,
    };

    await prisma.setting.upsert({
      where: { 
        formId 
      },
      create: {
        ...settings,
        formId,
      },
      update: settings,
    });

    revalidatePath(`/user/forms/${formId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to update settings:', error);
    return { success: false, error: 'Failed to update settings' };
  }
}

export async function updateProfile(formData: {
  name: string;
  email: string;
  image?: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Not authenticated");

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: formData.name,
        email: formData.email,
        image: formData.image,
      },
    });

    revalidatePath('/user/profile');
    return { success: true };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function updateAccountSettings(settings: Record<string, boolean>) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Not authenticated");

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        settings: {
          upsert: {
            create: settings,
            update: settings,
          },
        },
      },
    });

    revalidatePath('/user/settings');
    return { success: true };
  } catch (error) {
    console.error('Failed to update settings:', error);
    return { success: false, error: 'Failed to update settings' };
  }
}
