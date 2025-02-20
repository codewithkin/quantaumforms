'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Github } from 'lucide-react'
import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <motion.div 
        initial={{
          y: 100,
          opacity: 0,
          display: "none"
        }}
        animate={{
          y: 0,
          opacity: 1,
          display: "block"
        }}
        className="absolute top-0 left-0 w-full h-16 bg-orange-500" />
      <Card className="max-w-[400px] shadow-lg p-8">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome to <span className='text-orange-500'>QuantumForms !</span>
          </CardTitle>
          <CardDescription className="text-slate-600">
            We're so happy to see you ! Please sign in or sign up to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline"
            className="w-full h-11"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          <Button 
            variant="outline"
            className="w-full h-11"
            onClick={() => signIn('github', { callbackUrl: '/' })}
          >
            <Github className="w-5 h-5 mr-2" />
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}