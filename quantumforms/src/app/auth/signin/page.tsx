"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import LogoPlusHeading from "@/components/branding/LogoPlusHeading";

export default function SignIn() {
  // Track loading state
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      signIn("google", { callbackUrl: "/user/dashboard" });
    } catch (e: unknown) {
      console.log("An error occured while signing in with google: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      signIn("github", { callbackUrl: "/user/dashboard" });
    } catch (e: unknown) {
      console.log("An error occured while signing in with github: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <motion.div
        initial={{
          y: -300,
          opacity: 0,
          display: "none",
        }}
        animate={{
          y: 0,
          opacity: 1,
          display: "block",
        }}
        transition={{
          duration: 0.5,
        }}
        className="absolute top-0 left-0 w-full h-16 bg-white shadow-md"
      >
        <LogoPlusHeading />
      </motion.div>
      <Card className="max-w-[400px] shadow-lg p-8">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              QuantumForms !
            </span>
          </CardTitle>
          <CardDescription className="text-slate-600">
            We're so happy to see you ! Please sign in or sign up to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-11 bg-white"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 size={20} className="animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <Image
                width={20}
                height={20}
                src="/icons/google.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
            )}
            {!loading ? "Continue with Google" : null}
          </Button>
          <Button
            variant="outline"
            className="w-full h-11 bg-black text-white"
            onClick={handleGithubSignIn}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 size={20} className="animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <Github className="w-5 h-5 mr-2" />
            )}
            {!loading ? "Continue with GitHub" : null}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
