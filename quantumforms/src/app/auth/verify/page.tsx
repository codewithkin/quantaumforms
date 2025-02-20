"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function VerifyRequest() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="absolute top-0 left-0 w-full h-16 bg-purple-700" />
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <CardTitle className="text-2xl font-bold text-purple-700">
            Check your email
          </CardTitle>
          <CardDescription className="text-slate-600">
            A sign in link has been sent to your email address. Please click the
            link to complete your sign in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-11"
            onClick={() => (window.location.href = "/auth/signin")}
          >
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
