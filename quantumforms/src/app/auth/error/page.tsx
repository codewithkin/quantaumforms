'use client'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { XCircle } from 'lucide-react'

export default function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="absolute top-0 left-0 w-full h-16 bg-purple-700" />
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto" />
          <CardTitle className="text-2xl font-bold text-red-500">
            Authentication Failed
          </CardTitle>
          <CardDescription className="text-slate-600">
            We couldn't authenticate your request. This could be due to expired credentials or invalid permissions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full h-11 bg-purple-700 hover:bg-purple-800"
            onClick={() => window.location.href = '/auth/signin'}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}