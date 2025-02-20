'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            Continue with Google
          </Button>
          <Button 
            className="w-full"
            onClick={() => signIn('github', { callbackUrl: '/' })}
          >
            Continue with GitHub
          </Button>
          <Button 
            className="w-full"
            onClick={() => signIn('apple', { callbackUrl: '/' })}
          >
            Continue with Apple
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}