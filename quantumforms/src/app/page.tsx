import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  // Get the user's session
  const session = await auth();

  if (!session || !session?.user) {
    return redirect("/auth/signin");
  }

  return redirect("/user/dashboard");
}

export default page;
