'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Choose your preferred sign up method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            Sign up with Google
          </Button>
          <Button 
            className="w-full"
            onClick={() => signIn('github', { callbackUrl: '/' })}
          >
            Sign up with GitHub
          </Button>
          <Button 
            className="w-full"
            onClick={() => signIn('apple', { callbackUrl: '/' })}
          >
            Sign up with Apple
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}