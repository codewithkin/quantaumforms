'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Github } from 'lucide-react'
import { motion } from "framer-motion";
import { useState } from 'react'

export default function SignIn() {
  // Track loading state
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true); setLoading(true);
      signIn('google', { callbackUrl: '/dashboard' })
    } catch (e: unknown) {
      console.log("An error occured while signing in with google: ", e);
    } finally {
      setLoading(false);
    }
  }

  const handleGithubSignIn = async () => {
    try {
      setLoading(true); setLoading(true);
      signIn('github', { callbackUrl: '/dashboard' })
    } catch (e: unknown) {
      console.log("An error occured while signing in with github: ", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <motion.div 
        initial={{
          y: -300,
          opacity: 0,
          display: "none"
        }}
        animate={{
          y: 0,
          opacity: 1,
          display: "block"
        }}
        transition={{
          duration: 0.5
        }}
        className="absolute top-0 left-0 w-full h-16 bg-orange-500 shadow-md" />
      <Card className="max-w-[400px] shadow-lg p-8">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome to <span className='bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent'>QuantumForms !</span>
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
            {loading ?(
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            )}
            {!loading ? 'Continue with Google' : null}
          </Button>
          <Button 
            variant="outline"
            className="w-full h-11 bg-black text-white"
            onClick={handleGithubSignIn}
            disabled={loading}
          >
            {loading ?(
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              <Github className="w-5 h-5 mr-2" />
            )}
            {!loading ? 'Continue with GitHub' : null}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
