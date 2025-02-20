'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Github } from 'lucide-react'

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="absolute top-0 left-0 w-full h-16 bg-orange-500" />
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-purple-700">
            Welcome back!
          </CardTitle>
          <CardDescription className="text-slate-600">
            Sign in to continue your journey with QuantumForms
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
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Don't have an account?</span>
            </div>
          </div>
          <Button 
            className="w-full h-11 bg-orange-500 hover:bg-orange-600"
            onClick={() => window.location.href = '/auth/signup'}
          >
            Create an account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}